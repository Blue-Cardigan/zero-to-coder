'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';
import Image from 'next/image';
import PasscodeScreen from '@/components/PasscodeScreen';
import GitFlowDiagram from '@/components/GitFlowDiagram';
import LinkShareForm from '@/components/LinkShareForm';
import SharedLinksList from '@/components/SharedLinksList';

const headingLg = 'text-4xl md:text-6xl font-bold ztc-heading';
const sectionCard = 'ztc-surface panel-cut info-panel p-4 md:p-6';
const sectionCardStrong = 'ztc-surface-strong panel-sharp hero-panel p-6 md:p-8';
const codeCard = 'code-panel panel-sharp p-4 md:p-6';

export default function Slides() {
  const [isAuthenticated, setIsAuthenticated] = useState(process.env.NODE_ENV === 'development');
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
        transition: 'fade',
        backgroundTransition: 'fade',
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
        'background-image: radial-gradient(circle at center, #143052 0%, #0b1426 100%); background-repeat: no-repeat; background-size: cover;'
      );

      deck.initialize();
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
        <section className="ztc-slide bg-hero-grid">
          <p className="type-kicker mb-4 md:mb-6">Welcome to</p>
          <h1 className="text-6xl md:text-6xl font-bold mb-8 md:mb-12 ztc-heading">
            Zero to Coder
          </h1>

          <div className="mt-8">
            <div className="ztc-surface hero-panel panel-cut p-4 md:p-6 inline-block">
              <div className="flex flex-col justify-center items-center gap-4">
                <a
                  href="https://zerotocoder.uk/slides"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold bg-blue-500/25 border border-blue-400/45 rounded-md hover:bg-blue-500/35 transition-colors"
                >
                  Open the Slides in your Browser
                </a>
              </div>
              <p className="text-sm md:text-xl ztc-muted text-center"><a href="https://zerotocoder.uk/slides" target="_blank" rel="noopener noreferrer">Join at zerotocoder.uk/slides</a></p>
            </div>
          </div>
        </section>

        {/* New Installation Steps Slide */}
        <section className="ztc-slide bg-split-tone">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 ztc-heading">
            Setup in 10 Minutes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Create Accounts */}
            <div className={sectionCard}>
              <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Create Free Accounts
              </h3>
              <div className="space-y-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/40">
                  <span className="text-lg">🐙</span>
                  <span className="font-medium">github.com</span>
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/40">
                  <span className="text-lg">▲</span>
                  <span className="font-medium">vercel.com</span>
                  <span className="text-sm text-blue-400 font-semibold">(Use GitHub login!)</span>
                </a>
              </div>
            </div>

            {/* Install Software */}
            <div className={sectionCard}>
              <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Install Software
              </h3>
              <div className="space-y-2">
                <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base md:text-lg hover:text-blue-300 transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/40">
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
            <div className={`md:col-span-2 ${sectionCard}`}>
              <h3 className="text-lg md:text-xl font-bold text-blue-300 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🤖</span>
                Ask Cursor to do the setup:
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
                <p className="text-sm text-blue-200/90 italic bg-slate-900/60 p-2 rounded-lg inline-block">
                  Install speeds vary by machine. Keep going.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section className="ztc-slide bg-diagonal-band">
          <h2 className={`${headingLg} mb-8`}>
            Today's Build Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-8">
            <div className={`${sectionCardStrong} flex flex-col h-full`}>
              <div className="flex items-center mb-6">
                <div className="text-5xl md:text-6xl font-bold text-blue-300 mr-4 bg-blue-500/20 p-3 rounded-xl">1</div>
              </div>
              <p className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed">Ship one working app from prompt to production</p>
            </div>
            <div className={`${sectionCardStrong} flex flex-col h-full`}>
              <div className="flex items-center mb-6">
                <div className="text-5xl md:text-6xl font-bold text-blue-300 mr-4 bg-blue-500/20 p-3 rounded-xl">2</div>
              </div>
              <p className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed">Start a second project and choose your own direction</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] info-panel panel-cut p-2 hover:scale-[1.02] transition-transform duration-300">
                <a href="https://recipe-routine-saver.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_1.png" alt="Website example 1" width={350} height={197} className="w-full rounded-lg shadow-lg border border-cyan-400/25" />
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] info-panel panel-cut p-2 hover:scale-[1.02] transition-transform duration-300">
                <a href="https://greater-manchester-assembly-helper.vercel.app/#" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_2.png" alt="Website example 2" width={350} height={197} className="w-full rounded-lg shadow-lg border border-cyan-400/25" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 */}
        <section className="ztc-slide bg-data-mesh">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 md:mb-16 ztc-heading">
            Idea to Live URL
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-7xl mx-auto">
            <div className="flex-1 ztc-surface-strong hero-panel panel-cut p-8 md:p-10 flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">1</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Prompt <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">Bolt.new</a></h3>
              <div className="w-full aspect-video bg-slate-900/70 rounded-xl flex items-center justify-center overflow-hidden border border-cyan-400/25">
                <Image src="/images/bolt-screenshot.png" alt="Bolt.new screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex-1 ztc-surface-strong hero-panel panel-soft p-8 md:p-10 flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">2</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Develop in Cursor</h3>
              <div className="w-full aspect-video bg-slate-900/70 rounded-xl flex items-center justify-center overflow-hidden border border-cyan-400/25">
                <Image src="/images/cursor_homepage_screenshot.png" alt="Cursor screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex-1 ztc-surface-strong hero-panel panel-sharp p-8 md:p-10 flex flex-col items-center">
              <div className="text-5xl md:text-6xl text-blue-300 mb-6 bg-blue-500/20 w-20 h-20 flex items-center justify-center rounded-xl font-bold">3</div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Host on Vercel</h3>
              <div className="w-full aspect-video bg-slate-900/70 rounded-xl flex items-center justify-center overflow-hidden border border-cyan-400/25">
                <Image src="/images/vercel_homepage_screenshot.png" alt="Vercel screenshot" width={400} height={225} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 */}
        <section className="ztc-slide bg-spotlight">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            <span className='text-blue-300'>1. </span>Prompt <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors underline decoration-blue-300/50">Bolt.new</a> with a clear outcome
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 max-w-7xl">
            <div className="ztc-surface-strong hero-panel panel-cut p-6 md:p-8">
              <ul className="space-y-4">
                <li className="info-panel panel-soft p-4 border border-blue-400/30 shadow-lg">
                  <span className="text-xl md:text-2xl text-white font-medium leading-snug">Name the audience, goal, and style in one sentence.</span>
                </li>
                <li className="info-panel panel-soft p-4 border border-blue-400/30 shadow-lg">
                  <span className="text-xl md:text-2xl text-white font-medium leading-snug">Open the code view early and map what each section does.</span>
                </li>
              </ul>
            </div>
            
            <div className="ztc-surface-strong hero-panel panel-soft p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-5 text-center flex items-center justify-center gap-3">
                <span className="text-3xl">💬</span>
                Example Prompts
              </h3>
              <div className="space-y-4">
                <div className={codeCard}>
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Build a landing page for TimeFlow. Audience: busy professionals. Tone: modern, calm, trustworthy."</p>
                </div>
                <div className={codeCard}>
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Create a business site for The Assembly with home, blog, shop, and booking calendar."</p>
                </div>
                <div className={codeCard}>
                  <p className="text-lg md:text-xl text-blue-200 italic leading-snug">"Build a portfolio with social links, blog, contact form, and subtle motion."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Slide 5 */}
        <section className="ztc-slide bg-split-tone">
          <h2 className={`${headingLg} mb-6 md:mb-8`}>
            <span className="text-blue-300">2. </span>Connect GitHub and work locally
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-xl md:text-3xl space-y-4 md:space-y-6 ztc-surface info-panel panel-soft p-6 md:p-8 order-1 md:order-1">
              <ol className="list-none space-y-4">
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Connect GitHub before leaving Bolt/Lovable</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Make sure your project exists as a real repository with history from the start.</p>
                </li>
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Clone it into your coding workspace</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Open that folder in Cursor so every edit maps to your repo.</p>
                </li>
                <li className="">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Run locally, then iterate in short loops</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Type &apos;Get this project running on localhost&apos; in the chat (⌘/Ctrl+L), then follow the installation steps</p>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl italic">Short prompts + fast tests beat one giant prompt every time.</p>
                </li>
              </ol>
            </div>
            <div className="flex justify-center order-2 md:order-2">
              <div className="w-full max-w-[400px] relative">
                <div className="bg-slate-900/70 p-4 rounded-lg shadow-lg flex items-center justify-center relative border border-cyan-400/25">
                  <Image 
                    src="/images/cursor_accept.png" 
                    alt="Cursor screenshot" 
                    width={450} 
                    height={233} 
                    className="w-full h-full object-contain rounded-lg"
                  />
                  {/* Floating overlays */}
                  <div className="absolute top-[15%] right-[75%] bg-blue-500/80 text-white p-2 rounded-lg text-sm max-w-[160px] shadow-lg transform translate-x-1/2 translate-y-1/2">
                    Run terminal commands directly from Cursor
                  </div>
                  <div className="absolute bottom-[10%] right-[70%] bg-green-500/80 text-white p-2 rounded-lg text-sm max-w-[140px] shadow-lg transform translate-x-1/2 translate-y-1/2">
                    Review then accept edits file-by-file
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Slide 5.5 */}
        <section className="ztc-slide bg-hero-grid">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 ztc-heading">
          Build Rhythm, Not Chaos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-7xl mx-auto">
            {/* Left column - Instructions */}
            <div className="ztc-surface info-panel panel-cut p-4 md:p-6">
              <ol className="list-none space-y-3">
                <li className="bg-slate-900/70 rounded-xl p-3 border border-cyan-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    <span className="text-red-300 font-bold">Read every change</span> — do not click accept on autopilot.
                  </p>
                </li>
                <li className="bg-slate-900/70 rounded-xl p-3 border border-cyan-400/30">
                  <div className="flex flex-col space-y-1">
                    <p className="text-base md:text-lg text-white font-medium">Turn on autosave:</p>
                    <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-blue-300 font-mono text-sm md:text-base">⌘/Ctrl + Shift + P</code>
                  </div>
                </li>
                <li className="bg-slate-900/70 rounded-xl p-3 border border-cyan-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    Start a <span className="text-green-300 font-semibold">new chat</span> when context gets muddy
                  </p>
                </li>
                <li className="bg-slate-900/70 rounded-xl p-3 border border-orange-400/30">
                  <p className="text-base md:text-lg text-white font-medium leading-tight">
                    Run <code className="text-green-300 bg-slate-800 px-2 py-1 rounded font-mono text-xs">npm run dev</code> in a dedicated terminal to stay organized
                  </p>
                </li>
              </ol>
            </div>
            
            {/* Right column - Screenshots */}
            <div className="space-y-4">
              <div className="ztc-surface info-panel panel-sharp p-3">
                <div className="relative">
                  <Image 
                    src="/images/new_chat_prompt.png" 
                    alt="Cursor interface showing new chat and file addition features" 
                    width={500} 
                    height={560} 
                    className="w-full h-auto object-contain drop-shadow-lg rounded-lg" 
                  />
                  {/* Enhanced overlay indicators */}
                  <div className="absolute bottom-[25%] right-[7%] w-[15%] aspect-[1.75/1] border-4 border-red-500/70 rounded-full shadow-lg"></div>
                  <div className="absolute top-[6%] left-[1%] w-[23%] aspect-[3/1] border-4 border-red-500/70 rounded-full shadow-lg"></div>
                </div>
                <div className="mt-2 p-2 bg-slate-900/70 rounded-lg">
                  <p className="text-sm md:text-base text-white font-medium text-center">
                    <span className="text-blue-300 font-semibold">Attach files with @</span> · <span className="text-orange-300 font-semibold">reset long chats early</span>
                  </p>
                </div>
              </div>
              
              <div className="ztc-surface info-panel panel-soft p-3">
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
        <section className="ztc-slide bg-split-tone">
          <h2 className={`${headingLg} mb-8`}>
            How to Think While Building
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto items-center">
            <div className="space-y-6">
              <div className="ztc-surface-strong hero-panel panel-soft p-6">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <span className="bg-gradient-to-r from-blue-300 to-orange-300 bg-clip-text text-transparent">Mindset</span>
                </h3>
                <p className="text-lg md:text-xl text-center text-white font-medium leading-relaxed">
                  When it breaks, skip panic and switch to <span className="text-green-300 font-bold">diagnosis mode</span>.
                </p>
              </div>
              
              <div className="ztc-surface-strong hero-panel panel-sharp p-6">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🔍</span>
                  <span className="bg-gradient-to-r from-blue-300 to-orange-300 bg-clip-text text-transparent">Learning Loop</span>
                </h3>
                <p className="text-lg md:text-xl text-center text-white font-medium leading-relaxed">
                  Read docs and errors in parallel so your prompts get smarter each round.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-900/80 to-blue-950/80 p-6 rounded-xl border border-cyan-400/30 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span className="text-white">Reality Check</span>
                </h3>
                <p className="text-lg md:text-xl text-center font-bold text-white leading-relaxed">
                  Great developers never stop learning, they just learn faster each sprint.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="ztc-surface p-4">
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
        <section className="ztc-slide bg-diagonal-band">
          <h2 className={`${headingLg} mb-6 md:mb-8`}>
            <span className="text-blue-300">3. </span>Push small. Deploy often.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-fit">
            {/* Left column - Git steps */}
            <div className="space-y-4 md:space-y-6">
              <div className={sectionCard}>
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">Push to GitHub</h3>
                <ol className="space-y-3 md:space-y-4 text-lg md:text-xl">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">1.</span>
                    <span>Edit locally in clear, testable steps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">2.</span>
                    <span>Commit meaningful chunks with clear messages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">3.</span>
                    <span>Push frequently so deploys stay easy</span>
                  </li>
                </ol>
              </div>

              {/* Git flow diagram */}
              <div className={sectionCard}>
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">How Git Works</h3>
                <div className="relative">
                  <GitFlowDiagram />
                </div>
              </div>
            </div>

            {/* Right column - Vercel deployment */}
            <div className="space-y-4 md:space-y-6">
              <div className={sectionCard}>
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">Deploy on Vercel</h3>
                <ol className="space-y-3 md:space-y-4 text-lg md:text-xl">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">1.</span>
                    <span>Import the GitHub repository once</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">2.</span>
                    <span>Check framework and build command</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">3.</span>
                    <span>Deploy, then let each push publish updates</span>
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
        <section className="ztc-slide bg-spotlight">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-5xl md:text-7xl font-bold ztc-heading mb-6 md:mb-8">
              Demo Time
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
        <section className="ztc-slide bg-data-mesh">
                      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8">
              <h2 className="text-5xl md:text-8xl font-bold ztc-heading mb-8 md:mb-12">
                Reset
              </h2>
              <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-400/20 rounded-lg blur-xl"></div>
              <div className={sectionCardStrong}>
                <p className="text-2xl md:text-4xl text-gray-200 text-center">&nbsp;Take 10 minutes. Move, hydrate, and come back fresh.&nbsp;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9 */}
        <section className="ztc-slide bg-split-tone">
          <h2 className={`${headingLg} mb-4 md:mb-6`}>
            Part 2: Build Your Own
          </h2>
          <div className="text-xl md:text-3xl">
            <div className="ztc-surface info-panel panel-sharp p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex items-center mb-2">
                <div className="bg-blue-600/40 p-4 md:p-5 rounded-full mr-4 md:mr-6">
                  <span className="text-4xl md:text-5xl">&nbsp;🚀&nbsp;</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-blue-300">New project from scratch in Cursor</h3>
              </div>
           </div>
            <p className="text-xl md:text-3xl text-gray-200 mb-6 md:mb-8">Choose the track you want to ship today</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="ztc-surface info-panel panel-cut p-6 md:p-8 flex flex-col">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-6">
                    <span className="text-4xl md:text-5xl">&nbsp;💬&nbsp;</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-blue-300">Web App Track</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-lg md:text-xl">
                    <span>APIs and integrations</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>User Authentication</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Database</span>
                  </li>
                </ul>
              </div>
              <div className="ztc-surface info-panel panel-soft p-6 md:p-8 flex flex-col">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-orange-500/35 p-4 md:p-5 rounded-lg mr-4 md:mr-6">
                    <span className="text-4xl md:text-5xl">&nbsp;📊&nbsp;</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-blue-300">Data Analysis Track</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Collect data</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Analyze it</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Visualize it</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 10 */}
        <section className="ztc-slide bg-hero-grid">
          <h2 className={`${headingLg} mb-6 md:mb-8`}>
            Start Project Two in Cursor
          </h2>
          <p className="text-xl md:text-3xl text-gray-200 mb-6 md:mb-8">New Window -&gt; Open Project -&gt; New Folder</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-xl md:text-3xl space-y-4 md:space-y-6 ztc-surface info-panel panel-cut p-6 md:p-8 h-full">
              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-900/70 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-slate-950 p-4 md:p-5 rounded-lg text-left border border-cyan-400/25 shadow-inner text-lg md:text-xl">
                    &quot;Build a Next.js app for [...]. First connect GitHub, then keep work in this local directory.&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="bg-slate-900/70 rounded-lg p-4 border-l-4 border-orange-400 shadow-md">
                  <code className="block bg-slate-950 p-4 md:p-5 rounded-lg text-left border border-cyan-400/25 shadow-inner text-lg md:text-xl">
                    &quot;After each milestone, help me commit, push, and verify before we continue.&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-orange-400/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="ztc-surface info-panel panel-soft p-6 md:p-8 h-full flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="text-4xl md:text-5xl mr-4">&nbsp;✨&nbsp;</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300">Pro Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="ztc-surface p-4">
                    <p className="text-lg md:text-xl">
                      Use one chat for planning, a new chat for implementation.
                    </p>
                  </div>
                  <div className="ztc-surface p-4">
                    <p className="text-lg md:text-xl">Short prompts beat giant requirement dumps every time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11 */}
        <section className="ztc-slide bg-diagonal-band">
          <div className="h-full flex flex-col gap-6 md:gap-8 p-4 md:p-8">
            {/* Title at the top */}
            <h2 className={`${headingLg}`}>
              Read the Code, Stay in Control
            </h2>
            
            {/* Content grid below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
              {/* Left column - Text boxes */}
              <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
                <div className="ztc-surface info-panel panel-sharp p-4 md:p-6">
                  <p className="text-2xl md:text-3xl text-blue-300 text-center">
                    Stop random rabbit holes early.
                  </p>
                </div>
                
                <div className="ztc-surface info-panel panel-cut p-4 md:p-6">
                <span className="text-2xl mr-4 font-bold text-blue-300">&nbsp;✨&nbsp;Pro Tip</span>
                  <p className="text-xl md:text-3xl text-blue-300 text-center italic">
                    Ask for ranked likely causes and a step-by-step debug plan.
                  </p>
                </div>
              </div>

              {/* Right column - Meme image */}
              <div className=" flex items-center justify-center">
                <div className="ztc-surface info-panel panel-soft p-2">
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
        <section className="ztc-slide bg-spotlight">
          <h2 className={`${headingLg} mb-8`}>
            Troubleshoot Like a Builder
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Left Column - Troubleshooting */}
            <div className="ztc-surface-strong hero-panel panel-cut p-6">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                When the agent gets stuck
              </h3>
              <ul className="space-y-4">
                <li className="bg-slate-900/70 p-4 rounded-xl border border-red-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔍</span>
                    <span className="text-base md:text-lg text-white font-medium">Restate the goal and current failure clearly</span>
                  </div>
                </li>
                <li className="bg-slate-900/70 p-4 rounded-xl border border-orange-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📋</span>
                    <span className="text-base md:text-lg text-white font-medium">Share exact errors and terminal output</span>
                  </div>
                </li>
                <li className="bg-slate-900/70 p-4 rounded-xl border border-cyan-400/30 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔄</span>
                    <span className="text-base md:text-lg text-white font-medium">Switch models if progress stalls</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column - Shortcuts */}
            <div className="ztc-surface-strong hero-panel panel-soft p-6">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Keyboard Shortcuts
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900/70 p-4 rounded-xl border border-cyan-400/30 shadow-lg">
                  <h4 className="text-base md:text-lg font-bold text-green-300 mb-3">File Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Add file to chat</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-green-300 font-mono text-xs">⌘/Ctrl + A</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Inline edit</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-green-300 font-mono text-xs">⌘/Ctrl + I</code>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/70 p-4 rounded-xl border border-orange-400/30 shadow-lg">
                  <h4 className="text-base md:text-lg font-bold text-orange-300 mb-3">Navigation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">New chat</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-orange-300 font-mono text-xs">⌘/Ctrl + ⇧ + I</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Search codebase</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-orange-300 font-mono text-xs">⌘/Ctrl + ⇧ + F</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm md:text-base">Find file</span>
                      <code className="bg-slate-900/80 px-2 py-1 rounded-lg border border-cyan-400/25 text-orange-300 font-mono text-xs">⌘/Ctrl + P</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section className="ztc-slide bg-data-mesh">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 ztc-heading">
            Explore Cursor Superpowers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative max-w-6xl mx-auto">
            {/* Custom Rules Card */}
            <div className="ztc-surface info-panel panel-cut p-4 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-3">
                    <h3 className="text-lg md:text-2xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-2xl">@</span>Rules</h3>
                    <p className="text-xs md:text-sm text-cyan-300/80">Project standards loaded every chat</p>
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300 mb-2">
                    &quot;Explain changes in plain language for beginners.&quot;
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                    &quot;Keep files focused. Refactor long files into smaller modules.&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Docs Card */}
            <div className="ztc-surface info-panel panel-soft p-4 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-3">
                    <h3 className="text-lg md:text-2xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-2xl">@</span>Docs</h3>
                    <p className="text-xs md:text-sm text-cyan-300/80">Or paste links directly</p>
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300 mb-2">
                    &quot;Use @OpenAI docs to implement this API call safely.&quot;
                  </div>
                  <div className="mt-auto text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                    &quot;Use @Twilio docs to send an SMS in this app.&quot;
                  </div>
                </div>
              </div>
            </div>

        {/* New section spanning both columns */}
        <div className="md:col-span-2 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                &quot;Map this codebase and explain where to add a new feature cleanly.&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                &quot;Give practical Git workflows for solo projects.&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                &quot;Explain React + Tailwind choices in this project.&quot;
              </div>
              <div className="text-base md:text-lg p-3 bg-slate-950 rounded-lg border border-cyan-400/25 text-gray-300">
                &quot;What changes when we switch from JavaScript to TypeScript here?&quot;
              </div>
          </div>
        </div>
          </div>
        </section>

        {/* Slide 14 */}
        <section className="ztc-slide bg-split-tone">
          <h2 className={`${headingLg} mb-6 md:mb-8`}>
            Keep Momentum After Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left column - desktop friendly actions */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-400/20 rounded-lg blur-md transition-all duration-300"></div>
                <div className="relative ztc-surface cta-panel panel-cut p-6 md:p-8 flex flex-col items-center gap-4">
                  <p className="text-lg md:text-2xl font-semibold text-center">Join the community from desktop</p>
                  <a
                    href="https://zerotocoder.uk/slides"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold bg-orange-400/20 border border-orange-300/45 rounded-md hover:bg-orange-400/30 transition-colors"
                  >
                    Open Community Link Page
                  </a>
                  <p className="text-sm md:text-base ztc-muted text-center">
                    No QR needed on desktop.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Keep in touch */}
            <div className="text-xl md:text-3xl flex flex-col gap-6 md:gap-8">
              <div className="ztc-surface cta-panel panel-soft p-6 md:p-10 flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">👈</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Join the community</h3>
                    <p>Share wins, links, and useful prompts.</p>
                    <p>It&apos;s the fastest way to unblock your next build.</p>
                  </div>
                </div>
              </div>
              <div className="ztc-surface cta-panel panel-sharp p-6 md:p-10 flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🤿</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Pick your next build</h3>
                    <p>Learning compounds when you keep shipping.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 15 */}
        <section className="ztc-slide bg-hero-grid">
          <div className="relative z-20 flex min-h-[70vh] items-center justify-center p-6">
            <div className="max-w-sm">
              <div className="text-base md:text-lg ztc-surface cta-panel panel-cut p-4 md:p-6">
                <h3 className="text-lg md:text-2xl font-bold text-blue-300 mb-3">Help Improve This Workshop</h3>
                <p className="text-base md:text-xl mb-4">Your feedback directly shapes the next session.</p>
                
                <ul className="space-y-3 mb-6 md:mb-8">
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-slate-700/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What clicked for you?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-slate-700/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>Where did things feel confusing?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-slate-700/40 p-2 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What should we build next?</span>
                  </li>
                </ul>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-400/20 rounded-lg blur-md transition-all duration-300"></div>
                  <div className="relative ztc-surface cta-panel panel-soft p-6 md:p-8 flex flex-col items-center gap-4">
                    <a
                      href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zerotocoder.uk'}/feedback`}
                      className="inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold bg-blue-500/25 border border-blue-400/45 rounded-md hover:bg-blue-500/35 transition-colors"
                    >
                      Open Feedback Form
                    </a>
                    <p className="text-sm text-blue-300">
                      It takes about 3 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
} 