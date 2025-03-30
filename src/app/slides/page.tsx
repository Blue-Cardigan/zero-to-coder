'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import PasscodeScreen from '@/components/PasscodeScreen';

const ColorPresets = [
  { bg: '#ffffff', fg: '#000000', name: 'Classic' },
  { bg: '#0f172a', fg: '#60a5fa', name: 'Night Blue' },
  { bg: '#064e3b', fg: '#6ee7b7', name: 'Forest' },
  { bg: '#7c2d12', fg: '#fb923c', name: 'Autumn' },
  { bg: '#581c87', fg: '#e879f9', name: 'Royal' },
];

export default function Slides() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [qrColors, setQrColors] = useState(ColorPresets[0]);
  const [pulseSize, setPulseSize] = useState(250);

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
          <h1 className="text-6xl font-bold mb-100 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to 
            <br />
            Zero-to-coder
          </h1>
          <div className="text-2xl md:text-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 drop-shadow-md">First:</h2>
            <div className="text-4xl grid grid-cols-2 gap-6">
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-5xl mr-6">&nbsp;🔑</span>
                <span>&nbsp;Create a <span className="text-blue-300 font-bold"><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a></span> account</span>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-5xl mr-6">&nbsp;💻</span>
                <span>Install <span className="text-blue-300 font-bold"><a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">&nbsp;Cursor</a></span></span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-8">
            <div className="bg-indigo-900/30 p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="text-center mb-2">
                <p className="text-xl text-blue-300">Scan for slides</p>
              </div>
              <QRCodeSVG 
                value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/slides`}
                size={170}
                bgColor={qrColors.bg}
                fgColor={qrColors.fg}
                level="L"
                className="rounded-lg transition-all duration-300 hover:shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-6xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Session outline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="fragment fade-right bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-blue-300 mr-4">&nbsp;1</div>
              </div>
              <p className="text-4xl md:text-3xl text-gray-200 mb-8">Build and host your first website</p>
            </div>
            <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-blue-300 mr-4">&nbsp;2</div>
              </div>
              <p className="text-4xl md:text-3xl text-gray-200 mb-8">Start your own project with custom features</p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-0">
            <div className="fragment fade-up flex justify-center">
              <div className="w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://recipe-routine-saver.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_1.png" alt="Website example 1" width={370} height={208} className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
            <div className="fragment fade-up flex justify-center">
              <div className="w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://greater-manchester-assembly-helper.vercel.app/#" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/website_image_2.png" alt="Website example 2" width={370} height={208} className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-6xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Build and host your first website
          </h2>
          <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">1</div>
                <p className="text-center">Prompt <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">Bolt.new</a></p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/bolt-screenshot.png" alt="Bolt.new screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">2</div>
                <p className="text-center">Develop in Cursor</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/cursor_homepage_screenshot.png" alt="Cursor screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">3</div>
                <p className="text-center">Host on Vercel</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <Image src="/images/vercel_homepage_screenshot.png" alt="Vercel screenshot" width={400} height={225} className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">Bolt.new</a> and prompt a nice landing page
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fragment fade-up text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <ul className="space-y-6">
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span>Think of a project you want to build, then... ask for it</span>
                </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span>Ask questions about the code (to me or your preferred LLM)</span>
                </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <span>Don't be afraid of the code - click around and see what sense you can make of it</span>
                </li>
              </ul>
            </div>
            <div className="fragment fade-left flex flex-col justify-center">
              <div className="p-4 bg-indigo-900/60 rounded-lg">
                <p className="text-center text-2xl text-blue-300 italic mb-4">&ldquo;Build me a landing page for a productivity app called TimeFlow with a modern, minimalist design&rdquo;</p>
                <p className="text-center text-2xl text-blue-300 italic mb-4">&ldquo;Build me a site for my business called The Assembly. Include a homepage, blog, a shop, and a calendar&rdquo;</p>
                <p className="text-center text-2xl text-blue-300 italic">&ldquo;Build me a personal portfolio site with links to my social media and a blog. Include pretty animations and a contact form&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-6xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open your project in Cursor
          </h2>
          <div className="fragment fade-up grid grid-cols-2 md:grid-cols-2 gap-8 items-center">
            <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl order-1 md:order-1">
              <ol className="list-none space-y-8">
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Export the files (at the top)</h3>
                  </div>
                  <p className="ml-6 text-gray-300">Look for the export button in the Bolt interface</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Open the project in Cursor</h3>
                  </div>
                  <p className="ml-6 text-gray-300">In Cursor, File -&gt; Open... and select your folder</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Ask the AI to help</h3>
                  </div>
                  <p className="ml-6 text-gray-300">Type &apos;Get this project running on localhost&apos; in the chat</p>
                </li>
              </ol>
            </div>
            <div className="flex justify-center order-2 md:order-2">
              <div className="w-full max-w-[450px] relative">
                <div className="fragment fade-left bg-indigo-800/40 p-4 rounded-lg shadow-lg flex items-center justify-center">
                  <Image 
                    src="/images/cursor_localhost.png" 
                    alt="Cursor screenshot" 
                    width={450} 
                    height={253} 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="fragment fade-up absolute bottom-[30%] left-0 right-0 bg-indigo-900/90 p-6 rounded-lg backdrop-blur-sm border border-indigo-600/50 floating-overlay">
                  <p className="text-xl text-blue-300 text-center font-semibold">
                    And... babysit the AI as it installs everything you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Play around adding functionality
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
            <div className="fragment fade-up col-span-1 text-2xl bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-6">
                <div className="fragment fade-up flex">
                  <p className="text-2xl">&nbsp;💡 When it breaks, <span className="text-blue-300 font-bold">investigate</span> — debugging is part of coding</p>
                </div>
                
                <div className="fragment fade-up flex">
                  <p className="text-2xl">&nbsp;🤔 Moving too fast? Frustrated?<span className="text-blue-300 font-bold">Formulate a specific question</span> and ask an LLM</p>
                </div>
            
              </div>
            </div>

            <div className="col-span-1">
                {/* Final message that appears last with more space */}
                <div className="fragment fade-up col-span-full">
                  <div className="bg-indigo-900/60 p-8 rounded-xl border-2 border-indigo-600/70 shadow-2xl max-w-4xl mx-auto">
                    <p className="text-4xl md:text-3xl text-center font-bold">
                      <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text">
                        Developers are always learning — the tools are endless</span>
                    </p>
                  </div>
                </div>
            
              <div className="flex items-center justify-center">
                <Image 
                  src="/images/spanner.png" 
                  alt="Spanner tool" 
                  width={350}
                  height={350}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Shortcuts for a Speedy Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {/* Left Column - Shortcuts */}
            <div className="fragment fade-up text-xl bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-4">
                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-2xl">📋</span> Add a file to the chat
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      Select all with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + A</code>
                    </p>
                    <p className="flex items-center gap-2">
                      Add it with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + L</code>
                    </p>
                  </div>
                </div>

                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔍</span> Find
                  </h3>
                  <p className="flex items-center gap-2">
                    All project files <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + Shift + F</code>
                  </p>
                  <p className="flex items-center gap-2">
                    Filename <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + P</code>
                  </p>
                </div>

                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-2xl">⚓</span> New Terminal
                  </h3>
                  <p className="flex items-center gap-2">
                    Use <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">^ + Shift + ` / Ctrl + '</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Troubleshooting */}
            <div className="fragment fade-right">
              <div className="bg-indigo-900/60 text-3xl p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-3xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="">🔄</span> When the agent gets stuck:
                </h3>
                <ul className="space-y-3">
                  <li className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>New chat</span>
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + Shift + L</code>
                    </div>
                  </li>
                  <div className="fragment fade-up flex text-left relative">
                  <Image 
                    src="/images/new_chat_prompt.png" 
                    alt="new chat" 
                    width={600} 
                    height={670} 
                    className="object-contain drop-shadow-lg" 
                  />
                  <div className="absolute bottom-1 right-9 w-20 h-16 border-4 border-red-500/70 rounded-full animate-pulse"></div>
                </div>
                  <li className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>Use a regular chat or another model</span>
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + L</code>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 8 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <div className="h-full flex flex-col gap-8 p-8">
            {/* Title at the top */}
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Don't be afraid to read the code
            </h2>
            
            {/* Content grid below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              {/* Left column - Text boxes */}
              <div className="space-y-8 flex flex-col justify-center">
                <div className="fragment fade-up bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-3xl text-blue-300 text-center">
                    The more you know, the faster you can direct the AI
                  </p>
                </div>
                
                <div className="fragment fade-up bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-3xl text-blue-300 text-center">
                    These models can leave remarkably easy to spot bugs
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
                    className="rounded-lg min-w-[500px] min-h-[500px]"
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-12">
            Break
          </h2>
            <div className="fragment fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
                <div className="relative bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-3xl md:text-4xl text-gray-200">&nbsp;Take 10 minutes to grab tea, go outside, or just take a break&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 10 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Part 2
          </h2>
          <div className="text-2xl md:text-3xl">
            <div className="fragment fade-up bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600/40 p-5 rounded-full mr-6">
                  <span className="text-5xl">&nbsp;🚀&nbsp;</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-300">New project, from scratch, in Cursor</h3>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 pl-16">Choose your path: <span className="text-blue-300">AI Chatbot</span> or <span className="text-purple-300">Data Visualization</span></p>
            </div>
            
            <div className="grid grid-cols-2 gap-10 mt-8">
              <div className="fragment fade-right bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600/40 p-5 rounded-lg mr-6">
                    <span className="text-5xl">&nbsp;💬&nbsp;</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-300">AI Chatbot</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span>APIs</span>
                  </li>
                  <li className="flex items-center">
                    <span>Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <span>Database</span>
                  </li>
                </ul>
              </div>
              <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600/40 p-5 rounded-lg mr-6">
                    <span className="text-5xl">&nbsp;📊&nbsp;</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-300">Text Data Analysis</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span>First step: Get data</span>
                  </li>
                  <li className="flex items-center">
                    <span>Second step: Analyse it</span>
                  </li>
                  <li className="flex items-center">
                    <span>Third step: Visualise it</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Start in Cursor this time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fragment fade-up text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <h3 className="text-left text-3xl font-bold text-blue-300 mb-4">&nbsp;Example prompts:</h3>
              <div className="space-y-6">
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-indigo-950 p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                    &quot;Build me a chatbot to [use case] using the OpenAI API&quot;
                  </code>
                  <span className="text-sm text-gray-400">

                  </span>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-purple-400 shadow-md">
                  <code className="block bg-indigo-950 p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                    &quot;Provide steps to scrape webpage text from a website, and analyse it using appropriate Natural Language Processing techniques&quot;
                  </code>
                  <span className="text-sm text-gray-400">
                    Wikipedia, News, Reddit, etc.
                  </span>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full flex flex-col justify-center">
                <div className="p-4 bg-indigo-800/40 rounded-lg border border-indigo-700/40">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-4">&nbsp;✨&nbsp;</span>
                    <h3 className="text-2xl font-bold text-blue-300">Pro Tips</h3>
                  </div>
                  <ul className="space-y-3 pl-12 list-disc">
                    <li className="text-xl fragment fade-in-then-semi-out">Research the stack your project needs then specify it in your prompt</li>
                    <li className="text-xl fragment fade-in-then-semi-out">Be ready to iterate on your prompt, and add more features later</li>
                    <li className="text-xl fragment fade-in-then-semi-out">Try to understand as much of the code as you can as you go (you&apos;ll thank yourself later)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            More Cursor Tips
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 relative">
            <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="mb-4 flex justify-between">
                <div className="flex flex-col-2">
                  <div className="bg-blue-600/40 p-5 rounded-lg flex-shrink-0 mr-6">
                    <span className="text-4xl">⚙️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">Custom Rules</h3>
                    <p className="text-xl md:text-2xl">Add custom rules for the AI</p>
                  </div>
                </div>
                <div className="fragment fade-up text-xs p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300 self-start ml-4 max-w-[250px]">
                  <p>&quot;I&apos;m a beginner; explain everything&quot;</p>
                  <p>&quot;Use terse language and avoid mansplaining&quot;</p>
                  <p>&quot;I&apos;m a designer; make sure the code is beautiful&quot;</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="fragment fade-up w-full aspect-video bg-indigo-800/50 rounded-lg mt-6 flex items-center justify-center">
                  <Image src="/images/cursor_at.png" alt="Custom Rules Screenshot" width={400} height={225} className="w-full object-contain max-h-32" />
                </div>
              </div>
            </div>
            <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="mb-4 flex justify-between">
                <div className="flex flex-col-2">
                  <div className="bg-blue-600/40 p-5 rounded-lg flex-shrink-0 mr-6">
                    <span className="text-4xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">Integrated Docs</h3>
                    <p className="text-xl md:text-2xl">Access documentation within Cursor</p>
                  </div>
                </div>
                <div className="fragment fade-up text-lg p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300 self-start ml-4 max-w-[250px]">
                  <p>@OpenAI</p>
                  <p>@NextJS</p>
                  <p>@React</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="fragment fade-up w-full aspect-video bg-indigo-800/50 rounded-lg mt-6 flex items-center justify-center">
                  <Image src="/images/cursor_at_docs.png" alt="Docs Integration Screenshot" width={400} height={225} className="w-full object-contain max-h-32" />
                </div>
              </div>
            </div>
            
            {/* Overlay instruction box */}
            <div className="fragment fade-up absolute inset-0 flex items-center justify-center z-10" data-fragment-index="5">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-900/90 blur-md rounded-lg"></div>
                <div className="relative bg-gradient-to-r from-indigo-900/90 to-blue-900/90 backdrop-blur-md px-8 py-6 rounded-lg border-2 border-blue-400/70 shadow-2xl flex items-center">
                  <div className="bg-blue-600/40 p-4 rounded-full mr-5 flex-shrink-0">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <p className="text-2xl font-bold">Type or Click <span className="text-blue-300 font-bold text-4xl mx-2">@</span> in the Chat input</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 12 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            What am I actually learning?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="text-2xl md:text-3xl">
              <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-6 h-full flex">
                <div className="bg-blue-600/40 p-5 rounded-lg mr-8 h-min flex items-center justify-center">
                  <span className="text-5xl">🧩</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6">Problem solving</h3>
                  <p className="mb-6">Actual engineers rarely go into a project already knowing everything they need</p>
                  <div className="mt-8 p-6 bg-indigo-800/40 rounded-lg text-gray-300 text-xl italic">
                    &ldquo;It&apos;s not about memorization, but knowing how to find and apply solutions&rdquo;
                  </div>
                </div>
              </div>
            </div>
            <div className="text-2xl md:text-3xl flex flex-col">
              <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-8 flex-grow">
                <div className="flex mb-6">
                  <div className="bg-blue-600/40 p-5 rounded-lg mr-8 flex items-center justify-center">
                    <span className="text-5xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Learn to do, not just know</h3>
                    <p>Chat with another LLM to understand concepts when you&apos;re curious</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-8 flex-grow">
                <div className="flex mb-6">
                  <div className="bg-blue-600/40 p-5 rounded-lg mr-8 flex items-center justify-center">
                    <span className="text-5xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Exactly what AI is good at</h3>
                    <p>It&apos;s, like, *pretty* good at some things</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          {/* Tag cloud background */}
          <div className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-[10vw] -translate-y-[10vh]">
            <iframe
              src="/tag-cloud"
              className="w-full h-full"
              frameBorder="0"
            />
          </div>

          <div className="relative z-20 -translate-y-7">
            <div className="max-w-sm">
              <div className="text-lg bg-indigo-900/30 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-3">Make me better!</h3>
                <p className="text-lg md:text-xl mb-2">Share your thoughts and experiences with the workshop</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-1 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What worked well?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-1 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What could be improved?</span>
                  </li>
                  <li className="flex items-center group cursor-pointer transition-all duration-300 hover:bg-indigo-800/40 p-1 rounded-lg">
                    <span className="text-blue-300 mr-2 opacity-0 group-hover:opacity-100">👉</span>
                    <span>What would you like to learn next?</span>
                  </li>
                </ul>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <div className="relative bg-indigo-900/30 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col items-center">
                    <div 
                      className="relative transition-transform duration-700 ease-in-out"
                      style={{ transform: `scale(${pulseSize/220})` }}
                    >
                      <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/feedback`}>
                        <QRCodeSVG 
                          value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/feedback`}
                          size={220}
                          bgColor={qrColors.bg}
                          fgColor={qrColors.fg}
                        level="L"
                        className={`bg-${qrColors.bg} p-2 rounded-lg transition-all duration-300 hover:shadow-2xl`}
                      />
                      </a>
                    </div>

                    <div className="relative left-0 right-0 text-center mt-2">
                      <p className="text-sm text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        It takes 3 minutes!
                      </p>
                    </div>

                    <div className="mt-4 flex justify-center gap-2">
                      {ColorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => setQrColors(preset)}
                          className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                            qrColors === preset ? 'ring-2 ring-blue-400 scale-110' : ''
                          }`}
                          style={{ 
                            background: `linear-gradient(45deg, ${preset.bg}, ${preset.fg})`,
                          }}
                          title={preset.name}
                        />
                      ))}
                    </div>
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