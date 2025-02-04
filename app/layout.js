import { Poppins } from "next/font/google";
import { Header } from "./components/layout/Header";
import "./globals.css";

export const metadata = {
  title: 'Lumi AI',
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
        <main className={`main-container flex flex-col items-center justify-between flex-grow px-[25px] ${poppins.className}`}>
          <Header />
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
