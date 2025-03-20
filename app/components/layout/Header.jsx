'use client'

import { Cases, CasesRounded, CloseTwoTone, LoginRounded } from '@mui/icons-material';
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
import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { Eye, HomeIcon, Loader2, LogInIcon, LucideEye, LucideEyeClosed, LucideGoal, LucidePlaneTakeoff, MenuIcon, Phone, PlaneTakeoffIcon, PlayIcon, ShapesIcon, SquareMousePointerIcon, Tag, UserCheck, WorkflowIcon } from 'lucide-react';
import { checkAuth, getCookie } from '@/lib/helper';

export const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export const Header = () => {
    const pathname = usePathname();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [auth, setAuth] = useState();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [ls, setLs] = useState(false);
    const router = useRouter();
    const loginRef = useRef();

    const submitHandler = async () => {
        setIsLoading(true);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.success) {
            setIsLoading(false);
            if (data.message._id) {
                localStorage.setItem('objectID', data.message._id)
                localStorage.setItem('organization', data.message.organization)
                localStorage.setItem('color', data.message.color.slice(1))
                localStorage.setItem('botname', data.message.botName)
                localStorage.setItem('cw', data.message.cw)
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
    }, [pathname]);

    useEffect(() => {
        setAuth(getCookie('organization') && getCookie('email'));
    }, [])

    return (
        pathname !== '/chat' && 
        <div className={`flex flex-col md:flex-row w-full px-[10px] md:px-[25px] py-[2px] z-[10] ${pathname !== '/' ? 'border-[1px] border-gray-200' : ''}`}>
            <header className={`flex items-center ${pathname !== '/get-started' ? 'justify-between' : 'justify-center'} w-full py-[2px] px-[10px] md:px-[75px]`}>
                <div className='pb-2'>
                    <Link href='/' className='flex items-center gap-2 text-purple-800 font-bold text-[3rem]'>
                        <img style={{ width: '12rem' }} src="images/kulfi_logo.png" alt="bot"/>
                    </Link>
                </div>
                {pathname !== '/get-started' && 
                <>
                <div className='md:hidden flex flex-col'>
                    {auth ? <Link title='Profile' className='flex gap-1 bg-purple-200 hover:bg-purple-300 duration-300 p-2 rounded-full hover:cursor-pointer' href="/dashboard"><img style={{ width: '25px' }} src="images/user.png" alt="bot"/></Link> :
                    <button className='text-purple-800' onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? <CloseTwoTone /> : <MenuIcon />}</button>}
                </div>
                <div className='hidden md:flex items-center gap-16'>
                    {!auth ? <div className='flex items-center gap-5'>
                        <Link className='flex gap-1 text-purple-800 font-semibold' href=''><WorkflowIcon /> Use Cases</Link>
                        <button className='flex gap-1 text-purple-800 font-semibold'><ShapesIcon /> Book a Demo</button>
                        <Dialog onOpenChange={(open) => {
                            if (!open) {
                                setCredentials({
                                    email: '',
                                    password: ''
                                });
                            }
                        }}>
                            <DialogTrigger asChild>
                                <button ref={loginRef} className='flex gap-1 bg-purple-800 border-2 border-purple-800 shadow-md hover:bg-purple-200 hover:text-purple-800 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Login</button>
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
                                        Password
                                        </label>
                                        <input onChange={(e) => setCredentials((prev) => { return { ...prev, password: e.target.value } })} value={credentials.password} type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter your password' className='px-5 py-5 outline-none border-[1px] border-gray-400 rounded-lg'></input>
                                        <div className='flex justify-end'>
                                            <button onClick={() => setShowPassword(prev => !prev)}>
                                                {!showPassword ? <LucideEye className='relative top-[-60px] right-4 text-purple-800 cursor-pointer' /> : <LucideEyeClosed className='relative top-[-60px] right-4 text-purple-800 cursor-pointer' />} 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button onClick={submitHandler} className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-white hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold'>{isLoading ? <div className='flex gap-2 items-center'>
                                        <Loader2 className='animate-spin hover:text-purple-500' />
                                        <p className='hover:text-purple-500'>Logging in</p>
                                    </div> : 'Login'}</button>  
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Link href="/get-started" className='bg-purple-500 border-2 border-purple-500 shadow-md hover:bg-purple-200 hover:text-purple-500 text-white py-3 px-7 duration-200 hover:cursor-pointer rounded-[30px] font-semibold hover:scale-[1.1] duration-100'>Try for free!</Link>
                        </div> : auth ? <Link title='Profile' className='flex gap-1 bg-purple-200 hover:bg-purple-300 duration-300 p-2 rounded-full hover:cursor-pointer' href="/dashboard"><img style={{ width: '25px' }} src="images/user.png" alt="bot"/></Link> : <></>}                        
                </div></>}
            </header>
            {isOpen ?
            <div className={`absolute top-[80px] left-0 bg-white md:hidden flex flex-col w-full border-[1px] border-gray-400 ${isOpen ? 'opacity-1' : 'opacity-0'} duration-1000`}>
                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><WorkflowIcon /> Use cases</Link>
                </div>
                <div className='py-4 px-[10px] w-full border-b-[1px] border-gray-400'>
                    <Link href="/pricing" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><ShapesIcon /> Book a Demo</Link>
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
                    <Link href="/get-started" className='flex gap-1 text-purple-800 hover:cursor-pointer duration-100'><SquareMousePointerIcon /> Try for free!</Link>
                </div>
            </div> : <></>}
        </div>
    );
}