'use client';

import React from 'react';
import { motion } from 'framer-motion';
import '../globals.css';

export default function FeedbackLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      <div className="absolute opacity-60 pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="animate-blob animation-delay-2000 absolute top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob absolute -bottom-40 left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-2000 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-blue-600/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-1 rounded-full border-4 border-indigo-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border-4 border-purple-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-indigo-500/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2"
            >
              Loading...
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-200 text-center"
            >
              Preparing your feedback form
            </motion.p>
            
            <motion.div 
              className="flex gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 