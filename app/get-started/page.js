'use client';

import { ArrowCircleLeftRounded, ArrowCircleRightOutlined, ArrowLeftOutlined, ArrowLeftRounded, CheckBox, CheckCircle, CheckCircleOutline, CheckOutlined, SelectAllRounded } from '@mui/icons-material';
import { useState } from 'react';

const Step1 = ({ formData, setFormData, nextStep }) => {
    const [error, setError] = useState(false);
    return (
        <div className='flex flex-col gap-[5rem] justify-center  w-full h-[55vh]'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold text-2xl text-purple-800'>What is your organization called?</h1>
                    <h1 className='font-normal text-md text-gray-500'>This will help us to customize the chatbot for your needs.</h1>
                </div> 
                <button onClick={() => {
                    if(formData.organization === '') {
                        setError(true)
                    } else {
                        nextStep()
                    }
                }} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
            </div>
            <div className='flex flex-col gap-4  w-full'>
                <input placeholder='Example: Acme Pvt Ltd' onChange={(e) => setFormData({ ...formData, organization: e.target.value })} value={formData.organization} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
                {error && <span className='text-red-700'>Please fill this field!</span>}
            </div>
        </div>
)};

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
        <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold text-2xl text-purple-800'>What is your email address?</h1>
                <h1 className='font-normal text-md text-gray-500'>We will use this email address for updates and future support.</h1>
            </div>
            </div>
            <button onClick={async () => {
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
                                setError('This email address already exists!');
                            } else {
                                nextStep()
                            }
                        }
                    }
                }
            }} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input placeholder='Example: www.web-address.com' onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>{error}</span>}
        </div>
    </div>
)};

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
        <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold text-2xl text-purple-800'>What is your website url?</h1>
                <h1 className='font-normal text-md text-gray-500'>This will help us to customize the chatbot for your needs.</h1>
            </div>
            </div>
            <button onClick={() => {
                const re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
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
            }} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input placeholder='Example: www.web-address.com' onChange={(e) => setFormData({ ...formData, website: e.target.value })} value={formData.website} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>{error}</span>}
        </div>
    </div>
)};

const Step4 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5 items-start'>
        <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
            <div className='flex flex-col gap-4'>
                <h1 className='font-semibold text-2xl text-purple-800'>What is your organization about?</h1>
                <h1 className='font-normal text-md text-gray-500'>This will help us to customize the chatbot for your needs.</h1>
            </div>
            </div>
            <button onClick={() => {
                    if(formData.domain === '') {
                        setError(true)
                    } else {
                        nextStep()
                    }
                }} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <input placeholder='Example: Automobiles, Real Estate, Restaurant etc.' onChange={(e) => setFormData({ ...formData, domain: e.target.value })} value={formData.domain} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
            {error && <span className='text-red-700'>Please fill this field!</span>}
        </div>
    </div>
)};

const Step5 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [error, setError] = useState(false);
    return (
    <div className='flex flex-col gap-[5rem] justify-center items-center w-full h-[55vh]'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex gap-5 items-start'>
            <button onClick={prevStep}><ArrowCircleLeftRounded className='text-purple-800 mt-1' /></button>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold text-2xl text-purple-800'>What would you like to call your AI chatbot?</h1>
                    <h1 className='font-normal text-md text-gray-500'>This will help us to customize the chatbot for your needs.</h1>
                </div>
            </div>
            <button onClick={() => {
                    if(formData.botName === '') {
                        setError(true)
                    } else {
                        nextStep()
                    }
                }} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
        </div>
        <div className='flex flex-col gap-4  w-full'>
            <input placeholder='Example: Eyecart AI, Hello Luna etc.' onChange={(e) => setFormData({ ...formData, botName: e.target.value })} value={formData.botName} type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-4 py-5 rounded-lg shadow-md w-full' />
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
                    <h1 className='font-semibold text-2xl text-purple-800'>Choose a color for your chatbot.</h1>
                    <h1 className='font-normal text-md text-gray-500'>This will help us to customize the chatbot for your needs.</h1>
                </div>
            </div>
            <button onClick={() => {
                if (!isLoading) {
                    if(formData.color === '') {
                        setError(true)
                    } else {
                        submitForm()
                    }
                }
            }} className={`flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold ${isLoading ? 'pointer-events-none bg-purple-300': ''}`}><span>{isLoading ? 'Loading..': 'Next'}</span><ArrowCircleRightOutlined /></button>
        </div>
        
        <div className='flex justify-between w-full'>
            <button onClick={() => setFormData({ ...formData, color: 'bg-yellow-500' })} className={`h-8 w-8 bg-yellow-500 shadow-md`}>{formData.color === 'bg-yellow-500' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-purple-800' })} className={`h-8 w-8 bg-purple-800 shadow-md`}>{formData.color === 'bg-purple-800' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-red-800' })} className={`h-8 w-8 bg-red-800 shadow-md`}>{formData.color === 'bg-red-800' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-emerald-800' })} className={`h-8 w-8 bg-emerald-800 shadow-md`}>{formData.color === 'bg-emerald-800' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-sky-800' })} className={`h-8 w-8 bg-sky-800 shadow-md`}>{formData.color === 'bg-sky-800' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-indigo-800' })} className={`h-8 w-8 bg-indigo-800 shadow-md`}>{formData.color === 'bg-indigo-800' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-orange-400' })} className={`h-8 w-8 bg-orange-400 shadow-md`}>{formData.color === 'bg-orange-400' && <CheckOutlined/>}</button>
            <button onClick={() => setFormData({ ...formData, color: 'bg-gray-900' })} className={`h-8 w-8 bg-gray-900 shadow-md`}>{formData.color === 'bg-gray-900' && <CheckOutlined/>}</button>
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
    website: '',
    domain: '',
    botName: '',
    color: 'bg-purple-800',
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
    window.location.href = '/dashboard';
    // Handle form submission logic here (e.g., send to API)
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />; 
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6 formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} isLoading={isLoading} />;
      default:
        return <Error reset={reset} />;
    }
  };

  return <div className='flex flex-col items-start gap-10 bg-white rounded-[20px] w-[75%] px-5 py-10'>
            <hr style={{ width: `${(currentStep / 6) * 100}%`, transitionDuration: '1s' }} className='h-1 bg-purple-800 rounded' />
            {renderStep()}
        </div>;
};

export default MultiStepForm;


// import { Poppins } from 'next/font/google'
// import { Header } from '../components/layout/Header';
// import { ArrowCircleRightOutlined } from '@mui/icons-material';
// import { useEffect, useState } from 'react';

// export const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'], 
// })

// export default function GetStarted() {

//     const [companyInfo, setCompanyInfo] = useState({
        // companyName: '',
        // website: '',
        // employees: '',
        // domain: '',
        // botName: '',
        // color: '',
//     });

//     const [index, setIndex] = useState(0);

//     const formSaver = () => {
//         const element = document.getElementById(`value_${index}`)
//         if (index === 0) {
//             setCompanyInfo(prev => { return { ...prev, companyName: element.value } });
//         } else if (index === 1) {
//             setCompanyInfo(prev => { return { ...prev, website: element.value } });
//         } else if (index === 2) {
//             setCompanyInfo(prev => { return { ...prev, employees: element.value } });
//         } else if (index === 3) {
//             setCompanyInfo(prev => { return { ...prev, domain: element.value } });
//         } else if (index === 4) {
//             setCompanyInfo(prev => { return { ...prev, botName: element.value } });
//         }
//         setIndex(prev => prev + 1);
//     }

//     useEffect(() => {
//         if (index > 4) {
//             console.log('companyInfo', companyInfo);
//         }
//     }, [index])

//     return (
//             <div className='flex flex-col gap-10 items-center justify-center bg-purple-800 w-full h-screen'>
//                 <h1 className='text-white font-bold text-[3rem]'>Help us customize your AI Chatbot!</h1>
                // <div className='flex flex-col items-center gap-10 bg-white rounded-[20px] w-[25%] px-5 py-10 shadow-xl'>
                    // {index === 0 && <div className='flex flex-col gap-4 justify-center items-center'>
                    //     <h1 className='font-bold text-[16px] text-purple-800'>What is your organization called?</h1>
                    //     <input id='value_0' type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-2 py-5 rounded-lg shadow-md w-full' />
                    // </div>}
//                     {index === 1 && <div className='flex flex-col gap-4 justify-center items-center'>
//                         <h1 className='font-bold text-[16px] text-purple-800'>What is your website?</h1>
//                         <input id='value_1' type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-2 py-5 rounded-lg shadow-md w-full' />
//                     </div>}
//                     {index === 2 && <div className='flex flex-col gap-4 justify-center items-center'>
//                         <h1 className='font-bold text-[16px] text-purple-800'>How many employees are there in your organization?</h1>
//                         <input id='value_2' type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-2 py-5 rounded-lg shadow-md w-full' />
//                     </div>}
//                     {index === 3 && <div className='flex flex-col gap-4 justify-center items-center'>
//                         <h1 className='font-bold text-[16px] text-purple-800'>What is your domain?</h1>
//                         <input id='value_3' type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-2 py-5 rounded-lg shadow-md w-full' />
//                     </div>}
//                     {index === 4 && <div className='flex flex-col gap-4 justify-center items-center'>
//                         <h1 className='font-bold text-[16px] text-purple-800'>What would you like to call your chatbot?</h1>
//                         <input id='value_4' type='text' className='text-[#343434] border-2 border-gray-200 outline-none px-2 py-5 rounded-lg shadow-md w-full' />
//                     </div>}
//                     {index === 5 && <div className='flex flex-col gap-4 justify-center items-start'>
//                         <h1 className='font-bold text-[24px] text-purple-800'>Choose a color for your chat bot.</h1>
//                         <div className='flex justify-between w-full'>
//                             <button className='bg-purple-800 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-orange-500 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-emerald-400 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-sky-800 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-indigo-500 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-yellow-400 h-8 w-8 rounded-sm'></button>
//                         </div>
//                         <div className='flex justify-between w-full'>
//                             <button className='bg-indigo-800 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-slate-500 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-gray-400 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-green-800 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-red-500 h-8 w-8 rounded-sm'></button>
//                             <button className='bg-blue-400 h-8 w-8 rounded-sm'></button>
//                         </div>
//                     </div>}
                    // <button onClick={() => formSaver()} className='flex justify-center gap-2 bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 shadow-lg hover:text-white hover:text-purple-800 text-white py-3 w-[150px] duration-200 hover:cursor-pointer rounded-[30px] font-semibold'><span>Next</span><ArrowCircleRightOutlined /></button>
//                 </div>
//             </div>
//     );
// }
