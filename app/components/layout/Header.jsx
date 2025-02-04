'use client'

import { checkAuth } from '@/lib/helper';
import { AccountCircleOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Poppins } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export const Header = () => {
    const pathname = usePathname();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();
    const loginRef = useRef();

    const submitHandler = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.success) {
            if (data.message._id) {
                localStorage.setItem('objectID', data.message._id)
                router.push('/dashboard');
            } else {
                setError(data.message);
            }
        }
    }

    useEffect(() => {
        // if (loginRef.current && searchParams.get('loginRedirect') === 'true') {
        //     loginRef.current.click();
        // }
    }, [loginRef.current]);

    return (
        pathname !== '/chat' && <header className={`flex items-center ${pathname !== '/get-started' ? 'justify-between' : 'justify-center'} bg-white w-full py-[2px] px-[75px]`}>
            <div className='flex gap-2'>
                <Link href='/' className='text-purple-800 font-bold text-[3rem]'>Lumi.Ai</Link>

            </div>
            {pathname !== '/get-started' && 
            <div className='flex items-center gap-16'>
                <nav>
                    <ul className='flex gap-[5rem] justify-between items-center'>
                        <Link href="/" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Home</Link>
                        {/* <Link href="/pricing" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Pricing</Link> */}
                        <Link href="/contact" className='text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'>Contact</Link>
                    </ul>
                </nav>
                {!checkAuth() ? <div className='flex gap-5'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button ref={loginRef} href="/login" className='bg-purple-800 border-2 border-purple-800 shadow-md hover:bg-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Login</button>
                        </DialogTrigger>
                        <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                            <DialogHeader className='flex flex-col gap-2'>
                                <DialogTitle className='text-[32px]'>Login</DialogTitle>
                                <DialogDescription>
                                    Enter your email address and password.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex flex-col gap-4">
                                    <span className='text-left text-red-700'>{error}</span>
                                    <label htmlFor="email" className="text-left">
                                    Email
                                    </label>
                                    <input onChange={(e) => setCredentials((prev) => { return { ...prev, email: e.target.value } })} value={credentials.email} type='email' id='email' placeholder='Ex: johndoe@gmail.com' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="password" className="text-left">
                                    Username
                                    </label>
                                    <input onChange={(e) => setCredentials((prev) => { return { ...prev, password: e.target.value } })} value={credentials.password} type='password' id='password' placeholder='Enter your password' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                                </div>
                            </div>
                            <DialogFooter>
                                <button onClick={submitHandler} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>Login</button>  
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Link href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Get started</Link>
                </div> : <Link href="/dashboard"><AccountCircleOutlined className='text-purple-800 cursor-pointer' /></Link>}
            </div>}
        </header>
    );
}