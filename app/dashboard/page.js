'use client';

import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Dashboard() {
    const [data, setData] = useState();

    const loadData = async () => {
        const res = await fetch('/api/dashboard', {
            method: 'GET',
        });
        const data = await res.json();
        console.log('data', data);
    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <main className={`flex flex-col items-center justify-between gap-4 flex-grow ${poppins.className}`}>
        {}
        </main>
    );
}
