'use client';

import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { TextChat } from '../components/TextChat';
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Home() {

    const [data, setData] = useState();
    const [botInfo, setBotInfo] = useState();
  
    const loadData = async () => {
      const pathname = window.location.href;
      var url = new URL(pathname);
      const id = url.searchParams.get('id');
      const color = '#' + url.searchParams.get('cc');
      const lColor = '#' + url.searchParams.get('lc');
      const mColor = '#' + url.searchParams.get('mc');
      
      const botName = url.searchParams.get('bn');
      setBotInfo({
        id,
        color,
        lColor,
        mColor, 
        botName
      });
      const res = await fetch('/api/dashboard', {
              method: 'POST',
              body: JSON.stringify({
              id: '67ab337d739e450095424ad7'
            })
          });
      const data = await res.json();
      if (data.data) {
        setData(data.data);
      } 
      // else {
      //   router.push('/');
      // }
    }
  
    useEffect(() => {
      loadData();
    }, []);

    return (
      botInfo && <main className={`flex flex-col items-center justify-between gap-4 flex-grow w-full ${poppins.className}`}>
        <header style={{ backgroundColor: botInfo.color }} className={`fixed top-0 z-50 flex justify-between md:px-[25px] py-[10px] max-w-screen mx-auto w-full gap-2 items-center h-[75px]`}>
          <div className='flex items-center gap-3 w-full max-w-screen-md mx-auto px-[25px]'>
            <span className='bg-gray-100 text-gray-500 rounded-full p-[5px]'>
              {/* <Image
                src="/icons/chatbot-1.png"
                width={20}
                height={20}
                alt="Send Message"
              /> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
                <g id="surface1">
                  <path style="stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,12.941177%,80.784315%);fill-opacity:1;" d="M 2.398438 4 C 7.414062 4 12.433594 4 17.601562 4 C 17.601562 8.09375 17.601562 12.183594 17.601562 16.398438 C 16.675781 16.664062 15.753906 16.929688 14.800781 17.199219 C 13.847656 17.863281 13.847656 17.863281 13.074219 18.648438 C 11.671875 20 11.671875 20 10.800781 20 C 10.800781 18.8125 10.800781 17.625 10.800781 16.398438 C 8.027344 16.398438 5.257812 16.398438 2.398438 16.398438 C 2.398438 12.308594 2.398438 8.214844 2.398438 4 Z M 6.398438 8 C 6.398438 8.527344 6.398438 9.054688 6.398438 9.601562 C 6.929688 9.601562 7.457031 9.601562 8 9.601562 C 8 9.070312 8 8.542969 8 8 C 7.472656 8 6.945312 8 6.398438 8 Z M 12 8 C 12 8.527344 12 9.054688 12 9.601562 C 12.527344 9.601562 13.054688 9.601562 13.601562 9.601562 C 13.601562 9.070312 13.601562 8.542969 13.601562 8 C 13.070312 8 12.542969 8 12 8 Z M 8.398438 11.601562 C 8.796875 12.195312 8.796875 12.195312 9.199219 12.800781 C 10.1875 12.664062 10.1875 12.664062 11.199219 12.398438 C 11.332031 12.136719 11.464844 11.871094 11.601562 11.601562 C 10.542969 11.601562 9.488281 11.601562 8.398438 11.601562 Z M 8.398438 11.601562 "/>
                  <path style="stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,12.941177%,80.392158%);fill-opacity:1;" d="M 18.398438 7.601562 C 18.929688 7.601562 19.457031 7.601562 20 7.601562 C 20 9.183594 20 10.769531 20 12.398438 C 19.472656 12.398438 18.945312 12.398438 18.398438 12.398438 C 18.398438 10.816406 18.398438 9.230469 18.398438 7.601562 Z M 18.398438 7.601562 "/>
                  <path style="stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,12.941177%,80.392158%);fill-opacity:1;" d="M 0 7.601562 C 0.527344 7.601562 1.054688 7.601562 1.601562 7.601562 C 1.601562 9.183594 1.601562 10.769531 1.601562 12.398438 C 1.070312 12.398438 0.542969 12.398438 0 12.398438 C 0 10.816406 0 9.230469 0 7.601562 Z M 0 7.601562 "/>
                  <path style="stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,13.333334%,80.392158%);fill-opacity:1;" d="M 8.800781 0 C 9.59375 0 10.382812 0 11.199219 0 C 11.25 2.300781 11.25 2.300781 10.800781 3.199219 C 10.273438 3.199219 9.742188 3.199219 9.199219 3.199219 C 8.660156 2.117188 8.773438 1.195312 8.800781 0 Z M 8.800781 0 "/>
                </g>
              </svg> */}

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                <path d="M0 0 C12.54 0 25.08 0 38 0 C38 10.23 38 20.46 38 31 C35.69 31.66 33.38 32.32 31 33 C28.61998931 34.65373979 28.61998931 34.65373979 26.6875 36.625 C23.18163265 40 23.18163265 40 21 40 C21 37.03 21 34.06 21 31 C14.07 31 7.14 31 0 31 C0 20.77 0 10.54 0 0 Z M10 10 C10 11.32 10 12.64 10 14 C11.32 14 12.64 14 14 14 C14 12.68 14 11.36 14 10 C12.68 10 11.36 10 10 10 Z M24 10 C24 11.32 24 12.64 24 14 C25.32 14 26.64 14 28 14 C28 12.68 28 11.36 28 10 C26.68 10 25.36 10 24 10 Z M15 19 C15.99 20.485 15.99 20.485 17 22 C19.47266765 21.65555119 19.47266765 21.65555119 22 21 C22.33 20.34 22.66 19.68 23 19 C20.36 19 17.72 19 15 19 Z " fill={botInfo.color} transform="translate(6,10)"/>
                <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill={botInfo.color} transform="translate(46,19)"/>
                <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill={botInfo.color} transform="translate(0,19)"/>
                <path d="M0 0 C1.98 0 3.96 0 6 0 C6.125 5.75 6.125 5.75 5 8 C3.68 8 2.36 8 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill={botInfo.color} transform="translate(22,0)"/>
              </svg>

            </span>
            <h1 className='font-bold text-[20px] text-white'>{botInfo && botInfo.botName}</h1>
          </div>
        </header>
        <TextChat data={data} botInfo={botInfo} />
      </main>
    );
}
