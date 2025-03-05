'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, Close, EmailOutlined, InfoRounded, Leaderboard, Logout, Newspaper, NoAccounts, Phone, QuestionAnswer, Settings, Source, UploadFileTwoTone } from '@mui/icons-material';
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
import { AlignLeft, AlignRight, Check, CopyIcon, ExternalLinkIcon, Eye, File, FileX, GaugeIcon, Loader2, NotebookTabsIcon, Tag, TrashIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import tinycolor from 'tinycolor2';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

const Loader = () => {
    return (
        <div className='flex gap-2 items-center'>
            <Loader2 className='animate-spin' />
            <p className='text-[24px]'>Loading</p>
        </div>
    )
}

export default function Dashboard() {
    const [articleFile, setArticleFile] = useState(null);
    const [complaints, setComplaints] = useState();
    const [feedback, setFeedback] = useState();
    const [generalQueries, setGeneralQueries] = useState();
    const [clickData, setClickData] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const [KB, setKB] = useState(null);
    const [links, setLinks] = useState('');
    const [leads, setLeads] = useState([]);
    const [data, setData] = useState();
    const [messageCount, setMessageCount] = useState(0);
    const [location, setLocation] = useState({});
    const [engagementRate, setEngagementRate] = useState(0);
    const [activeSection, setActiveSection] = useState('Profile');
    const [isLoading, setIsLoading] = useState();
    const [isDeleting, setIsDeleting] = useState();
    const [isKBLoading, setIsKBLoading] = useState();
    const [clickSelector, setClickSelector] = useState('Day');
    const [sessionSelector, setSessionSelector] = useState('Day');
    const [faq, setFaq] = useState({
        question: '',
        answer: ''
    });
    const [faqList, setFaqList] = useState([]);
    const [article, setArticle] = useState({
        title: '',
        description: '',
        link: ''
    });
    const [articlesList, setArticlesList] = useState([]);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [urlParams, setUrlParams] = useState({
        id: '',
        botName: '',
        color: '',
        lColor: '',
        mColor: '',
        cw: ''
    });

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

    const loadArticles = async () => {
        const res = await fetch('/api/get-articles', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID')
            })
        });
        const data = await res.json();
        if (data.data) {
            setArticlesList(data.data);
        } else {
            setArticlesList([]);
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
            let updatedLinks = '';
            if (data.data.links) {
                data.data.links.forEach((element, index) => {
                    if (element !== "") {
                        if (index !== data.data.links.length - 1) {
                            updatedLinks += element + '\n';
                        } else {
                            updatedLinks += element;
                        }
                    }
                });
                setLinks(updatedLinks);
            }
        } else {
            router.push('/');
            logout();
        }
        loadFaqs();
        loadArticles();
        
    }

    const handleArticleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setArticleFile(e.target.files[0]);
        }
    };

    const handleBotIconChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let base64Image = "";
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = async () => {
                    base64Image = reader.result.split(",")[1];
                    setData((prev) => { return { ...prev, botIcon: base64Image } })
                };
            }
        }
    }

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let base64Image = "";
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = async () => {
                    base64Image = reader.result.split(",")[1];
                    setData((prev) => { return { ...prev, botAvatar: base64Image } })
                };
            }
        }
    }
    

    const handleKBChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type !== 'application/pdf') {
                alert('Please upload a valid PDF file.');
                e.target.value = '';
                return;
            }
            setKB(e.target.files[0]);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data) {
            getClickData();
        }
    }, [data, clickSelector])

    useEffect(() => {
        if (data) {
            getSessionData();
        }
    }, [data, sessionSelector]);

    useEffect(() => {
        if (data) {
            getEngagementRate()
            getMessageCount()
            getLocation()
            getLeads()
        }
    }, [data])

    const sideMenu = [
        {
            id: 1,
            title: 'Profile',
            Icon: AccountCircleOutlined
        },
        {
            id: 2,
            title: 'Reports',
            Icon: GaugeIcon
        },
        {
            id: 3,
            title: 'Leads',
            Icon: NotebookTabsIcon
        },
        {
            id: 4,
            title: 'Settings',
            Icon: Settings
        },
        {
            id: 5,
            title: 'Source',
            Icon: Source
        },
        {
            id: 6,
            title: 'Articles',
            Icon: Newspaper
        },
        {
            id: 7,
            title: 'FAQs',
            Icon: QuestionAnswer
        },
        {
            id: 8,
            title: 'Plan',
            Icon: Tag
        },
        {
            id: 9,
            title: 'Logout',
            Icon: Logout
        },
    ];

    const profileUpdate = async () => {
        // Validations
        if (data.website === '' || data.domain === '') {
            toast.error("Please enter all required fields!");
            return;
        }
        const re = /^(https?|ftp):\/\/([^\s\/]*)\.([^\s\/]*)(?:\/[^\s]*)?$/i;
        const websiteFormat = re.test(data.website);
        if (!websiteFormat) {
            toast.error("Please enter a valid website url!");
            return;
        }
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
            toast.success("Profile updated!");  
        }
    }

    const settingsUpdate = async () => {
        // Validations
        if (data.botName === '' || data.cw === '') {
            toast.error("Please enter all required fields!");
            return;
        }
        if (isNaN(data.cw)) {
            toast.error("Please enter valid dimensions for the chat window!");
            return;
        }
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
            const botName = data.botName;
            const color = data.color.slice(1);
            const lColor = tinycolor(`#${color}`).lighten(60).toHexString().slice(1)
            const mColor = tinycolor(`#${color}`).lighten(20).toHexString().slice(1)
            const cw = data.cw;
            setUrlParams(prev => ({
                ...prev,
                botName,
                color,
                lColor,
                mColor,
                cw
            }));
            localStorage.setItem('botname', botName);
            localStorage.setItem('color', color);
            localStorage.setItem('cw', cw);
            setIsLoading(false);
            toast.success("Settings updated!");            
        } 
    }

    const faqsUpdate = async () => {
        if (faq.question === '' || faq.answer === '') {
            toast.error("Please enter all required fields!");
            return;
        }
        setIsLoading(true);
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
            setIsLoading(false);
            setFaq({
                question: '',
                answer: ''
            });
        }
    }

    const saveArticle = async (base64) => {
        setIsLoading(true);
        const res = await fetch('/api/add-article', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                title: article.title, 
                description: article.description,
                link: article.link,
                img: base64
            })
        });
        const response = await res.json();
        if (response) {
            loadArticles();
            setArticle({
                title: '',
                description: '',
                link: ''
            });
            toast.success("Article saved!");
            setIsLoading(false);
        }
    }

    const articlesUpdate = async () => {

        // Validations
        if (article.title === '' || article.description === '' || article.link === '') {
            toast.success("Please enter all required fields!");
            return;
        }
        const re = /^(https?|ftp):\/\/([^\s\/]*)\.([^\s\/]*)(?:\/[^\s]*)?$/i;
        const websiteFormat = re.test(article.link);
        if (!websiteFormat) {
            toast.error("Please enter a proper url!");
            return;
        }
        let base64Image = "";
        if (articleFile) {
          const reader = new FileReader();
          reader.readAsDataURL(articleFile);
          // onloadend is called when reading is finished
          reader.onloadend = async () => {
            base64Image = reader.result.split(",")[1]; // remove "data:image/*;base64,"
            saveArticle(base64Image)
          };
        } else {
            saveArticle(base64Image);
        }
    }

    const deleteFaq = async (id) => {
        setIsDeleting(true);
        const res = await fetch('/api/remove-question', {
            method: 'POST',
            body: JSON.stringify({
                faqId: id, 
            })
        });
        if (res) {
            setIsDeleting(false);
            loadFaqs();
            toast.success("Item deleted!");
        }
    }

    const deleteArticle = async (id) => {
        setIsDeleting(true);
        const res = await fetch('/api/remove-article', {
            method: 'POST',
            body: JSON.stringify({
                articleId: id, 
            })
        });
        if (res) {
            loadArticles();
            setIsDeleting(false);
            toast.success("Item deleted!");
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('objectID');
        const botName = localStorage.getItem('botname');
        const color = localStorage.getItem('color');
        const lColor = tinycolor(`#${color}`).lighten(60).toHexString().slice(1)
        const mColor = tinycolor(`#${color}`).lighten(20).toHexString().slice(1)
        const cw = localStorage.getItem('cw');
        
        if (id && botName && color && cw) {
            setUrlParams({
                id,
                botName,
                color,
                lColor,
                mColor,
                cw
            });
        } else {
            router.push('/');
            logout();
        }
    }, []);

    const linkSync = async () => {
        setIsLoading(true);
        const splitLinks = links.split('\n');
        const res = await fetch('/api/sync-links', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                links: splitLinks, 
            })
        });
        if (res) {
            setIsLoading(false);
            toast.success("Links have been synced!");
        }
    }

    const handleKBSubmit = async (e) => {
        e.preventDefault();
        if (!KB) return
    
        try {
          setIsKBLoading(true)
          const formData = new FormData()
          formData.append('file', KB)
          formData.append('id', localStorage.getItem('objectID'))
    
          const response = await fetch('/api/kb-upload', {
            method: 'POST',
            body: formData,
          })
    
          if (response) {
            loadData()
          }
        } catch (error) {
          console.error('Upload error:', error)
          alert('Failed to upload or parse PDF.')
        } finally {
          setIsKBLoading(false)
        }
      }

    const getComplaintsSummary = async () => {
        const response = await fetch(`/api/get-complaints?id=${localStorage.getItem('objectID')}`);
        const result = await response.json();
        setComplaints({
            summary: result.data.summary,
            count: result.data.count
        })
    }

    const getFeedbackSummary = async () => {
        const response = await fetch(`/api/get-feedback?id=${localStorage.getItem('objectID')}`);
        const result = await response.json();
        setFeedback({
            summary: result.data.summary,
            count: result.data.count
        })
    }

    const getGeneralSummary = async () => {
        const response = await fetch(`/api/get-general-query?id=${localStorage.getItem('objectID')}`);
        const result = await response.json();
        setGeneralQueries({
            summary: result.data.summary,
            count: result.data.count
        })
    }

    const getClickData = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=click&organization=${data.organization}&type=${clickSelector}`);
        const result = await response.json();
        setClickData(result.data);
    }

    const getSessionData = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=session&organization=${data.organization}&type=${sessionSelector}`);
        const result = await response.json();
        setSessionData(result.data);
    }

    const getEngagementRate = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=engagement&organization=${data.organization}`);
        const result = await response.json();
        setEngagementRate(result.data);
    }

    const getMessageCount = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=count&organization=${data.organization}`);
        const result = await response.json();
        setMessageCount(result.data);
    }

    const getLocation = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=location&organization=${data.organization}`);
        const result = await response.json();
        setLocation(result.data);
    }

    const getLeads = async () => {
        const response = await fetch(`/api/get-event?id=${localStorage.getItem('objectID')}&event=lead&organization=${data.organization}`);
        const result = await response.json();
        setLeads(result.data);
    }

    const getLeadDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    const getContent = (section, data) => {
        if (section === 'Profile') {
            return (
                <>
                    <h3 className="font-bold text-gray-900 mb-2 md:text-[32px]">Welcome {data && data.organization}, </h3>
                    <p className='text-[14px] md:text-[16px]'>This section provides an overview of the information you provided during registration. You can update or manage any details by editing the fields below.</p>
                    <div className='flex flex-col gap-3 pt-5 border-[1px] border-gray-300 p-4 pb-4 mt-4 bg-gray-50 rounded-lg'>
                        <p className='text-[14px] md:text-[16px]'>Copy and paste this code snippet inside the <span className='font-bold'>{'<head>'}</span> tag of your website.</p>
                        <div className='flex flex-col bg-gray-800 w-full p-4 rounded-md shadow-md'>
                            <div className='flex justify-between items-start text-[14px] md:text-[16px] text-yellow-500 px-1'>
                                <span className='w-[90%] overflow-hidden' ref={botLink}>{`<script src='https://kulfi-ai.com/js/loader.js?id=${urlParams.id}&cw=${urlParams.cw}$al=${data.alignment[0]}'></script>`}</span>
                                <button className='border-[1px] border-gray-600 hover:bg-gray-700 p-1 rounded-md' onClick={() => {
                                    navigator.clipboard.writeText(botLink.current.innerText);
                                    toast.success("Code snippet has been copied!");
                                }}><CopyIcon className='h-4 w-4' /></button>
                            </div>
                        </div>
                    </div>
                    {data && <div className='flex flex-col gap-4 pt-10'>
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-2 md:gap-4 text-[14px] md:text-[16px] w-[50%]">
                                <label htmlFor="organization" className="text-left">
                                    Organization
                                </label>
                                <input disabled onChange={(e) => setData((prev) => { return { ...prev, organization: e.target.value } })} value={data.organization} id='organization' placeholder='Ex: Acme Pvt Ltd' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg bg-gray-300'></input>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4 text-[14px] md:text-[16px] w-[50%]">
                                <label htmlFor="website" className="text-left">
                                    Website
                                </label>
                                <input onChange={(e) => setData((prev) => { return { ...prev, website: e.target.value } })} value={data.website} placeholder='Ex: www.acme.com' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                        </div>
                        <div className='flex items-end justify-between gap-4'>
                            <div className="flex flex-col gap-2 md:gap-4 text-[14px] md:text-[16px] w-[50%]">
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
        } else if (section === 'Reports') {
            return (
                <div className='flex flex-col gap-4 py-10'>
                        <h3 className="font-bold text-gray-500 mb-2 text-[24px]">Reports</h3>
                        
                        <div className='flex'>
                            <h3 className="md:text-[14px] font-bold text-gray-500 mb-2">Messages: {messageCount}/5000</h3>   
                        </div>
                        <div className='flex'>
                            <h3 className="md:text-[14px] font-bold text-gray-500 mb-2">Engagement Rate: {engagementRate}%</h3>   
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 w-full'>
                            <div style={{ height: '20rem' }} className='w-full md:w-1/2'>
                                <div className='flex gap-1 justify-end w-full'>
                                    <button onClick={() => setClickSelector('Day')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${clickSelector === 'Day' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Day
                                    </button>
                                    <button onClick={() => setClickSelector('Month')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${clickSelector === 'Month' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Month
                                    </button>
                                    <button onClick={() => setClickSelector('Year')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${clickSelector === 'Year' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Year
                                    </button>
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={clickData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" label="Clicks" dataKey="click" stroke="#6B21A8" fill="#A855F7" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <h1 className='text-center'>Number of times users click on the chat button</h1>
                            </div>
                            <div style={{ height: '20rem' }} className='w-full mt-[6rem] md:mt-0 md:w-1/2'>
                                <div className='flex gap-1 justify-end w-full'>
                                    <button onClick={() => setSessionSelector('Day')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${sessionSelector === 'Day' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Day
                                    </button>
                                    <button onClick={() => setSessionSelector('Month')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${sessionSelector === 'Month' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Month
                                    </button>
                                    <button onClick={() => setSessionSelector('Year')} className={`px-2 py-1 rounded-md border-2 border-gray-200 text-[12px] hover:bg-gray-200 ${sessionSelector === 'Year' ? 'bg-purple-800 hover:bg-purple-700 text-white' : ''}`}>
                                        Year
                                    </button>
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={sessionData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" label="Sessions" dataKey="session" stroke="#6B21A8" fill="#A855F7" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <h1 className='text-center'>Number of chat sessions</h1>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center md:flex-row gap-10 w-full mt-[6rem]'>
                            <div style={{ height: '20rem' }} className='w-full md:w-1/2'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={location}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="country" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="mobile" fill="#6B21A8" activeBar={<Rectangle fill="#6B21A8" stroke="#6B21A8" />} />
                                        <Bar dataKey="desktop" fill="#FFA500" activeBar={<Rectangle fill="#FFA500" stroke="#FFA500" />} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <h1 className='text-center'>Demographics</h1>
                            </div>
                            <div className='flex flex-col justify-even gap-2  md:py-10 w-full md:w-1/2 md:pl-5'>
                                <div className='flex gap-2 items-center'>
                                    <span className='h-[10px] w-[10px] bg-red-500 rounded-sm'></span>
                                    <strong>Complaints</strong>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className='outline-none flex items-center border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-1 text-[12px] hover:bg-purple-800 hover:text-white duration-500' onClick={getComplaintsSummary}><Eye height={15} /> View Summary</button>
                                            </DialogTrigger>
                                            <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                                <DialogHeader className='flex flex-col gap-2'>
                                                    <DialogTitle className='text-[16px] text-gray-800'>Complaints Summary</DialogTitle>
                                                </DialogHeader>
                                                    {complaints ? complaints.count ?
                                                    <div className="flex flex-col gap-4 py-4 text-[14px]">
                                                        <p>There are <strong>{complaints.count}</strong> complaints in total</p>
                                                        <p>Summary: {complaints.summary}</p>
                                                    </div> : <div className="flex flex-col gap-4 py-4 text-[14px]"><p>There is no information yet. Please try again later.</p></div>  : 
                                                    <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                            </DialogContent>
                                        </Dialog>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <span className='h-[10px] w-[10px] bg-yellow-500 rounded-sm'></span>
                                    <strong>Feedbacks</strong>
                                    <Dialog>
                                            <DialogTrigger asChild>
                                            <button className='outline-none flex items-center border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-1 text-[12px] hover:bg-purple-800 hover:text-white duration-500' onClick={getFeedbackSummary}><Eye height={15} />View Summary</button>
                                            </DialogTrigger>
                                            <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                                <DialogHeader className='flex flex-col gap-2'>
                                                    <DialogTitle className='text-[16px] text-gray-800'>Feedback Summary</DialogTitle>
                                                </DialogHeader>
                                                    {feedback ? feedback.count ?
                                                    <div className="flex flex-col gap-4 py-4 text-[14px]">
                                                        <p>There are <strong>{feedback.count}</strong> feedbacks in total</p>
                                                        <p>Summary: {feedback.summary}</p>
                                                    </div> : <div className="flex flex-col gap-4 py-4 text-[14px]"><p>There is no information yet. Please try again later.</p></div> : <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                            </DialogContent>
                                        </Dialog>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <span className='h-[10px] w-[10px] bg-emerald-500 rounded-sm'></span>
                                    <strong>General queries</strong>
                                    <Dialog>
                                            <DialogTrigger asChild>
                                                <button className='outline-none flex items-center border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-1 text-[12px] hover:bg-purple-800 hover:text-white duration-500' onClick={getGeneralSummary}><Eye height={15} />View Summary</button>
                                            </DialogTrigger>
                                            <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                                <DialogHeader className='flex flex-col gap-2'>
                                                    <DialogTitle className='text-[16px] text-gray-800'>General Summary</DialogTitle>
                                                </DialogHeader>
                                                    {generalQueries ? generalQueries.count ?
                                                    <div className="flex flex-col gap-4 py-4 text-[14px]">
                                                        <p>There are <strong>{generalQueries.count}</strong> general queries in total</p>
                                                        <p>Summary: {generalQueries.summary}</p>
                                                    </div> : <div className="flex flex-col gap-4 py-4 text-[14px]"><p>There is no information yet. Please try again later.</p></div> : <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                            </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        } else if (section === 'Leads') {
            return (<>
                <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Leads</h3>
                <p className='text-[14px] md:text-[16px]'>Access all the leads generated by the chatbot right here.</p>
                <div className='flex flex-col gap-4 pt-10 text-[14px] md:text-[16px]'>
                    {leads.map((item, index) => {
                        return (
                        <div key={index} className='flex flex-col gap-2 border-[1px] border-gray-400 rounded-lg p-4'>
                            <div className='flex flex-col'>
                                <h3 className="md:text-[22px] font-bold text-purple-800 mb-2">Lead #{index + 1}</h3>
                                {item.summary}
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 items-center justify-between w-full'>
                                <span className='text-[12px]'>Date: {getLeadDate(item.time)}</span>
                                <div className='flex gap-2'>
                                    {item.email !== 'null' ? <><a className='flex items-center text-[14px] text-white bg-purple-800 rounded-md p-1' href={`mailto:${item.email}`}><EmailOutlined className='h-4' />Email</a>
                                    <button className='flex items-center text-[14px] text-white bg-purple-800 rounded-md p-1' onClick={(e) => {
                                        navigator.clipboard.writeText(item.email);
                                        toast.success("Email address has been copied!");
                                    }}><CopyIcon className='h-4' />Copy email address</button></> : <></>}
                                    {item.phone !== 'null' ? <><a className='flex items-center text-[14px] text-white bg-purple-800 rounded-md p-1' href={`tel:${item.phone}`}><Phone className='h-4' />Phone</a>
                                    <button className='flex items-center text-[14px] text-white bg-purple-800 rounded-md p-1' onClick={(e) => {
                                        navigator.clipboard.writeText(item.phone);
                                        toast.success("Phone number has been copied!");
                                    }}><CopyIcon className='h-4' />Copy phone no.</button></> : <></>}
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </>)
        } else if (section === 'Settings') {
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Settings</h3>
                    <p className='text-[14px] md:text-[16px]'>Customize your chatbot to align with your website’s style.</p>
                    <div className='flex gap-4 pt-10 text-[14px] md:text-[16px]'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Chatbot Name
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, botName: e.target.value } })} value={data.botName} id='botname' placeholder='Example: Lumi AI' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                        </div>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="domain" className="text-left">
                                Color Theme
                            </label>
                            <div className='flex gap-2'>
                                <select value={data.color} onChange={(e) => setData((prev) => { return { ...prev, color: e.target.value } })} className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg w-full'>
                                    <option value='#046e00'>Green</option>
                                    <option value='#4A1D96'>Purple</option>
                                    <option value='#9B1C1C'>Red</option>
                                    <option value='#004b5c'>Green</option>
                                    <option value='#1E429F'>Blue</option>
                                    <option value='#362F78'>Indigo</option>
                                    <option value='#9F580A'>Brown</option>
                                    <option value='#000000'>Black</option>
                                </select>
                                <span style={{ backgroundColor: data.color }} className={`w-[15%] rounded-md`}></span>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 pt-10 pb-10 text-[14px] md:text-[16px]'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Chat window width (Preferred range: 350px to 450px)
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, cw: e.target.value } })} value={data.cw} id='cw' placeholder='Example: 400' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                        </div>
                        {/* <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="domain" className="text-left">
                                Color Theme
                            </label>
                            <div className='flex gap-2'>
                                <select value={data.color} onChange={(e) => setData((prev) => { return { ...prev, color: e.target.value } })} className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg w-full'>
                                    <option value='#046e00'>Green</option>
                                    <option value='#4A1D96'>Purple</option>
                                    <option value='#9B1C1C'>Red</option>
                                    <option value='#004b5c'>Green</option>
                                    <option value='#1E429F'>Blue</option>
                                    <option value='#362F78'>Indigo</option>
                                    <option value='#9F580A'>Brown</option>
                                    <option value='#000000'>Black</option>
                                </select>
                                <span style={{ backgroundColor: data.color }} className={`w-[15%] rounded-md`}></span>
                            </div>
                        </div> */}
                    </div>

                    <div className='flex gap-4 pb-10 text-[14px] md:text-[16px]'>
                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left">
                                    Upload Bot Icon
                                </label>
                                <input key={1} type="file" onChange={(e) => handleBotIconChange(e)} />
                            </div>
                            <div className="flex flex-col gap-4">
                                {data.botIcon ? <img className='h-[3rem] max-w-[3rem] rounded-lg object-cover border-[1px] border-gray-200 rounded-md p-1' src={`data:image/jpeg;base64,${data.botIcon}`} /> : <></>}
                                {data.botIcon ? <div><button onClick={() => setData((prev) => { return { ...prev, botIcon: null } })} className='bg-transparent text-red-500 text-[12px]'><Close className='text-red-500 text-[12px]' /> Remove image</button></div> : <></>}
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left">
                                    Upload Bot Avatar
                                </label>
                                <input key={2} type="file" onChange={(e) => handleAvatarChange(e)} />
                            </div>
                            <div className="flex flex-col gap-4">
                                {data.botAvatar ? <img className='h-[3rem] max-w-[3rem] rounded-lg object-cover border-[1px] border-gray-200 rounded-md p-1' src={`data:image/jpeg;base64,${data.botAvatar}`} /> : <></>}
                                {data.botAvatar ? <div><button onClick={() => setData((prev) => { return { ...prev, botAvatar: null } })} className='bg-transparent text-red-500 text-[12px]'><Close className='text-red-500 text-[12px]' /> Remove image</button></div> : <></>}
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 pb-10 text-[14px] md:text-[16px]'>
                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left">
                                    Bot position
                                </label>
                                <div className='flex gap-2 w-full'>
                                    <div onClick={() => setData((prev) => { return { ...prev, alignment: 'left' } })} className={`flex gap-4 rounded-lg border-2 ${data.alignment === 'left' ? 'border-5 border-purple-800' : 'border-gray-300'} p-5`}>
                                        <div className='flex gap-2'>
                                            <AlignLeft />
                                            <span>Left</span>
                                        </div>
                                        <Check className={`text-purple-800 ${data.alignment === 'left' ? 'opacity-1' : 'opacity-0'} duration-200`} />
                                    </div>
                                    <div onClick={() => setData((prev) => { return { ...prev, alignment: 'right' } })} className={`flex gap-4 rounded-lg border-2 ${data.alignment === 'right' ? 'border-5 border-purple-800' : 'border-gray-300'} p-5`}>
                                        <div className='flex gap-2'>
                                            <AlignRight />
                                            <span>Right</span>
                                        </div>
                                        <Check className={`text-purple-800 ${data.alignment === 'right' ? 'opacity-1' : 'opacity-0'} duration-200`} />
                                    </div>
                                </div>
                                {/* <RadioGroup className='flex gap-4 peer-data-[state=checked]:bg-purple-800' defaultValue="comfortable">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem className='' value="left" id="r1" />
                                        <label htmlFor="r1">Left</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="right" id="r2" />
                                        <label htmlFor="r2">Right</label>
                                    </div>
                                </RadioGroup> */}
                            </div>
                        </div>
                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex gap-4">
                                <Switch 
                                    checked={data.hideBranding}
                                    onCheckedChange={(e) => {
                                        setData((prev) => { return { ...prev, hideBranding: !data.hideBranding } })
                                    }} className='data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-gray-100' 
                                />
                                <label htmlFor="botname" className="text-left">
                                    Remove 'Kulfi AI' branding
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 pt-10 text-[14px] md:text-[16px] border-t-[1px] border-gray-300'>
                        <h3 className="md:text-[24px] font-bold text-gray-500 mb-2">Chatbot Behaviour</h3>
                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="tone" className="text-left">
                                Chatbot Tone
                            </label>
                                <select value={data.tone} onChange={(e) => setData((prev) => { return { ...prev, tone: e.target.value } })} className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg w-full'>
                                    <option value='formal'>Formal - Polite, respectful</option>
                                    <option value='casual'>Casual - Conversational, approachable</option>
                                    <option value='enthusiastic'>Enthusiastic - Lively, motivational</option>
                                    <option value='playful'>Playful - Lighthearted, fun, humorous</option>
                                    <option value='empathetic'>Empathetic - Supportive, understanding</option>
                                    <option value='analytical'>Analytical - Detailed, thorough, and data-focused</option>
                                    <option value='neutral'>Neutral - Clear, straightforward, and objective</option>
                                </select>
                        </div>
                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="tone" className="text-left">
                                Support email/contact number (To be shown when the queries are not being resolved or when users ask for human interaction)
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, escalation: e.target.value } })} value={data.escalation} placeholder='Example: email@domain.com, (555) 555-1234 etc.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg' />                            
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
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Source</h3>
                    <p className='text-[14px] md:text-[16px]'>Manage your Knowledge bases.</p>
                    <div className='flex flex-col md:flex-row gap-3 pt-10 text-[14px] md:text-[16px]'>
                        <div className='flex flex-col gap-2 md:w-[50%] rounded-md border-[1px] border-gray-500 shadow-sm p-3'>
                            <h1>Links</h1>
                            <textarea onChange={(e) => setLinks(e.target.value)} value={links} placeholder='Enter the links in your website containing information.' className='outline-none resize-none w-full h-[150px] border-[1px] border-gray-500 rounded-lg p-2' />
                            <span className='flex gap-1 item-center text-[10px] text-gray-500'><InfoRounded className='!h-[20px] !w-[20px]' /> <span className='flex items-center'>Please do not navigate away from this page until the knowledge base sync has finished.</span></span>
                            <div className='flex justify-end w-full mt-10'>
                                <button onClick={linkSync} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Processing...' : 'Sync Links'}</button>  
                            </div>
                        </div>
                        
                        <div className='flex flex-col justify-between gap-2 md:w-[50%] rounded-md border-[1px] border-gray-500 shadow-sm p-3'>
                            <h1>Knowldge Base PDF Document</h1>  
                            <div className="flex flex-col gap-10 items-start justify-between w-full">
                                <div className='flex flex-col gap-3 border-2 border-gray-500 border-dashed rounded-lg p-4 w-full'>
                                    <strong>Current knowledge base:</strong>
                                    {data && data.fileName ? 
                                    <p className='flex gap-1 mt-4'><File /> {data.fileName}</p> :
                                    <p className='flex gap-1'><FileX /> No documents uploaded</p>}
                                </div>
                                
                                <form className='w-full' onSubmit={handleKBSubmit}>
                                    <div className='flex flex-col gap-1'>
                                        <input accept="application/pdf" id="kb-doc" type="file" onChange={handleKBChange} />
                                        <span className='flex gap-1 item-center text-[10px] text-gray-500'><InfoRounded className='!h-[20px] !w-[20px]' /> <span className='flex items-center'>Please do not navigate away from this page until the knowledge base sync has finished.</span></span>
                                    </div>
                                    <div className='flex justify-end w-full pt-5 md:pt-0'>
                                        <button type='submit' className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isKBLoading ? 'Processing...' : 'Sync Document'}</button>  
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </>
            )
        } else if (section === 'Articles') {
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Articles (Blog)</h3>
                    <p className='text-[14px] md:text-[16px]'>You can add the articles posted in your website here.</p>
                    <div className='flex flex-col gap-5 pt-10 text-[14px] md:text-[16px]'>
                        <div className='flex gap-2'>
                            <div className="flex flex-col gap-4 md:w-[50%]">
                                <label className="text-left">
                                    Title
                                </label>
                                <input onChange={(e) => setArticle((prev) => { return { ...prev, title: e.target.value } })} value={article.title} id='title' placeholder='Enter the title of the article here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                            <div className="flex flex-col gap-4 md:w-[50%]">
                                <label className="text-left">
                                    Link
                                </label>
                                <input onChange={(e) => setArticle((prev) => { return { ...prev, link: e.target.value } })} value={article.link} id='link' placeholder='Enter the link to the article here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Description
                            </label>
                            <textarea onChange={(e) => setArticle((prev) => { return {...prev, description: e.target.value }})} value={article.description} placeholder="Type the description here." className='px-5 py-5 outline-none  border-[1px] border-gray-400  rounded-lg resize-none'></textarea>
                        </div>

                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label className="text-left">Upload Image</label>
                            <input type="file" onChange={handleArticleFileChange} />
                        </div>
                        <div className='flex justify-end items-end'>
                            <button onClick={articlesUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-2 border-2 border-gray-400 pt-5 rounded-lg mt-[50px] hidden md:block'>
                        <h1 className='text-center text-lg font-semibold'>Articles</h1>
                        <table className='w-full'>
                            <thead>
                                <tr className='text-left'>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Title</th>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Description</th>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Link</th>
                                    <th className='p-4 border-t-2 border-r-2 border-gray-400'>Image</th>
                                    <th className='p-4 border-t-2 border-gray-400'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articlesList.length > 0 ? articlesList.map((item, index) => (
                                    <tr key={index} className='text-left text-[14px]'>
                                        <td className='p-4 border-t-2 border-r-2 border-gray-400'>{item.title}</td>
                                        <td className='p-4 border-t-2 border-r-2 border-gray-400'>{item.description}</td>
                                        <td className='p-4 border-t-2 border-r-2 border-gray-400'><a className='flex gap-1 text-blue-400' href={item.link} target='_blank'>{item.link}<ExternalLinkIcon height={20} /></a></td>
                                        <td className='p-4 border-t-2 border-r-2 border-gray-400'>{item.img ? <img className='h-[5rem] w-full  rounded-lg object-cover' src={`data:image/jpeg;base64,${item.img}`} /> : <></>}</td>
                                        <td className='flex justify-center item-center p-4 border-t-2 border-gray-400'><button onClick={() => deleteArticle(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button></td>
                                    </tr>
                                )) : <tr className='text-center'>
                                        <td colSpan={5} className='p-4 border-t-2 border-gray-400'>No records to show</td>
                                    </tr>}
                                
                            </tbody>
                        </table>
                    </div>
                </>
            )
        } else if (section === 'FAQs') {
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">FAQs</h3>
                    <p className='text-[14px] md:text-[16px]'>You can add the questions that are frequently asked by your users here.</p>
                    <div className='flex flex-col gap-5 pt-10'>
                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Enter an FAQ.
                            </label>
                            <input onChange={(e) => setFaq((prev) => { return { ...prev, question: e.target.value } })} value={faq.question} id='question' placeholder='Type you question here.' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                        </div>
                        <div className="flex flex-col gap-4 md:w-[50%]">
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
                                            <button onClick={() => deleteFaq(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion> : <div className='flex justify-center items-center min-h-[10rem]'><h1>No FAQs added at the moment</h1></div>}
                </>
            )
        } else if (section === 'Plan') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Plan</h3>
                    <p>You are currently subscribed to the <strong>Basic</strong> plan. If you wish to cancel this plan please email us at <a className='underline text-blue-600' href='mailto:support@kulfi-ai.com'>support@kulfi-ai.com</a></p>
                </>
            )
        }
    }

    return (
        <main className={`flex items-center gap-4 w-full md:py-[4rem] md:px-[5rem] bg-white rounded-[30px] my-[10px] ${poppins.className}`}>
            <div className="md:flex w-full">
                <ul className="flex md:flex-col gap-2 md:gap-0 md:space-y md:space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0 overflow-x-auto md:overflow-visible py-3 md:py-0">
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
                <div className={`p-6 border-2 border-slate-200 text-medium text-gray-500 rounded-lg w-full ${data ? '' : 'flex justify-center items-center'}`}>
                    {data ? getContent(activeSection, data) : <Loader />}
                </div>
            </div>
        </main>
    );
}
