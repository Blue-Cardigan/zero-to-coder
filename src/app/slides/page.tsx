'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';
import { QRCodeSVG } from 'qrcode.react';

const ColorPresets = [
  { bg: '#ffffff', fg: '#000000', name: 'Classic' },
  { bg: '#0f172a', fg: '#60a5fa', name: 'Night Blue' },
  { bg: '#064e3b', fg: '#6ee7b7', name: 'Forest' },
  { bg: '#7c2d12', fg: '#fb923c', name: 'Autumn' },
  { bg: '#581c87', fg: '#e879f9', name: 'Royal' },
];

export default function Slides() {
  const [qrColors, setQrColors] = useState(ColorPresets[0]);
  const [pulseSize, setPulseSize] = useState(250);

  useEffect(() => {
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
      // Add more interactive features
      keyboard: true,
      overview: true,
      touch: true,
    });

    // Apply background after initialization
    document.querySelector('.reveal')?.setAttribute(
      'style', 
      'background-image: radial-gradient(circle at center, #4338ca 0%, #1e1b4b 100%); background-repeat: no-repeat; background-size: cover;'
    );

    deck.initialize();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseSize((size) => (size === 220 ? 230 : 220));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
            <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 drop-shadow-md">Before we start, make sure to have:</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-5xl mr-6">&nbsp;🔑</span>
                <span>&nbsp;An account on <span className="text-blue-300 font-bold"><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github.com</a></span></span>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-5xl mr-6">&nbsp;💻</span>
                <span><span className="text-blue-300 font-bold"><a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">&nbsp;Cursor</a></span> installed on your machine</span>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Session outline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="fragment fade-right bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-blue-300 mr-4">&nbsp;1</div>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-8">Build and host your first website</p>
              <div className="grid grid-cols-3 gap-8 flex-grow">
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">Prompting Bolt.new</span>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">Developing in Cursor</span>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">Hosting on Vercel</span>
                </div>
              </div>
            </div>
            <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-blue-300 mr-4">&nbsp;2</div>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-8">Start your own project with custom features</p>
              <div className="grid grid-cols-3 gap-8 flex-grow">
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">Database</span>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">Authentication</span>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-lg border border-indigo-700/40 flex items-center justify-center text-center">
                  <span className="text-xl">APIs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-0">
            <div className="fragment fade-up flex justify-center">
              <div className="w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://recipe-routine-saver.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/website_image_1.png" alt="Website example 1" className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
            <div className="fragment fade-up flex justify-center">
              <div className="w-[370px] bg-indigo-900/40 p-2 rounded-lg hover:scale-105 transition-transform duration-300">
                <a href="https://greater-manchester-assembly-helper.vercel.app/#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/website_image_2.png" alt="Website example 2" className="w-full rounded-lg shadow-lg" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Part 1
          </h2>
          <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">1</div>
                <p className="text-center">Prompt Bolt.new</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <img src="/images/bolt-screenshot.png" alt="Bolt.new screenshot" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">2</div>
                <p className="text-center">Develop in Cursor</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <img src="/images/cursor_homepage_screenshot.png" alt="Cursor screenshot" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">3</div>
                <p className="text-center">Host on Vercel</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center overflow-hidden">
                  <img src="/images/vercel_homepage_screenshot.png" alt="Vercel screenshot" className="w-full h-full object-contain" />
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
            <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <ul className="space-y-6">
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <div className="flex">
                    <span>Think of a project you want to build, then... ask for it</span>
                  </div>
              </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <div className="flex">
                    <span>Ask questions about the code (to me or your preferred LLM)</span>
                  </div>
              </li>
                <li className="fragment fade-up bg-indigo-800/30 rounded-lg p-4 border-blue-400 shadow-md">
                  <div className="flex">
                    <span>Don&apos;t be afraid of the code - click around and see what sense you can make of it</span>
                  </div>
              </li>
            </ul>
            </div>
            <div className="fragment fade-left flex flex-col justify-center">
              <div className="mt-60 p-4 bg-indigo-900/60 rounded-lg">
                <p className="text-center text-2xl text-blue-300 italic">&ldquo;Build me a landing page for a productivity app called TimeFlow with a modern, minimalist design&rdquo;</p>
                <p className="text-center text-2xl text-blue-300 italic">&ldquo;Build me a site for my business called The Assembly. Include a homepage, blog, a shop, and a calendar&rdquo;</p>
                <p className="text-center text-2xl text-blue-300 italic">&ldquo;Build me a personal portfolio site with links to my social media and a blog. Include pretty animations and a contact form&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open your project in Cursor
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center">
            <div style={{ padding: '1rem' }} className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl order-1 md:order-1">
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
              <div className="w-full max-w-[450px] fragment fade-left bg-indigo-800/40 p-4 rounded-lg flex shadow-lg">
                <img src="/images/cursor_localhost.png" alt="Cursor screenshot" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Shortcuts for a Speedy Workflow
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="text-xl md:text-2xl bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <div className="space-y-6 h-full flex flex-col justify-between p-2">
                <div style={{ padding: '0.5rem' }} className="fragment fade-up bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40">
                  <div>
                    <h3 className="font-bold text-blue-300">📋 Add a file to the chat</h3>
                    <p className="pl-2">Select all with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + A</code> then <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + L</code></p>
                  </div>
                </div>
                <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40">
                  <div>
                    <h3 className="font-bold text-blue-300">🔍 Search all files in the codebase</h3>
                    <p className="pl-2">Use <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + Shift + F</code> to search the entire codebase</p>
                  </div>
                </div>
                <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40">
                  <div>
                    <h3 className="font-bold text-blue-300">📂 Find files</h3>
                    <p className="pl-2">Search for filenames with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">⌘/Ctrl + P</code></p>
                  </div>
                </div>
                <div style={{ padding: '1rem' }} className="fragment fade-up bg-indigo-800/40 rounded-lg border border-indigo-600/40">
                  <div>
                    <h3 className="font-bold text-blue-300">⚓ Terminal</h3>
                    <p className="text-xl text-gray-300">
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">Ctrl + ~ + Shift / Ctrl + `</code> to open the terminal
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fragment fade-right h-full flex flex-col gap-6">
              <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full flex flex-col justify-center" data-fragment-index="3">
                <h3 className="text-2xl font-bold text-blue-300 mb-6">If the agent starts looping:</h3>
                <ul className="text-xl space-y-7 p-2">
                  <li className="flex items-center bg-indigo-800/40 p-4 rounded-lg">
                    <span>Make it a regular chat with a specific instruction <code className="bg-indigo-950 px-2 py-1 rounded text-sm">⌘/Ctrl + L</code></span>
                  </li>
                  <li className="flex items-center bg-indigo-800/40 p-4 rounded-lg">
                    <span>Use the latest model (not Auto)</span>
                  </li>
                  <li className="flex items-center bg-indigo-800/40 p-4 rounded-lg">
                    <span>Debug it yourself if needed (These models can leave remarkably easy to spot bugs)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Play around adding functionality
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-2xl md:text-2xl bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-6">
                <div className="fragment fade-up flex">
                  <p className="text-2xl">&nbsp;💡 When it breaks, <span className="text-blue-300 font-bold">investigate</span> — debugging is part of coding</p>
                </div>
                
                <div className="fragment fade-up flex">
                  <p className="text-2xl">&nbsp;🤔 Moving too fast? <span className="text-blue-300 font-bold">Formulate a specific question</span> and ask an LLM</p>
                </div>
                
                <div className="fragment fade-up flex text-left">
                  <div>
                    <p className="text-2xl mb-2">&nbsp;<span className="text-blue-300 font-bold">🧩 Frustrated?</span></p>
                    <div className="border-l-2 border-indigo-600 space-y-3">
                      <p>&nbsp;Welcome to code!</p>
                      <p>&nbsp;The computer is only doing exactly what it&apos;s told</p>
                      <p>&nbsp;Be curious, not frustrated</p>
                    </div>
                  </div>
                </div>
                {/* Final message that appears last with more space */}
                <div className="fragment fade-up mt-10 col-span-full">
                  <div className="bg-indigo-900/60 p-8 rounded-xl border-2 border-indigo-600/70 shadow-2xl max-w-4xl mx-auto">
                    <p className="text-4xl md:text-3xl text-center font-bold">
                      <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text">
                        Developers are always learning — the tools are endless</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <img 
                src="/images/spanner.png" 
                alt="Spanner tool" 
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Slide 8 */}
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
                  <img src="/images/cursor_at.png" alt="Custom Rules Screenshot" className="w-full object-contain max-h-32" />
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
                  <img src="/images/cursor_at_docs.png" alt="Docs Integration Screenshot" className="w-full object-contain max-h-32" />
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
                  <p className="text-3xl md:text-4xl text-gray-200">&nbsp;Take 5 minutes to stretch and relax&nbsp;</p>
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
                  <h3 className="text-3xl md:text-4xl font-bold text-blue-300">AI Chatbot</h3>
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
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-300">Data visualization</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span>Common stack (Django/React)</span>
                  </li>
                  <li className="flex items-center">
                    <span>Database integration</span>
                  </li>
                  <li className="flex items-center">
                    <span>Interactive charts</span>
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
            <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <h3 className="text-left text-3xl font-bold text-blue-300 mb-4">&nbsp;Example prompts:</h3>
              <div className="space-y-6">
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-indigo-950 p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                    &quot;Build me a chatbot to [use case] using the OpenAI API&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-purple-400 shadow-md">
                  <code className="block bg-indigo-950 p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                    &quot;Build me a data visualization tool with Django/React to [visualize what]&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-1/2 flex flex-col justify-center">
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
              <div className="fragment fade-up bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-1/2 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block mb-4 bg-indigo-800/40 p-4 rounded-full">
                    <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                    </svg>
                  </div>
                  <p className="text-2xl text-blue-300 font-bold mb-2">See the magic happen</p>
                  <p className="text-xl text-gray-300">Cursor builds your project based on your natural language instructions</p>
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