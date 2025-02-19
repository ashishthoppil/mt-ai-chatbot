'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, InfoRounded, Logout, Newspaper, NoAccounts, QuestionAnswer, Settings, Source, UploadFileTwoTone } from '@mui/icons-material';
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
import { CopyIcon, ExternalLinkIcon, Eye, File, FileX, Loader2, Tag, TrashIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import tinycolor from 'tinycolor2';

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
    const [KB, setKB] = useState(null);
    const [links, setLinks] = useState('');
    const [data, setData] = useState();
    const [activeSection, setActiveSection] = useState('Profile');
    const [isLoading, setIsLoading] = useState();
    const [isDeleting, setIsDeleting] = useState();
    const [isKBLoading, setIsKBLoading] = useState();
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
        mColor: ''
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
            title: 'Articles',
            Icon: Newspaper
        },
        {
            id: 5,
            title: 'FAQs',
            Icon: QuestionAnswer
        },
        {
            id: 6,
            title: 'Plan',
            Icon: Tag
        },
        
        {
            id: 7,
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
        if (data.botName === '') {
            toast.error("Please enter all required fields!");
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
            setUrlParams(prev => ({
                ...prev,
                botName,
                color,
                lColor,
                mColor
            }));
            localStorage.setItem('botname', botName);
            localStorage.setItem('color', color);
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

        
        if (id && botName && color) {
            setUrlParams({
                id,
                botName,
                color,
                lColor,
                mColor
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

    const getContent = (section, data) => {
        if (section === 'Profile') {
            return (
                <>
                    <h3 className="font-bold text-gray-900 mb-2 md:text-[32px]">Welcome {data && data.organization}, </h3>
                    <p className='text-[14px] md:text-[16px]'>This is an overview of the information that you provided during the registration process. You can manage your information from this section by editing the fields below.</p>
                    <div className='flex flex-col gap-3 pt-5 border-[1px] border-gray-300 p-4 pb-4 mt-4 bg-gray-50 rounded-lg'>
                        <p className='text-[14px] md:text-[16px]'>Copy and paste this code snippet in the <span className='font-bold'>{'<head><head/>'}</span> section of your code.</p>
                        <div className='flex flex-col bg-gray-800 w-full p-4 rounded-md shadow-md'>
                            <div className='flex justify-between items-start text-[14px] md:text-[16px] text-yellow-500 px-1'>
                                <span className='w-[90%] overflow-hidden' ref={botLink}>{`<script src='https://kulfi-ai.com/js/loader.js?id=${urlParams.id}&bn=${urlParams.botName}&cc=${urlParams.color}&lc=${urlParams.lColor}&mc=${urlParams.mColor}'></script>`}</span>
                                <button className='border-[1px] border-gray-600 hover:bg-gray-700 p-1 rounded-md' onClick={() => {
                                    navigator.clipboard.writeText(botLink.current.innerHTML);
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
                    <div className='flex flex-col gap-4 pt-10'>
                        <h3 className="font-bold text-gray-500 mb-2 text-[24px]">Reports</h3>
                        <div className='flex flex-col md:flex-row justify-even gap-2 md:gap-20 md:py-10'>
                            <div className='flex gap-2 items-center'>
                                <span className='h-[10px] w-[10px] bg-red-500 rounded-sm'></span>
                                <strong>Complaints</strong>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className='outline-none flex gap-1 border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-0 hover:bg-purple-800 hover:text-white duration-500' onClick={getComplaintsSummary}><Eye height={15} /></button>
                                        </DialogTrigger>
                                        <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                            <DialogHeader className='flex flex-col gap-2'>
                                                <DialogTitle className='text-[22px]'>Complaints Summary</DialogTitle>
                                            </DialogHeader>
                                                {complaints ? <div className="flex flex-col gap-4 py-4">
                                                    <p>There are <strong>{complaints.count}</strong> in total</p>
                                                    <p>Summary: {complaints.summary}</p>
                                                </div> : <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                        </DialogContent>
                                    </Dialog>
                            </div>

                            <div className='flex gap-2 items-center'>
                                <span className='h-[10px] w-[10px] bg-yellow-500 rounded-sm'></span>
                                <strong>Feedbacks</strong>
                                <Dialog>
                                        <DialogTrigger asChild>
                                        <button className='outline-none flex gap-1 border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-0 hover:bg-purple-800 hover:text-white duration-500' onClick={getFeedbackSummary}><Eye height={15} /></button>
                                        </DialogTrigger>
                                        <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                            <DialogHeader className='flex flex-col gap-2'>
                                                <DialogTitle className='text-[22px]'>Feedback Summary</DialogTitle>
                                            </DialogHeader>
                                                {feedback ? <div className="flex flex-col gap-4 py-4">
                                                    <p>There are <strong>{feedback.count}</strong> in total</p>
                                                    <p>Summary: {feedback.summary}</p>
                                                </div> : <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                        </DialogContent>
                                    </Dialog>
                            </div>

                            <div className='flex gap-2 items-center'>
                                <span className='h-[10px] w-[10px] bg-emerald-500 rounded-sm'></span>
                                <strong>General queries</strong>
                                <Dialog>
                                        <DialogTrigger asChild>
                                            <button className='outline-none flex gap-1 border-[1px] border-gray-200 shadow-sm rounded-sm py-1 px-0 hover:bg-purple-800 hover:text-white duration-500' onClick={getGeneralSummary}><Eye height={15} /></button>
                                        </DialogTrigger>
                                        <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                                            <DialogHeader className='flex flex-col gap-2'>
                                                <DialogTitle className='text-[22px]'>General Summary</DialogTitle>
                                            </DialogHeader>
                                                {generalQueries ? <div className="flex flex-col gap-4 py-4">
                                                    <p>There are <strong>{generalQueries.count}</strong> in total</p>
                                                    <p>Summary: {generalQueries.summary}</p>
                                                </div> : <div className='flex justify-center text-[16px] text-gray-500'><Loader /></div>}
                                        </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else if (section === 'Settings') {
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Settings</h3>
                    <p className='text-[14px] md:text-[16px]'>You can customize your chatbot from this section.</p>
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
                    <p>You are currently subscribed to the <strong>Basic</strong> plan. If you wish to cancel this plan please email us at <a className='underline text-blue-600' href='mailto:contact@kulfi.com'>contact@kulfi.com</a></p>
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
