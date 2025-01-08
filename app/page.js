'use client';

import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from 'ai/react';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Home() {

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: 'assistant-1',
        role: 'assistant',
        content: "Hello! I'm Lumi AI Assistant. How can I help you today?",
      },
    ],
  });

  const messageEnd = useRef();
  const inputRef = useRef();
  
  useEffect(() => {
    if (messages.length > 1) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className={`h-screen ${poppins.className}`}>
      <header className='flex gap-5 items-center h-[5%] bg-purple-900 p-[25px] sticky top-0 '>
        <span className='bg-gray-100 text-gray-500 rounded-full py-[5px] px-[12px] h-[31px]'>L</span>
        <h1>Lumi.ai</h1>
      </header>
      <div className='w-[80%] bg-purple-100 text-purple-600 text-[10px] text-center rounded-lg mx-auto mt-[10px] p-[15px]'>
          This is Lumi.ai, a prototype AI that mimics the functionality of ChatGPT. This assistance only deals with text responses at the moment.
      </div>
      <div className='p-[25px] h-[55%] shadow-md' style={{ overflowY: 'auto' }}>
        
        {messages.map((msg, idx) => (
          <div className={msg.role === 'user' ? 'flex justify-end' : 'flex'} key={idx} style={{ marginBottom: '1rem' }}>
            <>{msg.role === 'user' ? 
              <ReactMarkdown className='bg-purple-100 text-purple-800 text-xs w-auto my-[10px] py-[10px] px-[20px] rounded-lg'>{msg.content}</ReactMarkdown> : 
              <div className='flex bg-gray-200 text-slate-900 rounded-lg gap-[15px] py-[10px] px-[20px]'>
                <span className='bg-white text-gray-500 rounded-full py-[5px] px-[12px] h-[32px]'>L</span>
                <ReactMarkdown className='flex flex-col justify-center w-auto  text-xs'>{msg.content}</ReactMarkdown>
              </div>}</>
          </div>
        ))}
        <div ref={messageEnd} />
      </div>

        <form className='sticky bottom-0 border-2' onSubmit={(event) => {
          handleSubmit(event);
          inputRef.current.blur();
        }}>

          <textarea
            ref={inputRef}
            className='py-[10px] px-[10px] w-full outline-none text-purple-700 placeholder-purple-700 border-2 border-purple-700 bg-purple-100 rounded-lg h-[150px]'
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          />
        </form>
    </main>
  );
}
