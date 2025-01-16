'use client';

import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { TextChat } from './components/TextChat';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Home() {
  return (
    <main className={`flex flex-col items-center justify-between gap-4 flex-grow ${poppins.className}`}>
      <header className='fixed top-0 z-50 flex justify-between md:px-[25px] py-[10px] max-w-screen mx-auto w-full gap-2 items-center h-[75px] bg-purple-700 '>
        <div className='flex items-center gap-3 w-full max-w-screen-md mx-auto px-[25px]'>
          <span className='bg-gray-100 text-gray-500 rounded-full p-[5px]'>
            <Image
              src="/icons/chatbot.png"
              width={20}
              height={20}
              alt="Send Message"
            />
          </span>
          <h1>LUMI.ai</h1>
        </div>
      </header>
      <TextChat />
    </main>
  );
}
