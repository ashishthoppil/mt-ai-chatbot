'use client';

export default function Home() {
  return (
        <div className='flex flex-col gap-10 items-center justify-center bg-purple-800 w-full rounded-[30px] h-[88vh] text-white'>
          <h1 className='text-[26px]'>Transform Interactions with a Customized AI Chatbot</h1>
          <h1 className='text-[4rem] font-bold text-center'>In just 10 minutes,<br/>for 1/2 the price.</h1>
          <h1 className='text-[16px]'>Enhance customer engagement with our intelligent AI chatbot.</h1>
          <button href="/" className='bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-md hover:text-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'><span>See how it works</span></button>
        </div>
  );
}
