'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, Close, EmailOutlined, InfoRounded, Leaderboard, Logout, Newspaper, NoAccounts, Phone, QuestionAnswer, Queue, QueueOutlined, RestartAlt, Restore, Settings, Source, UploadFileTwoTone } from '@mui/icons-material';
import { Inter } from 'next/font/google'
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
import { AlignLeft, AlignRight, BrainCircuit, BrainCircuitIcon, Check, CheckCircleIcon, Clock, Code, CopyIcon, ExternalLinkIcon, Eye, File, FileX, GaugeIcon, ListRestart, Loader2, NotebookTabsIcon, PlusIcon, Save, Tag, TestTube, TrashIcon, Upload, WatchIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import tinycolor from 'tinycolor2';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Header } from '../components/layout/Header';

export const poppins = Inter({
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
    const [hubspot, setHubspot] = useState({
        portal: '',
        form: ''
    });
    const [feedback, setFeedback] = useState();
    const [leadEmail, setLeadEmail] = useState('');
    const [leadWebhook, setLeadWebhook] = useState('');
    const [generalQueries, setGeneralQueries] = useState();
    const [clickData, setClickData] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const [KB, setKB] = useState(null);
    const [links, setLinks] = useState('');
    const [addedLinks, setAddedLinks] = useState([]);
    const [leads, setLeads] = useState([]);
    const [leadForm, setLeadForm] = useState([]);
    const [data, setData] = useState();
    const [messageCount, setMessageCount] = useState(0);
    const [location, setLocation] = useState({});
    const [engagementRate, setEngagementRate] = useState(0);
    const [activeSection, setActiveSection] = useState('Code');
    const [isLoading, setIsLoading] = useState();
    const [isDeleting, setIsDeleting] = useState();
    const [isKBLoading, setIsKBLoading] = useState();
    const [clickSelector, setClickSelector] = useState('Day');
    const [sessionSelector, setSessionSelector] = useState('Day');
    const [isWorkflowSaving, setIsWorkflowSaving] = useState(false);
    const [faq, setFaq] = useState({
        question: '',
        answer: ''
    });
    const [faqList, setFaqList] = useState([]);
    const [leadSave, setLeadSave] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [article, setArticle] = useState({
        title: '',
        description: '',
        link: ''
    });
    const [workflow, setWorkflow] = useState({
        title: '',
        condition: '',
        phrases: '',
        action: '',
        webhook: '',
        parameters: ''
    });
    const [articlesList, setArticlesList] = useState([]);
    const [workflowsList, setWorkflowsList] = useState([]);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [urlParams, setUrlParams] = useState({
        id: '',
        botName: '',
        color: '',
        lColor: '',
        mColor: '',
        cw: '',
        al: ''
    });

    const leadRef = useRef();
    const botLink = useRef();
    const router = useRouter();

    const loadWorkflows = async () => {
        const res = await fetch('/api/get-workflows', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization')
            })
        });
        const data = await res.json();
        if (data.data) {
            setWorkflowsList(data.data);
        } else {
            setWorkflowsList([]);
        }
    }

    const loadFaqs = async () => {
        const res = await fetch('/api/get-questions', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization')
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
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization')
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
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization')
            })
        });
        const data = await res.json();
        if (data.data) {
            console.log('data.datadata.datadata.data', data.data);
            setData(data.data);
            setLeadForm(data.data.leadForm ? data.data.leadForm : []);
            setLeadSave(data.data.leadSave ? data.data.leadSave : '');
            setLeadEmail(data.data.leadEmail ? data.data.leadEmail : '');
            setLeadWebhook(data.data.leadWebhook ? data.data.leadWebhook : '');
            setHubspot(data.data.hubspot ? data.data.hubspot : {
                portal: '',
                form: ''
            });
            let updatedLinks = '';

            if (data.links) {
                data.links.forEach((element, index) => {
                    if (element !== "") {
                        if (index !== data.links.length - 1) {
                            updatedLinks += element.link + '\n';
                        } else {
                            updatedLinks += element.link;
                        }
                    }
                });
                setLinks(updatedLinks);
                setAddedLinks(data.links);
            }

            if (data.fileNames) {
                setFileNames(data.fileNames)
            }
        } else {
            router.push('/');
            logout();
        }
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
        if (e.target.files) {
            if (e.target.files[0].type !== 'application/pdf') {
                toast.error("Please upload a valid PDF file");
                e.target.value = '';
                return;
            }
            setKB(e.target.files);
        }
    }

    useEffect(() => {
        loadData();
        loadWorkflows();
        loadFaqs();
        loadArticles();
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

    const fieldAddHandler = () => {
        setLeadForm((prev) => [
            ...prev,
            {
                id: prev.length !== 0 ? parseInt(prev[prev.length - 1].id) + 1 : 1,
                type: 'text',
                label: '',
                placeholder: '',
                isRequired: false
            }
        ])
    }

    const inputTypeHandler = (id, type, value) => {
        setLeadForm((prev) => {
            const data = prev.map((item) => {
                if (item.id === id) {
                    return ({
                        ...item,
                        [type]: value,
                    });
                } else {
                    return item;
                }
            })
            return data;
        });
    }

    const removeField = (id) => {
        const updatedData = []
        
        leadForm.forEach((item) => {
            if (item.id !== id) {
                updatedData.push(item);
            }
        });
        setLeadForm(updatedData);
    }

    const getField = (item) => {
        if (item) {
            switch (item.type) {
                case 'text':
                    return (
                        <div className='flex justify-between items-center gap-5 w-full'>
                            <div className='flex flex-col w-[20%]'>
                                <label>Field label</label>
                                <input value={item.label} onChange={(e) => inputTypeHandler(item.id, 'label' , e.target.value)} placeholder='Label' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                            </div>
                            <div className='flex flex-col w-[20%]'>
                                <label>Field type</label>
                                <select onChange={(e) => inputTypeHandler(item.id, 'type' , e.target.value)} className='border-2 border-gray-200 rounded-md p-2' value='text'>
                                    <option value='text'>Text</option>
                                    <option value='textarea'>Textarea</option>
                                    <option value='tel'>Phone</option>
                                    <option value='email'>Email</option>
                                </select>
                            </div>
                            <div className='flex flex-col  w-[20%]'>
                                <label>Field Placeholder</label>
                                <input value={item.placeholder} onChange={(e) => inputTypeHandler(item.id, 'placeholder' , e.target.value)} placeholder='Placeholder' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                            </div>
                            <div className='flex gap-2 items-center w-[20%]'>
                                <input checked={item.isRequired} onChange={(e) => inputTypeHandler(item.id, 'isRequired' , e.target.checked)} type='checkbox' />
                                <span>Required</span>
                            </div>
                            <div className='flex justify-center items-end'>
                                <button onClick={() => removeField(item.id)} className='bg-red-500 rounded-md py-2 px-1'><TrashIcon className='h-4 text-white' /></button>
                            </div>
                        </div>
                    );
                
                    case 'textarea':
                        return (
                            <div className='flex justify-between items-center gap-2 w-full'>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field label</label>
                                    <input value={item.label} onChange={(e) => inputTypeHandler(item.id, 'label' , e.target.value)} placeholder='Label' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                </div>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field type</label>
                                    <select onChange={(e) => inputTypeHandler(item.id, e.target.value)} className='border-2 border-gray-200 rounded-md p-2' value='textarea'>
                                        <option value='text'>Text</option>
                                        <option value='textarea'>Textarea</option>
                                        <option value='tel'>Phone</option>
                                        <option value='email'>Email</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field Placeholder</label>
                                    <input value={item.placeholder} onChange={(e) => inputTypeHandler(item.id, 'placeholder' , e.target.value)} placeholder='Placeholder' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                </div>
                                <div className='flex gap-2 items-center w-[20%]'>
                                    <input checked={item.isRequired} type='checkbox' onChange={(e) => inputTypeHandler(item.id, 'isRequired' , e.target.checked)} />
                                    <span>Required</span>
                                </div>
                                <div className='flex justify-center items-end'>
                                    <button onClick={() => removeField(item.id)} className='bg-red-500 rounded-md py-2 px-1'><TrashIcon className='h-4 text-white' /></button>
                                </div>
                            </div>
                        );
                        case 'tel':
                        return (
                            <div className='flex justify-between items-center gap-2 w-full'>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field label</label>
                                    <input value={item.label} onChange={(e) => inputTypeHandler(item.id, 'label' , e.target.value)} placeholder='Label' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                </div>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field type</label>
                                    <select onChange={(e) => inputTypeHandler(item.id, e.target.value)} className='border-2 border-gray-200 rounded-md p-2' value='tel'>
                                        <option value='text'>Text</option>
                                        <option value='textarea'>Textarea</option>
                                        <option value='tel'>Phone</option>
                                        <option value='email'>Email</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-[20%]'>
                                    <label>Field Placeholder</label>
                                    <input value={item.placeholder} onChange={(e) => inputTypeHandler(item.id, 'placeholder' , e.target.value)} placeholder='Placeholder' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                </div>
                                <div className='flex gap-2 items-center w-[20%]'>
                                    <input checked={item.isRequired} onChange={(e) => inputTypeHandler(item.id, 'isRequired' , e.target.checked)} type='checkbox' />
                                    <span>Required</span>
                                </div>
                                <div className='flex justify-center items-end'>
                                    <button onClick={() => removeField(item.id)} className='bg-red-500 rounded-md py-2 px-1'><TrashIcon className='h-4 text-white' /></button>
                                </div>
                            </div>
                        );
                        case 'email':
                            return (
                                <div className='flex justify-between items-center gap-2 w-full'>
                                    <div className='flex flex-col w-[20%]'>
                                        <label>Field label</label>
                                        <input value={item.label} onChange={(e) => inputTypeHandler(item.id, 'label' , e.target.value)} placeholder='Label' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                    </div>
                                    <div className='flex flex-col w-[20%]'>
                                        <label>Field type</label>
                                        <select onChange={(e) => inputTypeHandler(item.id, e.target.value)} className='border-2 border-gray-200 rounded-md p-2' value='email'>
                                            <option value='text'>Text</option>
                                            <option value='textarea'>Textarea</option>
                                            <option value='tel'>Phone</option>
                                            <option value='email'>Email</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-[20%]'>
                                        <label>Field Placeholder</label>
                                        <input value={item.placeholder} onChange={(e) => inputTypeHandler(item.id, 'placeholder' , e.target.value)} placeholder='Placeholder' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                    </div>
                                    <div className='flex gap-2 items-center w-[20%]'>
                                        <input checked={item.isRequired} onChange={(e) => inputTypeHandler(item.id, 'isRequired' , e.target.checked)} type='checkbox' />
                                        <span>Required</span>
                                    </div>
                                    <div className='flex justify-center items-end'>
                                        <button onClick={() => removeField(item.id)} className='bg-red-500 rounded-md py-2 px-1'><TrashIcon className='h-4 text-white' /></button>
                                    </div>
                                </div>
                            );
                default:
                    return <></>
            }
        }
    }

    const sideMenu = [
        {
            id: 1,
            title: 'Code',
            Icon: Code
        },
        {
            id: 2,
            title: 'Analytics',
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
            title: 'Training',
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
            title: 'Membership',
            Icon: Tag
        },
    ];

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
                organization: localStorage.getItem('organization'),
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
            const al = data.alignment;
            setUrlParams(prev => ({
                ...prev,
                botName,
                color,
                lColor,
                mColor,
                cw,
                al,
                organization: localStorage.getItem('organization')
            }));
            localStorage.setItem('botname', botName);
            localStorage.setItem('color', color);
            localStorage.setItem('cw', cw);
            localStorage.setItem('al', al);
            setIsLoading(false);
            toast.success("Settings updated!");            
        } 
    }

    const faqsUpdate = async () => {
        if (faq.question === '' || faq.answer === '') {
            toast.error("Please enter the FAQ details!");
            return;
        }
        setIsLoading(true);
        const res = await fetch('/api/add-question', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization'),
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
                img: base64,
                organization: localStorage.getItem('organization')
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

    const workflowUpdate = async () => {
        setIsWorkflowSaving(true);
        const res = await fetch('/api/save-workflow', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization'),
                workflow
            })
        });
        if (res) {
            setIsWorkflowSaving(false);
            loadWorkflows();
            toast.success("Workflow has been added.");
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
            toast.error("Please enter a valid url!");
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
                organization: localStorage.getItem('organization')
            })
        });
        if (res) {
            setIsDeleting(false);
            loadFaqs();
            toast.success("Item deleted.");
        }
    }

    const deleteArticle = async (id) => {
        setIsDeleting(true);
        const res = await fetch('/api/remove-article', {
            method: 'POST',
            body: JSON.stringify({
                articleId: id,
                organization: localStorage.getItem('organization')
            })
        });
        if (res) {
            loadArticles();
            setIsDeleting(false);
            toast.success("Item deleted.");
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('objectID');
        const botName = localStorage.getItem('botname');
        const color = localStorage.getItem('color');
        const lColor = tinycolor(`#${color}`).lighten(60).toHexString().slice(1)
        const mColor = tinycolor(`#${color}`).lighten(20).toHexString().slice(1)
        const cw = localStorage.getItem('cw');
        const al = localStorage.getItem('al');
        
        if (id && botName && color && cw) {
            setUrlParams({
                id,
                botName,
                color,
                lColor,
                mColor,
                cw,
                al,
                organization: localStorage.getItem('organization')
            });
        } else {
            router.push('/');
            logout();
        }
    }, []);

    const addLinks = async () => {
        setIsLoading(true);
        const splitLinks = links.split('\n');
        const res = await fetch('/api/add-links', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization'),
                links: splitLinks, 
            })
        });
        const data = await res.json()
        if (data) {
            setAddedLinks(data.message)
            setIsLoading(false);
            toast.success("Links have been added and ready to be synced!");
        }
    }

    const linkSync = async () => {
        // setIsLoading(true);
        const splitLinks = links.split('\n');
        for (const link of addedLinks) {
            const res = await fetch('/api/sync-links', {
                method: 'POST',
                body: JSON.stringify({
                    id: localStorage.getItem('objectID'),
                    organization: localStorage.getItem('organization'),
                    link, 
                })
            });
            const data = await res.json();
            if (data) {
            console.log('datadata', data.message);

                setAddedLinks(data.message)
                // setIsLoading(false);
                // toast.success("Links have been synced!");
            }
        }
    }

    const handleKBSubmit = async (e) => {
        e.preventDefault();
        if (!KB) return
    
        try {
          setIsKBLoading(true)
          for (const file of KB) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('id', localStorage.getItem('objectID'))
      
            const response = await fetch(`/api/kb-upload?organization=${localStorage.getItem('organization')}`, {
              method: 'POST',
              body: formData,
            })
      
            if (response) {
              loadData()
            }
          }
        } catch (error) {
          console.error('Upload error:', error)
          alert('Failed to upload or parse PDF.')
        } finally {
          setIsKBLoading(false)
        }
      }

    const getComplaintsSummary = async () => {
        const response = await fetch(`/api/get-complaints?id=${localStorage.getItem('objectID')}&organization=${localStorage.getItem('organization')}`);
        const result = await response.json();
        setComplaints({
            summary: result.data.summary,
            count: result.data.count
        })
    }

    const getFeedbackSummary = async () => {
        const response = await fetch(`/api/get-feedback?id=${localStorage.getItem('objectID')}&organization=${localStorage.getItem('organization')}`);
        const result = await response.json();
        setFeedback({
            summary: result.data.summary,
            count: result.data.count
        })
    }

    const getGeneralSummary = async () => {
        const response = await fetch(`/api/get-general-query?id=${localStorage.getItem('objectID')}&organization=${localStorage.getItem('organization')}`);
        const result = await response.json();
        setGeneralQueries({
            summary: result.data.summary,
            count: result.data.count,
            graphData: result.data.graphData
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

    const hubspotHandler = (key, value) => {
        setHubspot((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const leadSaveHandler = async (value) => {
        setLeadSave(value);
        const res = await fetch('/api/save-lead-type', {
            method: 'POST',
            body: JSON.stringify({
                id: localStorage.getItem('objectID'),
                organization: localStorage.getItem('organization'),
                leadSave: value
            })
        });
        const response = await res.json();
    }

    const getContent = (section, data) => {
        if (section === 'Code') {
            return (
                <>
                    <h3 className="font-bold text-gray-900 mb-2 md:text-[32px]">Welcome {data && data.organization}, </h3>
                    <p className='text-[14px] md:text-[16px]'>This section provides an overview of the information you provided during registration. You can update or manage any details by editing the fields below.</p>
                    <div className='flex flex-col gap-3 pt-5 border-[1px] border-gray-300 p-4 pb-4 mt-4 bg-gray-50 rounded-lg text-[14px]'>
                        <div className='flex justify-between'>
                            <p className='text-[14px]'>Copy and paste this code snippet inside the <span className='font-bold'>{'<head>'}</span> tag of your website.</p>
                            <a target='_blank' href={`/chat?sandbox=true`} className='outline-none flex items-center border-[1px] border-purple-600 shadow-sm rounded-md py-1 px-2 text-[14px] bg-purple-500 text-white hover:bg-white hover:text-purple-500 duration-500'><TestTube height={15} /> Test chatbot</a>
                        </div>
                        
                        <div className='flex flex-col bg-gray-800 w-full p-4 rounded-md shadow-md'>
                            <div className='flex justify-between items-start text-[14px] text-yellow-500 px-1'>
                                <span className='w-[90%] overflow-hidden' ref={botLink}>{`<script src='${encodeURI(`https://kulfi-ai.com/js/loader.js?organization=${urlParams.organization}&al=${urlParams.al}&cw=${urlParams.cw}`)}'></script>`}</span>
                                <button className='border-[1px] border-gray-600 hover:bg-gray-700 p-1 rounded-md' onClick={() => {
                                    navigator.clipboard.writeText(botLink.current.innerText);
                                    toast.success("Code snippet has been copied!");
                                }}><CopyIcon className='h-4 w-4' /></button>
                            </div>
                        </div>
                        <div className='py-5'>
                            <h3 className="font-semibold text-gray-500 mb-2 md:text-[22px]">Instructions</h3>
                            <ol className='flex flex-col'>
                                <li>1. Copy the above code snippet.</li>
                                <li>2. Add your data (Links or PDF) from the 'Training' section and wait for the data to be added.</li>
                                <li>3. Open your project in a code editor, look for the <span className='font-bold'>{'<head>'}</span> section. It should most likely be in a root file for newer technologies (Eg: main.js, index,js) In case of a WordPress website, modify the theme files or install a header modifying plugin.</li>
                                <li>4. Paste the copied snippet.</li>
                                <li>5. Refresh the page.</li>
                                <li>6. You can modify the chatbot according to your website's style and theme.</li>
                            </ol>
                        </div>
                    </div>
                </>
            );
        } else if (section === 'Analytics') {
            return (
                <div className='flex flex-col gap-4 pb-10'>
                        <h3 className="font-bold text-gray-900 mb-2 md:text-[32px]">Analytics</h3>
                        <p className='text-[14px] md:text-[16px]'>This section provides an overview of basic analytics relating to the chatbot.</p>
                        <div className='flex flex-col md:flex-row gap-2 w-full text-[12px]'>
                            <div style={{ height: '20rem' }} className='w-full md:w-1/2'>
                                <div className='flex gap-1 justify-end w-full pb-2'>
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
                                <div className='flex gap-1 justify-end w-full pb-2'>
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

                        <div className='flex items-center justify-center gap-2 mt-[6rem]'>
                            <h3 className="md:text-[14px] font-bold text-gray-500">Engagement Rate: </h3>{engagementRate && engagementRate <= 100 ? <span className='text-[26px] text-purple-800 font-semibold'>{engagementRate + '%'}</span> : <span>No data as of now.</span>}  
                        </div>
                        <div className='flex flex-col justify-center md:flex-row gap-10 w-full mt-[6rem]'>
                            <Table className='border-2 border-purple-200'>
                                <TableCaption className='mt-5'>Demographics</TableCaption>
                                {addedLinks.length === 0 ? <TableCaption className='mt-5'>No links have been added.</TableCaption> : <></>}
                                <TableHeader className='bg-purple-200'>
                                    <TableRow>
                                        <TableHead>Country</TableHead>
                                        <TableHead>Desktop</TableHead>
                                        <TableHead>Mobile</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {location.length > 0 && location.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='flex gap-2 items-center'><img className='h-4' src={item.flag} /> {item.country}</TableCell>
                                            <TableCell>{item.desktop}</TableCell>
                                            <TableCell>{item.mobile}</TableCell>
                                            <TableCell>{item.total}</TableCell>
                                            {/* <TableCell><button onClick={() => alert(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button></TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='flex flex-col justify-center md:flex-row gap-10 w-full mt-[6rem]'>
                            {/* <div style={{ height: '20rem' }} className='w-full md:w-1/2 text-[12px]'>
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
                            </div> */}
                            <div className='flex flex-col justify-even gap-4 md:py-10 w-full md:w-1/2 md:pl-5'>
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1 items-center w-[50%]'>
                                        <span className='h-[10px] w-[10px] bg-red-500 rounded-sm'></span>
                                        <p className='text-[14px]'>Complaints</p>
                                    </div>
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

                                <div className='flex gap-2 items-center justfiy-between'>
                                    <div className='flex gap-1 items-center w-[50%]'>
                                        <span className='h-[10px] w-[10px] bg-yellow-500 rounded-sm'></span>
                                        <p className='text-[14px]'>Feedbacks</p>
                                    </div>
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
                                    <div className='flex gap-1 items-center w-[50%]'>
                                        <span className='h-[10px] w-[10px] bg-emerald-500 rounded-full'></span>
                                        <p className='text-[14px]'>General queries</p>
                                    </div>
                                    <Dialog className='max-w-[15rem]'>
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
                                                        <div style={{ height: '20rem' }} className='w-full'>
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                <BarChart
                                                                    width={500}
                                                                    height={300}
                                                                    data={generalQueries.graphData}
                                                                    margin={{
                                                                        top: 5,
                                                                        right: 30,
                                                                        left: 20,
                                                                        bottom: 5,
                                                                    }}
                                                                >
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="name" />
                                                                    <YAxis />
                                                                    <Tooltip />
                                                                    <Legend />
                                                                    <Bar dataKey="occurrence" fill="#6B21A8" activeBar={<Rectangle fill="#6B21A8" stroke="#6B21A8" />} />
                                                                </BarChart>
                                                            </ResponsiveContainer>
                                                            <h1 className='text-center'>Demographics</h1>
                                                        </div>
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
                <p className='text-[14px] md:text-[16px]'>Manage lead forms and leads generated by the chatbot right here.</p>
                <div className='flex flex-col gap-3 mt-5 text-[14px]'>
                    <h3 className="font-bold text-gray-500 mb-2 text-[22px]">Lead Form</h3>
                    <p className='text-[14px]'>Where do you wish to save your leads?</p>
                    <RadioGroup className='flex gap-2' defaultValue={leadSave}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem onClick={(e) => leadSaveHandler('kulfi')} value="kulfi" id="kulfi" />
                            <label htmlFor="kulfi">Save with Kulfi AI</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem onClick={(e) => leadSaveHandler('email')} value="email" id="email" />
                            <label htmlFor="email">Send as an Email</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem onClick={(e) => leadSaveHandler('webhook')} value="webhook" id="webhook" />
                            <label htmlFor="webhook">Webhook</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem onClick={(e) => leadSaveHandler('hubspot')} value="hubspot" id="hubspot" />
                            <label htmlFor="hubspot">Use hubspot form</label>
                        </div>
                    </RadioGroup>
                    {leadSave === 'kulfi' || leadSave === 'email' || leadSave === 'webhook' ? <div className='flex gap-5'>
                        <div ref={leadRef} className='flex flex-col gap-2 border-2 border-dashed border-gray-200 p-5 w-full rounded-md'>
                            {leadForm.length !== 0 && leadForm.map((item) => {
                                return (
                                    <div key={item.id}>{getField(item)}</div>
                                )
                            })}
                            <button onClick={fieldAddHandler} className='flex items-center'>
                                <PlusIcon className='h-4 text-purple-800' />
                                <h3 className="font-bold text-purple-800 text-[14px]">Add new field</h3>
                            </button>
                            {leadSave === 'email' ? <div className='flex flex-col gap-2 w-[50%] mt-5'>
                                <label>Email address to recieve the leads</label>
                                <input className='p-2 outline-none border-2 border-gray-200' type='email' placeholder='Enter email address' value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)}/>
                            </div> : <></>}
                            {leadSave === 'webhook' ? <div className='flex flex-col gap-2 w-[50%] mt-5'>
                                <label>Webhook Url</label>
                                <input className='p-2 outline-none border-2 border-gray-200' type='url' placeholder='Enter webhook url' value={leadWebhook} onChange={(e) => setLeadWebhook(e.target.value)}/>
                            </div> : <></>}
                            <div className='flex flex-col gap-2'>

                            </div>
                            <div className='flex gap-2 justify-end'>
                                <button onClick={() => setLeadForm([])} className='flex items-center py-2 px-2 bg-purple-800 rounded-md'>
                                    <RestartAlt className='h-4 text-white' />
                                    <h3 className="text-[14px]  text-white">Reset form</h3>
                                </button>
                                <button onClick={async () => {
                                            const res = await fetch('/api/save-form', {
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    id: localStorage.getItem('objectID'),
                                                    organization: localStorage.getItem('organization'),
                                                    leadForm,
                                                    leadEmail,
                                                    leadWebhook
                                                })
                                            });
                                            const response = await res.json();
                                            if (response) {
                                                toast.success('Lead capture form saved!')
                                            }
                                }} className='flex items-center py-2 px-2 bg-purple-800 rounded-md'>
                                    <Save className='h-4 text-white' />
                                    <h3 className="text-[14px]  text-white">Save form</h3>
                                </button>
                            </div>
                        </div>
                    </div> : <></>}
                    {leadSave === 'hubspot' ? <div className='flex flex-col gap-2 border-2 border-dashed border-gray-200 p-5 w-full rounded-md'>
                                <div className='flex gap-2'> 
                                    <div className='flex flex-col w-[40%]'>
                                        <label>Hubspot portal id</label>
                                        <input value={hubspot.portal} onChange={(e) => hubspotHandler('portal', e.target.value)} placeholder='Hubsport portal id' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                    </div>
                                    <div className='flex flex-col w-[40%]'>
                                        <label>Hubspot form id</label>
                                        <input value={hubspot.form} onChange={(e) => hubspotHandler('form', e.target.value)} placeholder='Hubsport form id' className='border-2 border-gray-200 rounded-md p-2' type='text' />
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <button onClick={async () => {
                                                const res = await fetch('/api/save-hubspot', {
                                                    method: 'POST',
                                                    body: JSON.stringify({
                                                        id: localStorage.getItem('objectID'),
                                                        organization: localStorage.getItem('organization'),
                                                        hubspot
                                                    })
                                                });
                                                const response = await res.json();
                                                if (response) {
                                                    toast.success('Hubspot details saved!')
                                                }
                                    }} className='flex items-center py-2 px-2 bg-purple-800 rounded-md'>
                                        <Save className='h-4 text-white' />
                                        <h3 className="text-[14px]  text-white">Save details</h3>
                                    </button>
                                </div>
                            </div> : <></>}
                </div>
                <div className='flex flex-col gap-4 pt-10 text-[14px] md:text-[16px]'>
                    {leadSave === 'kulfi' && leads.map((item, index) => {
                        return (
                        <div key={index} className='flex flex-col gap-2 border-[1px] border-gray-400 rounded-lg p-4'>
                            <div className='flex flex-col'>
                                <h3 className="md:text-[22px] font-bold text-purple-800 mb-2">Lead #{index + 1}</h3>
                                <p className='text-[14px] md:text-[16px]'>The following information was extracted</p>
                                <div className='flex flex-col gap-2 mt-5'>
                                {
                                    Object.entries(JSON.parse(item.leadData)).map((entry, index) => {
                                        let key = entry[0];
                                        let value = entry[1];
                                        return <div key={index} className='flex gap-2'>
                                            <span className='font-semibold'>{key}:</span> {value}
                                        </div>
                                    })
                                }
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 items-center justify-between w-full'>
                                <span className='text-[12px]'>Date: {getLeadDate(item.time)}</span>
                                
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
                    <div className='flex gap-4 pt-10 text-[14px]'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left text-[14px]">
                                Chatbot Name
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, botName: e.target.value } })} value={data.botName} id='botname' placeholder='Example: Lumi AI' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                        </div>
                        <div className="flex flex-col gap-4 w-[50%] text-[14px]">
                            <label htmlFor="domain" className="text-left">
                                Accent Color
                            </label>
                            <div className='flex gap-2'>
                                <select value={data.color} onChange={(e) => setData((prev) => { return { ...prev, color: e.target.value } })} className='p-2 outline-none border-[1px] border-gray-400 rounded-sm w-full'>
                                    <option value='#046e00'>Green</option>
                                    <option value='#4A1D96'>Purple</option>
                                    <option value='#9B1C1C'>Red</option>
                                    <option value='#004b5c'>Green</option>
                                    <option value='#1E429F'>Blue</option>
                                    <option value='#362F78'>Indigo</option>
                                    <option value='#9F580A'>Brown</option>
                                    <option value='#000000'>Black</option>
                                </select>
                                <span style={{ backgroundColor: data.color }} className={`w-[40%] md:w-[10%] rounded-sm`}></span>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 pt-10 pb-10 text-[14px]'>
                        <div className="flex flex-col gap-4 w-[50%]">
                            <label htmlFor="botname" className="text-left text-[14px]">
                                Chat window width (Preferred range: 350px to 450px)
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, cw: e.target.value } })} value={data.cw} id='cw' placeholder='Example: 400' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                        </div>
                    </div>

                    <div className='flex gap-4 pb-10 text-[14px]'>
                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left text-[14px]">
                                    Upload Bot Icon
                                </label>
                                <input className='text-[14px]' key={1} type="file" onChange={(e) => handleBotIconChange(e)} />
                            </div>
                            <div className="flex flex-col gap-4">
                                {data.botIcon ? <img className='h-[3rem] max-w-[3rem] rounded-lg object-cover border-[1px] border-gray-200 rounded-md p-1' src={`data:image/jpeg;base64,${data.botIcon}`} /> : <></>}
                                {data.botIcon ? <div><button onClick={() => setData((prev) => { return { ...prev, botIcon: null } })} className='bg-transparent text-red-500 text-[12px]'><Close className='text-red-500 text-[12px]' /> Remove image</button></div> : <></>}
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left text-[14px]">
                                    Upload Bot Avatar
                                </label>
                                <input className='text-[14px]' key={2} type="file" onChange={(e) => handleAvatarChange(e)} />
                            </div>
                            <div className="flex flex-col gap-4">
                                {data.botAvatar ? <img className='h-[3rem] max-w-[3rem] rounded-lg object-cover border-[1px] border-gray-200 rounded-md p-1' src={`data:image/jpeg;base64,${data.botAvatar}`} /> : <></>}
                                {data.botAvatar ? <div><button onClick={() => setData((prev) => { return { ...prev, botAvatar: null } })} className='bg-transparent text-red-500 text-[12px]'><Close className='text-red-500 text-[12px]' /> Remove image</button></div> : <></>}
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 pb-10 text-[14px]'>
                        <div className='flex items-center gap-2 w-[50%]'>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="botname" className="text-left">
                                    Bot position
                                </label>
                                <div className='flex gap-2 w-full'>
                                    <div onClick={() => setData((prev) => { return { ...prev, alignment: 'left' } })} className={`flex gap-4 rounded-sm border-2 ${data.alignment === 'left' ? 'border-5 border-purple-800' : 'border-gray-300'} p-5`}>
                                        <div className='flex gap-2'>
                                            <AlignLeft />
                                            <span>Left</span>
                                        </div>
                                        <Check className={`text-purple-800 ${data.alignment === 'left' ? 'opacity-1' : 'opacity-0'} duration-200`} />
                                    </div>
                                    <div onClick={() => setData((prev) => { return { ...prev, alignment: 'right' } })} className={`flex gap-4 rounded-sm border-2 ${data.alignment === 'right' ? 'border-5 border-purple-800' : 'border-gray-300'} p-5`}>
                                        <div className='flex gap-2'>
                                            <AlignRight />
                                            <span>Right</span>
                                        </div>
                                        <Check className={`text-purple-800 ${data.alignment === 'right' ? 'opacity-1' : 'opacity-0'} duration-200`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 pb-10 text-[14px]'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <label htmlFor="initial" className="text-left">
                                Initial message
                            </label>
                            <textarea onChange={(e) => setData((prev) => { return { ...prev, initialmsg: e.target.value } })} value={data.initialmsg} placeholder='Enter the chatbot`s initial message.' className='outline-none resize-none w-full h-[150px] border-[1px] border-gray-500 rounded-sm p-2' />
                        </div>


                        <div className='flex flex-col gap-2 w-[50%]'>
                            <label htmlFor="initial" className="text-left">
                                Message box placeholder
                            </label>
                            <textarea onChange={(e) => setData((prev) => { return { ...prev, placeholder: e.target.value } })} value={data.placeholder} placeholder='Enter the chat message box placeholder text.' className='outline-none resize-none w-full h-[150px] border-[1px] border-gray-500 rounded-sm p-2' />
                        </div>
                    </div>

                        <div className='flex items-center gap-2 w-[50%] pb-10 text-[14px]'>
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

                    <div className='flex flex-col gap-4 pt-10 text-[14px] md:text-[16px] border-t-[1px] border-gray-300'>
                        <h3 className="text-[22px] font-bold text-gray-500 mb-2">Chatbot Behaviour</h3>
                        <div className='flex gap-4 w-full'>
                        <div className="flex flex-col gap-4 md:w-[50%] text-[14px]">
                            <label htmlFor="tone" className="text-left">
                                Chatbot Tone
                            </label>
                                <select value={data.tone} onChange={(e) => setData((prev) => { return { ...prev, tone: e.target.value } })} className='p-2 outline-none border-[1px] border-gray-400 rounded-sm w-full text-[14px]'>
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
                            <label htmlFor="tone" className="text-left text-[14px]">
                                Support email/contact Number
                                {/* (To be shown when the queries are not being resolved or when users ask for human interaction) */}
                            </label>
                            <input onChange={(e) => setData((prev) => { return { ...prev, escalation: e.target.value } })} value={data.escalation} placeholder='Example: email@domain.com, (555) 555-1234 etc.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm text-[14px]' />                            
                        </div>
                        </div>
                        

                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="response_length" className="text-left text-[14px]">
                                Chatbot response length
                            </label>
                            <select value={data.responselength} onChange={(e) => setData((prev) => { return { ...prev, responselength: e.target.value } })} className='p-2 outline-none border-[1px] border-gray-400 rounded-sm w-full text-[14px]'>
                                <option value='short'>Short</option>
                                <option value='medium'>Medium</option>
                                <option value='long'>Long</option>
                            </select>                         
                        </div>

                        <div className='flex items-center gap-2 w-[50%] mt-10 text-[14px]'>
                            <div className="flex gap-4 w-[50%]">
                                <Switch 
                                    checked={data.showimg}
                                    onCheckedChange={(e) => {
                                        setData((prev) => { return { ...prev, showimg: !data.showimg } })
                                    }} className='data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-gray-100' 
                                />
                                <label htmlFor="botname" className="text-left">
                                    Show images
                                </label>
                            </div>
                            <div className="flex gap-4 w-[50%]">
                                <Switch 
                                    checked={data.showsource}
                                    onCheckedChange={(e) => {
                                        setData((prev) => { return { ...prev, showsource: !data.showsource } })
                                    }} className='data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-gray-100' 
                                />
                                <label htmlFor="botname" className="text-left">
                                    Show sources
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end mt-10'>
                        <button onClick={settingsUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Updating...' : 'Update'}</button>  
                    </div>
                </>
            )
        } else if (section === 'Training') {

            const deleteFile = async (id) => {
                setIsDeleting(true);
                const res = await fetch('/api/remove-kb', {
                    method: 'POST',
                    body: JSON.stringify({
                        id,
                        organization: localStorage.getItem('organization')
                    })
                });
                if (res) {
                    loadData();
                    setIsDeleting(false);
                    toast.success("File deleted.");
                }
            }
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">Training</h3>
                    <p className='text-[14px] md:text-[16px]'>Manage your Knowledge bases and train your AI bot from this section.</p>
                    <div className='flex flex-col md:flex-row gap-3 pt-10 text-[14px] md:text-[16px]'>
                        <div className='flex flex-col gap-2 md:w-[50%] rounded-sm border-[1px] border-gray-200 shadow-lg p-3 text-[14px]'>
                            <h1>Links</h1>
                            <textarea onChange={(e) => setLinks(e.target.value)} value={links} placeholder='Enter the links in your website containing information.' className='outline-none resize-none w-full h-[150px] border-[1px] border-gray-200 shadow-inner bg-gray-50 rounded-sm p-2' />
                            <span className='flex gap-1 item-center text-[10px] text-gray-500'><InfoRounded className='!h-[20px] !w-[20px]' /> <span className='flex items-center'>Please do not navigate away from this page until the knowledge base sync has finished.</span></span>
                            <div className='flex justify-end w-full mt-10'>
                                <button onClick={addLinks} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Processing...' : 'Add Links'}</button>  
                            </div>
                        </div>
                        
                        <div className='flex flex-col justify-between gap-2 md:w-[50%] rounded-sm border-[1px] border-gray-200 shadow-lg p-3 text-[14px]'>
                            <h1>PDF Document</h1>  
                            <div className="flex flex-col gap-10 items-start justify-between w-full">
                                <div className='flex flex-col gap-3 border-[1px] border-gray-200 shadow-inner border-dashed bg-gray-50 rounded-sm p-4 w-full'>
                                    <strong>Current knowledge base:</strong>
                                    {fileNames.length ? 
                                    fileNames.map((item, index) => {
                                        return (
                                            <div key={item.id} className='flex flex-col justify-between gap-1'>
                                                <div className='flex gap-2 items-center'>
                                                    <p className='flex gap-1'><File /> {item.fileName}</p>
                                                    <button onClick={() => deleteFile(item.id)} className='px-2 py-1'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-red-500 w-[16px]' />}</button>                                                    
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <p className='flex gap-1'><FileX /> No documents uploaded</p>}
                                </div>
                                
                                <form className='w-full' onSubmit={handleKBSubmit}>
                                    <div className='flex flex-col gap-1'>
                                        <input accept="application/pdf" id="kb-doc" type="file" onChange={handleKBChange} multiple />
                                        <span className='flex gap-1 item-center text-[10px] text-gray-500'><InfoRounded className='!h-[20px] !w-[20px]' /> <span className='flex items-center'>Please do not navigate away from this page until the knowledge base sync has finished.</span></span>
                                    </div>
                                    <div className='flex justify-end w-full pt-5 md:pt-0'>
                                        <button type='submit' className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isKBLoading ? 'Processing...' : 'Sync Document'}</button>  
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 mt-2 pt-5 rounded-lg mt-[50px]'>
                        <div className='flex justify-start items-center gap-2'>
                            <h3 className="md:text-[16px] font-bold text-gray-500">Added Links</h3>
                            <button onClick={linkSync} className='flex items-center bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-1 px-2 duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-[12px]'><BrainCircuitIcon className='h-3' /> Start training AI</button>
                        </div>
                        <Table className='border-2 border-purple-200'>
                            {addedLinks.length === 0 ? <TableCaption className='mt-5'>No links have been added.</TableCaption> : <></>}
                            <TableHeader className='bg-purple-200'>
                                <TableRow>
                                    <TableHead>Links</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {addedLinks.length > 0 && addedLinks.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.link}</TableCell>
                                        <TableCell>
                                            {item.status === 'pending' ? <Loader2 className='text-purple-800 animate-spin' /> : <></>}
                                            {item.status === 'not-started' ? <Clock className='text-purple-800 h-4' /> : <></>}
                                            {item.status === 'completed' ? <CheckCircleIcon className='text-emerald-500 h-4' /> : <></>}
                                        </TableCell>
                                        {/* <TableCell><button onClick={() => alert(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button></TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='flex flex-col gap-4 pt-10 text-[14px] md:text-[16px] border-t-[1px] border-gray-300 mt-5'>
                        <h3 className="text-[22px] font-bold text-gray-500 mb-2">Custom Workflows</h3>
                        <p className='text-[14px]'>You can add your custom workflows here.</p>
                        <div className='flex flex-col gap-5 pt-10 text-[14px]'>
                            <div className='flex flex-col md:flex-row gap-2'>
                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label className="text-left">
                                        Title
                                    </label>
                                    <input onChange={(e) => setWorkflow((prev) => { return { ...prev, title: e.target.value } })} value={workflow.title} id='title' placeholder='Enter the name of your workflow.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                                </div>
                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label className="text-left">
                                        Condition
                                    </label>
                                    <textarea onChange={(e) => setWorkflow((prev) => { return { ...prev, condition: e.target.value } })} value={workflow.condition} id='condition' placeholder='Enter the condition in which the workflow is to be triggered.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm' />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-2'>
                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label htmlFor="botname" className="text-left">
                                        Training Phrases
                                    </label>
                                    <textarea onChange={(e) => setWorkflow((prev) => { return {...prev, phrases: e.target.value }})} value={workflow.phrases} placeholder="Example prompts to train the chatbot separated by commas" className='p-2 outline-none  border-[1px] border-gray-400  rounded-sm resize-none'></textarea>
                                </div>
                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label htmlFor="botname" className="text-left">
                                        Action
                                    </label>
                                    <textarea onChange={(e) => setWorkflow((prev) => { return {...prev, action: e.target.value }})} value={workflow.action} placeholder="The action that the chatbot must take." className='p-2 outline-none  border-[1px] border-gray-400  rounded-sm resize-none'></textarea>
                                </div>
                            </div>
                            
                            <div className='flex flex-col md:flex-row gap-2'>
                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label className="text-left">
                                        Webhook (if any)
                                    </label>
                                    <input type='url' onChange={(e) => setWorkflow((prev) => { return { ...prev, webhook: e.target.value } })} value={workflow.webhook} id='webhook' placeholder='Enter any webhooks you need to call.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                                </div>

                                <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                    <label className="text-left">
                                        Webhook parameters
                                    </label>
                                    <input onChange={(e) => setWorkflow((prev) => { return { ...prev, parameters: e.target.value } })} value={workflow.parameters} id='parameters' placeholder='Webhook parameters, comma separated' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                                </div>
                            </div>
                            
                            <div className='flex justify-end items-end'>
                                <button onClick={workflowUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                            </div>

                            <div className='flex flex-col gap-5 mt-2 pt-5 rounded-lg mt-[50px]'>
                                <h3 className="md:text-[16px] font-bold text-gray-500 mb-2">Workflows</h3>
                                <Table className='border-2 border-purple-200'>
                                    {workflowsList.length === 0 ? <TableCaption className='mt-5'>No workflows have been added.</TableCaption> : <></>}
                                    <TableHeader className='bg-purple-200'>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Phrases</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Webhook</TableHead>
                                            <TableHead>Parameters</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {workflowsList.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.condition}</TableCell>
                                                <TableCell>{item.phrases}</TableCell>
                                                <TableCell>{item.action}</TableCell>
                                                <TableCell>{item.webhook}</TableCell>
                                                <TableCell>{item.parameters}</TableCell>
                                                <TableCell><button onClick={() => alert(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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
                    <div className='flex flex-col gap-5 pt-10 text-[14px]'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                <label className="text-left">
                                    Title
                                </label>
                                <input onChange={(e) => setArticle((prev) => { return { ...prev, title: e.target.value } })} value={article.title} id='title' placeholder='Enter the title of the article here.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                            </div>
                            <div className="flex flex-col gap-4 w-full md:w-[50%]">
                                <label className="text-left">
                                    Link
                                </label>
                                <input onChange={(e) => setArticle((prev) => { return { ...prev, link: e.target.value } })} value={article.link} id='link' placeholder='Enter the link to the article here.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Description
                            </label>
                            <textarea onChange={(e) => setArticle((prev) => { return {...prev, description: e.target.value }})} value={article.description} placeholder="Type the description here." className='p-2 outline-none  border-[1px] border-gray-400  rounded-sm resize-none'></textarea>
                        </div>

                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label className="text-left">Upload Article Thumbnail</label>
                            <input type="file" onChange={handleArticleFileChange} />
                        </div>
                        <div className='flex justify-end items-end'>
                            <button onClick={articlesUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-2 pt-5 rounded-lg mt-[50px]'>
                        <h3 className="md:text-[16px] font-bold text-gray-500 mb-2">Articles</h3>
                        <Table className='border-2 border-purple-200'>
                            {articlesList.length === 0 ? <TableCaption className='mt-5'>There are no records at the moment.</TableCaption> : <></>}
                            <TableHeader className='bg-purple-200'>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Link</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articlesList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.link}</TableCell>
                                        <TableCell className="text-right">{item.img ? <img className='h-[5rem] w-full  rounded-lg object-cover' src={`data:image/jpeg;base64,${item.img}`} /> : <></>}</TableCell>
                                        <TableCell><button onClick={() => deleteArticle(item.id)} className='px-2 py-1 bg-red-500 rounded-full shadow-md'>{isDeleting ? <Loader2 className='text-white animate-spin' /> : <TrashIcon className='text-white w-[16px]' />}</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )
        } else if (section === 'FAQs') {
            return (
                <>
                    <h3 className="md:text-[32px] font-bold text-gray-900 mb-2">FAQs</h3>
                    <p className='text-[14px] md:text-[16px]'>You can add the questions that are frequently asked by your users here.</p>
                    <div className='flex flex-col gap-5 pt-10 text-[14px]'>
                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Enter an FAQ.
                            </label>
                            <input onChange={(e) => setFaq((prev) => { return { ...prev, question: e.target.value } })} value={faq.question} id='question' placeholder='Type you question here.' className='p-2 outline-none border-[1px] border-gray-400 rounded-sm'></input>
                        </div>
                        <div className="flex flex-col gap-4 md:w-[50%]">
                            <label htmlFor="botname" className="text-left">
                                Enter the answer to you FAQ.
                            </label>
                            <textarea onChange={(e) => setFaq((prev) => { return {...prev, answer: e.target.value }})} value={faq.answer} placeholder="Type your answer here." className='p-2 outline-none  border-[1px] border-gray-400 rounded-sm resize-none'></textarea>
                        </div>
                        <div className='flex justify-end items-end'>
                            <button onClick={faqsUpdate} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? 'Saving...' : 'Save'}</button>  
                        </div>
                    </div>
                    {faqList && faqList.length > 0 ? <Accordion type="single" collapsible className="w-full border-2 border-gray-200 p-2 px-5 rounded-sm shadow-md mt-5">
                        <h1 className='mt-5 text-purple-800 font-semibold'>FAQs List</h1>
                        {faqList.map((item, index) => {
                            return (
                                <AccordionItem className={index === faqList.length - 1 ? 'border-0' : ''} key={item.id} value={`item-${item.id}`}>
                                    <AccordionTrigger className='text-[14px] font-semibold'>{index + 1 + '. ' + item.question}</AccordionTrigger>
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
        } else if (section === 'Membership') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Plan</h3>
                    <p>You are currently subscribed to the <strong>Basic</strong> plan. If you wish to cancel this plan please email us at <a className='underline text-blue-600' href='mailto:support@kulfi-ai.com'>support@kulfi-ai.com</a></p>
                </>
            )
        }
    }

    return (
        
        <>
        <Header />
        <main className={`flex items-center gap-4 w-full md:py-[4rem] md:px-[5rem] bg-white rounded-[30px] my-[10px] ${poppins.className}`}>            
            <div className="md:flex w-full">
                <ul className="flex md:flex-col gap-2 md:gap-0 md:space-y md:space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0 overflow-x-auto md:overflow-visible py-3 md:py-0">
                    {sideMenu.map(({ Icon, ...item}) => (
                        <li key={item.id}>
                            <button onClick={() => setActiveSection(item.title)} className={`inline-flex items-center px-4 py-3 ${activeSection === item.title ? 'border-l-4 hover:text-white border-purple-800 hover:bg-purple-700 text-purple-800' : 'hover:bg-gray-200'} w-full gap-2 duration-200`} aria-current="page">
                                <Icon />
                                {item.title}
                            </button>
                        </li>
                    ))}
                    <div className='flex flex-col items-center gap-5 border-2 border-slate-200 px-4 py-3 rounded-lg'>
                        
                        <div className='flex flex-col'>
                            <h3 className="flex gap-2 md:text-[14px] font-bold text-gray-500 mb-2"><span>Chats:</span> <span>{messageCount}/500</span></h3>   
                            <Progress indicatorClass='bg-purple-700' value={messageCount * 100/500} />
                        </div>
                        <Dialog open={logoutModalOpen}>
                            <DialogTrigger asChild>
                            <li>
                                <button onClick={() => { setLogoutModalOpen(true); }} className='inline-flex items-center px-2 py-1 rounded-md bg-purple-800 text-white hover:bg-purple-700 hover:text-gray-100 border-2 border-purple-800 duration-200' aria-current="page">
                                    <Logout className='h-4' />
                                    Logout
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
                                    <button onClick={async () => {
                                        const response = await fetch('/api/logout', {
                                            method: 'GET',
                                        });
                                        const data = await response.json();
                                        if (data.message) {
                                            logout();
                                            router.push('/');
                                        }
                                    }} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Yes</button>  
                                    <button onClick={() => setLogoutModalOpen(false)} className='bg-white border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-purple-500 py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>No</button>  
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ul>
                <div className={`p-6 border-2 border-slate-200 text-medium text-gray-500 rounded-sm w-full shadow-md ${data ? '' : 'flex justify-center items-center'}`}>
                    {data ? getContent(activeSection, data) : <Loader />}
                </div>
            </div>
        </main>
        </>
        
    );
}
