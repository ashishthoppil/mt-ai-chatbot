import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from 'ai/react';
import { ArrowRight, Message, QuestionAnswer } from '@mui/icons-material';
import { Newspaper } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import tinycolor from 'tinycolor2';

export const TextChat = ({ data, botInfo }) => {

    const [section, setSection] = useState(0);
    const messageEnd = useRef();
    const inputRef = useRef();
 
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'initial',
                role: 'assistant',
                content: `Hello! I'm ${botInfo && botInfo.botName}. How can I help you today?`,
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
            {section === 0 && <>
                <div className='message-container max-w-screen-md mx-auto w-full flex flex-col gap-4 px-4 pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto'>
                    <div>
                        {messages.map((msg, idx) => (
                        <div className={`${msg.role === 'user' ? 'flex justify-end ' : 'flex'}`} key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            <>{msg.role === 'user' ? 
                            <div className='text-xs w-auto my-[10px] py-[10px] px-[20px] rounded-lg' style={{ backgroundColor: botInfo.mColor, color: 'white' }}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>:
                            <div style={{ backgroundColor: botInfo.lColor, color: botInfo.color }} className={`flex text-slate-900 rounded-lg gap-[15px] py-[10px] px-[20px]`}>
                                <span className='bg-white rounded-full py-[5px] px-[12px] h-[32px]'>{botInfo.botName[0]}</span>
                                <ReactMarkdown className={`flex flex-col justify-center w-auto text-xs`}>{msg.content}</ReactMarkdown>
                            </div>}</>
                        </div>
                        ))}
                        {isLoading && (
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="256px" height="64px" viewBox="0 0 512 128" xmlSpace="preserve">
                                    <circle fill={botInfo.color} cx="0" cy="0" r="11" transform="translate(16 16)">
                                        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="1050ms" repeatCount="indefinite"></animateTransform>
                                    </circle>
                                    <circle fill={botInfo.color} cx="0" cy="0" r="11" transform="translate(64 16)">
                                        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="1050ms" repeatCount="indefinite"></animateTransform>
                                    </circle>
                                    <circle fill={botInfo.color} cx="0" cy="0" r="11" transform="translate(112 16)">
                                        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="1050ms" repeatCount="indefinite"></animateTransform>
                                    </circle>
                                </svg>
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
                    <div style={{ backgroundColor: botInfo.lColor, color: botInfo.color }} className='rounded-lg h-[100px] py-[10px] px-[10px] w-[100%]'>
                        <textarea
                            ref={inputRef}
                            style={{ backgroundColor: botInfo.lColor, color: botInfo.color }}
                            className={`w-full outline-none resize-none text-[14px] ${tinycolor(botInfo.lColor).getLuminance() < 0.3 ? 'placeholder-gray-500' : 'placeholder-gray-500'}`}
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
                            <button type='submit' style={{ backgroundColor: botInfo.color }} className={`rounded-full py-[8px] pl-[10px] pr-[6px] relative bottom-4 ${input === '' ? 'opacity-0' : 'opacity-1'} duration-500`}>
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
            </>}
            {section === 1 && 
                <div className='max-w-screen-md mx-auto w-full flex flex-col gap-4 px-4 pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <Newspaper /><h1 className='font-bold text-[32px]'>Articles</h1>
                    </div>
                    <div className='flex flex-col gap-2 border-[2px] border-gray-300 rounded-lg shadow-md p-2'>
                        <img className='h-[10rem] rounded-lg object-cover' src='https://its.ucsc.edu/news/images/iot-image.png' />
                        <h1 className='text-[24px] font-semibold'>Lorem ipsum dolor sit?</h1>
                        <p className='line-clamp-3'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                            eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                            eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                        </p>
                        <div className='flex justify-end'>
                            <a href='#'>Read more <ArrowRight /></a>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 border-[2px] border-gray-300 rounded-lg shadow-md p-2'>
                        <img className='h-[10rem] rounded-lg object-cover' src='https://its.ucsc.edu/news/images/iot-image.png' />
                        <h1 className='text-[24px] font-semibold'>Lorem ipsum dolor sit?</h1>
                        <p className='line-clamp-3'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                            eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                            eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                        </p>
                        <div className='flex justify-end'>
                            <a href='#'>Read more <ArrowRight /></a>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 border-[2px] border-gray-300 rounded-lg shadow-md p-2'>
                        <img className='h-[10rem] rounded-lg object-cover' src='https://its.ucsc.edu/news/images/iot-image.png' />
                        <h1 className='text-[24px] font-semibold'>Lorem ipsum dolor sit?</h1>
                        <p className='line-clamp-3'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                            eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                            eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                        </p>
                        <div className='flex justify-end'>
                            <a href='#'>Read more <ArrowRight /></a>
                        </div>
                    </div>
                </div>
            }

            {section === 2 && 
                <div className='max-w-screen-md mx-auto w-full flex flex-col gap-4 px-4 pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <QuestionAnswer /><h1 className='font-bold text-[32px]'>FAQs</h1>
                    </div>
                    <Accordion type="single" collapsible className="w-full border-[2px] border-gray-300 p-3 rounded-md">
                        <AccordionItem key={1} value={`item-${1}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`How can I start using the chatbot?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key={2} value={`item-${2}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`Is the chatbot available 24/7?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key={3} value={`item-${3}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`Can the chatbot handle complex queries or only simple questions?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key={4} value={`item-${4}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`What if the chatbot doesn’t understand my question?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        
                    <AccordionItem key={5} value={`item-${5}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`Are my conversations with the chatbot private?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key={6} value={`item-${6}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`Can the chatbot learn over time?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key={7} value={`item-${7}`}>
                            <AccordionTrigger className='text-[16px] text-gray-600'>{`Does the chatbot cost money to use?`}</AccordionTrigger>
                            <AccordionContent className='border-b-[2px] border-gray-300'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-[90%]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa turpis, 
                                        eleifend a pharetra et, fermentum eu urna. Suspendisse porttitor facilisis nunc
                                        eu luctus. Maecenas sollicitudin condimentum massa, ut faucibus purus sodales et.
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            }
            <div className='flex fixed bottom-0 bg-white shadow-lg w-full border-t-2 border-gray-300 rounded-md'>
                <div style={{ color: section === 0 ? botInfo.color : '' }} onClick={() => setSection(0)} className={`flex flex-col items-center gap-2 p-5 w-1/3 ${section === 0 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <Message />
                    <span>Message</span>
                </div>
                <div style={{ color: section === 1 ? botInfo.color : '' }} onClick={() => setSection(1)} className={`flex flex-col items-center gap-2 p-5 border-l-2 border-r-2 border-gray-300 w-1/3 ${section === 1 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <Newspaper />
                    <span>Articles</span>
                </div>
                <div style={{ color: section === 2 ? botInfo.color : '' }} onClick={() => setSection(2)} className={`flex flex-col items-center gap-2 p-5 w-1/3 ${section === 2 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <QuestionAnswer />
                    <span>FAQs</span>
                </div>
            </div>
            </>
    )
}