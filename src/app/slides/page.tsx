'use client';

import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

export default function Slides() {
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

  return (
    <div className="reveal">
      <div className="slides">
        {/* Slide 1 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h1 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to Zero-to-coder
          </h1>
          <div className="text-2xl md:text-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 drop-shadow-md">Before we start, make sure to have:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-3xl mr-6">🔑</span>
                <span>An account on <span className="text-blue-300 font-bold"><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github.com</a></span></span>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-3xl mr-6">💻</span>
                <span><span className="text-blue-300 font-bold"><a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">Cursor</a></span> installed on your machine</span>
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
                <div className="text-5xl font-bold text-blue-300 mr-4">1</div>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-300">Part 1</h3>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-4">Build and host your first website</p>
              <div className="mt-auto mx-auto w-full max-w-xs aspect-video bg-indigo-800/50 rounded flex items-center justify-center">
                <span className="text-indigo-300 text-xl">Website Image</span>
              </div>
            </div>
            <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="text-5xl font-bold text-blue-300 mr-4">2</div>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-300">Part 2</h3>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 mb-2">Start your own project with custom features</p>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">database, authentication, APIs</p>
              <div className="mt-auto mx-auto w-full max-w-xs aspect-video bg-indigo-800/50 rounded flex items-center justify-center">
                <span className="text-indigo-300 text-xl">Project Image</span>
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
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center">
                  <span className="text-indigo-300">Bolt Screenshot</span>
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">2</div>
                <p className="text-center">Develop in Cursor</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center">
                  <span className="text-indigo-300">Cursor Screenshot</span>
                </div>
              </div>
              <div className="fragment fade-up flex-1 bg-indigo-800/40 p-6 rounded-lg border border-indigo-600/40 flex flex-col items-center">
                <div className="text-4xl text-blue-300 mb-4">3</div>
                <p className="text-center">Host on Vercel</p>
                <div className="mt-6 w-full aspect-video bg-indigo-700/50 rounded flex items-center justify-center">
                  <span className="text-indigo-300">Vercel Screenshot</span>
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
              <div className="w-full aspect-video bg-indigo-800/40 rounded-lg border border-indigo-700/40 p-4 flex items-center justify-center shadow-lg">
                <p className="text-xl text-center text-indigo-300">Landing Page Screenshot</p>
              </div>
              <div className="mt-6 p-4 bg-indigo-900/60 rounded-lg">
                <p className="text-center text-xl text-blue-300 italic">&ldquo;Build me a landing page for a productivity app called TimeFlow with a modern, minimalist design&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Open your project in Cursor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <ol className="list-none space-y-8">
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Export the files (at the top)</h3>
                  </div>
                  <p className="ml-16 text-gray-300">Look for the export button in the Bolt interface</p>
              </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Open the project in Cursor</h3>
                  </div>
                  <p className="ml-16 text-gray-300">In Cursor, File -&gt; Open... and select your folder</p>
              </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold text-blue-300">Ask the AI to help</h3>
                  </div>
                  <p className="ml-16 text-gray-300">Type &apos;Get this project running on localhost&apos; in the chat</p>
              </li>
              </ol>
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="fragment fade-left w-full aspect-square bg-indigo-800/40 rounded-lg border border-indigo-700/40 p-4 flex items-center justify-center shadow-lg">
                <p className="text-xl text-center text-indigo-300">Cursor Screenshot</p>
              </div>
              <div className="fragment fade-in mt-4">
                <div className="p-4 bg-indigo-900/40 rounded-lg text-center text-blue-300 text-xl">
                  AI will assist with installing dependencies and starting the dev server
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Using Cursor (tips)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-xl md:text-2xl bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-6">
                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40 flex items-start">
                  <div className="p-4 bg-blue-700/50 rounded-full mr-6 flex-shrink-0">
                    <span className="text-blue-200 text-xl">📋</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300 mb-2">Add a file to the chat</h3>
                    <p>Select all with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">Cmd/Ctrl + A</code> then <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">Cmd/Ctrl + L</code></p>
                  </div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40 flex items-start">
                  <div className="p-4 bg-blue-700/50 rounded-full mr-6 flex-shrink-0">
                    <span className="text-blue-200 text-xl">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-300 mb-2">Search all files in the codebase</h3>
                    <p>Use <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">Cmd/Ctrl + Shift + F</code> to search the entire codebase</p>
                  </div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg border border-indigo-600/40 flex items-start">
                  <div className="p-4 bg-blue-700/50 rounded-full mr-6 flex-shrink-0">
                    <span className="text-blue-200 text-xl">📂</span>
                  </div>
                <div>
                    <h3 className="font-bold text-blue-300 mb-2">Find files</h3>
                    <p>Search for filenames with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700">Cmd/Ctrl + P</code></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="fragment fade-left bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">If the agent starts looping:</h3>
                <ul className="text-xl space-y-3">
                  <li className="flex items-center">
                    <span>Make it a regular chat with a specific instruction <code className="bg-indigo-950 px-2 py-1 rounded text-sm">Cmd/Ctrl + I</code></span>
                    </li>
                  <li className="flex items-center">
                    <span>Use the latest model (not Auto)</span>
                    </li>
                  <li className="flex items-center">
                    <span>Debug it yourself if needed (These models can leave remarkably easy to spot bugs)</span>
                    </li>
                  </ul>
              </div>
              {/* <div className="fragment fade-up flex-1 bg-indigo-900/40 flex items-center justify-center rounded-lg border border-indigo-700/40 p-4">
                <div className="w-full aspect-video bg-indigo-800/50 rounded flex items-center justify-center">
                  <p className="text-xl text-center text-indigo-300">Cursor Interface Screenshot</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Slide 7 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Play around adding functionality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 text-xl md:text-2xl bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="space-y-6">
                <div className="fragment fade-up flex">
                  <div className="p-4 rounded-lg bg-blue-600/50 mr-6 flex-shrink-0 h-min">
                    <span className="text-2xl">💡</span>
                  </div>
                  <p className="text-xl">When it breaks, <span className="text-blue-300 font-bold">investigate</span> — debugging is part of coding</p>
                </div>
                
                <div className="fragment fade-up flex">
                  <div className="p-4 rounded-lg bg-blue-600/50 mr-6 flex-shrink-0 h-min">
                    <span className="text-2xl">🧩</span>
                  </div>
                <div>
                    <p className="text-xl mb-2"><span className="text-blue-300 font-bold">Frustrated?</span></p>
                    <div className="ml-4 pl-4 border-l-2 border-indigo-600 space-y-3">
                      <p>Welcome to code!</p>
                      <p>The computer is only doing exactly what it&apos;s told</p>
                      <p>Be curious, not frustrated</p>
                    </div>
                  </div>
                </div>
                
                <div className="fragment fade-up flex">
                  <div className="p-4 rounded-lg bg-blue-600/50 mr-6 flex-shrink-0 h-min">
                    <span className="text-2xl">🤔</span>
                  </div>
                  <p className="text-xl">Moving too fast? <span className="text-blue-300 font-bold">Formulate a specific question</span> and ask an LLM</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="fragment fade-left h-full flex flex-col">
                <div className="flex-1 bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  {/* <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-blue-300">Screenshot</h3>
                    <p className="text-gray-300 text-lg">Common error example</p>
                  </div> */}
                  {/* <div className="w-full aspect-video bg-indigo-800/50 rounded-lg flex items-center justify-center">
                    <p className="text-xl text-center text-indigo-300">Error Screenshot</p>
                  </div> */}
                </div>
                <div className="fragment fade-up bg-indigo-900/40 p-4 mt-4 rounded-lg border border-indigo-700/30 text-center">
                  <p className="text-xl">
                    <span className="text-blue-300 font-bold">Developers are always learning</span> — the tools are endless
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 8 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            More Cursor Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="mb-4 flex">
                <div className="bg-blue-600/40 p-5 rounded-lg flex-shrink-0 mr-6">
                  <span className="text-4xl">⚙️</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">Custom Rules</h3>
                  <p className="text-xl md:text-2xl">Add personalized instructions for the AI</p>
                </div>
              </div>
              <div className="fragment fade-up mt-4 bg-indigo-800/40 p-4 rounded-lg">
                <p className="text-xl">Click <span className="text-blue-300 font-bold">@</span> in the Chat input</p>
                <div className="mt-4 p-3 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                  <p>Example: &quot;I&apos;m a beginner; explain everything&quot;</p>
                </div>
              </div>
              <div className="mt-auto">
                <div className="fragment fade-up w-full aspect-video bg-indigo-800/50 rounded-lg mt-6 flex items-center justify-center">
                  <p className="text-xl text-center text-indigo-300">Custom Rules Screenshot</p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="mb-4 flex">
                <div className="bg-blue-600/40 p-5 rounded-lg flex-shrink-0 mr-6">
                  <span className="text-4xl">📚</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">Integrated Docs</h3>
                  <p className="text-xl md:text-2xl">Access documentation within Cursor</p>
                </div>
              </div>
              <div className="fragment fade-up mt-4 bg-indigo-800/40 p-4 rounded-lg">
                <p className="text-xl">Use the built-in <span className="text-blue-300 font-bold">@</span> command</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">@OpenAI</span>
                  <span className="px-3 py-1 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">@Django</span>
                  <span className="px-3 py-1 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">@NextJS</span>
                  <span className="px-3 py-1 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">@React</span>
                </div>
              </div>
              <div className="mt-auto">
                <div className="fragment fade-up w-full aspect-video bg-indigo-800/50 rounded-lg mt-6 flex items-center justify-center">
                  <p className="text-xl text-center text-indigo-300">Docs Integration Screenshot</p>
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
                  <p className="text-3xl md:text-4xl text-gray-200">Take 5 minutes to stretch and relax</p>
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
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-300">New project, from scratch, in Cursor</h3>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 pl-16">Choose your path: <span className="text-blue-300">AI Chatbot</span> or <span className="text-purple-300">Data Visualization</span></p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
              <div className="fragment fade-right bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600/40 p-5 rounded-lg mr-6">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-blue-300">AI Chatbot</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span>APIs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span>Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-3 text-lg">•</span>
                    <span>Database</span>
                  </li>
                </ul>
                <div className="mt-auto w-full aspect-video bg-indigo-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-xl text-center text-indigo-300">Chatbot Screenshot</p>
                </div>
              </div>
              <div className="fragment fade-left bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600/40 p-5 rounded-lg mr-6">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-300">Data visualization</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3 text-lg">•</span>
                    <span>Common stack (Django/React)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3 text-lg">•</span>
                    <span>Database integration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3 text-lg">•</span>
                    <span>Interactive charts</span>
                  </li>
                </ul>
                <div className="mt-auto w-full aspect-video bg-indigo-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-xl text-center text-indigo-300">Data Viz Screenshot</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Start in Cursor this time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6">Prompt Cursor with something like:</h3>
              <div className="space-y-8">
                <div className="fragment fade-up">
                  <div className="bg-indigo-800/40 rounded-lg p-3 mb-3">
                    <code className="block bg-indigo-950 p-6 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                      &quot;Build me a chatbot to [use case] using the OpenAI API&quot;
                    </code>
                  </div>
                  <div className="w-full h-4 bg-gradient-to-r from-blue-500/30 to-transparent rounded-full"></div>
                </div>
                <div className="fragment fade-up">
                  <div className="bg-indigo-800/40 rounded-lg p-3 mb-3">
                    <code className="block bg-indigo-950 p-6 rounded-lg text-left border border-indigo-700 shadow-inner text-xl">
                      &quot;Build me a data visualization tool with Django/React to [visualize what]&quot;
                    </code>
                  </div>
                  <div className="w-full h-4 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full"></div>
                </div>
              </div>
              <div className="fragment fade-in mt-8 p-6 bg-indigo-800/30 rounded-lg border border-indigo-700/30">
                <div className="flex">
                  <span className="text-4xl mr-4">✨</span>
                  <div>
                    <p className="text-blue-300 font-bold text-2xl mb-2">Extra Tip:</p>
                    <p className="text-xl">Try a UI/UX prompt like &quot;Make it premium and delightful&quot;</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fragment fade-left md:col-span-1 flex flex-col justify-center">
              <div className="w-full aspect-square bg-indigo-800/40 rounded-lg border border-indigo-700/40 p-4 flex items-center justify-center shadow-lg mb-6">
                <p className="text-xl text-center text-indigo-300">Cursor + Prompt Screenshot</p>
              </div>
              <div className="p-4 bg-indigo-900/60 rounded-lg">
                <p className="text-center text-xl text-gray-300">See the magic happen as Cursor builds your project</p>
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
              <div className="fragment fade-up bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-6 h-full flex">
                <div className="bg-blue-600/40 p-4 rounded-lg mr-6 h-min">
                  <span className="text-4xl">🧩</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Problem solving</h3>
                  <p>Actual engineers rarely go into a project already knowing everything they need</p>
                  <div className="mt-6 p-4 bg-indigo-800/40 rounded-lg text-gray-300 text-xl italic">
                    &ldquo;It&apos;s not about memorization, but knowing how to find and apply solutions&rdquo;
                  </div>
                </div>
              </div>
            </div>
            <div className="text-2xl md:text-3xl flex flex-col">
              <div className="fragment fade-up bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl mb-6 flex-grow">
                <div className="flex mb-4">
                  <div className="bg-blue-600/40 p-4 rounded-lg mr-6">
                    <span className="text-4xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300">Learn as you go</h3>
                    <p>Chat with another LLM to understand concepts</p>
                  </div>
                </div>
                <div className="w-full aspect-video bg-indigo-800/50 rounded-lg flex items-center justify-center mt-4">
                  <p className="text-xl text-center text-indigo-300">Learning Process Screenshot</p>
                </div>
              </div>
              <div className="fragment fade-up bg-indigo-900/40 p-6 rounded-lg">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">💡</span>
                  <p className="text-xl">You're developing the <span className="text-blue-300 font-bold">mindset</span> of a programmer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Feedback
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-2xl md:text-3xl space-y-6 bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <h3 className="text-3xl font-bold text-blue-300 mb-4">Help us improve!</h3>
              <p className="text-xl">Share your thoughts and experiences with the workshop</p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-6 text-2xl">•</span>
                  <span>What worked well?</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-6 text-2xl">•</span>
                  <span>What could be improved?</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-6 text-2xl">•</span>
                  <span>What would you like to learn next?</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl text-gray-200 mb-6">Scan this QR code to give us your feedback</p>
              <div className="w-80 h-80 bg-white p-4 rounded-lg shadow-xl">
              {/* Placeholder for QR code - in a real implementation you'd use an image */}
              <div className="bg-indigo-900/60 w-full h-full rounded flex items-center justify-center text-white text-center p-4">
                  <div>
                    <p className="text-xl font-bold mb-2">QR Code</p>
                    <p className="text-lg">zero-to-coder.vercel.app/feedback</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-400 text-lg">or visit the URL directly</p>
            </div>
          </div>
        </section>

        {/* Slide 14 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Feedback Responses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 text-2xl md:text-3xl bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6 text-center">Responses from:</h3>
            <div className="fragment fade-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-lg blur-md"></div>
                  <code className="block bg-indigo-950 p-6 rounded-lg text-center text-2xl border border-indigo-700 shadow-inner font-bold">
                Supabase
              </code>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-800/50 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-4xl">📊</span>
                  </div>
                  <p className="text-center text-lg">Real-time database</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-indigo-900/60 p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
                <div className="aspect-video bg-indigo-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-2xl text-center text-indigo-300">Feedback Dashboard Screenshot</p>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-300 mb-2">Key metrics</h4>
                    <div className="flex justify-between">
                      <span>Satisfaction</span>
                      <span className="text-green-400">92%</span>
                    </div>
                  </div>
                  <div className="fragment fade-up bg-indigo-800/40 p-4 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-300 mb-2">Topics of interest</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-900/50 rounded text-sm">Authentication</span>
                      <span className="px-2 py-1 bg-blue-900/50 rounded text-sm">APIs</span>
                      <span className="px-2 py-1 bg-blue-900/50 rounded text-sm">Databases</span>
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