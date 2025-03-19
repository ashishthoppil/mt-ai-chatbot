import { Inter } from "next/font/google";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";

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
      <head></head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEBEB303B9"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', 'G-SEBEB303B9');
      </script>
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
