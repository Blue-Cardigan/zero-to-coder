'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirecting(true);
      router.push('/slides');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Zero to Coder Workshop
        </h1>
        
        <Link href="/feedback" className="inline-block px-6 py-3 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
          Leave Feedback
        </Link>
        
        {redirecting && (
          <p className="text-xl text-gray-300 mt-4 animate-pulse">Redirecting to slides...</p>
        )}
      </motion.div>
    </main>
  );
}