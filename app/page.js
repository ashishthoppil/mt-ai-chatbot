'use client';

import { AppRegistrationRounded, ContentPaste, NextPlanOutlined, NextPlanSharp, PartyMode, Plan } from '@mui/icons-material';
import { CircleCheckBigIcon, Copy, CopyrightIcon, Database, LucidePartyPopper, ShapesIcon, SquareMousePointerIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function Home() {

  const workRef = useRef();

  const scrollToHowItWorks = () => {
    workRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
        <>
        <div className='px-2 md:px-10'>
          <div className='flex flex-col gap-20 items-center justify-center w-full md:h-[88vh] py-[3rem] text-white px-[10px] md:px-[25px] bg-purple-800 rounded-[30px]'>
              <div className='flex flex-col gap-8 md:gap-1 px-1 py-5 items-center justify-center text-gray-800'>
                <h1 className='text-[22px] md:text-[36px] text-center font-semibold text-white'>Transform Interactions with a <span className='text-purple-400 font-bold'>Customized AI Chatbot.</span></h1>
                <h1 className='text-[32px] md:text-[5rem] font-black text-center md:leading-[1.3] text-gray-200'>In just <span className='text-purple-400'>10</span> minutes,<br/>for <span className='text-purple-400 font-bold'>1/2</span> the price.</h1>
                <h1 className='text-[18px] md:text-[22px] text-center text-white font-semibold mt-5'>Enhance customer engagement with our intelligent AI chatbot.</h1>
              </div>
              <div className='flex gap-2'>
                <button onClick={() => console.log()} className='flex gap-1 bg-purple-500 hover:bg-purple-700 border-2 border-purple-500 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 md:px-7 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><ShapesIcon /> <span>Book a free demo</span></button>
                <button onClick={() => console.log()} className='flex gap-1 bg-purple-400 hover:bg-purple-700 border-2 border-purple-400 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 md:px-7 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>
              </div>
            </div>
        </div>
          
          {/* Features */}
          <div className='flex flex-col-reverse md:flex-col gap-10 items-center justify-center w-full md:h-[88vh] py-[2rem] md:py-[5rem] mt-10 md:mt-20 text-white bg-white rounded-[30px] md:px-[75px]'>
            <div className='flex flex-col items-center justify-center text-gray-800 min-w-[5rem]'>
              <h1 className='text-[20px] md:text-[36px] text-center font-semibold'>Automate your business with our <span className='text-purple-700 font-bold'>AI agents.</span></h1>
              <p>How you can leverage Kulfi AI for your business</p>
            </div>
            {/* <div className="flex justify-center md:w-[50%]">
              <img className='w-[75%] h-auto object-cover' src='/images/features.jpg' />
            </div> */}
            {/* <div className="flex flex-col items-center md:items-start justify-start md:w-[50%]">
              <h1 className='text-purple-800 font-bold text-[24px] md:text-[3rem]'>Features</h1>
              <p className='text-[16px] md:text-[22px] text-gray-500 text-center md:text-left'>Built for Simplicity, Customization, and Scalable Interaction.</p>
              <div className='flex flex-col gap-5 md:gap-8 text-[18px] mt-10 px-[10px] md:px-0'>
                <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[18px]'><CircleCheckBigIcon />Integrates within 10 minutes.</p>
                <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[18px]'><CircleCheckBigIcon />Completely customizable chatbot.</p>
                <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[18px]'><CircleCheckBigIcon />Engage customers using Natural Language.</p>
                <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[18px]'><CircleCheckBigIcon />Feed your own data.</p>
              </div>
            </div> */}
          </div>
          {/* How it works */}
          <div className='flex flex-col gap-5 items-center justify-between w-full md:h-[88vh] py-[2rem] md:pt-[5rem] md:pb-[1rem] mt-10 md:mt-20 text-white rounded-[30px] px-[10px] md:px-[75px]'>
            <div className='flex flex-col items-center gap-3'>
              <h1 ref={workRef} className='text-purple-800 font-bold text-[24px] md:text-[3rem]'>How it works</h1>
              <p className='text-center text-[16px] md:text-[22px] text-gray-500'>A streamlined process in 6 simple steps.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><AppRegistrationRounded /> Register</h1>
                <p className='text-[16px] text-gray-600'>
                  Create an account with us by clicking on the 'Get Started' button.
                </p>
              </div>

              
              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><NextPlanSharp /> Plan</h1>
                <p className='text-[16px] text-gray-600'>
                  Select a plan that suits you business requirements.
                </p>
              </div>

              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><Database /> Data</h1>
                <p className='text-[16px] text-gray-600'>
                  Add the url's or documents that you want as the reference for your AI Chatbot and sync the data.
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><Copy /> Copy</h1>
                <p className='text-[16px] text-gray-600'>
                  After successfully syncing the data, copy the code snippet from your dashboard.
                </p>
              </div>

              
              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><ContentPaste /> Paste</h1>
                <p className='text-[16px] text-gray-600'>
                  Paste the code snippet inside the {'<head></head>'} tag of your website.
                </p>
              </div>

              <div className='flex flex-col gap-5 bg-white rounded-lg shadow-md py-[10px] px-[20px] md:w-1/3 border-[1px] border-purple-300'>
                <h1 className='flex gap-2 items-center text-purple-500 font-bold text-[24px] md:text-[2rem]'><LucidePartyPopper /> Done!</h1>
                <p className='text-[16px] text-gray-600'>
                  Your very own AI chatbot has been successfully integrated to your website.
                </p>
              </div>
            </div>
          </div>
          {/* Contact */}
          <div className='flex gap-10 items-center justify-center w-full md:h-[88vh] py-[2rem] md:py-[5rem] md:mt-20 text-white md:px-[75px]'>
            <div className='flex flex-col md:flex-row items-center gap-10 bg-purple-800 w-full rounded-lg shadow-md py-[80px] px-[20px] md:px-[100px]'>
              <div className='flex flex-col items-start justify-center gap-2 md:w-[75%] '>
                <h1 className='font-bold text-[24px] md:text-[3rem] text-center md:text-left'>Discover the effortless path to customer engagement</h1>
                <p className='text-[18px] text-center md:text-left'>Engage customers more effectively—at lightning speed.</p>
              </div>
              <div className='flex justify-center md:w-[25%]'>
                <Link href="/contact" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white text-white hover:text-purple-500  py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Book A Demo</Link>
              </div>
            </div>
          </div>
          <footer className={`bottom-0 flex gap-2 justify-center text-gray-500 py-[20px] w-full`}>Copyright <CopyrightIcon /> 2025 Kulfi AI.</footer> : <></>
        </>
  );
}
