import { Poppins } from "next/font/google";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";

import { CopyrightIcon } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: 'Kulfi AI',
  description: 'Customized AI Chatbots',
};

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={`flex bg-white flex-col items-center justify-between flex-grow !focus:ring-0 ${poppins.className}`}>
          <Header />
          <div className="w-full px-[10px] md:px-[25px]">
            {children}
          </div>
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
