'use client'

import { checkAuth } from '@/lib/helper';
import { AccountCircleOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
    const pathname = usePathname();

    return (
        pathname !== '/chat' && <header className={`flex items-center ${pathname !== '/get-started' ? 'justify-between' : 'justify-center'} bg-white w-full py-[2px] px-[75px]`}>
            <div className='flex gap-2'>
                <Link href='/' className='text-purple-800 font-bold text-[3rem]'>Kulfi.</Link>
            </div>
            {pathname !== '/get-started' && 
            <div className='flex items-center gap-16'>
                <nav>
                    <ul className='flex gap-[5rem] justify-between items-center'>
                        <Link href="/" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Home</Link>
                        <Link href="/pricing" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Pricing</Link>
                        <Link href="/contact" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Contact</Link>
                    </ul>
                </nav>
                
                {!checkAuth() ? <div className='flex gap-5'>
                    <Link href="/login" className='bg-purple-800 border-2 border-purple-800 shadow-md hover:bg-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Login</Link>
                    <Link href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Get started</Link>
                </div> : <Link href="/dashboard"><AccountCircleOutlined className='text-purple-800 cursor-pointer' /></Link>}
            </div>}
        </header>
    );
}