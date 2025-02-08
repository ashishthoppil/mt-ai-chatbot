import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from 'ai/react';
import { Message, QuestionAnswer } from '@mui/icons-material';
import { Newspaper } from 'lucide-react';

export const TextChat = ({ data }) => {

    const messageEnd = useRef();
    const inputRef = useRef();
 
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'initial',
                role: 'assistant',
                content: `Hello! I'm ${data && data.botName}. How can I help you today?`,
            },
        ]
    });

    useEffect(() => {
        if (messages.length > 1) {
          messageEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
        <div className='message-container max-w-screen-md mx-auto w-full flex flex-col gap-4 px-4 pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto'>
            <div>
                {messages.map((msg, idx) => (
                <div className={msg.role === 'user' ? 'flex justify-end' : 'flex'} key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                    <>{msg.role === 'user' ? 
                    <ReactMarkdown className='bg-purple-100 text-purple-800 text-xs w-auto my-[10px] py-[10px] px-[20px] rounded-lg'>{msg.content}</ReactMarkdown> : 
                    <div className='flex bg-gray-200 text-slate-900 rounded-lg gap-[15px] py-[10px] px-[20px]'>
                        <span className='bg-white text-gray-500 rounded-full py-[5px] px-[12px] h-[32px]'>L</span>
                        <ReactMarkdown className='flex flex-col justify-center w-auto  text-xs'>{msg.content}</ReactMarkdown>
                    </div>}</>
                </div>
                ))}
                {isLoading && (
                <div className='flex gap-2'>
                <Image
                    src="/icons/loader.svg"
                    width={30}
                    height={30}
                    alt="Send Message"
                />
                </div>
                )}
                <div ref={messageEnd} />
            </div>
        </div>
        <form className='flex max-w-screen-md mx-auto w-full flex-col items-center space-y-4 p-3 pb-3 sm:px-0' 
            onSubmit={(event) => {
                if (!isLoading) {
                    handleSubmit(event);
                    inputRef.current.blur();
                }
            }}>
            <div className='text-purple-700 border-1 border-purple-700 bg-purple-100 rounded-lg h-[100px] py-[10px] px-[10px] w-[100%]'>
                <textarea
                    ref={inputRef}
                    className='w-full outline-none bg-purple-100 placeholder-purple-700 resize-none text-[14px]'
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(event) => { 
                        if (event.key === 'Enter') { 
                            handleSubmit(event); 
                            inputRef.current.blur();} 
                        }
                    }
                    placeholder="Ask me anything..."
                />
                <div className='flex justify-end'>  
                    <button type='submit' className={`bg-purple-500 rounded-full py-[8px] pl-[10px] pr-[6px] relative bottom-4 ${input === '' ? 'opacity-0' : 'opacity-1'} duration-500`}>
                        <Image
                            src="/icons/send.png"
                            width={20}
                            height={20}
                            alt="Send Message"
                        />
                    </button>
                </div>
            </div>
            </form>
            <div className='flex  fixed bottom-0 bg-white shadow-lg w-full border-t-2 border-gray-300 rounded-md'>
                <div className='flex flex-col items-center gap-2 p-5 w-1/3 bg-gray-100'>
                    <Message className='text-purple-800' />
                    <span>Message</span>
                </div>
                <div className='flex flex-col items-center gap-2 p-5 border-l-2 border-r-2 border-gray-300 w-1/3'>
                    <Newspaper />
                    <span>News</span>
                </div>
                <div className='flex flex-col items-center gap-2 p-5 w-1/3'>
                    <QuestionAnswer />
                    <span>FAQs</span>
                </div>
            </div>
            </>
    )
}