import clientPromise from '@/lib/mongodb';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { getAnalyticsDb } from '@/lib/analytics';


function groupByDate(records, event) {
    // A map from "formattedDate" => number of clicks on that date
    const dateMap = {};
  
    for (const record of records) {
      // Convert the "time" field to a JS Date
      const dateObj = new Date(record.time);
  
      // Extract the day and short month, e.g. "1 Jan" or "24 Feb"
      const day = dateObj.getDate(); // 1-31
      const monthShort = dateObj.toLocaleString('default', { month: 'short' }); // 'Jan', 'Feb', etc.
      
      // Construct a string like "24 Feb"
      const dateKey = `${day} ${monthShort}`;
  
      // Increment the count in our map
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = 0;
      }
      dateMap[dateKey] += 1;
    }
  
    // Now transform the map into the array format you want
    // { name: '1 Jan', Clicks: 90 }
    const result = Object.entries(dateMap).map(([dateStr, value]) => {
      return {
        name: dateStr,
        [event]: value
      };
    });
  
    // OPTIONAL: if you want them sorted by actual date (chronologically)
    // instead of random object key order:
    // 1. Convert dateStr to an actual date or numeric day-of-year
    // 2. Sort the array
    result.sort((a, b) => {
      // parse "1 Jan", "24 Feb", etc. to a real date
      const [dayA, monthA] = a.name.split(' ');
      const [dayB, monthB] = b.name.split(' ');
      const dateA = new Date(`2025-${monthA}-` + dayA);
      const dateB = new Date(`2025-${monthB}-` + dayB);
      return dateA - dateB; 
    });
  
    return result;
}

function groupByMonth(records, event) {
    // A map from "MonthName Year" => number of clicks
    const monthMap = {};
  
    for (const record of records) {
      // Convert the "time" field to a JS Date
      const dateObj = new Date(record.time);
  
      // Extract the short month name (e.g., 'Jan', 'Feb') and the 4-digit year
      const monthShort = dateObj.toLocaleString('default', { month: 'short' }); 
      const year = dateObj.getFullYear();
  
      // Construct a grouping key like "Feb 2025"
      const dateKey = `${monthShort} ${year}`;
  
      // Increment the count in our map
      if (!monthMap[dateKey]) {
        monthMap[dateKey] = 0;
      }
      monthMap[dateKey] += 1;
    }
  
    // Transform the map into an array: { name: 'Feb 2025', Clicks: X }
    const result = Object.entries(monthMap).map(([monthStr, value]) => {
      return {
        name: monthStr,   // e.g., "Feb 2025"
        [event]: value,
      };
    });
  
    // Optional: sort chronologically by year + month
    // (otherwise, Object.entries(...) might be in arbitrary order)
    result.sort((a, b) => {
      // Each 'name' is "Mon YYYY", e.g. "Feb 2025"
      const [monthA, yearA] = a.name.split(' ');
      const [monthB, yearB] = b.name.split(' ');
  
      // Convert "Jan", "Feb", etc. to numeric months:
      const monthNames = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
  
      const dateA = new Date(+yearA, monthNames[monthA], 1); // e.g. 2025-02-01
      const dateB = new Date(+yearB, monthNames[monthB], 1);
  
      return dateA - dateB;
    });
  
    return result;
}

function groupByYear(records, event) {
    // A map from "Year" => number of clicks
    const yearMap = {};
  
    for (const record of records) {
      // Convert the "time" field to a JS Date
      const dateObj = new Date(record.time);
  
      // Extract the 4-digit year
      const year = dateObj.getFullYear(); // e.g. 2025
  
      // Increment the count for this year
      if (!yearMap[year]) {
        yearMap[year] = 0;
      }
      yearMap[year] += 1;
    }
  
    // Transform the map into an array: { name: '2025', Clicks: 99 }
    const result = Object.entries(yearMap).map(([year, value]) => ({
      name: year,  // e.g. "2025"
      [event]: value,
    }));
  
    // Sort by year (ascending)
    result.sort((a, b) => +a.name - +b.name);
  
    return result;
  }

export async function GET(request) {
    const mongoClient = await clientPromise
    const db = mongoClient.db('kulfi')
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const organization = searchParams.get('organization');
    const event = searchParams.get('event');
    const type = searchParams.get('type');

    if (event === 'location') {
        const locCursor = await db.collection(getAnalyticsDb(organization, id)).find({ "event": "location" });
        const locDocs = await locCursor.toArray();

        const groupedByCountry = locDocs.reduce((acc, item) => {
            const { country, device } = item;
            if (!acc[country]) {
              acc[country] = { country, mobile: 0, desktop: 0 };
            }
          
            if (device) {
              if (device.toLowerCase() === 'mobile') {
                acc[country].mobile += 1;
              } else if (device.toLowerCase() === 'desktop') {
                acc[country].desktop += 1;
              }
            }
            return acc;
          }, {});
          
          const result = Object.values(groupedByCountry);
          return NextResponse.json({ success: true, data: result });

    } else if (event === 'lead') {
      const leadsCursor = await db.collection(getAnalyticsDb(organization, id)).find({ "event": "lead" });
      const leadsDocs = await leadsCursor.toArray();
      return NextResponse.json({ success: true, data: leadsDocs });
    } else if (event === 'count') {
        const count = await db.collection(getAnalyticsDb(organization, id)).count();
        return NextResponse.json({ success: true, data: count });
    } else if (event === 'engagement') {
        const clickCursor = await db.collection(getAnalyticsDb(organization, id)).find({ "event": "click" });
        const clickDocs = await clickCursor.toArray();
        const sessionCursor = await db.collection(getAnalyticsDb(organization, id)).find({ "event": "session" });
        const sessionDocs = await sessionCursor.toArray();
        return NextResponse.json({ success: true, data: ((sessionDocs.length / clickDocs.length).toFixed(2) * 100) });
    } else {
        const queryCursor = await db.collection(getAnalyticsDb(organization, id)).find({ "event": event });
        const queryDocs = await queryCursor.toArray();
        
        if (type === 'Day') {
            return NextResponse.json({ success: true, data: groupByDate(queryDocs, event) });
        } else if (type === 'Month') {
            return NextResponse.json({ success: true, data: groupByMonth(queryDocs, event) });
        } else if (type === 'Year') {
            return NextResponse.json({ success: true, data: groupByYear(queryDocs, event) });
        }
    }
}