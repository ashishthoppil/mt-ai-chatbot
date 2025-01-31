'use client';

import { logout } from '@/lib/helper';
import { AccountCircleOutlined, Logout, LogoutOutlined, Newspaper, QuestionAnswer, Settings, Source } from '@mui/icons-material';
import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

export default function Dashboard() {
    const [data, setData] = useState();
    const [activeSection, setActiveSection] = useState('Profile');

    const loadData = async () => {
        const res = await fetch('/api/dashboard', {
            method: 'GET',
        });
        const data = await res.json();
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

    const getContent = (section) => {
        if (section === 'Profile') {
            return (
                <>
                    <h3 className="font-bold text-gray-900 mb-2 text-[32px]">Profile</h3>
                    <p>An overview of the information that you provided during the registration process. You can manage your information from this section by editing the fields below.</p>
                </>
            );
        } else if (section === 'Settings') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Settings</h3>
                    <p>You can customize your chatbot from this section.</p>
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
                </>
            )
        } else if (section === 'Logout') {
            return (
                <>
                    <h3 className="text-[32px] font-bold text-gray-900 mb-2">Logout?</h3>
                    <div className='flex flex-col gap-10'>
                        <p>Do you really wish to logout?</p>
                        <button onClick={() => logout()} className='flex gap-2 px-3 py-2 bg-purple-800 hover:bg-purple-700 rounded-lg text-white w-[10%]'><LogoutOutlined />Yes</button>
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
                            <button onClick={() => setActiveSection(item.title)} className={`inline-flex items-center px-4 py-3 rounded-lg  ${activeSection === item.title ? 'bg-purple-800 text-white hover:bg-purple-700 hover:text-gray-100' : 'bg-gray-50 hover:bg-gray-200'} w-full gap-2 duration-200`} aria-current="page">
                                <Icon />
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
                    {getContent(activeSection)}
                </div>
            </div>
        </main>
    );
}
