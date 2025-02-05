'use client';

import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { TextChat } from '../components/TextChat';
import { useEffect, useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Home() {

    const [data, setData] = useState();
  
    const loadData = async () => {
      const res = await fetch('/api/dashboard', {
              method: 'POST',
              body: JSON.stringify({
              id: localStorage.getItem('objectID')
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
      data && <main className={`flex flex-col items-center justify-between gap-4 flex-grow w-full ${poppins.className}`}>
        <header className={`fixed top-0 z-50 flex justify-between md:px-[25px] py-[10px] max-w-screen mx-auto w-full gap-2 items-center h-[75px] bg-purple-700`}>
          <div className='flex items-center gap-3 w-full max-w-screen-md mx-auto px-[25px]'>
            <span className='bg-gray-100 text-gray-500 rounded-full p-[5px]'>
              <Image
                src="/icons/chatbot-1.png"
                width={20}
                height={20}
                alt="Send Message"
              />
            </span>
            <h1 className='font-bold text-[20px] text-white'>{data && data.botName}</h1>
          </div>
        </header>
        <TextChat data={data} />
      </main>
    );
}
