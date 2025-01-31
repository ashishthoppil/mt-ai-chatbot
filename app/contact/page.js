'use client';

import { BuildCircleOutlined } from '@mui/icons-material';
import { Poppins } from 'next/font/google'
import { useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Contact() {

    const [contactState, setContactState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const contactHandler = async () => {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactState),
        });
        const data = await response.json();
        if (data.success) {
            setSubmitted(true);
        }
    }

    return (
        <div className='flex gap-10 items-center justify-center bg-purple-800 w-full rounded-[30px] py-[5rem]'>
            <div className='flex flex-col gap-10 items-center text-center w-[50%]'>
                <h1 className='text-[42px] font-bold'>Got a business requirement <br/>or perhaps a grievance?</h1>
                <h1 className='text-[42px] font-bold'>We'd love to hear from you!</h1>
            </div>
            <div className='flex justify-center w-[50%]'>
                <form onSubmit={contactHandler} className='flex flex-col gap-5 bg-orange-100 rounded-lg px-[2rem] pt-[3rem] pb-[1.5rem] w-[70%]'>
                    <div className='flex flex-col gap-2 text-gray-600'>
                        <label className='text-[20px] font-semibold'>Full Name</label>
                        <input onChange={(e) => setContactState((prev) => { return {...prev, name: e.target.value }})} placeholder='Ex: John Doe' className='px-5 py-5 outline-none border-[1px] border-gray-200 rounded-lg'></input>
                    </div>
                    <div className='flex flex-col gap-2 text-gray-600'>
                        <label className='text-[20px] font-semibold'>Email</label>
                        <input onChange={(e) => setContactState((prev) => { return {...prev, email: e.target.value }})} placeholder='Ex: johndoe@domain.com' className='px-5 py-5 outline-none border-[1px] border-gray-200 rounded-lg'></input>
                    </div>
                    <div className='flex flex-col gap-2 text-gray-600'>
                        <label className='text-[20px] font-semibold'>Message</label>
                        <textarea onChange={(e) => setContactState((prev) => { return {...prev, message: e.target.value }})} placeholder="What's on your mind?" className='px-5 py-5 outline-none border-[1px] border-gray-200 rounded-lg resize-none'></textarea>
                    </div>
                    <div className='flex justify-end pt-[1rem]'>
                        <button type='submit' className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Submit</button>
                    </div>
                    {submitted && <div className='border-2 border-emerald-600 text-emerald-600 text-center px-10 py-2'>
                        <h1>Your query has been submitted, we will get back to you shortly!</h1>
                    </div>}
                </form>
            </div>
        </div>
    );
}
