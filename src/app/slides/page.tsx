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
          <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            First Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Create Accounts */}
            <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Create Free Accounts</h3>
              <div className="space-y-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-blue-300 transition-colors">
                  <span className="text-2xl">🐙</span>
                  <span>github.com</span>
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-blue-300 transition-colors">
                  <span className="text-2xl">▲</span>
                  <span>vercel.com (Use GitHub login!)</span>
                </a>
              </div>
            </div>

            {/* Install Software */}
            <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Install Software</h3>
              <div className="space-y-4">
                <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-blue-300 transition-colors">
                  <span className="text-2xl">⌨️</span>
                  <span>cursor.sh</span>
                </a>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">🟢</span>
                  <span><a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">Node.js</a> (Windows only)</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">📦</span>
                  <span><a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">git</a> (Windows only)</span>
                </div>
              </div>
            </div>
            {/* Mac Instructions */}
            <div className="md:col-span-2 bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Open Cursor and ask the agent:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mac Section */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-blue-300">MacOS</h4>
                  <div className="bg-indigo-950 p-4 rounded-lg border border-indigo-700/40">
                    <button 
                      onClick={() => handleCopy("Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login")}
                      className="text-blue-300 font-mono text-lg hover:text-blue-200 transition-colors w-full text-left group relative"
                    >
                      <span className="relative z-10">"Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login"</span>
                      <span className={`absolute inset-0 bg-green-500/20 rounded transition-opacity duration-200 ${copiedText === "Install Homebrew, Node.js and git on my system, then authenticate my GitHub account through CLI web browser login" ? 'opacity-100' : 'opacity-0'}`}></span>
                      <span className="absolute -right-2 -top-2 text-xs bg-green-500/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to copy
                      </span>
                    </button>
                  </div>
                </div>

                {/* Windows Section */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-blue-300">Windows</h4>
                  <div className="bg-indigo-950 p-4 rounded-lg border border-indigo-700/40">
                    <button 
                      onClick={() => handleCopy("Authenticate my GitHub account through CLI web browser login")}
                      className="text-blue-300 font-mono text-lg hover:text-blue-200 transition-colors w-full text-left group relative"
                    >
                      <span className="relative z-10">"Authenticate my GitHub account through CLI web browser login"</span>
                      <span className={`absolute inset-0 bg-green-500/20 rounded transition-opacity duration-200 ${copiedText === "Authenticate my GitHub account through CLI web browser login" ? 'opacity-100' : 'opacity-0'}`}></span>
                      <span className="absolute -right-2 -top-2 text-xs bg-green-500/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to copy
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blue-300/80 italic mt-4">NB: Installation may be slower on older machines!</p>
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Session outline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="fragment fade-right bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="text-4xl md:text-5xl font-bold text-blue-300 mr-4">&nbsp;1</div>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-6 md:mb-8">Build and host your first website</p>
            </div>
            <div className="fragment fade-left bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="text-4xl md:text-5xl font-bold text-blue-300 mr-4">&nbsp;2</div>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-6 md:mb-8">Start your own project with custom features</p>
            </div>
          </div>
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="fragment fade-up flex justify-center">
              <div className="w-full max-w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://recipe-routine-saver.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_1.png" alt="Website example 1" width={370} height={208} className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
            <div className="fragment fade-up flex justify-center">
              <div className="w-full max-w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://greater-manchester-assembly-helper.vercel.app/#" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_2.png" alt="Website example 2" width={370} height={208} className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Build and host your first website
          </h2>
          <div className="text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-4 md:p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-3xl md:text-4xl text-blue-300 mb-4">1</div>
                <p className="text-center text-lg md:text-xl">Prompt <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">Bolt.new</a></p>
                <div className="mt-4 md:mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/bolt-screenshot.png" alt="Bolt.new screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-4 md:p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-3xl md:text-4xl text-blue-300 mb-4">2</div>
                <p className="text-center text-lg md:text-xl">Develop in Cursor</p>
                <div className="mt-4 md:mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/cursor_homepage_screenshot.png" alt="Cursor screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-4 md:p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-3xl md:text-4xl text-blue-300 mb-4">3</div>
                <p className="text-center text-lg md:text-xl">Host on Vercel</p>
                <div className="mt-4 md:mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/vercel_homepage_screenshot.png" alt="Vercel screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Let's get started...
          </h1>
          <h2 className="fragment fade-up text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">Bolt.new</a> and prompt a nice landing page
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="fragment fade-up text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <ul className="space-y-4 md:space-y-6">
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span className="text-lg md:text-xl">Think of a project you want to build, then... ask for it</span>
                </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span className="text-lg md:text-xl">Ask questions about the code (to me or your preferred LLM)</span>
                </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span className="text-lg md:text-xl">Don&apos;t be afraid of the code - click around and see what sense you can make of it</span>
                </li>
              </ul>
            </div>
            <div className="fragment fade-left flex flex-col justify-center">
              <div className="p-4 bg-indigo-900/60 rounded-lg">
                <p className="text-center text-lg md:text-2xl text-blue-300 italic mb-4">&ldquo;Build me a landing page for a productivity app called TimeFlow with a modern, minimalist design&rdquo;</p>
                <p className="text-center text-lg md:text-2xl text-blue-300 italic mb-4">&ldquo;Build me a site for my business called The Assembly. Include a homepage, blog, a shop, and a calendar&rdquo;</p>
                <p className="text-center text-lg md:text-2xl text-blue-300 italic">&ldquo;Build me a personal portfolio site with links to my social media and a blog. Include pretty animations and a contact form&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open your project in Cursor
          </h2>
          <div className="fragment fade-up grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl order-1 md:order-1">
              <ol className="list-none space-y-4">
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Export the files (at the top)</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Then extract the files and move them to a good folder (e.g Documents/Code/[project name])</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Open the project in Cursor</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">In Cursor, File -&gt; Open... and select your folder</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Begin the vibe</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl italic">By default, Cursor will write code in agent mode, which is great for getting started</p>
                </li>
              </ol>
            </div>
            <div className="flex justify-center order-2 md:order-2">
              <div className="w-full max-w-[400px] relative">
                <div className="fragment fade-left bg-indigo-800/40 p-4 rounded-lg shadow-lg flex items-center justify-center relative">
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Get the Vibes Flowing
          </h2>
          <div className="fragment fade-up grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl order-1 md:order-1">
              <ol className="list-none space-y-4">
                <li className="fragment fade-up">
                  <p className="ml-6 text-gray-300 text-lg md:text-xl"><span className="text-red-300 font-bold">Read and respond</span>, then the <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-bold">vibes will flow</span></p>
                </li>
                <li className="fragment fade-up">
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Enable Autosave: <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + Shift + P</code></p>
                </li>
                <li className="fragment fade-up">
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">
                    Many installation obstacles can be overcome by closing Cursor and opening it again.
                  </p>
                </li>

                <li className="fragment fade-up">
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Watch for the New Chat button in the bottom right corner of the screen</p>
                </li>
              </ol>
            </div>
            <div className="flex-col-2 justify-center order-2 md:order-2">
              <div className="fragment fade-left w-full max-w-[400px] relative left-20">
                <div className="relative w-full">
                  <Image 
                    src="/images/new_chat_prompt.png" 
                    alt="new chat" 
                    width={600} 
                    height={670} 
                    className="w-full h-auto object-contain drop-shadow-lg" 
                  />
                  <div className="absolute bottom-[25%] right-[7%] w-[15%] aspect-[1.75/1] border-4 border-red-500/70 rounded-full animate-pulse"></div>
                  <div className="absolute top-[6%] left-[1%] w-[23%] aspect-[3/1] border-4 border-red-500/70 rounded-full animate-pulse"></div>
                  <div className="text-gray-300 text-lg md:text-xl">Add files with @. Restart long chats.</div>
                </div>
              </div>
              <div className="fragment fade-left w-full max-w-[600px] relative">
                <div className="relative w-full">
                  <Image 
                    src="/images/open_terminal.png" 
                    alt="new chat" 
                    width={600} 
                    height={670} 
                    className="w-full h-auto object-contain drop-shadow-lg" 
                  />
                </div>
                <div className="text-gray-300 text-lg md:text-xl">
                  Run <code className="text-blue-300">npm run dev</code> in a real terminal (⌃ + ⇧ + ` or Ctrl + &apos;)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Once the coding begins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              
              <div className="fragment fade-up">
                <div className="bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-xl md:text-2xl text-center">
                    <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-bold">When it breaks, don't be <span className="text-red-300 font-bold">glum</span> — be <span className="text-green-300 font-bold">curious</span></span>
                  </p>
                </div>
              </div>
              
              <div className="fragment fade-up">
                <div className="bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-xl md:text-2xl text-center">
                    <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-bold">Look things up — the more you know, the better you can babysit the agent</span>
                  </p>
                </div>
              </div>

              <div className="fragment fade-up">
                <div className="bg-indigo-900/60 p-6 md:p-8 rounded-xl border-2 border-indigo-600/70 shadow-2xl max-w-4xl mx-auto">
                  <p className="text-xl md:text-2xl text-center font-bold">
                    <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                      Developers are always learning — the tools are endless
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-4 md:mt-8">
              <Image 
                src="/images/spanner.png" 
                alt="Spanner tool" 
                width={350}
                height={350}
                className="w-full max-w-[350px] object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Slide 7 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Host your site
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-fit">
            {/* Left column - Git steps */}
            <div className="fragment fade-up space-y-4 md:space-y-6">
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
            <div className="fragment fade-left space-y-4 md:space-y-6">
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
              <div className="fragment fade-up">
                <LinkShareForm />
              </div>
              
              <div className="fragment fade-up flex flex-col">
                <SharedLinksList />
              </div>
            </div>
            
            <div className="fragment fade-up mt-4 md:mt-6">
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
            <div className="fragment fade-up bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-6 md:mb-8">
              <div className="flex items-center mb-2">
                <div className="bg-blue-600/40 p-4 md:p-5 rounded-full mr-4 md:mr-6">
                  <span className="text-4xl md:text-5xl">&nbsp;🚀&nbsp;</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-blue-300">New project, from scratch, in Cursor</h3>
              </div>
           </div>
            <p className="fragment fade-up text-xl md:text-3xl text-gray-200 mb-6 md:mb-8">Choose your path</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="fragment fade-right bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
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
              <div className="fragment fade-left bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
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
            <div className="fragment fade-up text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <div className="space-y-4 md:space-y-6">
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Build me a Next.js web app to [...]. Use Supabase for the database and authentication. Use the current directory as the project root.&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-purple-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Provide steps to [scrape webpage text from a website / get data from X source], and analyse it to identify trends / key topics / etc &quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="fragment fade-left bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="text-4xl md:text-5xl mr-4">&nbsp;✨&nbsp;</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300">Pro Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="fragment fade-up bg-indigo-900/60 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                    <p className="text-lg md:text-xl">
                      Ask how to structure the project in one chat, then switch to a new chat to start building
                    </p>
                  </div>
                  <div className="fragment fade-up bg-indigo-900/60 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
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
                <div className="fragment fade-up bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-2xl md:text-3xl text-blue-300 text-center">
                    Divert away from random rabbit holes sooner.
                  </p>
                </div>
                
                <div className="fragment fade-up bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <span className="text-2xl mr-4 font-bold text-blue-300">&nbsp;✨&nbsp;Pro Tip</span>
                  <p className="text-xl md:text-3xl text-blue-300 text-center italic">
                    Ask for debugging steps, or to identify the most likely cause(s) of an issue.
                  </p>
                </div>
              </div>

              {/* Right column - Meme image */}
              <div className="fragment fade-left flex items-center justify-center">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Get Good
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Troubleshooting */}
            <div className="fragment fade-right">
              <div className="bg-indigo-900/60 text-xl md:text-3xl p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="">🔄</span> When the agent gets stuck
                </h3>
                <ul className="space-y-3">
                  <li className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>Explain the situation in more detail</span>
                    </div>
                  </li>
                  <li className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>Provide errors and/or terminal output</span>
                    </div>
                  </li>
                  <li className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>Try a different model (bottom right)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Shortcuts */}
            <div className="fragment fade-up text-lg md:text-xl bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-3 md:space-y-4">
                <div className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-xl md:text-2xl">📋</span> Shortcuts for a Speedy Workflow
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      Add a file with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + A</code>, <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + I</code>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>New chat</span>
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + ⇧ + I</code>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      Search the whole codebase <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + ⇧ + F</code>
                    </p>
                    <p className="flex items-center gap-2">
                      Find a file <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + P</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="fragment fade-down text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative max-w-5xl mx-auto">
            {/* Custom Rules Card */}
            <div className="fragment fade-right bg-indigo-900/60 p-4 md:p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-4">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-3xl">@</span>Rules</h3>
                    <p className="text-sm md:text-base text-indigo-400">A prompt provided in every chat</p>
                  </div>
                  <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Add comments to your code to explain to a beginner&quot;
                  </div>
                  <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Keep files small and focused. Split up long files into smaller ones&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Docs Card */}
            <div className="fragment fade-right bg-indigo-900/60 p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-col items-start">
                  <div className="flex items-baseline gap-2 mb-4">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300"><span className="text-blue-300 font-bold text-3xl">@</span>Docs</h3>
                    <p className="text-sm md:text-base text-indigo-400">Or paste a link directly</p>
                  </div>
                  <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Use @OpenAI to implement an API call to return [...]&quot;
                  </div>
                  <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                    &quot;Use @Twilio to send an SMS&quot;
                  </div>
                </div>
              </div>
            </div>

        {/* New section spanning both columns */}
        <div className="fragment fade-up md:col-span-2 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Explain the structure of the codebase and compare it with another common web framework&quot;
              </div>
              <div className="text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Provide some common use cases for Git when working on a personal project&quot;
              </div>
              <div className="text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                &quot;Explain what React and Tailwind are, why they're useful, and how they work&quot;
              </div>
              <div className="text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
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
            <div className="fragment fade-up flex flex-col items-center justify-center">
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
              <div className="fragment fade-up bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">👈</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Join the gang</h3>
                    <p>You&apos;ll probably learn faster with others around.</p>
                    <p>It&apos;s also the best place to ask me questions :D</p>
                  </div>
                </div>
              </div>
              <div className="fragment fade-up bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex-grow">
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