import { Poppins } from "next/font/google";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import { CopyrightIcon } from "lucide-react";

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
        <main className={`flex bg-purple-100 flex-col items-center justify-between flex-grow px-[10px] md:px-[25px] ${poppins.className}`}>
          <Header />
          {children}
          <ToastContainer />
        </main>
        <footer className={`flex gap-2 justify-center bg-white text-gray-500 py-[20px] ${poppins.className}`}>Copyright <CopyrightIcon /> 2025 Kulfi AI.</footer>
      </body>
    </html>
  );
}
