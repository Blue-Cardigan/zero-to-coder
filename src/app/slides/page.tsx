'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import PasscodeScreen from '@/components/PasscodeScreen';
import GitFlowDiagram from '@/components/GitFlowDiagram';
import LinkShareForm from '@/components/LinkShareForm';
import SharedLinksList from '@/components/SharedLinksList';
import QRCodeOverlay from '@/components/QRCodeOverlay';

const ColorPresets = [
  { bg: '#ffffff', fg: '#000000', name: 'Classic' },
  { bg: '#0f172a', fg: '#60a5fa', name: 'Night Blue' },
  { bg: '#064e3b', fg: '#6ee7b7', name: 'Forest' },
  { bg: '#7c2d12', fg: '#fb923c', name: 'Autumn' },
  { bg: '#581c87', fg: '#e879f9', name: 'Royal' },
];

export default function Slides() {
  const [isAuthenticated, setIsAuthenticated] = useState(process.env.NODE_ENV === 'development');
  const [qrColors] = useState(ColorPresets[0]);
  const [pulseSize, setPulseSize] = useState(250);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Check localStorage for existing authentication on mount
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    
    const checkStoredAuth = () => {
      try {
        const storedAuth = localStorage.getItem('slides-auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours
          
          // Check if authentication is still valid (within 24 hours)
          if (authData.authenticated && authData.timestamp && 
              (Date.now() - authData.timestamp) < oneDayInMs) {
            setIsAuthenticated(true);
          } else {
            // Clear expired authentication
            localStorage.removeItem('slides-auth');
          }
        }
      } catch (error) {
        console.error('Error checking stored authentication:', error);
        localStorage.removeItem('slides-auth');
      }
    };

    checkStoredAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('slides-auth');
    setIsAuthenticated(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const deck = new Reveal({
        hash: true,
        slideNumber: true,
        controls: true,
        progress: true,
        center: true,
        transition: 'convex',
        backgroundTransition: 'zoom',
        plugins: [],
        width: '100%',
        height: '100%',
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        keyboard: true,
        overview: true,
        touch: true,
      });

      document.querySelector('.reveal')?.setAttribute(
        'style', 
        'background-image: radial-gradient(circle at center, #4338ca 0%, #1e1b4b 100%); background-repeat: no-repeat; background-size: cover;'
      );

      deck.initialize();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setPulseSize((size) => (size === 220 ? 230 : 220));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <PasscodeScreen onPasscodeCorrect={() => setIsAuthenticated(true)} />;
  }
  return (
    <div className="reveal">
      {/* Logout button - positioned absolute so it doesn't interfere with slides */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-xs bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg backdrop-blur-sm border border-red-500/50 transition-all duration-200"
        title="Logout and clear stored authentication"
      >
        Logout
      </button>
      
      <div className="slides">
        {/* Slide 1 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h1 className="text-6xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to 
            <br />
            Zero-to-coder
          </h1>

          <div className="mt-8">
            <div className="bg-indigo-900/30 p-1 md:p-2 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl inline-block">
              <div className="flex justify-center items-center pt-4">
                <div 
                  onClick={() => setIsQRCodeOpen(true)}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg"
                >
                  <QRCodeSVG 
                    value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/slides`}
                    size={200}
                    bgColor={qrColors.bg}
                    fgColor={qrColors.fg}
                    level="H"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <p className="text-sm md:text-xl text-blue-300 text-center"><a href="https://zero-to-coder.vercel.app/slides" target="_blank" rel="noopener noreferrer">zero-to-coder.vercel.app/slides</a></p>
            </div>
          </div>
        </section>

        {/* New Installation Steps Slide */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            First Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Create Accounts */}
            <div className="bg-indigo-900/50 p-4 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Create Free Accounts
              </h3>
              <div className="space-y-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-indigo-800/40">
                  <span className="text-lg">🐙</span>
                  <span className="font-medium">github.com</span>
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-indigo-800/40">
                  <span className="text-lg">▲</span>
                  <span className="font-medium">vercel.com</span>
                  <span className="text-sm text-blue-400 font-semibold">(Use GitHub login!)</span>
                </a>
              </div>
            </div>

            {/* Install Software */}
            <div className="bg-indigo-900/50 p-4 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Install Software
              </h3>
              <div className="space-y-2">
                <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-indigo-800/40">
                  <span className="text-lg">⌨️</span>
                  <span className="font-medium">cursor.sh</span>
                </a>
                <div className="flex items-center gap-2 text-base md:text-lg p-1">
                  <span className="text-lg">🟢</span>
                  <span className="font-medium"><a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">Node.js</a></span>
                  <span className="text-sm text-orange-400 font-semibold">(Windows only)</span>
                </div>
                <div className="flex items-center gap-2 text-base md:text-lg p-1">
                  <span className="text-lg">📦</span>
                  <span className="font-medium"><a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">git</a></span>
                  <span className="text-sm text-orange-400 font-semibold">(Windows only)</span>
                </div>
              </div>
            </div>
            
            {/* Cursor Instructions */}
            <div className="md:col-span-2 bg-indigo-900/50 p-4 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-300 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🤖</span>
                Open Cursor and ask the agent:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Mac Section */}
                <div className="space-y-2">
                  <h4 className="text-base md:text-lg font-bold text-green-300 text-center">🍎 MacOS</h4>
                  <div className="bg-slate-900/80 p-2 rounded-xl border-2 border-green-500/40 shadow-inner">
                    <button 
                      onClick={() => handleCopy("Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login")}
                      className="text-green-300 font-mono text-sm md:text-base hover:text-green-200 transition-colors w-full text-left group relative p-2 rounded-lg"
                    >
                      <span className="relative z-10 leading-tight">"Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login"</span>
                      <span className={`absolute inset-0 bg-green-500/20 rounded-lg transition-opacity duration-200 ${copiedText === "Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login" ? 'opacity-100' : 'opacity-0'}`}></span>
                      <span className="absolute -right-1 -top-1 text-xs bg-green-500/90 text-white px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        📋
                      </span>
                    </button>
                  </div>
                </div>

                {/* Windows Section */}
                <div className="space-y-2">
                  <h4 className="text-base md:text-lg font-bold text-blue-300 text-center">🪟 Windows</h4>
                  <div className="bg-slate-900/80 p-2 rounded-xl border-2 border-blue-500/40 shadow-inner">
                    <button 
                      onClick={() => handleCopy("Authenticate my GitHub account through CLI web browser login")}
                      className="text-blue-300 font-mono text-sm md:text-base hover:text-blue-200 transition-colors w-full text-left group relative p-2 rounded-lg"
                    >
                      <span className="relative z-10 leading-tight">"Authenticate my GitHub account through CLI web browser login"</span>
                      <span className={`absolute inset-0 bg-blue-500/20 rounded-lg transition-opacity duration-200 ${copiedText === "Authenticate my GitHub account through CLI web browser login" ? 'opacity-100' : 'opacity-0'}`}></span>
                      <span className="absolute -right-1 -top-1 text-xs bg-blue-500/90 text-white px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        📋
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-blue-300/90 italic bg-indigo-800/30 p-2 rounded-lg inline-block">
                  ⏱️ Installation may be slower on older machines!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Session Outline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-8">
            <div className="bg-indigo-900/50 p-6 md:p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl md:text-6xl font-bold text-blue-300 mr-4 bg-blue-500/20 p-3 rounded-xl">1</div>
              </div>
              <p className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed">Build and host your first website</p>
            </div>
            <div className="bg-indigo-900/50 p-6 md:p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl md:text-6xl font-bold text-blue-300 mr-4 bg-blue-500/20 p-3 rounded-xl">2</div>
              </div>
              <p className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed">Start your own project with custom features</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] bg-indigo-900/40 p-2 rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl">
                <a href="https://recipe-routine-saver.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_1.png" alt="Website example 1" width={350} height={197} className="w-full rounded-lg shadow-lg border border-indigo-600/40" />
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] bg-indigo-900/40 p-2 rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl">
                <a href="https://greater-manchester-assembly-helper.vercel.app/#" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_2.png" alt="Website example 2" width={350} height={197} className="w-full rounded-lg shadow-lg border border-indigo-600/40" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 md:mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Build and Host Your First Website
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-7xl mx-auto">
            <div className="flex-1 bg-indigo-900/50 p-8 md:p-10 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">1</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Prompt <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">Bolt.new</a></h3>
              <div className="w-full aspect-video bg-indigo-800/50 rounded-xl flex items-center justify-center overflow-hidden border-2 border-indigo-600/40">
                <Image src="/images/bolt-screenshot.png" alt="Bolt.new screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex-1 bg-indigo-900/50 p-8 md:p-10 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">2</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Develop in Cursor</h3>
              <div className="w-full aspect-video bg-indigo-800/50 rounded-xl flex items-center justify-center overflow-hidden border-2 border-indigo-600/40">
                <Image src="/images/cursor_homepage_screenshot.png" alt="Cursor screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex-1 bg-indigo-900/50 p-8 md:p-10 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">3</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Host on Vercel</h3>
              <div className="w-full aspect-video bg-indigo-800/50 rounded-xl flex items-center justify-center overflow-hidden border-2 border-indigo-600/40">
                <Image src="/images/vercel_homepage_screenshot.png" alt="Vercel screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            <span className='text-blue-300'>1. </span>Open <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors underline decoration-blue-300/50">Bolt.new</a> and prompt a nice landing page
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 max-w-7xl">
            <div className="bg-indigo-900/50 p-6 md:p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <ul className="space-y-4">
                <li className="bg-indigo-800/40 rounded-xl p-4 border border-blue-400/30 shadow-lg">
                  <span className="text-xl md:text-2xl text-white font-medium leading-snug">Think of a project you want to build, then... ask for it</span>
                </li>
                <li className="bg-indigo-800/40 rounded-xl p-4 border border-blue-400/30 shadow-lg">
                  <span className="text-xl md:text-2xl text-white font-medium leading-snug">Find the `code` section. How much can you make sense of?</span>
                </li>
                <li className="bg-indigo-800/40 rounded-xl p-4 border border-blue-400/30 shadow-lg">
                  <span className="text-xl md:text-2xl text-white font-medium leading-snug">Don't be afraid of the code - click around and see what sense you can make of it</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/50 p-6 md:p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-5 text-center flex items-center justify-center gap-3">
                <span className="text-3xl">💬</span>
                Example Prompts
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-blue-400/40">
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Build me a landing page for a productivity app called TimeFlow with a modern, minimalist design"</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-blue-400/40">
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Build me a site for my business called The Assembly. Include a homepage, blog, a shop, and a calendar"</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-blue-400/40">
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Build me a personal portfolio site with links to my social media and a blog. Include pretty animations and a contact form"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Slide 5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            <span className="text-blue-300">2. </span>Open your project in Cursor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl order-1 md:order-1">
              <ol className="list-none space-y-4">
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Export the files (at the top)</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Then extract the files and move them to a good folder (e.g Documents/Code/[project name])</p>
                </li>
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Open the project in Cursor</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">In Cursor, File -&gt; Open... and select your folder</p>
                </li>
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Begin the vibe</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Type &apos;Get this project running on localhost&apos; in the chat (⌘/Ctrl+L), then follow the installation steps</p>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl italic">By default, Cursor will write code in agent mode, which is great for getting started</p>
                </li>
              </ol>
            </div>
            <div className="flex justify-center order-2 md:order-2">
              <div className="w-full max-w-[400px] relative">
                <div className="bg-indigo-800/40 p-4 rounded-lg shadow-lg flex items-center justify-center relative">
                  <Image 
                    src="/images/cursor_accept.png" 
                    alt="Cursor screenshot" 
                    width={450} 
                    height={233} 
                    className="w-full h-full object-contain rounded-lg"
                  />
                  {/* Floating overlays */}
                  <div className="absolute top-[15%] right-[75%] bg-blue-500/80 text-white p-2 rounded-lg text-sm max-w-[160px] shadow-lg transform translate-x-1/2 translate-y-1/2">
                    Run a command in the terminal (interface with your machine)
                  </div>
                  <div className="absolute bottom-[10%] right-[70%] bg-green-500/80 text-white p-2 rounded-lg text-sm max-w-[140px] shadow-lg transform translate-x-1/2 translate-y-1/2">
                    Accept changes to code files
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Slide 5.5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Get the Vibes Flowing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-7xl mx-auto">
            {/* Left column - Instructions */}
            <div className="bg-indigo-900/50 p-4 md:p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <ol className="list-none space-y-3">
                <li className="bg-indigo-800/40 rounded-xl p-3 border border-purple-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    <span className="text-red-300 font-bold">Remember to actually read</span>
                  </p>
                </li>
                <li className="bg-indigo-800/40 rounded-xl p-3 border border-blue-400/30">
                  <div className="flex flex-col space-y-1">
                    <p className="text-base md:text-lg text-white font-medium">Enable Autosave:</p>
                    <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-blue-300 font-mono text-sm md:text-base">⌘/Ctrl + Shift + P</code>
                  </div>
                </li>
                <li className="bg-indigo-800/40 rounded-xl p-3 border border-green-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    Watch for the <span className="text-green-300 font-semibold">New Chat button</span> in the bottom right corner
                  </p>
                </li>
                <li className="bg-indigo-800/40 rounded-xl p-3 border border-orange-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    Run <code className="text-green-300 bg-slate-800 px-2 py-1 rounded font-mono text-xs">npm run dev</code> in a real terminal with <span className="text-orange-300 font-semibold">⌃ + ⇧ + ` or Ctrl + `</span> to avoid excessive tabs
                  </p>
                </li>
              </ol>
            </div>
            
            {/* Right column - Screenshots */}
            <div className="space-y-4">
              <div className="bg-indigo-900/50 p-3 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <div className="relative">
                  <Image 
                    src="/images/new_chat_prompt.png" 
                    alt="Cursor interface showing new chat and file addition features" 
                    width={500} 
                    height={560} 
                    className="w-full h-auto object-contain drop-shadow-lg rounded-lg" 
                  />
                  {/* Enhanced overlay indicators */}
                  <div className="absolute bottom-[25%] right-[7%] w-[15%] aspect-[1.75/1] border-4 border-red-500/80 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-[6%] left-[1%] w-[23%] aspect-[3/1] border-4 border-red-500/80 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="mt-2 p-2 bg-indigo-800/50 rounded-lg">
                  <p className="text-sm md:text-base text-white font-medium text-center">
                    <span className="text-blue-300 font-semibold">Add files with @</span> · <span className="text-purple-300 font-semibold">Restart long chats</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-3 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <Image 
                  src="/images/open_terminal.png" 
                  alt="Terminal interface in Cursor" 
                  width={500} 
                  height={560} 
                  className="w-full h-auto object-contain drop-shadow-lg rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Once the Coding Begins
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto items-center">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Mindset Shift</span>
                </h3>
                <p className="text-lg md:text-xl text-center text-white font-medium leading-relaxed">
                  When it breaks, don't be <span className="text-red-300 font-bold">glum</span> — be <span className="text-green-300 font-bold">curious</span>
                </p>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🔍</span>
                  <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Learn & Adapt</span>
                </h3>
                <p className="text-lg md:text-xl text-center text-white font-medium leading-relaxed">
                  Look things up — the more you know, the better you can babysit the agent
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-6 rounded-xl border-2 border-purple-500/60 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span className="text-white">Reality Check</span>
                </h3>
                <p className="text-lg md:text-xl text-center font-bold text-white leading-relaxed">
                  Developers are <span className="text-yellow-300">always learning</span> — the tools are endless
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-indigo-900/30 p-4 rounded-xl border border-indigo-600/40 shadow-2xl">
                <Image 
                  src="/images/spanner.png" 
                  alt="Spanner tool representing continuous learning" 
                  width={350}
                  height={350}
                  className="w-full max-w-[350px] object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            <span className="text-blue-300">3. </span>Host your site
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-fit">
            {/* Left column - Git steps */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">Push to GitHub</h3>
                <span className="text-lg md:text-xl">
                  <p className="text-gray-300 italic">"Initialise a new git repo, add a remote, and push to GitHub"</p>
                </span>
              </div>

              {/* Git flow diagram */}
              <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">How Git Works</h3>
                <div className="relative">
                  <GitFlowDiagram />
                </div>
              </div>
            </div>

            {/* Right column - Vercel deployment */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">Deploy on Vercel</h3>
                <ol className="space-y-3 md:space-y-4 text-lg md:text-xl">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">1.</span>
                    <span>Connect your GitHub repository to Vercel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">2.</span>
                    <span>Vercel automatically detects Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">3.</span>
                    <span>Click Deploy and watch the magic happen!</span>
                  </li>
                </ol>
              </div>

              {/* Vercel screenshot */}
              <div className="w-full">
                <Image 
                  src="/images/vercel-deploy.png" 
                  alt="Vercel deployment interface showing the deployment process" 
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Time to Share */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-6 md:mb-8">
              Time to Share!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mx-auto mb-6">
              <div className="">
                <LinkShareForm />
              </div>
              
              <div className="flex flex-col">
                <SharedLinksList />
              </div>
            </div>
            
            <div className="mt-4 md:mt-6">
              <span className="text-6xl md:text-7xl">🎉</span>
            </div>
          </div>
        </section>

        {/* Slide 8 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
                      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8">
              <h2 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-8 md:mb-12">
                Break
              </h2>
              <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
              <div className="relative bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <p className="text-2xl md:text-4xl text-gray-200 text-center">&nbsp;Take 10 minutes to grab coffee, go outside, or just take a break&nbsp;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Part 2
          </h2>
          <div className="text-xl md:text-3xl">
            <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-6 md:mb-8">
              <div className="flex items-center mb-2">
                <div className="bg-blue-600/40 p-4 md:p-5 rounded-full mr-4 md:mr-6">
                  <span className="text-4xl md:text-5xl">&nbsp;🚀&nbsp;</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-blue-300">New project, from scratch, in Cursor</h3>
              </div>
           </div>
            <p className="text-xl md:text-3xl text-gray-200 mb-6 md:mb-8">Choose your path</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-6">
                    <span className="text-4xl md:text-5xl">&nbsp;💬&nbsp;</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-purple-300">A Web App</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-lg md:text-xl">
                    <span>APIs & Integrations</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>User Authentication</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Database</span>
                  </li>
                </ul>
              </div>
              <div className=" bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-purple-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-6">
                    <span className="text-4xl md:text-5xl">&nbsp;📊&nbsp;</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-purple-300">Text Data Analysis</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Get data</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Analyse it</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Visualise it</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 10 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Create a new project in Cursor
          </h2>
          <p className="text-xl md:text-3xl text-gray-200 mb-6 md:mb-8">File -&gt; New Window -&gt; Open Project -&gt; New Folder</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <div className="space-y-4 md:space-y-6">
                <div className="bg-indigo-800/40 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Build me a Next.js web app to [...]. Use Supabase for the database and authentication. Use the current directory as the project root.&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="bg-indigo-800/40 rounded-lg p-4 border-l-4 border-purple-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Provide steps to [scrape webpage text from a website / get data from X source], and analyse it to identify trends / key topics / etc &quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className=" bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="text-4xl md:text-5xl mr-4">&nbsp;✨&nbsp;</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300">Pro Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-900/60 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                    <p className="text-lg md:text-xl">
                      Ask how to structure the project in one chat, then switch to a new chat to start building
                    </p>
                  </div>
                  <div className="bg-indigo-900/60 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                    <p className="text-lg md:text-xl">Keep your prompt short and concise. Long lists of requirements will confuse both you and the AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <div className="h-full flex flex-col gap-6 md:gap-8 p-4 md:p-8">
            {/* Title at the top */}
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Read the code, show no fear
            </h2>
            
            {/* Content grid below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
              {/* Left column - Text boxes */}
              <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
                <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-2xl md:text-3xl text-blue-300 text-center">
                    Divert away from random rabbit holes sooner.
                  </p>
                </div>
                
                <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <span className="text-2xl mr-4 font-bold text-blue-300">&nbsp;✨&nbsp;Pro Tip</span>
                  <p className="text-xl md:text-3xl text-blue-300 text-center italic">
                    Ask for debugging steps, or to identify the most likely cause(s) of an issue.
                  </p>
                </div>
              </div>

              {/* Right column - Meme image */}
              <div className=" flex items-center justify-center">
                <div className="bg-indigo-900/60 p-2 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <Image 
                    src="/images/cursor_debug_meme.png" 
                    alt="Debugging meme showing the journey between bug fixes" 
                    width={800}
                    height={800}
                    className="rounded-lg w-full max-w-[500px] h-auto"
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 12 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Get Good
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Left Column - Troubleshooting */}
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                When the Agent Gets Stuck
              </h3>
              <ul className="space-y-4">
                <li className="bg-indigo-800/50 p-4 rounded-xl border border-red-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔍</span>
                    <span className="text-base md:text-lg text-white font-medium">Explain the situation in more detail</span>
                  </div>
                </li>
                <li className="bg-indigo-800/50 p-4 rounded-xl border border-orange-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📋</span>
                    <span className="text-base md:text-lg text-white font-medium">Provide errors and/or terminal output</span>
                  </div>
                </li>
                <li className="bg-indigo-800/50 p-4 rounded-xl border border-blue-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔄</span>
                    <span className="text-base md:text-lg text-white font-medium">Try a different model</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column - Shortcuts */}
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Keyboard Shortcuts
              </h3>
              <div className="space-y-4">
                <div className="bg-indigo-800/50 p-4 rounded-xl border border-green-400/30 shadow-lg">
                  <h4 className="text-base md:text-lg font-bold text-green-300 mb-3">File Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Add file to chat</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-green-300 font-mono text-xs">⌘/Ctrl + A</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Inline edit</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-green-300 font-mono text-xs">⌘/Ctrl + I</code>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-800/50 p-4 rounded-xl border border-purple-400/30 shadow-lg">
                  <h4 className="text-base md:text-lg font-bold text-purple-300 mb-3">Navigation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">New chat</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-purple-300 font-mono text-xs">⌘/Ctrl + ⇧ + I</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Search codebase</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-purple-300 font-mono text-xs">⌘/Ctrl + ⇧ + F</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Find file</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-indigo-600/40 text-purple-300 font-mono text-xs">⌘/Ctrl + P</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative max-w-6xl mx-auto">
            {/* Custom Rules Card */}
            <div className="bg-indigo-900/60 p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-3">
                    <h3 className="text-lg md:text-2xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-2xl">@</span>Rules</h3>
                    <p className="text-xs md:text-sm text-indigo-400">A prompt provided in every chat</p>
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300 mb-2">
                    &quot;Add comments to your code to explain to a beginner&quot;
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Keep files small and focused. Split up long files into smaller ones&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Docs Card */}
            <div className="bg-indigo-900/60 p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-3">
                    <h3 className="text-lg md:text-2xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-2xl">@</span>Docs</h3>
                    <p className="text-xs md:text-sm text-indigo-400">Or paste a link directly</p>
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300 mb-2">
                    &quot;Use @OpenAI to implement an API call to return [...]&quot;
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Use @Twilio to send an SMS&quot;
                  </div>
                </div>
              </div>
            </div>

        {/* New section spanning both columns */}
        <div className="md:col-span-2 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Explain the structure of the codebase and compare it with another common web framework&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Provide some common use cases for Git when working on a personal project&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Explain what React and Tailwind are, why they're useful, and how they work&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;What's the difference between javascript and typescript?&quot;
              </div>
          </div>
        </div>
          </div>
        </section>

        {/* Slide 14 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            What next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left column - QR Code */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-indigo-900/30 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col items-center">
                  <div 
                    className="relative"
                  >
                    <Image 
                      src="/images/whatsapp_qr.jpg" 
                      alt="QR Code"
                      width={520}
                      height={520}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Keep in touch */}
            <div className="text-xl md:text-3xl flex flex-col gap-6 md:gap-8">
              <div className="bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">👈</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Join the gang</h3>
                    <p>Share tips, links, and projects</p>
                    <p>It&apos;s also the best place to ask me questions :D</p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🤿</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Find stuff to build</h3>
                    <p>Doing is the best way to learn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 15 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          {/* Tag cloud background */}
          <div className="absolute top-0 left-0 w-[125%] h-[120%] -translate-x-[10vw] -translate-y-[10vh]">
            <iframe
              src="/tag-cloud"
              className="w-full h-full"
              frameBorder="0"
            />
          </div>

          <div className="relative z-20 justify-start">
            <div className="max-w-sm">
              <div className="text-base md:text-lg bg-indigo-900/30 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3">Make me better!</h3>
                <p className="text-base md:text-xl mb-4">Share your thoughts and experiences with the workshop</p>
                
                <ul className="space-y-3 mb-6 md:mb-8">
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What worked well?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What could be improved?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What would you like to learn next?</span>
                  </li>
                </ul>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <div className="relative bg-indigo-900/30 p-6 md:p-8 pb-0 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col items-center">
                    <div 
                      className="relative transition-transform duration-700 ease-in-out"
                      style={{ transform: `scale(${pulseSize/220})` }}
                    >
                      <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/feedback`}>
                        <QRCodeSVG 
                          value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/feedback`}
                          size={220}
                        level="L"
                        className={`bg-white p-2 rounded-lg transition-all duration-300 hover:shadow-2xl`}
                      />
                      </a>
                    </div>

                      <p className="text-sm text-blue-300">
                        It takes 3 minutes!
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <QRCodeOverlay
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
        url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/slides`}
        bgColor={qrColors.bg}
        fgColor={qrColors.fg}
      />
    </div>
  );
} 