import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request)  {
    const data = { name: 'Adam', age: '22' };
    
    const fileContent = `export const info = ${JSON.stringify(data, null, 2)};\n`;

    const filePath = path.join(process.cwd(), 'lib', '123.js');

    try {
      fs.writeFileSync(filePath, fileContent);
      
      return NextResponse.json({ success: true, path: filePath });
    } catch (err) {
      return NextResponse.json({ error: 'Could not write file.' + err });
    }
}
