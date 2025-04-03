'use client';

import { BuildCircleOutlined, LocationOn } from '@mui/icons-material';
import { CopyrightIcon } from 'lucide-react';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Test() {

    useEffect(() => {
        const pathname = window.location.href;
        var urlObject = new URL(pathname);
        var organization = urlObject.searchParams.get('o');
        var cw = urlObject.searchParams.get('cw');
        var al = urlObject.searchParams.get('al');
        var c = urlObject.searchParams.get('c');

        window.chatbotConfig = { organization, cw, al, c };

        var chatbotScript = document.createElement('script');
        chatbotScript.src = `/js/chatbot.js`;
        chatbotScript.async = true;
        document.head.appendChild(chatbotScript);
    }, []);

   
    return (
        <div className={`flex justify-center items-center h-screen w-full ${inter.className}`}>
            This is the test interface. Your chatbot will load in  5 seconds.
        </div>
    );
}
