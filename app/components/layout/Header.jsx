'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [currentLoc, setCurrentLoc] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            setCurrentLoc(pathname);
        }
    }, [pathname]);
    return (
        currentLoc !== '/chat' && <header className={`flex items-center ${currentLoc !== '/get-started' ? 'justify-between' : 'justify-center'} bg-white w-full py-[2px] px-[75px]`}>
            <div className='flex gap-2'>
                <Link href='/' className='text-purple-800 font-bold text-[3rem]'>Kulfi.</Link>
            </div>
            {currentLoc !== '/get-started' && <nav>
                <ul className='flex gap-[5rem] justify-between items-center'>
                    <Link href="/" className='text-purple-800 hover:underline hover:cursor-pointer'>Home</Link>
                    <Link href="/pricing" className='text-purple-800 hover:underline hover:cursor-pointer'>Pricing</Link>
                    <Link href="/contact" className='text-purple-800 hover:underline hover:cursor-pointer'>Contact</Link>
                </ul>
            </nav>}
            {currentLoc !== '/get-started' && <div className='flex gap-2'>
                <Link href="/login" className='bg-purple-800 border-2 border-purple-800 shadow-md hover:bg-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Login</Link>
                <Link href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Get started</Link>
            </div>}
        </header>
    );
}