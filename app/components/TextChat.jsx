import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { useChat } from 'ai/react';
import { ArrowRight, Message, QuestionAnswer } from '@mui/icons-material';
import { Clock, ExternalLinkIcon, Loader2, Newspaper } from 'lucide-react';
import HubspotForm from 'react-hubspot-form';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import tinycolor from 'tinycolor2';
import { isMobile } from 'react-device-detect';

export const TextChat = ({ data, botInfo, articlesList, faqList }) => {

    const [section, setSection] = useState(0);
    const [sessionTracked, setSessionTracked] = useState(false);
    const [leadForm, setLeadForm] = useState([]);
    const messageEnd = useRef();
    const inputRef = useRef();
 
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: `/api/chat`,
        body: {
            id: botInfo.id,
            org: botInfo.organization
        },
        initialMessages: [
            {
                id: 'initial',
                role: 'assistant',
                content: botInfo.initialmsg ? botInfo.initialmsg : `Hello! I'm ${botInfo && botInfo.botName}. How can I help you today?`,
            },
        ],
        onResponse: async (response) => {
            const contentType = response.headers.get("content-type");
            if (contentType === 'application/json') {
                const data = await response.json();
                setLeadForm(data.fields);
            }
        }
    });

    useEffect(() => {
        if (messages.length > 1) {
          messageEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const getWidth = () => {
        if (articlesList.length > 0 && faqList.length > 0) {
            return 'w-1/3'
        } else if (articlesList.length > 0 || faqList.length > 0) {
            return 'w-1/2'
        }
        return ''
    }

    const eventTracker = async () => {
        await fetch(`/api/track-event?id=${botInfo.id}&organization=Acme&event=session&user=${botInfo.userId}`, {
            method: 'GET'
        });
    }

    const getLocation = async () => {
        const response = await fetch('https://ipwho.is/', {
            method: 'GET',
        });
        const locationInfo = await response.json();
        const track = fetch(`/api/track-event?id=${botInfo.id}&organization=${botInfo.organization}&event=location&country=${locationInfo.country}&device=${isMobile ? 'Mobile' : 'Desktop'}`, {
            method: 'GET'
        })
    }

    useEffect(() => {
        getLocation();
    }, [])

    return (
        <>
            {section === 0 && <>
                <div className={`message-container ${faqList.length === 0 && articlesList.length === 0 ? 'max-h-[64vh]' : 'h-[42vh]'} max-w-screen-md mx-auto w-full flex flex-col gap-4 px-0 pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto`}>
                    <div>
                        {messages.map((msg, idx) => (
                        <div className={`${msg.role === 'user' ? 'flex justify-end ' : 'flex'} px-[10px]`} key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            <>{msg.role === 'user' ? 
                            <div className='text-xs w-auto my-[10px] py-[10px] px-[20px] rounded-lg border-[1px] border-gray-100 shadow-md' style={{ backgroundColor: botInfo.mColor, color: 'white' }}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>:
                            <div style={{ backgroundColor: botInfo.lColor, color: botInfo.color }} className={`flex text-slate-900 rounded-lg gap-[15px] py-[10px] px-[20px] border-[1px] border-gray-100 shadow-md`}>
                                {botInfo.botAvatar ? <img className='h-[30px] max-w-[30px] rounded-lg object-cover p-1' src={`data:image/jpeg;base64,${botInfo.botAvatar}`} /> :
                                <span className='bg-white rounded-full py-[5px] px-[12px] h-[32px]'>{botInfo.botName[0]}</span>}
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} className={`flex flex-col justify-center w-auto text-xs`}>{msg.content}</ReactMarkdown>
                            </div>}</>
                        </div>
                        ))}
                        {
                            leadForm.length > 0 && botInfo.leadSave === 'hubspot' ? <div style={{ border: `1px solid ${botInfo.color}` }} className='w-full rounded-md shadow-md'>
                                <HubspotForm
                                    portalId={botInfo.hubspot.portal}
                                    formId={botInfo.hubspot.form}
                                    loading={<div className='flex gap-1 items-center w-full'><Loader2 className='h-4 text-gray-500 animate-spin' /> Loading</div>}
                                />
                            </div> : <></>
                        }
                        {leadForm.length > 0 && (botInfo.leadSave === 'email' || botInfo.leadSave === 'kulfi' || botInfo.leadSave === 'webhook') ?
                            <div className='flex gap-[15px] rounded-lg gap-[15px] py-[10px] px-[20px] border-[1px] border-gray-100 shadow-md w-[90%] md:w-[75%]' style={{ backgroundColor: botInfo.lColor }}>
                                {botInfo.botAvatar ? <img className='h-[30px] max-w-[30px] rounded-lg object-cover p-1 w-[25%]' src={`data:image/jpeg;base64,${botInfo.botAvatar}`} /> :
                                <span className='bg-white rounded-full py-[5px] px-[12px] h-[32px]'>{botInfo.botName[0]}</span>}
                                <div className='flex flex-col gap-5 w-[75%]'>
                                    <h1 style={{ color: botInfo.color }} className='text-xs'>Thank you for your interest. Please fill the form below so that our team can get back to you.</h1>
                                    <form style={{ border: `1px solid ${botInfo.color}` }} className='flex flex-col gap-3 rounded-md shadow-md px-5 py-3 w-full' onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = {};
                                        for (var i = 0; i < e.target.length - 1; i++) {
                                            formData[e.target[i].name] = e.target[i].value
                                        }

                                        if (botInfo.leadSave === 'email') {
                                            alert(`Sending to ${botInfo.leadEmail}`)
                                        } else if (botInfo.leadSave === 'webhook') {
                                            alert(`Sending to the webhook`)
                                        } else if (botInfo.leadSave === 'kulfi') {
                                            const track = fetch(`/api/track-event?id=${botInfo.id}&organization=${botInfo.organization}&event=lead&leadData=${JSON.stringify(formData)}`, {
                                                method: 'GET'
                                            });
                                        }
                                    }}>
                                        {leadForm.map((item) => {
                                            return (
                                                <div key={item.id} className='flex flex-col gap-1'>
                                                    <label style={{ color: botInfo.color }} className='font-semibold text-[12px]'>{item.label}</label>
                                                    {item.type === 'textarea' ? 
                                                        <textarea name={item.label} placeholder={item.placeholder} className='text-[12px] border-2 border-gray-200 rounded-md px-2 py-2 outline-none'  required={item.isRequired}></textarea> :
                                                        <input name={item.label} placeholder={item.placeholder} className='text-[12px] border-2 border-gray-200 rounded-md px-2 py-2 outline-none' type={item.type} required={item.isRequired} />
                                                    }
                                                </div>
                                            )
                                        })}
                                        <button className='px-2 py-1 rounded-md text-[14px]' style={{ backgroundColor: botInfo.color, color: 'white', border: `1px solid ${botInfo.color}` }}>Submit</button>
                                    </form> 
                                </div>
                            </div>: <></>}
                        {isLoading && (
                            <div className='flex gap-2 px-[20px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="100px" height="64px" viewBox="0 0 512 50" xmlSpace="preserve">
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
                <form className={`${articlesList.length === 0 && faqList.length === 0 ? 'fixed bottom-0' : ''} flex max-w-screen-md mx-auto w-full flex-col items-center space-y-4 p-3 pb-3 sm:px-0`}
                    onSubmit={(event) => {
                        if (!isLoading) {
                            handleSubmit(event);
                            setLeadForm([]);
                            inputRef.current.blur();
                            if (!sessionTracked) {
                                eventTracker();
                            }
                            setSessionTracked(true);
                        }
                    }}>
                    <div style={{ backgroundColor: botInfo.lColor, color: botInfo.color }} className='flex items-center rounded-lg py-[10px] px-[10px] w-[100%]'>
                        <textarea
                            ref={inputRef}
                            style={{ backgroundColor: botInfo.lColor, color: botInfo.color }}
                            className={`w-[90%] outline-none resize-none text-[14px] ${tinycolor(botInfo.lColor).getLuminance() < 0.3 ? 'placeholder-gray-500' : 'placeholder-gray-500'}`}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(event) => { 
                                    if (event.key === 'Enter') { 
                                        handleSubmit(event); 
                                        setLeadForm([]);
                                        inputRef.current.blur();        
                                        if (!sessionTracked) {
                                            eventTracker();
                                        }
                                        setSessionTracked(true);
                                    }
                                }
                            }
                            placeholder={botInfo.placeholder ? botInfo.placeholder : "Ask me anything..."}
                        />
                        <button type='submit' style={{ backgroundColor: botInfo.color }} className={`rounded-full py-[8px] pl-[10px] pr-[6px] ${input === '' ? 'opacity-0' : 'opacity-1'} duration-500 w-[10%]`}>
                                <Image
                                    src="/icons/send.png"
                                    width={20}
                                    height={20}
                                    alt="Send Message"
                                />
                            </button>
                        {/* <div className='flex justify-end'>  
                            <button type='submit' style={{ backgroundColor: botInfo.color }} className={`rounded-full py-[8px] pl-[10px] pr-[6px] relative bottom-4 ${input === '' ? 'opacity-0' : 'opacity-1'} duration-500`}>
                                <Image
                                    src="/icons/send.png"
                                    width={20}
                                    height={20}
                                    alt="Send Message"
                                />
                            </button>
                        </div> */}
                    </div>
                    {!botInfo.hideBranding ? <span className='text-[14px]' style={{ color: botInfo.color }}><span className='font-semibold'>Powered by</span> <span style={{ backgroundColor: botInfo.color }} className='text-white rounded-full py-1 px-2'>Kulfi AI</span></span> : <></>}
                </form>
            </>}
            {section === 1 && 
                <div className='max-w-screen-md mx-auto w-full flex flex-col gap-4 px-[25px] pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <Newspaper /><h1 className='font-bold text-[32px]'>Articles</h1>
                    </div>
                    {articlesList.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 border-[2px] border-gray-300 rounded-lg shadow-md p-2'>
                            {item.img ? <img className='h-[10rem] rounded-lg object-cover' src={`data:image/jpeg;base64,${item.img}`} /> : <></>}
                            <h1 className='text-[16px] font-bold' style={{ color: botInfo.color }}>{item.title}</h1>
                            <p className='line-clamp-3'>
                                {item.description}
                            </p>
                            <div className='flex justify-end'>
                                <a style={{ color: botInfo.mColor }} className='flex gap-1' target='_blank' href={item.link}>Read more <ExternalLinkIcon height={20} /></a>
                            </div>
                        </div>
                    ))}
                </div>
            }

            {section === 2 && 
                <div className='max-w-screen-md mx-auto w-full flex flex-col gap-4 px-[25px] pb-4 mt-20 pt-5 md:px-4 md:pb-4 md:mt-20 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <QuestionAnswer /><h1 className='font-bold text-[32px]'>FAQs</h1>
                    </div>
                    <Accordion type="single" collapsible className="w-full border-[2px] border-gray-300 p-3 rounded-md">
                        {faqList.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className='text-[16px] text-gray-600'>{item.question}</AccordionTrigger>
                                <AccordionContent className='border-b-[2px] border-gray-300'>
                                    <div className='flex justify-between items-start'>
                                        <div className='w-[90%]'>
                                        {item.answer}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </div>
            }
            {articlesList.length || faqList.length ? <div className='flex fixed bottom-0 bg-white shadow-lg w-full border-t-2 border-gray-300 rounded-md'>
                <div style={{ color: section === 0 ? botInfo.color : '' }} onClick={() => setSection(0)} className={`flex flex-col items-center gap-2 p-5 ${getWidth()} ${section === 0 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <Message />
                    <span>Message</span>
                </div>
                {articlesList.length > 0 ? <div style={{ color: section === 1 ? botInfo.color : '' }} onClick={() => setSection(1)} className={`flex flex-col items-center gap-2 p-5 border-l-2 border-r-2 border-gray-300 ${getWidth()} ${section === 1 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <Newspaper />
                    <span>Articles</span>
                </div> : <></>}
                {faqList.length > 0 ? <div style={{ color: section === 2 ? botInfo.color : '' }} onClick={() => setSection(2)} className={`flex flex-col items-center gap-2 p-5 ${getWidth()} ${section === 2 ? 'bg-gray-100 font-semibold' : ''}`}>
                    <QuestionAnswer />
                    <span>FAQs</span>
                </div> : <></>}
            </div> : <></>}
            </>
    )
}