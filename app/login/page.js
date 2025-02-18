'use client';

import { BuildCircleOutlined, Google } from '@mui/icons-material';
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Login() {

    const loginHandler = () => {
        console.log('Nothing to see here');
    }

    return (
        <div className='flex items-center justify-center bg-purple-800 w-full rounded-[30px] py-[5rem]'>
            <div className='flex flex-col gap-10 items-center w-[50%] py-10'>
                <h1 className='text-[42px] font-bold'>Enter your credentials.</h1>
                <form onSubmit={loginHandler} className='flex flex-col gap-5 bg-orange-100 rounded-lg px-[2rem] pt-[3rem] pb-[1.5rem] w-[70%]'>
                    <div className='flex flex-col gap-2 text-gray-600'>
                        <label type='email' className='text-[20px] font-semibold'>Email</label>
                        <input placeholder='Ex: johndoe@domain.com' className='px-5 py-5 outline-none border-[1px] border-gray-200 rounded-lg'></input>
                    </div>
                    <div className='flex flex-col gap-2 text-gray-600'>
                        <label className='text-[20px] font-semibold'>Password</label>
                        <input type='password' placeholder="Password" className='px-5 py-5 outline-none border-[1px] border-gray-200 rounded-lg'></input>
                    </div>
                    <div className='flex justify-center pt-[1rem]'>
                        <button type='submit' className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Login</button>
                    </div>
                </form>
            </div>
            {/* <div className='flex flex-col gap-10 items-center text-center w-[50%]'>
                <button className='flex gap-2 bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><Google />Sign in with Google</button>
            </div> */}
        </div>
    );
}
