import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";

export const metadata = {
  title: "Kulfi AI | Customized AI Chatbot for Websites",
  description: "Customized AI Chatbots for your website in a matter of minutes.",
  keywords: "AI chatbot, AI chatbot for website, website chatbot, chatbot integration, customer support AI, OpenAI chatbot",
  openGraph: {
    title: "Kulfi AI | Customized AI Chatbot for Websites",
    description: "Customized AI Chatbots for your website in a matter of minutes.",
    url: "https://kulfi-ai.com",
    siteName: "Kulfi AI",
    images: [
      {
        url: "https://kulfi-ai.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kulfi AI Chatbot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kulfi AI Chatbot for Websites",
    description: "Customized AI Chatbots for your website in a matter of minutes.",
    images: ["https://kulfi-ai.com/images/twitter-image.png"],
  },
};

export const poppins = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-SEBEB303B9" />
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
