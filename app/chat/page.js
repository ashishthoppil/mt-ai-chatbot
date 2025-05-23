'use client';

import { ABeeZee } from 'next/font/google'
import { TextChat } from '../components/TextChat';
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { ArrowDown, ArrowDown10, Loader2, MessageCircle, Minimize2Icon, NewspaperIcon, ShieldQuestion, ShieldQuestionIcon } from 'lucide-react';

export const poppins = ABeeZee({
  subsets: ['latin'],
  weight: ['400'], 
})

export default function Chat() {

    const [data, setData] = useState();
    const [botInfo, setBotInfo] = useState();    
    const [articlesList, setArticlesList] = useState([]);
    const [faqList, setFaqList] = useState([]);
    const [section, setSection] = useState(0);

    const loadData = async () => {
      const pathname = window.location.href;
      var url = new URL(pathname);
      const id = url.searchParams.get('id');
      const userId = Math.floor((Math.random() * 9999999) + 1);
      const organization = url.searchParams.get('o');
      const isSandBox = url.searchParams.get('sandbox');

      const res = await fetch('/api/dashboard', {
        method: 'POST',
        body: JSON.stringify({
            id,
            organization: organization ? organization : 'Lumiscent India'
        })
      });
            
      const data = await res.json();
            
      if (data.data) {
        const lColor = `#${tinycolor(data.data.color).lighten(60).toHexString().slice(1)}`
        const mColor = `#${tinycolor(data.data.color).lighten(20).toHexString().slice(1)}`
        setBotInfo({
          id,
          organization: data.data.organization,
          color: data.data.color,
          lColor,
          mColor, 
          botName: data.data.botName,
          userId,
          botIcon: data.data.botIcon,
          botAvatar: data.data.botAvatar,
          hideBranding: data.data.hideBranding,
          initialmsg: data.data.initialmsg,
          placeholder: data.data.placeholder,
          leadSave: data.data.leadSave,
          leadEmail: data.data.leadEmail,
          leadWebhook: data.data.leadWebhook,
          hubspot: data.data.hubspot,
          subscriptionName: data.data.subscriptionName,
          isSandBox: isSandBox === true || isSandBox === 'true'
        });  
        loadFaqs(id, organization);
        loadArticles(id, organization);   
      }
         
    }

    const loadFaqs = async (id, organization) => {
      const res = await fetch('/api/get-questions', {
          method: 'POST',
          body: JSON.stringify({
              id,
              organization: organization ? organization : 'Lumiscent India'
          })
      });
      const data = await res.json();
      if (data.data) {
          setFaqList(data.data);
      } else {
          setFaqList([]);
      }
  }

  const loadArticles = async (id, organization) => {
    const res = await fetch('/api/get-articles', {
        method: 'POST',
        body: JSON.stringify({
            id,
            organization: organization ? organization : 'Lumiscent India'
        })
    });
    const data = await res.json();
    if (data.data) {
        setArticlesList(data.data);
    } else {
        setArticlesList([]);
    }
}
  
    useEffect(() => {
      loadData();
    }, []);

    useEffect(() => {
      document.documentElement.style.overflow = "hidden";
  
      return () => {
        document.documentElement.style.overflow = "";
      };
    }, []);

    return (
      botInfo ? 
      <div className='w-full content-center' style={{ backgroundColor: botInfo.isSandBox ? 'white' : botInfo.color }}>
        <main className={`flex flex-col items-center justify-between gap-4 flex-grow mx-auto ${botInfo.isSandBox ? 'w-full md:w-[28%] border-2 border-b-0 border-gray-200' : 'w-[95%]'} ${poppins.className}`}>
          <header style={{ backgroundColor: botInfo.color }} className={`fixed top-0 z-50 flex justify-between md:px-[25px] py-[10px] px-[10px] max-w-screen mx-auto ${botInfo.isSandBox ? 'w-full md:w-[28%]' : 'w-full'} gap-2 items-center h-[75px]`}>
            <div className='flex items-center gap-3 w-full max-w-screen-md mx-auto'>
                {
                  botInfo.botIcon ? 
                    <img className='h-[45px] w-[45px] max-w-[45px] rounded-[50%] object-top object-cover p-1' src={`data:image/jpeg;base64,${botInfo.botIcon}`} /> : 
                    <span className='bg-gray-100 text-gray-500 rounded-full p-[5px]'>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M0 0 C12.54 0 25.08 0 38 0 C38 10.23 38 20.46 38 31 C35.69 31.66 33.38 32.32 31 33 C28.61998931 34.65373979 28.61998931 34.65373979 26.6875 36.625 C23.18163265 40 23.18163265 40 21 40 C21 37.03 21 34.06 21 31 C14.07 31 7.14 31 0 31 C0 20.77 0 10.54 0 0 Z M10 10 C10 11.32 10 12.64 10 14 C11.32 14 12.64 14 14 14 C14 12.68 14 11.36 14 10 C12.68 10 11.36 10 10 10 Z M24 10 C24 11.32 24 12.64 24 14 C25.32 14 26.64 14 28 14 C28 12.68 28 11.36 28 10 C26.68 10 25.36 10 24 10 Z M15 19 C15.99 20.485 15.99 20.485 17 22 C19.47266765 21.65555119 19.47266765 21.65555119 22 21 C22.33 20.34 22.66 19.68 23 19 C20.36 19 17.72 19 15 19 Z " fill={botInfo.color} transform="translate(6,10)"/>
                        <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill={botInfo.color} transform="translate(46,19)"/>
                        <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill={botInfo.color} transform="translate(0,19)"/>
                        <path d="M0 0 C1.98 0 3.96 0 6 0 C6.125 5.75 6.125 5.75 5 8 C3.68 8 2.36 8 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill={botInfo.color} transform="translate(22,0)"/>
                      </svg>
                    </span>
                }
              <h1 className='font-bold text-[20px] text-white'>{botInfo && botInfo.botName}</h1>
            </div>
            <div className='flex gap-3 items-center'>
              <MessageCircle onClick={() => setSection(0)} className='text-white cursor-pointer h-5' />
              {faqList.length > 0 ? <ShieldQuestionIcon onClick={() => setSection(2)} className='text-white cursor-pointer h-5' /> : <></>}
              {articlesList.length > 0 ? <NewspaperIcon onClick={() => setSection(1)} className='text-white cursor-pointer h-5' /> : <></>}
            </div>
          </header>
          <div className={`${section === 0 ? 'h-[75vh]' : 'h-[90vh]'} rounded-lg md:rounded-b-none z-[9] bg-white mt-[75px] w-full`}>
            <TextChat data={data} botInfo={botInfo} articlesList={articlesList} faqList={faqList} section={section} />
          </div>
        </main>
      </div> : <div className='flex flex-col items-center gap-3 absolute left-[42%] top-[50%]'><Loader2 className='animate-spin text-gray-400 size-10' /><span className={`text-[14px] text-gray-500 ${poppins.className}`}>LOADING</span></div>
    );
}
