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
          <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to 
            <br />
            Zero-to-coder
          </h1>
          <div className="text-xl md:text-3xl space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-blue-300 mb-6 md:mb-8 drop-shadow-md">First:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-indigo-900/40 p-4 md:p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-4xl md:text-5xl mr-4 md:mr-6">&nbsp;🔑</span>
                <span className="text-lg md:text-xl">&nbsp;Create a <span className="text-blue-300 font-bold"><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a></span> account</span>
              </div>
              <div className="bg-indigo-900/40 p-4 md:p-6 rounded-lg border border-indigo-700/40 flex items-center">
                <span className="text-blue-300 text-4xl md:text-5xl mr-4 md:mr-6">&nbsp;💻</span>
                <span className="text-lg md:text-xl">Install <span className="text-blue-300 font-bold"><a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">&nbsp;Cursor</a></span></span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-4 md:right-8">
            <div className="bg-indigo-900/30 p-3 md:p-4 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
              <div className="text-center mb-2">
                <p className="text-lg md:text-xl text-blue-300">Scan for slides</p>
              </div>
              <QRCodeSVG 
                value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://zero-to-coder.vercel.app'}/slides`}
                size={120}
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
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
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Look for the export button in the Bolt interface</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Open the project in Cursor</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">In Cursor, File -&gt; Open... and select your folder</p>
                </li>
                <li className="fragment fade-up">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Ask the AI to help</h3>
                  </div>
                  <p className="ml-6 text-gray-300 text-lg md:text-xl">Type &apos;Get this project running on localhost&apos; in the chat</p>
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
                <div className="fragment fade-up absolute bottom-[30%] left-0 right-0 bg-indigo-900/90 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-600/50 floating-overlay">
                  <p className="text-lg md:text-xl text-blue-300 text-center font-semibold">
                    Ask an LLM questions before you ask me. The best outcome you can get from this workshop is to learn to problem solve yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Play around adding functionality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="fragment fade-up text-xl md:text-2xl bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-fit">
              <div className="space-y-4 md:space-y-6">
                <div className="fragment fade-up flex">
                  <p className="text-lg md:text-2xl">&nbsp;💡 When it breaks, <span className="text-blue-300 font-bold">investigate</span> — debugging is part of coding</p>
                </div>
                
                <div className="fragment fade-up flex">
                  <p className="text-lg md:text-2xl">&nbsp;🤔 Moving too fast? Frustrated?<span className="text-blue-300 font-bold">Formulate a specific question</span> and ask an LLM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Final message that appears last with more space */}
              <div className="fragment fade-up">
                <div className="bg-indigo-900/60 p-6 md:p-8 rounded-xl border-2 border-indigo-600/70 shadow-2xl max-w-4xl mx-auto">
                  <p className="text-2xl md:text-3xl text-center font-bold">
                      <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text">
                        Developers are always learning — the tools are endless</span>
                    </p>
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
                  <p>Git tracks your project&apos;s changes. Github stores it in the cloud.</p>
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

        {/* New Slide - Time to Share */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-12">
              Time to Share!
            </h2>
            <div className="fragment fade-up">
                <span style={{ fontSize: '16rem' }}>🎉</span>
            </div>
          </div>
        </section>

        {/* Slide 8 */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8">
            <h2 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-8 md:mb-12">
            Break
          </h2>
            <div className="fragment fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
                <div className="relative bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-2xl md:text-4xl text-gray-200 text-center">&nbsp;Take 10 minutes to grab tea, go outside, or just take a break&nbsp;</p>
                </div>
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
                    <span>APIs</span>
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
                    <span>First step: Get data</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Second step: Analyse it</span>
                  </li>
                  <li className="flex items-center text-lg md:text-xl">
                    <span>Third step: Visualise it</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="fragment fade-up text-xl md:text-3xl space-y-4 md:space-y-6 bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full">
              <div className="space-y-4 md:space-y-6">
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-blue-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Build me a Next.js web app to [...]. Use Supabase for the database and authentication&quot;
                  </code>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
                </div>
                <div className="fragment fade-up bg-indigo-800/40 rounded-lg p-4 border-l-4 border-purple-400 shadow-md">
                  <code className="block bg-indigo-950 p-4 md:p-5 rounded-lg text-left border border-indigo-700 shadow-inner text-lg md:text-xl">
                    &quot;Provide steps to [scrape webpage text from a website / get data from an API / etc], and analyse it using appropriate Natural Language Processing techniques&quot;
                  </code>
                  <span className="text-sm text-gray-400">
                    Wikipedia, News, Reddit, etc.
                  </span>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="fragment fade-left bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl h-full flex flex-col justify-center">
                <div className="p-4 bg-indigo-800/40 rounded-lg border border-indigo-700/40">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl md:text-3xl mr-4">&nbsp;✨&nbsp;</span>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">Pro Tip</h3>
                  </div>
                  <p className="text-lg md:text-xl">Figure out the stack your project needs in one chat, then switch to a new chat to start building</p>
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
              Don&apos;t be afraid to read the code
            </h2>
            
            {/* Content grid below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
              {/* Left column - Text boxes */}
              <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
                <div className="fragment fade-up bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-2xl md:text-3xl text-blue-300 text-center">
                    The more you know, the faster you can direct the AI
                  </p>
                </div>
                
                <div className="fragment fade-up bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                  <p className="text-2xl md:text-3xl text-blue-300 text-center">
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
            Shortcuts for a Speedy Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Troubleshooting */}
            <div className="fragment fade-right">
              <div className="bg-indigo-900/60 text-xl md:text-3xl p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="">🔄</span> When the agent gets stuck:
                </h3>
                <ul className="space-y-3">
                  <li className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>New chat</span>
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + Shift + L</code>
                    </div>
                  </li>
                  <div className="fragment fade-up flex text-left relative">
                    <div className="relative w-full">
                      <Image 
                        src="/images/new_chat_prompt.png" 
                        alt="new chat" 
                        width={600} 
                        height={670} 
                        className="w-full h-auto object-contain drop-shadow-lg" 
                      />
                      <div className="absolute bottom-[8%] right-[7%] w-[15%] aspect-[1.75/1] border-4 border-red-500/70 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <li className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                    <div className="flex items-center gap-2">
                      <span>Use a regular chat or another model</span>
                      <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + L</code>
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
                    <span className="text-xl md:text-2xl">📋</span> Add a file to the chat
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      Select all with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + A</code>
                    </p>
                    <p className="flex items-center gap-2">
                      Add it with <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + L</code>
                    </p>
                  </div>
                </div>

                <div className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-xl md:text-2xl">🔍</span> Find
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      All project files <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + Shift + F</code>
                    </p>
                    <p className="flex items-center gap-2">
                      Filename <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">⌘/Ctrl + P</code>
                    </p>
                  </div>
                </div>

                <div className="fragment fade-up bg-indigo-800/40 p-3 md:p-4 rounded-lg border border-indigo-600/40">
                  <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-2">
                    <span className="text-xl md:text-2xl">⚓</span> New Terminal
                  </h3>
                  <p className="flex items-center gap-2">
                    Use <code className="bg-indigo-950 px-2 py-1 rounded border border-indigo-700 text-sm md:text-base">^ + Shift + ` / Ctrl + &apos;</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13 */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="fragment fade-down text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Customise Context with <span className="text-blue-300 font-bold text-3xl md:text-4xl mx-2">@</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative max-w-5xl mx-auto">
            {/* Custom Rules Card */}
            <div className="fragment fade-right bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg flex-shrink-0 mr-4 md:mr-6">
                    <span className="text-3xl md:text-4xl">⚙️</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-2">Custom Rules</h3>
                    <p className="text-lg md:text-2xl">Fine tune the AI for your project</p>
                  </div>
                </div>
                <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300">
                  <p>Design components that are premium and delightful.<br/><br/>
                  Explain your steps for a beginner and justify your choices.</p>
                </div>
              </div>
            </div>

            {/* Integrated Docs Card */}
            <div className="fragment fade-left bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg flex-shrink-0 mr-4 md:mr-6">
                    <span className="text-3xl md:text-4xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-2">Integrated Docs</h3>
                    <p className="text-lg md:text-2xl">Access documentation within Cursor</p>
                  </div>
                </div>
                <div className="fragment fade-up mt-auto text-lg md:text-xl p-4 bg-indigo-950 rounded-lg border border-indigo-700 text-gray-300 space-y-2">
                  <p className="text-lg md:text-xl">@OpenAI Use the latest documentation to implement structured outputs</p>
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
                    <p>You&apos;ll probably learn faster if you&apos;re not alone.</p>
                    <p>It&apos;s also the best way to ask me questions :D</p>
                  </div>
                </div>
              </div>
              <div className="fragment fade-up bg-indigo-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex-grow">
                <div className="flex mb-4 md:mb-6">
                  <div className="bg-blue-600/40 p-4 md:p-5 rounded-lg mr-4 md:mr-8 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🤿</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-3xl font-bold text-blue-300 mb-4">Say yes to stuff</h3>
                    <p>Building is the best way to learn</p>
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
    </div>
  );
} 