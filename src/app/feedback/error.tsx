'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function FeedbackError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 text-white flex items-center justify-center p-4">
      <div className="absolute opacity-60 pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="animate-blob animation-delay-2000 absolute top-20 -left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 -right-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob absolute -bottom-20 left-40 w-72 h-72 bg-rose-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-red-500/50 shadow-xl relative z-10"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiAlertCircle className="text-red-400 text-4xl" />
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Something went wrong</h1>
          <p className="text-blue-200 mb-8">We couldn&apos;t process your feedback at this time. Please try again later.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/feedback">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg border border-blue-500/50 transition-all duration-200"
              >
                <FiArrowLeft className="text-blue-300" />
                <span>Back to Form</span>
              </motion.div>
            </Link>
            
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-lg border border-indigo-500/50 transition-all duration-200"
            >
              <FiRefreshCw className="text-blue-300" />
              <span>Try Again</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 