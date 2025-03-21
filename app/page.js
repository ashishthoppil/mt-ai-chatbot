'use client';

import Marquee from "react-fast-marquee";
import { AppRegistrationRounded, ContentPaste, NextPlanOutlined, NextPlanSharp, PartyMode, Plan } from '@mui/icons-material';
import { BrainCircuitIcon, CircleCheckBigIcon, ClipboardCheckIcon, Code2Icon, Copy, CopyrightIcon, Database, LucidePartyPopper, ShapesIcon, SquareMousePointerIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Header } from './components/layout/Header';
import { useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Home() {

  const router = useRouter()
  const workRef = useRef();

  return (
        <>
        <Header />
        <div className='px-2 md:px-10'>
          <div className='flex flex-col gap-20 items-center justify-center w-full md:h-[88vh] py-[3rem] text-white px-[10px] md:px-[25px] bg-purple-800 rounded-[30px]'>
              <div className='flex flex-col gap-10 md:gap-1 px-1 py-5 items-center justify-center text-gray-800'>
                <h1 className='text-[22px] md:text-[36px] text-center font-semibold text-white'>Transform Interactions with a <span className='text-purple-400 font-bold'>Customized AI Chatbot.</span></h1>
                <h1 className='text-[32px] md:text-[5rem] font-black text-center md:leading-[1.3] text-gray-200'>In just <span className='text-purple-400'>10</span> minutes,<br/>for <span className='text-purple-400 font-bold'>1/2</span> the price.</h1>
                {/* <h1 className='text-[18px] md:text-[22px] text-center text-white font-semibold mt-5'>Enhance customer engagement with our intelligent AI chatbot.</h1> */}
              </div>
              <div className='flex flex-col md:flex-row gap-5 md:gap-2 pb-5'>
                <button onClick={() => router.push('/contact')} className='flex justify-center gap-1 bg-purple-500 hover:bg-purple-700 border-2 border-purple-500 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 md:px-7 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><ShapesIcon /> <span>Book a free demo</span></button>
                <button onClick={() => router.push('/get-started')} className='flex justify-center gap-1 bg-purple-400 hover:bg-purple-700 border-2 border-purple-400 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 md:px-7 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>
              </div>
            </div>
        </div>
          
          {/* Knowledge Base */}
          <div className='flex flex-col md:flex-col gap-10 items-center justify-center w-full md:h-[88vh] py-[2rem] md:py-[5rem] mt-10 md:mt-[10rem] text-white bg-white rounded-[30px] px-[40px] md:px-[80px]'>
            <div className='flex flex-col items-center justify-center text-gray-800 min-w-[5rem]'>
              <h1 className='text-[30px] md:text-[42px] text-center font-bold leading-8'>AI Chatbots that run on <span className='text-purple-700 font-bold'>your own data.</span></h1>
              <p className='mt-4 md:mt-5 text-[14px] md:text-[16px] font-thin text-gray-500 text-center md:text-left'>You control what the AI understands.</p>
            </div>

            <div className='flex flex-col md:flex-row gap-10 md:gap-5 mt-0 md:mt-10'>
              <div className="flex flex-col gap-2 justify-center items-center md:items-start justify-start md:w-[35%]">
                <h1 className='text-purple-800 font-bold text-[24px] md:text-[1.8rem] leading-[2.5rem]'></h1>
                <p className='text-[16px] md:text-[26px] font-semibold text-gray-500 text-center md:text-left'>Built for Simplicity, Customization, and Scalable Interaction.</p>
                <div className='flex flex-col gap-5 md:gap-5 text-[18px] px-[10px] mt-8 md:px-0'>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Scrape website pages.</p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Upload multiple PDF documents.</p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Manage your own data.</p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Data segregated by organisation.</p>
                  <div className='flex justify-center my-5 md:justify-start'>
                    <button onClick={() => router.push('/get-started')} className='flex justify-center gap-1 bg-purple-400 hover:bg-purple-700 border-2 border-purple-400 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 md:px-7 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>                
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:w-[65%]">
                <img className='w-full h-auto object-contain shadow-lg border-1 border-gray-100 rounded-lg' src='/images/custom_knowledge.png' />
              </div>
            </div>
          </div>
          {/* Use cases */}
          <div id='use-cases' className='flex flex-col md:flex-col gap-10 items-center justify-center w-full  py-[2rem] md:py-[5rem] mt-5 md:mt-[5rem] text-white bg-white rounded-[30px] px-[20px] md:px-[80px]'>
            <div className='flex flex-col items-center justify-center text-gray-800 min-w-[5rem]'>
              <h1 className='text-[30px] md:text-[42px] text-center font-bold leading-8'>Make the Most out of <span className='text-purple-700 font-bold'>Kulfi AI.</span></h1>
              <p className='mt-4 md:mt-5 text-[14px] md:text-[16px] font-thin text-gray-500 text-center md:text-left'>Leverage Kulfi AI and automate your business</p>
            </div>

            <div className='flex flex-col gap-5 md:gap-5 mt-0 md:mt-16 md:px-[10rem]'>
              <div className='flex flex-col-reverse md:flex-row px-5 md:px-0 py-5 md:py-0 md:justify-center gap-10 bg-purple-100 rounded-[30px] shadow-lg'>
                <div className="flex justify-center items-center md:w-[35%]">
                  <img className='w-full h-[80%] object-contain' src='/images/customer-care.gif' />
                </div>
                <div className='flex flex-col gap-5 justify-center md:w-[40%]'>
                  <h1 className='text-[22px] md:text-[22px] text-center md:text-left font-bold leading-8 text-gray-700'>Streamline Customer Support with <span className='text-purple-700 font-bold'>Kulfi AI </span>Automation.</h1>
                  <div className='flex flex-col gap-5'>
                    <p className='flex gap-2 items-start text-purple-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Provide quick and accurate responses to customer inquiries 24/7.</span></p>
                    <p className='flex gap-2 items-start text-purple-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Understand user preferences and past interactions to deliver tailored support.</span></p>
                    <p className='flex gap-2 items-start text-purple-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Identify complex issues and transfer them to human agents when needed.</span></p>
                    <p className='flex gap-2 items-start text-purple-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Analyze conversations to improve customer experience and business decisions.</span></p>
                  </div>
                  <div className='flex flex-col md:flex-row gap-5 md:gap-2 pb-5'>
                    <button onClick={() => router.push('/contact')} className='flex justify-center gap-1 bg-purple-500 hover:bg-purple-700 border-2 border-purple-500 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><ShapesIcon /> <span>Book a Demo</span></button>
                    <button onClick={() => router.push('/get-started')} className='flex justify-center gap-1 bg-purple-400 hover:bg-purple-700 border-2 border-purple-400 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col md:flex-row md:justify-center gap-10 bg-indigo-100 px-5 md:px-0 py-5 md:py-0 rounded-[30px] shadow-lg mt-10'>
                <div className='flex flex-col gap-5 justify-center md:w-[40%]'>
                  <h1 className='text-[22px] md:text-[22px] text-center md:text-left font-bold leading-8 text-gray-700'>Enhance Learning Experiences with <span className='text-indigo-700 font-bold'>Kulfi AI </span>Automation.</h1>
                  <div className='flex flex-col gap-5'>
                    <p className='flex gap-2 items-start text-indigo-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Provide real-time answers to student queries related to lessons, assignments, and concepts.</span>                    </p>
                    <p className='flex gap-2 items-start text-indigo-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Assist students with explanations, summaries, and study tips anytime.</span></p>
                    <p className='flex gap-2 items-start text-indigo-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Recommend courses, topics, and study materials based on student progress and performance.</span></p>
                    <p className='flex gap-2 items-start text-indigo-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Track student interaction with the chatbot to improve learning strategies.</span></p>
                  </div>
                  
                  <div className='flex flex-col md:flex-row gap-5 md:gap-2 pb-5'>
                    <button onClick={() => router.push('/contact')} className='flex justify-center gap-1 bg-indigo-500 hover:bg-indigo-700 border-2 border-indigo-500 shadow-md hover:text-white text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><ShapesIcon /> <span>Book a Demo</span></button>
                    <button onClick={() => router.push('/get-started')} className='flex justify-center gap-1 bg-indigo-400 hover:bg-indigo-700 border-2 border-indigo-400 shadow-md hover:text-white text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>
                  </div>
                </div>
                <div className="flex justify-center items-center md:w-[35%]">
                  <img className='w-full h-[80%] object-contain' src='/images/edtech.gif' />
                </div>
              </div>

              <div className='flex flex-col-reverse md:flex-row md:justify-center gap-10 bg-emerald-50 px-5 md:px-0 py-5 md:py-0 rounded-[30px] shadow-lg mt-10'>
                <div className="flex justify-center items-center md:w-[35%]">
                  <img className='w-full h-[80%] object-contain' src='/images/realtor.gif' />
                </div>
                <div className='flex flex-col gap-5 justify-center md:w-[40%]'>
                  <h1 className='text-[22px] md:text-[22px] text-center md:text-left font-bold leading-8 text-gray-700'>Transform Real Estate Engagement with <span className='text-emerald-700 font-bold'>Kulfi AI </span>Chatbot.</h1>
                  <div className='flex flex-col gap-5'>
                    <p className='flex gap-2 items-start text-emerald-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Instantly respond to buyer and seller inquiries about property listings, pricing, and availability.</span></p>
                    <p className='flex gap-2 items-start text-emerald-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Assist clients with property comparisons, mortgage options, and neighborhood insights anytime.</span></p>
                    <p className='flex gap-2 items-start text-emerald-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Recommend properties based on user preferences, budget, and search history.</span></p>
                    <p className='flex gap-2 items-start text-emerald-800 text-[14px] md:text-[14px] w-full'><CircleCheckBigIcon className='h-4 w-[5%] mt-1' /><span className='w-[90%]'>Analyze user interactions to provide data-driven insights for better sales strategies.</span></p>
                  </div>
                  <div className='flex flex-col md:flex-row gap-5 md:gap-2 pb-5'>
                    <button onClick={() => router.push('/contact')} className='flex justify-center gap-1 bg-emerald-500 hover:bg-emerald-700 border-2 border-emerald-500 shadow-md hover:text-white text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><ShapesIcon /> <span>Book a Demo</span></button>
                    <button onClick={() => router.push('/get-started')} className='flex justify-center gap-1 bg-emerald-400 hover:bg-emerald-700 border-2 border-emerald-400 shadow-md hover:text-white text-white py-3 px-3 duration-200 hover:cursor-pointer rounded-sm font-semibold duration-100 text-[14px] md:text-[16px]'><SquareMousePointerIcon /> <span>Try Kulfi AI for free! </span></button>
                  </div>
                </div>
              </div>
            </div>
            
                <h1 className='mt-10 text-black text-[30px] md:text-[42px] text-center font-bold leading-8'><span className="text-purple-800">Kulfi AI</span>: Beyond Limits – Endless Possibilities Await!</h1>
                <Marquee className="mt-10">
                  <div className="flex gap-5 text-black text-[2rem] md:text-[3rem] font-bold opacity-25">
                    <h1>Customer Support |</h1>
                    <h1>Insurance |</h1>
                    <h1>Healthcare |</h1>
                    <h1>Software & Saas |</h1>
                    <h1>eCommerce |</h1>
                    <h1>EdTech |</h1>
                    <h1>Real Estate |</h1>
                  </div>
                </Marquee>
              
          </div>
          {/* How it works */}
          <div className='flex flex-col gap-5 items-center justify-between w-full md:h-[88vh] py-[2rem] md:pt-[5rem] md:pb-[1rem] mt-10 md:mt-0 rounded-[30px] px-[20px] md:px-[80px]'>
            <div className='flex flex-col items-center gap-3'>
              <h1 className='text-[30px] md:text-[42px] text-center font-bold leading-8'>How It Works: A Seamless <span className='text-purple-700 font-bold'>AI Experience.</span></h1>
              <p className='mt-4 md:mt-5 text-[14px] md:text-[16px] font-thin text-gray-500 text-center md:text-left'>A smooth process in just 6 simple steps.</p>
            </div>

            <Accordion type="single" collapsible className="w-full border-2 border-gray-200 p-2 px-5 rounded-sm shadow-md mt-5">
              <AccordionItem className='' key={1} value={1}>
                <AccordionTrigger className='text-[14px] font-semibold'><div className='flex items-center gap-2'><AppRegistrationRounded /> Register with Us.</div></AccordionTrigger>
                  <AccordionContent>
                    <div className='flex justify-between items-start'>
                      <div className='w-[full]'>Create an account with us. It's free and does not require a credit card!</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className='' key={2} value={2}>
                <AccordionTrigger className='text-[14px] font-semibold'><div className='flex items-start gap-2'><BrainCircuitIcon /> Train the AI by importing your own data.</div></AccordionTrigger>
                  <AccordionContent>
                    <div className='flex justify-between items-start'>
                      <div className='w-[full]'>Upload your files or add your website links and train the AI Chatbot yourself.</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className='' key={3} value={3}>
                <AccordionTrigger className='text-[14px] font-semibold'><div className='flex items-start gap-2'><ShapesIcon /> Customize the Chatbot to match the theme of your website.</div></AccordionTrigger>
                  <AccordionContent>
                    <div className='flex justify-between items-start'>
                      <div className='w-[full]'>Customize your chatbot from branding, colors and behaviours and much more.</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className='' key={4} value={4}>
                <AccordionTrigger className='text-[14px] font-semibold'><div className='flex items-start gap-2'><Code2Icon /> Embed the code on your website.</div></AccordionTrigger>
                  <AccordionContent>
                    <div className='flex justify-between items-start'>
                      <div className='w-[full]'>After customization and training the AI chatbot, copy the code snippet from the your dashboard and embed it into your website or web application.</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className='border-0' key={5} value={5}>
                <AccordionTrigger className='text-[14px] font-semibold'><div className='flex items-start gap-2'><ClipboardCheckIcon /> Start handling customers, monitoring insights and chats.</div></AccordionTrigger>
                  <AccordionContent>
                    <div className='flex justify-between items-start'>
                      <div className='w-[full]'>Let Kulfi do it's work and efficiently handle customers and website visitors. Gain insights and track conversations.</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>

          {/* Contact */}
          <div className='px-5'>
            <div className='flex gap-10 items-center justify-center w-full md:h-[88vh] py-[2rem] md:py-[5rem] md:mt-0 text-white md:px-[75px]'>
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
          </div>
          <footer className={`bottom-0 flex gap-2 justify-center text-gray-500 py-[20px] w-full`}>Copyright <CopyrightIcon /> 2025 Kulfi AI.</footer> : <></>
        </>
  );
}
