'use client';

import Marquee from "react-fast-marquee";
import { AppRegistrationRounded, ContentPaste, Instagram, KeyboardDoubleArrowDown, LinkedIn, NextPlanOutlined, NextPlanSharp, PartyMode, Plan, X } from '@mui/icons-material';
import { BrainCircuitIcon, CheckCircleIcon, CircleCheckBigIcon, CircleXIcon, ClipboardCheckIcon, Code2Icon, Copy, CopyrightIcon, Database, LucidePartyPopper, LucideQuote, ShapesIcon, SquareMousePointerIcon } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

        {/* <div id="trust" className="flex flex-col justify-center items-center gap-15 w-full mt-0 md:mt-20 py-20 px-5 md:px-10">
            <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black'><span className="bg-purple-700 text-white px-2 rounded-md">Trusted</span> by <span className="font-bold text-purple-700">100+</span> Businesses. </h1>
            <div className="flex flex-col gap-10 items-center justify-center py-10 shadow-lg border-2 border-gray-100 w-full md:w-[70%] px-10 mt-[4rem]">
              <div className="flex flex-col md:flex-row gap-2 md:border-b-2 border-gray-200 pb-10 px-2 w-full">
                <div className="flex flex-col gap-10 items-center justify-center pb-10 md:pb-0 border-b-2 md:border-b-0 md:border-r-2 border-gray-200 w-full md:w-[50%]">
                  <LucideQuote className="text-purple-700" />
                  <div className="flex flex-col items-center justify-center gap-5">
                    <p className="font-semibold text-[18px] w-[90%] md:w-[70%] text-center">"This AI chatbot has completely transformed the way we interact with potential buyers! It instantly qualifies leads, answers property-related queries, and even schedules viewings. Our conversion rates have improved significantly!"</p>
                    <p className="text-center w-full"><span className="w-[50%] text-purple-700 font-semibold">David T.</span> <br/> <span className="w-[50%]">Real Estate Broker at HomeView</span></p>
                  </div>
                </div>

                <div className="flex flex-col gap-10 items-center justify-center  w-full md:w-[50%]">
                  <LucideQuote className="text-purple-700" />
                  <div className="flex flex-col items-center justify-center gap-5">
                    <p className="font-semibold text-[18px] w-[90%] md:w-[70%] text-center">"Our tutoring platform needed a smarter way to guide students and parents. This AI chatbot answers FAQs, recommends courses, and even connects students with tutors in real time!"</p>
                    <p className="text-center w-full"><span className="w-[50%] text-purple-700 font-semibold">Priya Kaur</span> <br/> <span className="w-[50%]">Co-founder of EduNext</span></p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-10 items-center justify-center border-r-2 border-gray-200 w-[50%]">
                  <LucideQuote className="text-purple-700" />
                  <div className="flex flex-col items-center justify-center gap-5">
                    <p className="font-semibold text-[18px] w-[90%] md:w-[70%] text-center">"Our support team used to be overwhelmed with repetitive queries. This chatbot now handles 80% of common customer questions, allowing our agents to focus on more complex issues!"</p>
                    <p className="text-center w-full"><span className="w-[50%] text-purple-700 font-semibold">Lisa McMahon</span><br/><span className="w-[50%]">Customer Service Manager at HelpDeskPro</span></p>
                  </div>
                </div>

                <div className="flex flex-col gap-10 items-center justify-center  w-[50%]">
                  <LucideQuote className="text-purple-700" />
                  <div className="flex flex-col items-center justify-center gap-5">
                    <p className="font-semibold text-[18px] w-[90%] md:w-[70%] text-center">"The chatbot is like having a 24/7 virtual agent. It engages visitors, captures their details, and forwards qualified leads to our sales team. Best investment we've made for lead generation!"</p>
                    <p className="text-center w-full"><span className="w-[50%] text-purple-700 font-semibold">Mark Lawson</span> <br/> <span className="w-[50%]">Founder of Elite Homes</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* How it works */}

          <div id="how-it-works" className="flex flex-col justify-center items-center gap-16 w-full mt-0 md:mt-20 py-20 px-5 md:px-10">
            <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black'>How <span className="bg-purple-700 text-white px-2 rounded-md">Kulfi AI</span> Works</h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
              <div className="flex flex-col gap-2 w-[50%]">
                <h1 className='text-[20px] md:text-[26px] text-center md:text-left font-bold text-black'>Breaking down the procedure</h1>
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

              <video className="w-full md:w-[50%] border-4 border-purple-800 rounded-lg" autoPlay muted controls>
                <source src="kulfi-ai.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
            </div>
          </div>
          
          {/* Knowledge Base */}
          <div className='flex flex-col md:flex-col gap-10 items-center justify-center w-full md:h-[88vh] py-[2rem] md:py-[5rem] mt-10 md:mt-[10rem] text-white bg-white rounded-[30px] px-[40px] md:px-[80px]'>
            <div className='flex flex-col items-center justify-center text-gray-800 min-w-[5rem]'>
            <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black'>AI Chatbot that runs on <span className="bg-purple-700 text-white px-2 rounded-md">your own data.</span></h1>

              <p className='mt-4 md:mt-5 text-[14px] md:text-[16px] font-thin text-gray-500 text-center md:text-left'>You control what the AI understands.</p>
            </div>

            <div className='flex flex-col md:flex-row gap-10 md:gap-5 mt-0 md:mt-10'>
              <div className="flex flex-col gap-2 justify-center items-center md:items-start justify-start md:w-[35%]">
                <h1 className='text-purple-800 font-bold text-[24px] md:text-[1.8rem] leading-[2.5rem]'></h1>
                <p className='text-[16px] md:text-[26px] font-semibold text-gray-500 text-center md:text-left'>Built for Simplicity, Customization, and Scalable Interaction.</p>
                <div className='flex flex-col gap-5 md:gap-5 text-[18px] px-[10px] mt-8 md:px-0'>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />
                    Instantly Train Your Chatbot with Your Website.
                  </p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Upload Multiple PDFs for Smarter Responses.</p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Full Control Over Your Knowledge Base.</p>
                  <p className='flex gap-2 items-start md:items-center text-purple-800 text-[14px] md:text-[16px]'><CircleCheckBigIcon className='h-4' />Data Separated by Organization for Multi-Business Use.</p>
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
              <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black'>Make the Most out of <span className="bg-purple-700 text-white px-2 rounded-md">Kulfi AI.</span></h1>
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
            
                <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black mt-[5rem]'><span className="bg-purple-700 text-white px-2 rounded-md">Beyond Limits</span> – Endless Possibilities Await!</h1>

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



          {/* <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black mt-[5rem]'>Select a plan that suits <span className="bg-purple-700 text-white px-2 rounded-md">your requirements.</span> Pay just once! </h1> */}
                                  {/* <div className='flex justify-center'>
                                      <Tabs defaultValue="one-time" className="flex justify-center w-full mt-10">
                                          <div className='flex flex-col gap-5'>
                                              <div className='flex justify-center w-full'>
                                                  <TabsList>
                                                      <TabsTrigger value="one-time">One time payment</TabsTrigger>
                                                  </TabsList>  
                                              </div>
                                          
                                          
                                          <TabsContent value='one-time'>
                                              <div className='flex flex-col items-center md:flex-row gap-5 md:gap-2 w-full'>
                                                  <div className='flex flex-col gap-2 border-[2px] border-gray-100 shadow-lg p-5 rounded-md w-[80%] md:w-[25%]'>
                                                      <h3 className="text-[22px] font-bold text-gray-900 mb-2">Basic</h3>
                                                      <p>Get started with essential features.</p>
                                                      <p><span className='text-[28px] font-bold'>$29</span></p>
                                                      <a className='flex justify-center mt-5 bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold' href='#'>Log-in to Purchase</a>  
                                                      <button className='flex items-center text-purple-800 text-[14px] justify-center'>Compare plans <KeyboardDoubleArrowDown className='text-purple-800 h-4' /> </button>
          
                                                  </div>
                                                  <div className='flex flex-col gap-2 border-[2px] border-gray-100 shadow-lg p-5 rounded-md w-[80%] md:w-[25%]'>
                                                      <h3 className="text-[22px] font-bold text-gray-900 mb-2">Pro</h3>
                                                      <p>Unlock more power and flexibility.</p>
                                                      <p><span className='text-[28px] font-bold'>$79</span></p>
                                                      <a className='flex justify-center mt-5 bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold' href='#'>Log-in to Purchase</a>  
                                                      <button className='flex items-center text-purple-800 text-[14px] justify-center'>Compare plans <KeyboardDoubleArrowDown className='text-purple-800 h-4' /> </button>
          
                                                  </div>
                                                  <div className='flex flex-col gap-2 border-[2px] border-purple-800 shadow-lg p-5 rounded-md w-[80%] md:w-[25%]'>
                                                      <h3 className="flex items-center gap-2 text-[22px] font-bold text-gray-900 mb-2">Growth <span className='px-2 py-1 bg-purple-800 text-white rounded-md shadow-lg text-[10px]'>Recommended</span></h3>
                                                      <p>Scale your business with advanced tools.</p>
                                                      <p><span className='text-[28px] font-bold'>$99</span></p>
                                                      <a className='flex justify-center mt-5 bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold' href='#'>Log-in to Purchase</a>  
                                                      <button className='flex items-center text-purple-800 text-[14px] justify-center'>Compare plans <KeyboardDoubleArrowDown className='text-purple-800 h-4' /> </button>
          
                                                  </div>
                                                  <div className='flex flex-col gap-2 border-[2px] border-gray-100 shadow-lg p-5 rounded-md w-[80%] md:w-[25%]'>
                                                      <h3 className="text-[22px] font-bold text-gray-900 mb-2">Advanced</h3>
                                                      <p>Scale your business with advanced tools.</p>
                                                      <p><span className='text-[28px] font-bold'>$249</span></p>
                                                      <a className='flex justify-center mt-5 bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold' href='#'>Log-in to Purchase</a>  
                                                      <button className='flex items-center text-purple-800 text-[14px] justify-center'>Compare plans <KeyboardDoubleArrowDown className='text-purple-800 h-4' /> </button>
                                                  </div>
                                              </div>
                                          </TabsContent>
                                          </div>
                                      </Tabs>
                                  </div> */}
                                  {/* <div className='flex flex-col items-center justify-center gap-10 w-full mt-[6rem] px-[5px] md:px-[3rem]'>
                                      <h3 className="text-[24px] font-bold text-gray-900 mb-2 text-center">Plan comparison</h3>
          
                                      <Table className='border-2 border-purple-200 w-full'>
                                          <TableHeader className='bg-purple-200'>
                                              <TableRow>
                                                  <TableHead className=''></TableHead>
                                                  <TableHead className=''>Basic</TableHead>
                                                  <TableHead className=''>Pro</TableHead>
                                                  <TableHead className=''>Growth</TableHead>
                                                  <TableHead className=''>Advanced</TableHead>
                                              </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Chats</TableCell>
                                                  <TableCell className=''>500</TableCell>
                                                  <TableCell className=''>1000</TableCell>
                                                  <TableCell className=''>2500</TableCell>
                                                  <TableCell className=''>5000</TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Chat logs</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Lead capturing</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''>Send as Email, Lead Form Builder</TableCell>
                                                  <TableCell className=''>Send as Email, Lead Form Builder</TableCell>
                                                  <TableCell className=''>Send as Email, Webhooks, Hubspot integration, Lead Form Builder</TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Customized responses</TableCell>
                                                  <TableCell className=''>3 responses</TableCell>
                                                  <TableCell className=''>5 responses</TableCell>
                                                  <TableCell className=''>10 responses</TableCell>
                                                  <TableCell className=''>Unlimited</TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Show images</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
                                              
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Show sources</TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Analytics</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''>Basic</TableCell>
                                                  <TableCell className=''>Advanced</TableCell>
                                                  <TableCell className=''>Advanced</TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Remove Kulfi AI branding</TableCell>
                                                  <TableCell className=''>As add-on</TableCell>
                                                  <TableCell className=''>As add-on</TableCell>
                                                  <TableCell className=''>As add-on</TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Chatbot Customisation & Branding</TableCell>
                                                  <TableCell className=''>Basic</TableCell>
                                                  <TableCell className=''>Intermediate</TableCell>
                                                  <TableCell className=''>Advanced</TableCell>
                                                  <TableCell className=''>Advanced</TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>No. of Webpages that can be synced</TableCell>
                                                  <TableCell className=''>10 Webpages</TableCell>
                                                  <TableCell className=''>30 Webpages</TableCell>
                                                  <TableCell className=''>100 Webpages</TableCell>
                                                  <TableCell className=''>500 Webpages</TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Documents upload limit</TableCell>
                                                  <TableCell className=''>1 Doc, Maximum 25 MB</TableCell>
                                                  <TableCell className=''>2 Doc, Maximum 50 MB</TableCell>
                                                  <TableCell className=''>5 Doc, Maximum 100 MB</TableCell>
                                                  <TableCell className=''>10 Doc, Maximum 250 MB</TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Articles & FAQs</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
          
                                              <TableRow>
                                                  <TableCell className='font-bold text-left pl-2'>Training session</TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CircleXIcon className='text-red-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                                  <TableCell className=''><CheckCircleIcon className='text-emerald-500' /></TableCell>
                                              </TableRow>
          
                                              
                                          </TableBody>
                                      </Table>
                                      </div> */}
          {/* How it works */}
          {/* <div className='flex flex-col gap-5 items-center justify-between w-full md:h-[88vh] py-[2rem] md:pt-[5rem] md:pb-[1rem] mt-10 md:mt-0 rounded-[30px] px-[20px] md:px-[80px]'>
            <div className='flex flex-col items-center gap-3'>
              <h1 className='text-[24px] md:text-[46px] text-center font-bold text-black mt-[5rem]'>How It Works: A Seamless <span className="bg-purple-700 text-white px-2 rounded-md">AI Experience.</span></h1>
            </div>

            
          </div> */}

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
          <footer className='flex flex-col gap-5 bottom-0 text-gray-500 py-[20px] w-full'>
            <div className="flex justify-center gap-2">
              <a target="_blank" href="https://www.instagram.com/kulfi.ai/">
                <Instagram className="text-gray-500" />
              </a>
              <a target="_blank" href="https://www.linkedin.com/company/kulfi-ai">
                <LinkedIn className="text-gray-500" />
              </a>
              <a target="_blank" href="https://x.com/KulfiAi">
                <X className="text-gray-500" />
              </a>
            </div>
            <div className="flex justify-center text-xs">
              Copyright <CopyrightIcon className="h-4" /> 2025 Kulfi AI.
            </div>
          </footer> : <></>
        </>
  );
}
