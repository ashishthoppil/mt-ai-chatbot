import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from 'ai/react';

export const TextChat = () => {

    const messageEnd = useRef();
    const inputRef = useRef();

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
        {
            id: 'assistant-1',
            role: 'assistant',
            content: "Hello! I'm Lumi AI Assistant. How can I help you today?",
        },
        ],
    });

    useEffect(() => {
        if (messages.length > 1) {
          messageEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
        <div className='max-w-screen-md mx-auto w-full flex flex-col gap-4 px-4 pb-4 pt-20 md:px-4 md:pb-4 md;pt-20 lg:px-4 xl:px-4 2xl:px-4'>
            <div className='w-[80%] bg-purple-100 text-purple-600 text-[10px] text-center rounded-lg mx-auto mt-[10px] p-[15px]'>
                This is Lumi.ai, a prototype AI that mimics the functionality of ChatGPT. This assistant only deals with text responses at the moment.
            </div>
            <div className='h-[55%]' style={{ overflowY: 'auto' }}>
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
                <span className='text-purple-800'>Thinking</span>
                </div>
                )}
                <div ref={messageEnd} />
            </div>
        </div>
        <form className='fixed bottom-0 flex max-w-screen-md mx-auto w-full flex-col items-center space-y-4 p-3 pb-3 sm:px-0' 
            onSubmit={(event) => {
                if (!isLoading) {
                    handleSubmit(event);
                    inputRef.current.blur();
                }
            }}>
            <div className='text-purple-700 border-1 border-purple-700 bg-purple-100 rounded-lg h-[100px] py-[10px] px-[10px] w-[100%]'>
                <textarea
                ref={inputRef}
                className='w-full outline-none bg-purple-100 placeholder-purple-700 resize-none'
                value={input}
                onChange={handleInputChange}
                onKeyDown={(event) => { if (event.key === 'Enter') { handleSubmit(event); 
                    inputRef.current.blur();} }}
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
            </>
    )
}