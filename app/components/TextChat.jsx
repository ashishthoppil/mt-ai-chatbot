import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { useChat } from 'ai/react';
import { ArrowRight, Message, PowerSettingsNew, QuestionAnswer } from '@mui/icons-material';
import { Check, CheckCircle, Clock, CloudLightning, ExternalLinkIcon, Loader2, Newspaper, Power, ZapIcon } from 'lucide-react';
import HubspotForm from 'react-hubspot-form';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import tinycolor from 'tinycolor2';
import { isMobile } from 'react-device-detect';
import { PLANS } from '@/lib/constants';

export const TextChat = ({ data, botInfo, articlesList, faqList, section }) => {

    const [sessionTracked, setSessionTracked] = useState(false);
    const [formIncoming, setFormIncoming] = useState([]);
    const [leadForm, setLeadForm] = useState([]);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const messageEnd = useRef();
    const inputRef = useRef();
 
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: `/api/chat`,
        body: {
            id: botInfo.id,
            org: botInfo.organization,
            userId: botInfo.userId,
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
        const lastMessage = messages[messages.length - 1].content;
        if (lastMessage[0] === '[') {
            setFormIncoming((prev) => {
                if (!prev.includes(messages.length - 1)) {
                    return [...prev, messages.length - 1]
                } else {
                    return prev
                }
            });
            if (lastMessage[lastMessage.length - 1] === ']') {
                setLeadForm(JSON.parse(lastMessage))
            }
        }
    }, [messages]);

    // const getWidth = () => {
    //     if (articlesList.length > 0 && faqList.length > 0) {
    //         return 'w-1/3'
    //     } else if (articlesList.length > 0 || faqList.length > 0) {
    //         return 'w-1/2'
    //     }
    //     return ''
    // }

    const eventTracker = async () => {
        await fetch(`/api/track-event?id=${botInfo.id}&organization=${botInfo.organization}&event=session&user=${botInfo.userId}`, {
            method: 'GET'
        });
    }

    const getLocation = async () => {
        const response = await fetch('https://ipwho.is/', {
            method: 'GET',
        });
        const locationInfo = await response.json();
        const track = fetch(`/api/track-event?id=${botInfo.id}&organization=${botInfo.organization}&event=location&flag=${locationInfo.flag.img}&country=${locationInfo.country}&device=${isMobile ? 'Mobile' : 'Desktop'}`, {
            method: 'GET'
        })
    }

    useEffect(() => {
        if (!botInfo.isSandBox && !PLANS.BASIC.includes(botInfo.subscriptionName)) {
            getLocation();
        }
    }, [])

    // useEffect(() => {
    //     if (leadForm.length > 0) {
    //         setLeadSubmitted(false);
    //     }
    // }, [leadForm])

    return (
        <>
            {section === 0 && <>
                <div className={`message-container ${true ? 'max-h-[64vh]' : 'h-[50vh]'} max-w-screen-md mx-auto w-full flex flex-col gap-4 px-0 pb-4 mt-0 pt-5 md:px-4 md:pb-4 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto`}>
                    <div>
                        {messages.map((msg, idx) => (
                        <div className={`${msg.role === 'user' ? 'flex justify-end ' : 'flex'} px-[10px]`} key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            <>{msg.role === 'user' ? 
                            <div className='text-xs w-auto my-[10px] py-[10px] px-[20px] rounded-lg border-[1px] border-gray-100 shadow-md' style={{ backgroundColor: botInfo.mColor, color: 'white' }}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>:
                            !formIncoming.includes(idx) ? <div style={{ backgroundColor: botInfo.lColor, color: botInfo.color }} className={`flex text-slate-900 rounded-lg gap-[15px] py-[10px] px-[10px] border-[1px] border-gray-100 shadow-md`}>
                                {botInfo.botAvatar ? <img className='h-[40px] max-w-[40px] rounded-full object-cover p-1' src={`data:image/jpeg;base64,${botInfo.botAvatar}`} /> :
                                <span className='bg-white rounded-full py-[5px] px-[12px] h-[32px]'>{botInfo.botName[0]}</span>}
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} className={`flex flex-col justify-center w-auto text-xs`}>{msg.content}</ReactMarkdown>
                            </div> : <>
                            {
                            leadForm && leadForm.length > 0 && botInfo.leadSave === 'hubspot' ? <div style={{ border: `1px solid ${botInfo.color}` }} className='w-full rounded-md shadow-md'>
                                <HubspotForm
                                    portalId={botInfo.hubspot.portal}
                                    formId={botInfo.hubspot.form}
                                    loading={<div className='flex gap-1 justify-center items-center w-full'><Loader2 className='h-4 text-gray-500 animate-spin' /> Loading</div>}
                                />
                            </div> : <></>
                        }
                        {leadForm && leadForm.length > 0 && !leadSubmitted && (botInfo.leadSave === 'email' || botInfo.leadSave === 'kulfi' || botInfo.leadSave === 'webhook') ?
                            <div className='flex gap-[15px] rounded-lg gap-[15px] py-[10px] px-[20px] border-[1px] border-gray-100 shadow-md w-[90%] md:w-[75%]' style={{ backgroundColor: botInfo.lColor }}>
                                {botInfo.botAvatar ? <img className='h-[30px] max-w-[30px] rounded-lg object-cover p-1 w-[25%]' src={`data:image/jpeg;base64,${botInfo.botAvatar}`} /> :
                                <span className='bg-white rounded-full py-[5px] px-[12px] h-[32px]'>{botInfo.botName[0]}</span>}
                                <div className='flex flex-col gap-5 w-[75%]'>
                                    <h1 style={{ color: botInfo.color }} className='text-xs'>Thank you for your interest. Please fill the form below so that our team can get back to you.</h1>
                                    <form style={{ border: `1px solid ${botInfo.color}` }} className='flex flex-col gap-3 rounded-md shadow-md px-5 py-3 w-full' onSubmit={async (e) => {
                                        setLeadSubmitted(true);
                                        e.preventDefault();
                                        let formData = {};
                                        for (var i = 0; i < e.target.length - 1; i++) {
                                            formData[e.target[i].name] = e.target[i].value
                                        }

                                        if (botInfo.leadSave === 'email') {
                                            const emailLead = await fetch(`/api/send-lead?email=${botInfo.leadEmail}`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(formData)
                                            })
                                            const data = await emailLead.json();
                                        } else if (botInfo.leadSave === 'webhook') {
                                            const webhookLead = await fetch(`/api/send-webhook`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({ webhook: botInfo.leadWebhook, ...formData })
                                            })
                                            const data = await webhookLead.json();
                                            alert(`Sending to the webhook`)
                                        }
                                    }}>
                                        {leadForm && leadForm.map((item) => {
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
                            
                        {leadSubmitted && leadForm.length > 0 ? <div className='flex flex-col justify-center items-center gap-[15px] rounded-lg gap-[15px] py-[10px] px-[20px] border-[1px] border-gray-100 shadow-md w-[90%] md:w-[75%]' style={{ backgroundColor: botInfo.lColor }}>
                                        <CheckCircle style={{ color: botInfo.color }} />
                                        <h3 style={{ color: botInfo.color }} className='text-xs'>Thank you for your interest, our team will get back to you shortly.</h3>
                        </div> : <></>}
                            </>
                            }</>
                        </div>
                        ))}
                        
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
                <div className='flex justify-center'>
                    <form style={{ backgroundColor: botInfo.color }} className={`fixed md:!bg-white bottom-0 flex max-w-screen-md mx-auto ${botInfo.isSandBox ? 'w-full md:w-[25%]' : 'w-full'} flex-col items-center space-y-4 p-3 pb-3 sm:px-0`}
                        onSubmit={(event) => {
                            if (!isLoading) {
                                handleSubmit(event);
                                // setLeadForm([]);
                                setLeadSubmitted(false);
                                inputRef.current.blur();
                                if (!sessionTracked && !botInfo.isSandBox && !PLANS.BASIC.includes(botInfo.subscriptionName)) {
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
                                            // setLeadForm([]);
                                            setLeadSubmitted(false);
                                            inputRef.current.blur();        
                                            if (!sessionTracked && !botInfo.isSandBox && !PLANS.BASIC.includes(botInfo.subscriptionName)) {
                                                eventTracker();
                                            }
                                            setSessionTracked(true);
                                        }
                                    }
                                }
                                placeholder={botInfo.placeholder ? botInfo.placeholder : "Ask me anything..."}
                            />
                            <div className='flex justify-end w-[10%]'>
                                <button type='submit' style={{ backgroundColor: botInfo.color }} className={`rounded-full py-[8px] pl-[10px] pr-[6px] ${input === '' ? 'opacity-0' : 'opacity-1'} duration-500`}>
                                    <Image
                                        src="/icons/send.png"
                                        width={20}
                                        height={20}
                                        alt="Send Message"
                                    />
                                </button>
                            </div>
                        </div>
                        {!botInfo.hideBranding ? <span className='flex items-center justify-center gap-1 text-[14px] px-1 py-1' style={{ color: 'white' }}><ZapIcon className='text-white md:!text-black' /><span className='font-semibold text-white md:!text-black'>Powered by <span className='font-black'>Kulfi AI</span></span></span> : <></>}
                    </form>
                </div>
            </>}
            {section === 1 && 
                <div className='articles-container max-w-screen-md mx-auto w-full flex flex-col gap-4 px-[25px] pb-4 mt-0 pt-5 md:px-4 md:pb-4 md:mt-0 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <Newspaper /><h1 className='font-bold text-[32px]'>Articles</h1>
                    </div>
                    <div className='flex flex-col gap-10'>
                        {articlesList.map((item, index) => (
                            <div key={index} className='flex flex-col gap-2 border-[2px] border-gray-100 rounded-md shadow-lg p-2'>
                                {item.img ? <img className='h-[10rem] rounded-lg object-cover' src={`data:image/jpeg;base64,${item.img}`} /> : <></>}
                                <h1 className='text-[16px] font-bold' style={{ color: botInfo.color }}>{item.title}</h1>
                                <p className='line-clamp-3 text-[14px] text-gray-600'>
                                    {item.description}
                                </p>
                                <div className='flex justify-end'>
                                    <a style={{ color: botInfo.mColor }} className='flex gap-1' target='_blank' href={item.link}>Read more <ExternalLinkIcon height={20} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center pb-5'>
                        {!botInfo.hideBranding ? <span className='fixed bottom-2 flex items-center justify-center gap-1 text-[14px] px-1 py-1' style={{ color: botInfo.color }}><ZapIcon /><span className='font-semibold'>Powered by <span className='font-black'>Kulfi AI</span></span></span> : <></>}
                    </div>
                </div>
            }

            {section === 2 && 
                <div className='faq-container max-w-screen-md mx-auto w-full flex flex-col gap-4 px-[25px] pb-4 mt-0 pt-5 md:px-4 md:pb-4 md:mt-0 md:pt-5 lg:px-4 xl:px-4 2xl:px-4 overflow-y-auto h-[72vh]'>
                    <div style={{ color: botInfo.color }} className='flex justify-start items-center gap-1'>
                        <QuestionAnswer /><h1 className='font-bold text-[32px]'>FAQs</h1>
                    </div>
                    <Accordion type="single" collapsible className={`w-full border-[2px] border-gray-300 p-3 rounded-md`}>
                        {faqList.map((item, index) => (
                            <AccordionItem key={index} className={index === faqList.length - 1 ? 'border-0' : ''}  value={`item-${index}`}>
                                <AccordionTrigger className='text-[16px] text-gray-600'>{item.question}</AccordionTrigger>
                                <AccordionContent className={` ${index === faqList.length - 1 ? 'border-0' : 'border-b-[2px] border-gray-300'} `}>
                                    <div className='flex justify-between items-start'>
                                        <div className='w-[90%]'>
                                        {item.answer}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className='flex justify-center pb-5'>
                        {!botInfo.hideBranding ? <span className='fixed bottom-2 flex items-center justify-center gap-1 text-[14px] px-1 py-1' style={{ color: botInfo.color }}><ZapIcon /><span className='font-semibold'>Powered by <span className='font-black'>Kulfi AI</span></span></span> : <></>}
                    </div>
                </div>
            }
        </>
    )
}