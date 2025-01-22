'use client';

import { ArrowBackIosNew, BuildCircleOutlined } from '@mui/icons-material';
import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Pricing() {
    return (
        <div className='flex flex-col gap-10 items-center justify-center bg-purple-800 w-full rounded-[30px] py-[5rem]'>
            <h1 className='text-[26px]'>Select a plan that's right for you</h1>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-10 items-center bg-orange-100 text-gray-600 rounded rounded-lg py-[1.5rem] px-[4rem] hover:border-4 hover:border-purple-400 duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <h1 className='font-bold text-[32px]'>Basic Plan</h1>
                    <div className='flex flex-col items-center gap-2 border-b-[2px] border-gray-500 pb-10 w-full'>
                        <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>399</h1>
                        <h6>per month</h6>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='font-semibold text-[26px]'>Features</h1>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' /> 5000 messages/month</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Text responses</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Website scraping</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Email support</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Integration support</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Bot customization</li>
                        </ul>
                    </div>
                </div>


                <div onClick={() => alert('clicked')} className='flex flex-col gap-10 items-center bg-orange-100 text-gray-600 rounded rounded-lg py-[1.5rem] px-[4rem] hover:border-4 hover:border-purple-400 duration-300 hover:scale-[1.01] hover:cursor-pointer'>
                    <h1 className='font-bold text-[32px]'>Pro Plan</h1>
                    <div className='flex flex-col items-center gap-2 border-b-[2px] border-gray-500 pb-10 w-full'>
                        <h1 className='font-bold text-[38px] text-purple-800'><sup>$</sup>499</h1>
                        <h6>per month</h6>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='font-semibold text-[26px]'>Features</h1>
                        <ul className='flex flex-col gap-1 mt-2'>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' /> 20000 messages/month</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Text + Visual responses</li>
                            <li className='flex gap-2 items-center w-[250px] truncate text-ellipsis overflow-hidden'><BuildCircleOutlined className='text-purple-700' />Website scraping</li>
                            <li className='flex gap-2 items-start w-[200px]'><BuildCircleOutlined className='text-purple-700' />Custom Document Knowledge Base</li>

                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Priority support</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Integration support</li>
                            <li className='flex gap-2 items-center'><BuildCircleOutlined className='text-purple-700' />Bot customization</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <h1 className='text-[4rem] font-bold text-center'>In just 10 minutes,<br/>for 1/2 the price.</h1>
            <h1 className='text-[16px]'>Enhance customer engagement with our intelligent AI chatbot.</h1>
            <button href="/" className='bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>See how it works</span></button> */}
        </div>
    );
}
