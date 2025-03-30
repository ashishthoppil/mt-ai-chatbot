'use client';

import { ArrowCircleLeftRounded, ArrowCircleRightOutlined, ArrowLeftOutlined, ArrowLeftRounded, CheckBox, CheckCircle, CheckCircleOutline, CheckOutlined, SelectAllRounded, Timer } from '@mui/icons-material';
import { LucideEye, LucideEyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Inter } from 'next/font/google';
import { Header } from '../components/layout/Header';

export const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
});

const Step1 = ({ formData, setFormData, nextStep }) => {
    const [error, setError] = useState(false);

    const submitHandler = () => {
        if(formData.organization === '') {
            setError(true)
        } else {
            nextStep()
        }
    }

    return (
        <div className='flex flex-col gap-[5rem] justify-center w-full h-[55vh]'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-5 items-start'>
                    <Link href='/'><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></Link>
                    <div className='flex flex-col gap-4'>
                        <h1 className='font-semibold md:text-2xl text-purple-800'>What is your organization called?</h1>
                        <h1 className='font-normal text-sm md:text-md text-gray-500'>This will help us set up the infrastructure for a smooth integration experience.</h1>
                    </div> 
                </div>
                <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <input autoFocus placeholder='Example: Acme Pvt Ltd' onChange={(e) => setFormData({ ...formData, organization: e.target.value })} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        submitHandler()
                    }
                }} value={formData.organization} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
                {error && <span className='text-red-700'>Please fill this field!</span>}
            </div>
        </div>
)};

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);

    const submitHandler = async () => {
        const re = /\S+@\S+\.\S+/;
        const emailFormat = re.test(formData.email); 
        if(formData.email === '') {
            setError('Please enter your email address!');
        } else {
            if (!emailFormat) {
                setError('Please enter a valid email address!')
            } else {
                const response = await fetch('/api/check-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (data.success) {
                    if (data.data.length > 0) {
                        setError('<div>This email address already exists! <a class="underline text-purple-800" href="/?loginRedirect=true">Click here to Login.</a></div>');
                    } else {
                        nextStep()
                    }
                }
            }
        }
    }

    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
            <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold md:text-2xl text-purple-800'>What is your email address?</h1>
                <h1 className='font-normal text-sm md:text-md text-gray-500'>We will use this email address for updates and future support.</h1>
            </div>
            </div>
            <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input autoFocus placeholder='Example: www.web-address.com' onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submitHandler()
                }
            }} onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} type='email' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span dangerouslySetInnerHTML={{ __html: error }} className='text-red-700' />}
        </div>
    </div>
)};

const PasswordStep = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = () => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if(formData.password === '') {
            setError('Please fill this field!')
        } else if (!regex.test(formData.password)) {
            setError('The password should consist of one digit, one lowercase letter, one uppercase letter, one special character (@$!%*?&) and atleast 8 characters long.')
        } else {
            nextStep()
        }
    }

    return (
        <div className='flex flex-col gap-[5rem] justify-center  w-full h-[55vh]'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-5 items-start'>
                    <Link href='/'><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></Link>
                    <div className='flex flex-col gap-4'>
                        <h1 className='font-semibold md:text-2xl text-purple-800'>Type your password</h1>
                        <h1 className='font-normal text-sm md:text-md text-gray-500'>Please keep your password confidential.</h1>
                    </div> 
                </div>
                <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                    <input autoFocus onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitHandler()
                        }
                    }} placeholder='Enter you password here.' onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} type={showPassword ? 'text' : 'password'} className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
                    <div className='flex justify-end'>
                        <button onClick={() => setShowPassword(prev => !prev)}>
                            {!showPassword ? <LucideEye className='relative top-[-60px] right-4 text-purple-800 cursor-pointer' /> :<LucideEyeClosed className='relative top-[-60px] right-4 text-purple-800 cursor-pointer' />} 
                        </button>
                    </div>
                {error && <span className='text-red-700'>{error}</span>}
            </div>
        </div>
)};

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);

    const submitHandler = () => {
        const re = /^(https?|ftp):\/\/([^\s\/]*)\.([^\s\/]*)(?:\/[^\s]*)?$/i;
        const websiteFormat = re.test(formData.website); 
        if(formData.website === '') {
            setError('Please enter your website url!');
        } else {
            if (!websiteFormat) {
                setError('Please enter a valid website url!')
            } else {
                nextStep()
            }
        }
    }

    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
        <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold md:text-2xl text-purple-800'>What is your website url? (Format should be https://xyz.com)</h1>
                <h1 className='font-normal text-sm md:text-md text-gray-500'>This will help us set up the infrastructure for a smooth integration experience.</h1>
            </div>
            </div>
            <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input autoFocus onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submitHandler()
                }
            }} placeholder='Example: www.web-address.com' onChange={(e) => setFormData({ ...formData, website: e.target.value })} value={formData.website} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>{error}</span>}
        </div>
    </div>
)};

const Step4 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);

    const submitHandler = () => {
        if(formData.domain === '') {
            setError(true)
        } else {
            nextStep()
        }
    }

    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
        <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold md:text-2xl text-purple-800'>What is your organization about?</h1>
                <h1 className='font-normal text-sm md:text-md text-gray-500'>This will help us set up the infrastructure for a smooth integration experience.</h1>
            </div>
            </div>
            <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input autoFocus onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submitHandler()
                }
            }} placeholder='Example: Automobiles, Real Estate, Restaurant etc.' onChange={(e) => setFormData({ ...formData, domain: e.target.value })} value={formData.domain} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>Please fill this field!</span>}
        </div>
    </div>
)};

const Step5 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);

    const submitHandler = () => {
        if(formData.botName === '') {
            setError(true)
        } else {
            nextStep()
        }
    }

    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex gap-5 items-start'>
            <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold md:text-2xl text-purple-800'>What would you like to call your AI chatbot?</h1>
                    <h1 className='font-normal text-sm md:text-md text-gray-500'>This will help us set up the infrastructure for a smooth integration experience.</h1>
                </div>
            </div>
            <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-lg'><span>Next</span><ArrowCircleRightOutlined className='text-xs md:text-md' /></button>
        </div>
        <div className='flex flex-col gap-4  w-full'>
            <input autoFocus onKeyDown={(e) => {
                if (e.key === 'Enter' && formData.botName !== '') {
                    submitHandler()
                }
            }} placeholder='Example: Eyecart AI, Hello Luna etc.' onChange={(e) => setFormData({ ...formData, botName: e.target.value })} value={formData.botName} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>Please fill this field!</span>}
        </div>
    </div>
)};

const Step6 = ({ formData, setFormData, prevStep, submitForm, isLoading }) => {
    const [error, setError] = useState(false);
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-start gap-5'>
                <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold md:text-2xl text-purple-800'>Choose a color for your chatbot.</h1>
                    <h1 className='font-normal text-sm md:text-md text-gray-500'>This will help us set up the infrastructure for a smooth integration experience.</h1>
                </div>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <button onClick={() => {
                        if (!isLoading) {
                            if(formData.color === '') {
                                setError(true)
                            } else {
                                submitForm()
                            }
                        }
                    }} className={`flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold text-xs md:text-md ${isLoading ? 'pointer-events-none bg-purple-300': ''}`}><span className='text-xs md:text-lg'>{isLoading ? 'Loading..': 'Submit'}</span><ArrowCircleRightOutlined  className='text-xs md:text-md' /></button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[425px] ${poppins.className}`}>
                    <DialogHeader className='flex flex-col gap-2'>
                        <DialogTitle className='text-[32px] text-center'></DialogTitle>
                        <DialogDescription asChild>
                            <div className='flex items-center justify-center text-center'>
                                {isLoading ? <div className='flex flex-col items-center justify-center gap-2'>
                                    <Timer width={150} height={150} className='text-purple-800' />
                                    <span className='text-[22px] font-semibold mt-2'>Processing</span>
                                    <span className='mt-1'>Your data is being processed, this might take a while. Please do not move away from this tab or window.</span>
                                </div> : <div className='flex flex-col items-center justify-center gap-2'>
                                        <CheckCircleOutline width={150} height={150} className='text-emerald-500' />
                                        <span className='text-[22px] font-semibold mt-2'>Successfully completed!</span  >
                                        <span className='mt-1'>Your data has been saved successfully. You will be redirected to the dasboard in 3 seconds.</span>
                                    </div>}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        
        <div className='flex justify-between w-full'>
            <button onClick={() => setFormData({ ...formData, color: '#046e00' })} className={`h-8 w-8 bg-[#046e00] shadow-md`}>{formData.color === '#046e00' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#4A1D96' })} className={`h-8 w-8 bg-[#4A1D96] shadow-md`}>{formData.color === '#4A1D96' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#9B1C1C' })} className={`h-8 w-8 bg-[#9B1C1C] shadow-md`}>{formData.color === '#9B1C1C' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#004b5c' })} className={`h-8 w-8 bg-[#004b5c] shadow-md`}>{formData.color === '#004b5c' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#1E429F' })} className={`h-8 w-8 bg-[#1E429F] shadow-md`}>{formData.color === '#1E429F' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#362F78' })} className={`h-8 w-8 bg-[#362F78] shadow-md`}>{formData.color === '#362F78' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#9F580A' })} className={`h-8 w-8 bg-[#9F580A] shadow-md`}>{formData.color === '#9F580A' && <CheckOutlined className='text-white' />}</button>
            <button onClick={() => setFormData({ ...formData, color: '#000000' })} className={`h-8 w-8 bg-[#000000] shadow-md`}>{formData.color === '#000000' && <CheckOutlined className='text-white' />}</button>
        </div>
        {error && <span className='text-red-700'>Please select a color!</span>}

    </div>
)};

const Error = ({ reset }) => {
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-center w-full'>
            <div className='flex items-start gap-5'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold text-2xl text-purple-800'>Looks like something went wrong.</h1>
                    <h1 className='font-normal text-md text-gray-500'>But fear not, you can always start anew! Click <button className='underline text-purple-800' onClick={reset}>here</button> to start over.</h1>
                </div>
            </div>
        </div>
    </div>
)};

const MultiStepForm = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    password: '',
    website: '',
    domain: '',
    botName: '',
    color: '#4A1D96',
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const reset = () => setCurrentStep(1);


  const submitForm = async () => {
    setIsLoading(true);
    const res = await fetch('/api/company-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success && data.data.acknowledged) {
        setIsLoading(false);
        const id = data.data.insertedId;
        localStorage.setItem('objectID', id);
        localStorage.setItem('organization', formData.organization);
        localStorage.setItem('color', formData.color.slice(1));
        localStorage.setItem('botname', formData.botName);
        localStorage.setItem('cw', '400');
        localStorage.setItem('al', 'r');

        setTimeout(() => {
            window.location.href = `/dashboard?free-trial=true`;   
        }, 3000);
    } else {
        console.log('Error: ', data)
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <PasswordStep formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step4 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />; 
      case 6:
        return <Step5 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <Step6 formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} isLoading={isLoading} />;
      default:
        return <Error reset={reset} />;
    }
  };

  return (
        <>
            <Header />
            <div className='flex justify-center w-full'>            
                <div className='flex flex-col items-start gap-10 bg-white rounded-[20px] md:w-[75%] px-5 py-10 h-[80vh]'>
                    <hr style={{ width: `${(currentStep / 7) * 100}%`, transitionDuration: '1s' }} className='h-1 bg-purple-800 rounded' />
                    {renderStep()}
                </div>
            </div>
        </>
    )
};

export default MultiStepForm;