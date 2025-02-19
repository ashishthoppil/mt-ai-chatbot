'use client'

import { AccountCircleOutlined, CloseTwoTone, Login, LoginOutlined, LoginRounded, LoginTwoTone, PriceChange, VerifiedUserOutlined } from '@mui/icons-material';
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
import { HomeIcon, LogInIcon, LucideGoal, LucidePlaneTakeoff, MenuIcon, Phone, PlaneTakeoffIcon, PlayIcon, Tag } from 'lucide-react';

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
    const [isOpen, setIsOpen] = useState(false);
    const [ls, setLs] = useState(false);
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
                localStorage.setItem('color', data.message.color.slice(1))
                localStorage.setItem('botname', data.message.botName)
                router.push('/dashboard');
            } else {
                setError(data.message);
            }
        }
    }

    // useEffect(() => {
        // if (loginRef.current && searchParams.get('loginRedirect') === 'true') {
        //     loginRef.current.click();
        // }
    // }, [loginRef.current]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname])

    useEffect(() => {
        if (localStorage) {
            setLs(true);
        }
    }, [])

    return (
        pathname !== '/chat' && 
        <div className='flex flex-col md:flex-row w-full z-[10] '>
            <header className={`flex items-center ${pathname !== '/get-started' ? 'justify-between' : 'justify-center'} bg-purple-100 w-full py-[2px] px-[10px] md:px-[75px]`}>
                <div className='flex gap-2'>
                    <Link href='/' className='text-purple-800 font-bold text-[3rem]'>Kulfi.</Link>
                </div>
                {pathname !== '/get-started' && 
                <>
                <div className='md:hidden flex flex-col'>
                    <button className='text-purple-800' onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? <CloseTwoTone /> : <MenuIcon />}</button>
                </div>
                <div className='hidden md:flex items-center gap-16'>
                    <nav>
                        <ul className='flex gap-[5rem] justify-between items-center'>
                            <Link href="/" className='flex gap-1 text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'><HomeIcon /> Home</Link>
                            <Link href="/pricing" className='flex gap-1 text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'><Tag /> Pricing</Link>
                            <Link href="/contact" className='flex gap-1 text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100'><Phone /> Contact</Link>
                        </ul>
                    </nav>
                    {ls && localStorage && !localStorage.getItem('objectID') ? <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button ref={loginRef} href="/login" className='flex gap-1 bg-purple-800 border-2 border-purple-800 shadow-md hover:bg-white hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Login</button>
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
                    </div> : ls ? <Link className='flex gap-1 text-purple-800 hover:cursor-pointer hover:scale-[1.1] duration-100' href="/dashboard"><AccountCircleOutlined className='text-purple-800 cursor-pointer' />Profile</Link> : <></>}
                </div></>}
            </header>
            {isOpen ?
            <div className='absolute top-[65px] left-0 bg-white md:hidden flex flex-col w-full border-[1px] border-gray-400'>
                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><HomeIcon /> Home</Link>
                </div>
                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/pricing" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><Tag /> Pricing</Link>
                </div>
                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/contact" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><PlayIcon /> Contact</Link>  
                </div>

                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button ref={loginRef} className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><LoginRounded /> Login</button>
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
                </div>

                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/get-started" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><LucidePlaneTakeoff /> Get started</Link>
                </div>
            </div> : <></>}
        </div>
    );
}