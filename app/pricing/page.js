'use client';

import { Star } from '@mui/icons-material';
import { CircleCheck, CopyrightIcon } from 'lucide-react';
import { Poppins } from 'next/font/google'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export const PricingSub = ({ selected }) => {

    console.log('client_id', process.env.PAYPAL_CLIENT_ID);
    console.log('test_plan', process.env.TEST_PLAN);
    const initialOptions = {
        clientId: process.env.PAYPAL_CLIENT_ID,
        intent: "subscription",
        vault: true,
    };

    const handleCreateSubscription = (data, actions) => {
        return actions.subscription.create({
          plan_id: process.env.TEST_PLAN,
        });
    };

    const handleApprove = (data, actions) => {
        // `data` will have subscription info such as subscriptionID
        console.log("Subscription data:", data);
        alert("Subscription completed!");
        
        // You can call your backend here to save subscription details in your DB.
    };

    const handleError = (err) => {
        console.error("PayPal subscription error:", err);
    };

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

                <div className='flex flex-col gap-0 hover:scale-[1.01] hover:cursor-pointer duration-300'>
                    <div className='flex w-full'>
                        <div className='flex gap-[2px] items-center py-[2px] pl-[15px] pr-[20px] bg-pink-600 rounded-t-lg'>
                            <Star className='text-white h-5' />
                            <span className='text-white text-[12px]'>Recommended</span>
                        </div>
                    </div>
                    <div className='flex items-center bg-orange-100 text-gray-600 rounded-b-lg rounded-r-lg py-[1.5rem] border-[5px] border-pink-600'>
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

                <div className='flex flex-col gap-0 hover:scale-[1.01] hover:cursor-pointer duration-300'>
                    <div className='flex w-full'>
                        <div className='flex gap-[2px] items-center py-[2px] pl-[15px] pr-[20px] bg-pink-600 rounded-t-lg'>
                            <Star className='text-white h-5' />
                            <span className='text-white text-[12px]'>Recommended</span>
                        </div>
                    </div>

                    <div className='flex flex-col items-center bg-orange-100 text-gray-600 rounded rounded-lg p-[1.5rem] rounded-b-lg border-[5px] border-pink-600'>
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

            <div id="paypal-button-container-P-7AU61757E9628943DM64DQOI">
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons createSubscription={handleCreateSubscription} onApprove={handleApprove} onError={handleError} />
                </PayPalScriptProvider>
            </div>

        </div>
    )
}

export default function Pricing() {
    return (
        <>
          <PricingSub selected={null} />
          <footer className={`bottom-0 flex gap-2 justify-center text-gray-500 py-[20px] w-full`}>Copyright <CopyrightIcon /> 2025 Kulfi AI.</footer> : <></>
        </>
    );
}
