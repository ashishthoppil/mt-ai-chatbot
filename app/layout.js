import { Inter } from "next/font/google";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";

import "./globals.css";

export const metadata = {
  title: 'Kulfi AI',
  description: 'Customized AI Chatbots',
};

export const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={`flex bg-white flex-col items-center justify-between flex-grow !focus:ring-0 ${poppins.className}`}>
          <Header />
          <div className="w-full">
            {children}
          </div>
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
