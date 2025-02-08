'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, Logout, LogoutOutlined, Newspaper, QuestionAnswer, Recycling, Settings, Source, UploadFileTwoTone } from '@mui/icons-material';
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CopyIcon, TrashIcon, UploadCloudIcon } from 'lucide-react';
import { toast } from 'react-toastify';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

export default function Dashboard() {
    const [data, setData] = useState();
    const [activeSection, setActiveSection] = useState('News');
    const [isLoading, setIsLoading] = useState();
    const [faq, setFaq] = useState({
        question: '',
        answer: ''
    });
    const [faqList, setFaqList] = useState([]);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const botLink = useRef();
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
                    <div className='flex flex-col gap-3 pt-5 border-[1px] border-gray-300 p-4 pb-4 mt-4 bg-gray-50 rounded-lg'>
                        <p>Copy and paste this code snippet in the <span className='font-bold'>{'<head><head/>'}</span> section of your code.</p>
                        <div className='flex flex-col bg-gray-800 w-full p-4 rounded-md shadow-md'>
                            <div className='flex justify-between items-start text-yellow-500 px-1'>
                                <span ref={botLink}>https://mt-ai-chatbot-git-main-ashishs-projects-33ba2137.vercel.app/js/loader.js?id=679d07708d8d780b96ab7106</span>
                                <button className='border-[1px] border-gray-600 hover:bg-gray-700 p-1 rounded-md' onClick={() => {
                                    navigator.clipboard.writeText(botLink.current.innerHTML);
                                    toast("Code snippet has been copied!", {
                                        progressStyle: { backgroundColor: "red" }
                                    });
                                }}><CopyIcon className='h-4 w-4' /></button>
                            </div>
                        </div>
                    </div>
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
                                    <option value='#E3A008'>Yellow</option>
                                    <option value='#4A1D96'>Purple</option>
                                    <option value='#9B1C1C'>Red</option>
                                    <option value='#03543F'>Green</option>
                                    <option value='#1E429F'>Blue</option>
                                    <option value='#362F78'>Indigo</option>
                                    <option value='#9F580A'>Orange</option>
                                    <option value='#6B7280'>Gray</option>
                                </select>
                                <span className={`w-[15%] rounded-md bg-[${data.color}]`}></span>
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
                    <p>Manage your Knowledge bases.</p>
                    <div className='flex gap-3 pt-10'>
                        <div className='flex flex-col gap-2 w-[50%] rounded-md border-[1px] border-gray-500 shadow-sm p-3'>
                            <h1>Links</h1>
                            <textarea placeholder='Enter the links in your website containing information.' className='outline-none resize-none w-full h-[150px] border-[1px] border-gray-500 rounded-lg p-2' />
                        </div>
                        
                        <div className='flex flex-col gap-2 w-[50%] rounded-md border-[1px] border-gray-500 shadow-sm p-3'>
                            <h1>Documents</h1>
                            
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadFileTwoTone />
                                    <p className="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">The file must be in PDF format.</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 

                        </div>
                    </div>
                </>
            )
        } else if (section === 'News') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">News (Blog)</h3>
                    <p>You can add the blogs posted in your website here.</p>
                    <div className='flex flex-col gap-5 pt-10'>
                        <div className='flex gap-2'>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <label className="text-left">
                                    Blog Title
                                </label>
                                <input onChange={(e) => setFaq((prev) => { return { ...prev, question: e.target.value } })} value={faq.question} id='question' placeholder='Enter the title of the blog here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <label className="text-left">
                                    Blog Link
                                </label>
                                <input onChange={(e) => setFaq((prev) => { return { ...prev, question: e.target.value } })} value={faq.question} id='question' placeholder='Enter the title of the blog here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Blog description
                            </label>
                            <textarea onChange={(e) => setFaq((prev) => { return {...prev, answer: e.target.value }})} value={faq.answer} placeholder="Type your answer here." className='px-5 py-5 outline-none  border-[1px] border-gray-400  rounded-lg resize-none'></textarea>
                        </div>
                        <div className='flex justify-end items-end'>
                            <button onClick={faqsUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-2 border-2 border-gray-400 pt-5 rounded-lg mt-12'>
                        <h1 className='text-center'>Blog list</h1>
                        <table className='w-full'>
                            <thead>
                                <tr className='text-left'>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Title</th>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Description</th>
                                    <th className='p-4 border-t-2 border-gray-400'>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-left'>
                                    <td className='p-4 border-t-2 border-r-2 border-gray-400'>Title</td>
                                    <td className='p-4 border-t-2 border-r-2 border-gray-400'>Description</td>
                                    <td className='p-4 border-t-2 border-gray-400'>Link</td>
                                </tr>
                                <tr className='text-left'>
                                    <td className='p-4 border-t-2 border-r-2 border-gray-400'>Title</td>
                                    <td className='p-4 border-t-2 border-r-2 border-gray-400'>Description</td>
                                    <td className='p-4 border-t-2 border-gray-400'>Link</td>
                                </tr>
                                <tr className='text-center'>
                                    <td colSpan={3} className='p-4 border-t-2 border-gray-400'>No records to show</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                                            <button onClick={() => deleteFaq(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'><TrashIcon className='text-white w-[16px]' /></button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion> : <div className='flex justify-center items-center min-h-[10rem]'><h1>No FAQs added at the moment</h1></div>}
                </>
            )
        }
    }

    return (
        <main className={`flex items-center gap-4 w-full py-[4rem] px-[5rem] ${poppins.className}`}>
            <div className="md:flex w-full">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                    {sideMenu.map(({ Icon, ...item}) => (
                        item.title !== 'Logout' ? <li key={item.id}>
                            <button onClick={() => setActiveSection(item.title)} className={`inline-flex items-center px-4 py-3 rounded-lg  ${activeSection === item.title ? 'bg-purple-800 text-white hover:bg-purple-700 hover:text-gray-100 border-2 border-purple-800' : 'border-2 border-slate-200 hover:bg-gray-200'} w-full gap-2 duration-200`} aria-current="page">
                                <Icon />
                                {item.title}
                            </button>
                        </li>:
                        <Dialog open={logoutModalOpen} key={item.id}>
                            <DialogTrigger asChild>
                            <li>
                                <button onClick={() => { setLogoutModalOpen(true); }} className={`inline-flex items-center px-4 py-3 rounded-lg  ${activeSection === item.title ? 'bg-purple-800 text-white hover:bg-purple-700 hover:text-gray-100 border-2 border-purple-800' : 'border-2 border-slate-200 hover:bg-gray-200'} w-full gap-2 duration-200`} aria-current="page">
                                    <Icon />
                                    {item.title}
                                </button>
                            </li>
                            </DialogTrigger>
                            <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                <DialogHeader className='flex flex-col gap-2'>
                                    <DialogTitle className='text-[32px]'>Logout?</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to logout?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className='flex gap-2 justify-end pt-[25px]'>
                                    <button onClick={() => logout()} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Yes</button>  
                                    <button onClick={() => setLogoutModalOpen(false)} className='bg-white border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-purple-500 py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>No</button>  
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))}
                </ul>
                <div className="p-6 border-2 border-slate-200 text-medium text-gray-500 rounded-lg w-full">
                    {getContent(activeSection)}
                </div>
            </div>
        </main>
    );
}
