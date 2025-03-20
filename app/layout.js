import { Inter } from "next/font/google";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";
import { GoogleTagManager } from '@next/third-parties/google'

import "./globals.css";

export const metadata = {
  title: 'Kulfi AI',
  description: 'Customized AI Chatbots for your website.',
};

export const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-SEBEB303B9" />
      <body>
        <main className={`flex bg-white flex-col items-center justify-between flex-grow !focus:ring-0 ${poppins.className}`}>
          <div className="w-full">
            {children}
          </div>
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
