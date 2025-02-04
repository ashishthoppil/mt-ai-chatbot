'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, Logout, LogoutOutlined, Newspaper, QuestionAnswer, Recycling, Settings, Source } from '@mui/icons-material';
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { TrashIcon } from 'lucide-react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

export default function Dashboard() {
    const [data, setData] = useState();
    const [activeSection, setActiveSection] = useState('Profile');
    const [isLoading, setIsLoading] = useState();
    const [faq, setFaq] = useState({
        question: '',
        answer: ''
    });
    const [faqList, setFaqList] = useState([]);

    const router = useRouter();

    const loadFaqs = async () => {
        const res = await fetch('/api/get-questions', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID')
            })
        });
        const data = await res.json();
        if (data.data) {
            setFaqList(data.data);
        } else {
            setFaqList([]);
        }
    }

    const loadData = async () => {
        const res = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID')
            })
        });
        const data = await res.json();
        if (data.data) {
            setData(data.data);
        } else {
            router.push('/');
        }
        loadFaqs();
    }

    useEffect(() => {
        loadData();
    }, []);

    const sideMenu = [
        {
            id: 1,
            title: 'Profile',
            Icon: AccountCircleOutlined
        },
        {
            id: 2,
            title: 'Settings',
            Icon: Settings
        },
        {
            id: 3,
            title: 'Source',
            Icon: Source
        },
        {
            id: 4,
            title: 'News',
            Icon: Newspaper
        },
        {
            id: 5,
            title: 'FAQs',
            Icon: QuestionAnswer
        },
        
        {
            id: 6,
            title: 'Logout',
            Icon: Logout
        },
    ];

    const profileUpdate = async () => {
        setIsLoading(true);
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                ...data
            })
        });
        const response = await res.json();
        if (response) {
            setIsLoading(false);
        } 
    }

    const settingsUpdate = async () => {
        setIsLoading(true);
        const res = await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                ...data
            })
        });
        const response = await res.json();
        if (response) {
            setIsLoading(false);
        } 
    }

    const faqsUpdate = async () => {
        const updatedFAQs = [...faqList, { question: faq.question, answer: faq.answer }];
        const res = await fetch('/api/add-question', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                question: faq.question, 
                answer: faq.answer
            })
        });
        const response = await res.json();
        if (response) {
            loadFaqs();
            setFaq({
                question: '',
                answer: ''
            });
        }
    }

    const deleteFaq = async (id) => {
        const res = await fetch('/api/remove-question', {
            method: 'POST',
            body: JSON.stringify({
                faqId: id, 
            })
        });
        if (res) {
            loadFaqs();
        }
    }

    const getContent = (section) => {
        if (section === 'Profile') {
            return (
                <>
                    <h3 className="font-bold text-gray-900 mb-2 text-[32px]">Profile</h3>
                    <p>An overview of the information that you provided during the registration process. You can manage your information from this section by editing the fields below.</p>
                    {data && <div className='flex flex-col gap-4 pt-10'>
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <label htmlFor="organization" className="text-left">
                                    Organization
                                </label>
                                <input onChange={(e) => setData((prev) => { return { ...prev, organization: e.target.value } })} value={data.organization} id='organization' placeholder='Ex: Acme Pvt Ltd' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <label htmlFor="website" className="text-left">
                                    Website
                                </label>
                                <input onChange={(e) => setData((prev) => { return { ...prev, website: e.target.value } })} value={data.website} placeholder='Ex: www.acme.com' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                        </div>
                        <div className='flex items-end justify-between gap-4'>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <label htmlFor="domain" className="text-left">
                                    Domain
                                </label>
                                <input onChange={(e) => setData((prev) => { return { ...prev, domain: e.target.value } })} value={data.domain} placeholder='Ex: Automobiles, Retail, Healthcare etc.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                            <button onClick={profileUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Updating...' : 'Update'}</button>  
                        </div>
                    </div>}
                </>
            );
        } else if (section === 'Settings') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Settings</h3>
                    <p>You can customize your chatbot from this section.</p>
                    <div className='flex gap-4 pt-10'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Custom ChatBot Name
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, botName: e.target.value } })} value={data.botName} id='botname' placeholder='Example: Lumi AI' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                        </div>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="domain" className="text-left">
                                Custom Color Theme
                            </label>
                            <div className='flex gap-2'>
                                <select value={data.color} onChange={(e) => setData((prev) => { return { ...prev, color: e.target.value } })} className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg w-full'>
                                    <option value='bg-yellow-500'>Yellow</option>
                                    <option value='bg-purple-800'>Purple</option>
                                    <option value='bg-red-700'>Red</option>
                                    <option value='bg-emerald-700'>Green</option>
                                    <option value='bg-sky-500'>Sky</option>
                                    <option value='bg-indigo-800'>Indigo</option>
                                    <option value='bg-orange-500'>Orange</option>
                                    <option value='bg-gray-500'>Gray</option>
                                </select>
                                <span className={`w-[15%] rounded-md ${data.color}`}></span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <button onClick={settingsUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Updating...' : 'Update'}</button>  
                    </div>
                </>
            )
        } else if (section === 'Source') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Source</h3>
                </>
            )
        } else if (section === 'News') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">News</h3>
                </>
            )
        } else if (section === 'FAQs') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">FAQs</h3>
                    <p>You can add the questions that are frequently asked by your users here.</p>
                    <div className='flex flex-col gap-5 pt-10'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Enter an FAQ.
                            </label>
                            <input onChange={(e) => setFaq((prev) => { return { ...prev, question: e.target.value } })} value={faq.question} id='question' placeholder='Type you question here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                        </div>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Enter the answer to you FAQ.
                            </label>
                            <textarea onChange={(e) => setFaq((prev) => { return {...prev, answer: e.target.value }})} value={faq.answer} placeholder="Type your answer here." className='px-5 py-5 outline-none  border-[1px] border-gray-400  rounded-lg resize-none'></textarea>
                        </div>
                        <div className='flex justify-end items-end'>
                            <button onClick={faqsUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                        </div>
                    </div>
                    {faqList && faqList.length > 0 ? <Accordion type="single" collapsible className="w-full">
                        <h1 className='mt-5'>FAQs List</h1>
                        {faqList.map((item) => {
                            return (
                                <AccordionItem key={item.id} value={`item-${item.id}`}>
                                    <AccordionTrigger className='text-[20px]'>{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className='flex justify-between items-start'>
                                            <div className='w-[90%]'>
                                                {item.answer}
                                            </div>
                                            <button onClick={() => deleteFaq(item.id)} className='px-4 py-2 bg-red-500 rounded-md shadow-md'><TrashIcon className='text-white' /></button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion> : <div className='flex justify-center items-center min-h-[10rem]'><h1>No FAQs added at the moment</h1></div>}
                </>
            )
        } else if (section === 'Logout') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Logout?</h3>
                    <div className='flex flex-col gap-10'>
                        <p>Do you really wish to logout?</p>
                        <button onClick={() => logout()} className='flex gap-1 px-3 py-2 bg-purple-800 hover:bg-purple-700 rounded-lg text-white w-[7%]'><LogoutOutlined />Yes</button>
                    </div>
                </>
            )
        }
    }

    return (
        <main className={`flex items-center gap-4 w-full py-[4rem] px-[5rem] ${poppins.className}`}>
            <div className="md:flex w-full">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                    {sideMenu.map(({ Icon, ...item}) => (
                        <li key={item.id}>
                            <button onClick={() => setActiveSection(item.title)} className={`inline-flex items-center px-4 py-3 rounded-lg  ${activeSection === item.title ? 'bg-purple-800 text-white hover:bg-purple-700 hover:text-gray-100 border-2 border-purple-800' : 'border-2 border-slate-200 hover:bg-gray-200'} w-full gap-2 duration-200`} aria-current="page">
                                <Icon />
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="p-6 border-2 border-slate-200 text-medium text-gray-500 rounded-lg w-full">
                    {getContent(activeSection)}
                </div>
            </div>
        </main>
    );
}
