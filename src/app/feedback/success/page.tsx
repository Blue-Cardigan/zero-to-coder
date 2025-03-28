'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiHome, FiShare2, FiTwitter, FiLinkedin, FiGithub, FiAward, FiStar } from 'react-icons/fi';
import '../../globals.css';

export default function FeedbackSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Trigger confetti animation after component mounts
    setTimeout(() => setShowConfetti(true), 300);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Enhanced animated background */}
      <div className="absolute opacity-60 pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="animate-blob animation-delay-2000 absolute top-20 -left-20 w-96 h-96 bg-green-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 -right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob absolute -bottom-40 left-40 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-2000 absolute top-1/2 right-1/4 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      {/* Animated confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                scale: 0,
                rotate: 0 
              }}
              animate={{ 
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className={`absolute w-3 h-3 rounded-sm ${
                ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-400', 'bg-pink-500', 'bg-teal-500'][Math.floor(Math.random() * 6)]
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        {/* Header with celebratory message */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center mb-8"
        >
          <div className="inline-block p-2 bg-white/10 rounded-xl backdrop-blur-sm mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              Feedback Submitted!
            </h1>
          </div>
        </motion.div>
        
        {/* Main content area */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Success message card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl flex flex-col"
          >
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                className="relative mx-auto mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-full flex items-center justify-center mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center"
                  >
                    <FiStar className="text-green-400 text-5xl drop-shadow-glow" />
                  </motion.div>
                </div>
                
                {/* Animated rings */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.6 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0 rounded-full border-2 border-green-400/30"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0.4 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                  className="absolute inset-0 rounded-full border-2 border-green-400/20"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">You're a Star!</h2>
                <p className="text-blue-200 mb-6">
                  Your feedback has been submitted successfully!
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className=""
              >
                
                <Link href="/slides">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-lg border border-indigo-500/50 transition-all duration-200"
                  >
                    <span>Back to slides</span>
                    <FiArrowRight className="text-blue-300" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Additional cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-6"
          >
            {/* Share card */}
            <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiShare2 className="text-green-400 mr-2 drop-shadow-glow" /> 
                <span className="bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">Share Your Journey</span>
              </h3>
              <p className="text-blue-200 mb-4">
                Help others discover the Zero to Coder workshop by sharing your experience on social media!
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <motion.a 
                  href="https://twitter.com/intent/tweet?text=I%20just%20completed%20the%20Zero%20to%20Coder%20workshop!%20%23ZeroToCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-blue-800/40 hover:bg-blue-600/40 px-4 py-2 rounded-lg border border-blue-500/30"
                >
                  <FiTwitter className="text-blue-300" />
                  <span>Twitter</span>
                </motion.a>
                
                <motion.a 
                  href="https://www.linkedin.com/feed/?shareActive&mini=true&text=I%20just%20completed%20the%20Zero%20to%20Coder%20workshop!%20%23ZeroToCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-blue-800/40 hover:bg-blue-600/40 px-4 py-2 rounded-lg border border-blue-500/30"
                >
                  <FiLinkedin className="text-blue-300" />
                  <span>LinkedIn</span>
                </motion.a>
                
                <motion.a 
                  href="https://github.com/blue-cardigan"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-blue-800/40 hover:bg-blue-600/40 px-4 py-2 rounded-lg border border-blue-500/30"
                >
                  <FiGithub className="text-blue-300" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </div>
            
            {/* Next steps card */}
            <div className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 rounded-xl p-6 backdrop-blur-lg border border-indigo-400/30 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiAward className="text-yellow-400 mr-2 premium-glow" /> 
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">What&apos;s Next</span>
              </h3>
              
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-2" />
                  <span>Join the community on <a href="https://chat.whatsapp.com/BiVjVigdkJkGC24LUrYUTO" className="text-blue-300">WhatsApp</a> to meet other learners</span>
                </li>
              </ul>
            </div>
            
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-6xl mt-14 pt-4 border-t border-blue-800/30 text-center"
        >
          <p className="text-xs text-blue-300/70">
            © {new Date().getFullYear()} Zero to Coder Workshop • All Rights Reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
} 