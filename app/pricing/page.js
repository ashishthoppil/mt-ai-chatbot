'use client';

import { BuildCircleOutlined } from '@mui/icons-material';
import { CircleCheck } from 'lucide-react';
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Pricing() {
    return (
        <div className='flex flex-col gap-10 items-center justify-center bg-purple-800 w-full rounded-[30px] py-[5rem]'>
            <h1 className='text-[16px] md:text-[32px] font-normal text-white'>Select a plan that's right for you</h1>
            <div className='hidden md:flex flex-col gap-10'>
                <div className='flex items-center bg-orange-100 text-gray-600 rounded rounded-lg py-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col border-r-[1px] border-gray-400 px-[2rem] w-[25%]'>
                        <h1 className='font-bold text-[32px] text-center'>Basic</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>399</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center px-[2rem] w-full'>
                        <div className='flex justify-start gap-2 text-[12px]'>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />5,000 messages/month</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Website scraped data</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Email support</span>   
                            </div>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Integration support</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Bot customization</span>
                            </div>
                        </div>
                        <div className='flex w-full justify-end'>
                            <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                        </div>
                    </div>
                </div>

                <div className='flex items-center bg-orange-100 text-gray-600 rounded rounded-lg py-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col border-r-[1px] border-gray-400 px-[2rem] w-[25%]'>
                        <h1 className='font-bold text-[32px] text-center'>Pro</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>449</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center px-[2rem] w-full'>
                        <div className='flex justify-start gap-2 text-[12px]'>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Everything in Basic plan</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />20,000 messages/month</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Document upload</span>
                            </div>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Email/Call support</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Basic query reports</span>
                            </div>
                        </div>
                        <div className='flex w-full justify-end'>
                            <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                        </div>
                    </div>
                </div>

                <div className='flex items-center bg-orange-100 text-gray-600 rounded rounded-lg py-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col border-r-[1px] border-gray-400 px-[2rem] w-[25%]'>
                        <h1 className='font-bold text-[32px] text-center'>Core</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>749</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center px-[2rem] w-full'>
                        <div className='flex justify-start gap-2 text-[12px]'>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Everything in Pro plan</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Unlimited messages/month</span>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Priority support</span>
                            </div>
                            <div className='flex flex-col gap-1 mt-2'>
                                <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Articles + FAQ section</span>
                            </div>
                        </div>
                        <div className='flex w-full justify-end'>
                            <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden flex gap-10 flex-col'>
                <div className='flex flex-col items-center bg-orange-100 text-gray-600 rounded rounded-lg p-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col px-[2rem] pb-[1rem] border-b-[1px] border-gray-500'>
                        <h1 className='font-bold text-[32px] text-center'>Basic</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>399</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col py-[1rem] gap-2 text-[12px] items-start justify-center'>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />5,000 messages/month</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Website scraped data</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Email support</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Integration support</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Bot customization</span>
                    </div>
                    <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                </div>

                <div className='flex flex-col items-center bg-orange-100 text-gray-600 rounded rounded-lg p-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col px-[2rem] pb-[1rem] border-b-[1px] border-gray-500'>
                        <h1 className='font-bold text-[32px] text-center'>Pro</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>449</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col py-[1rem] gap-2 text-[12px] items-start justify-center'>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Everything in Basic plan</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />20,000 messages/month</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Website scraped data</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Document upload</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Email/Call support</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Basic query reports</span>
                    </div>
                    <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                </div>

                <div className='flex flex-col items-center bg-orange-100 text-gray-600 rounded rounded-lg p-[1.5rem] duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <div className='flex flex-col px-[2rem] pb-[1rem] border-b-[1px] border-gray-500'>
                        <h1 className='font-bold text-[32px] text-center'>Core</h1>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>749</h1>
                            <h6 className='text-center text-[14px]'>per month</h6>
                        </div>
                    </div>
                    <div className='flex flex-col py-[1rem] gap-2 text-[12px] items-start justify-center'>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Everything in Pro plan</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Unlimited messages/month</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Priority support</span>
                        <span className='flex gap-2 items-center'><CircleCheck className='text-purple-700' />Articles + FAQ section</span>
                    </div>
                    <button href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Choose</button>
                </div>
            </div>
        </div>
    );
}
