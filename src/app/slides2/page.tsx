'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';
import PasscodeScreen from '@/components/PasscodeScreen';

export default function VibeStorySlides() {
  const [isAuthenticated, setIsAuthenticated] = useState(process.env.NODE_ENV === 'development');
  const [, setPulseSize] = useState(250);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Check localStorage for existing authentication on mount
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    
    const checkStoredAuth = () => {
      try {
        const storedAuth = localStorage.getItem('vibe-slides-auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          const oneDayInMs = 24 * 60 * 60 * 1000;
          
          if (authData.authenticated && authData.timestamp && 
              (Date.now() - authData.timestamp) < oneDayInMs) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('vibe-slides-auth');
          }
        }
      } catch (error) {
        console.error('Error checking stored authentication:', error);
        localStorage.removeItem('vibe-slides-auth');
      }
    };

    checkStoredAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vibe-slides-auth');
    sessionStorage.removeItem('vibe-slides-auth');
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
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-xs bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg backdrop-blur-sm border border-red-500/50 transition-all duration-200"
        title="Logout and clear stored authentication"
      >
        Logout
      </button>
      
      <div className="slides">
        {/* Slide 1: Welcome */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            AI-Powered Development Tools
            <br />
            <span className="text-4xl md:text-5xl">Mastery Workshop</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                From Vibe to Engineer
              </h3>
              <p className="text-lg text-gray-200">Master the tools that are reshaping software development in 2025</p>
            </div>
            
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                <span className="text-3xl">🛠️</span>
                Four Core Tools
              </h3>
              <div className="text-lg text-gray-200 space-y-2">
                <div>• Claude CLI</div>
                <div>• Gemini CLI</div>
                <div>• MCP Protocol</div>
                <div>• Cursor IDE</div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2: Course Overview */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Course Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-4xl mb-4 text-center">🎯</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Learning Objectives</h3>
              <ul className="text-base md:text-lg space-y-2">
                <li>• Master autonomous coding with AI</li>
                <li>• Build custom development workflows</li>
                <li>• Integrate tools strategically</li>
                <li>• Deploy production-ready code</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-4xl mb-4 text-center">📚</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Six Modules</h3>
              <ul className="text-base md:text-lg space-y-2">
                <li>• CLI Tools Mastery</li>
                <li>• MCP Integration</li>
                <li>• Cursor IDE Advanced</li>
                <li>• Rules & Automation</li>
                <li>• Workflow Combinations</li>
                <li>• Production Deployment</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-4xl mb-4 text-center">⚡</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Prerequisites</h3>
              <ul className="text-base md:text-lg space-y-2">
                <li>• Intermediate programming</li>
                <li>• Git & terminal familiarity</li>
                <li>• Node.js basics</li>
                <li>• API key setup ability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Slide 3: Module 1 - Claude CLI */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 1: Claude CLI Mastery
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  Installation & Setup
                </h3>
                <div className="bg-slate-900/80 p-4 rounded-lg border border-indigo-600/40">
                  <button 
                    onClick={() => handleCopy("npm install -g @anthropic-ai/claude-code")}
                    className="text-green-300 font-mono text-sm md:text-base hover:text-green-200 transition-colors w-full text-left group relative p-2 rounded-lg"
                  >
                    <span className="relative z-10">npm install -g @anthropic-ai/claude-code</span>
                    <span className={`absolute inset-0 bg-green-500/20 rounded-lg transition-opacity duration-200 ${copiedText === "npm install -g @anthropic-ai/claude-code" ? 'opacity-100' : 'opacity-0'}`}></span>
                  </button>
                </div>
                <ul className="text-lg space-y-2 mt-4">
                  <li>• Premium tool with billing required</li>
                  <li>• OAuth authentication via console</li>
                  <li>• Multiple subscription tiers</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Core Capabilities
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-blue-300 font-semibold">Autonomous coding:</span> Multi-file operations</li>
                  <li>• <span className="text-blue-300 font-semibold">Codebase awareness:</span> Full project context</li>
                  <li>• <span className="text-blue-300 font-semibold">Git integration:</span> Smart commits & PRs</li>
                  <li>• <span className="text-blue-300 font-semibold">Advanced debugging:</span> Cross-file analysis</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  Command Patterns
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-600/40">
                    <code className="text-green-300 text-sm">claude "explain this project's architecture"</code>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-600/40">
                    <code className="text-green-300 text-sm">claude -c "continue the refactoring"</code>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-600/40">
                    <code className="text-green-300 text-sm">claude --model claude-sonnet-4</code>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  CLAUDE.md Configuration
                </h3>
                <p className="text-lg mb-3">Persistent context that survives conversation resets</p>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-purple-600/40">
                  <code className="text-purple-300 text-sm">
                    # Project Guide for Claude<br/>
                    ## Architecture Notes<br/>
                    ## Common Tasks<br/>
                    ## Code Style Preferences
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4: Module 2 - Gemini CLI */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 2: Gemini CLI Exploration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">💰</span>
                  Cost Advantages
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-green-300 font-semibold">Generous free tier:</span> 1M token context</li>
                  <li>• <span className="text-green-300 font-semibold">High limits:</span> 60 requests/minute</li>
                  <li>• <span className="text-green-300 font-semibold">Open source:</span> Community contributions</li>
                  <li>• <span className="text-green-300 font-semibold">Google integration:</span> Cloud & Workspace</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔧</span>
                  Installation Options
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-blue-600/40">
                    <code className="text-blue-300 text-sm">npx @google/gemini-cli</code>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-blue-600/40">
                    <code className="text-blue-300 text-sm">brew install google-gemini-cli</code>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-blue-600/40">
                    <code className="text-blue-300 text-sm">npm install -g @google/gemini-cli</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Best Use Cases
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-purple-300 font-semibold">Large codebase analysis:</span> 1M token context</li>
                  <li>• <span className="text-purple-300 font-semibold">Budget constraints:</span> Free tier development</li>
                  <li>• <span className="text-purple-300 font-semibold">Multimodal tasks:</span> Images, PDFs, sketches</li>
                  <li>• <span className="text-purple-300 font-semibold">Google ecosystem:</span> Cloud integration</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  vs Claude CLI
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="text-green-300 font-semibold">Gemini Wins:</div>
                    <div>• Cost efficiency</div>
                    <div>• Context size</div>
                    <div>• Multimodal support</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-blue-300 font-semibold">Claude Wins:</div>
                    <div>• Speed & polish</div>
                    <div>• Autonomy</div>
                    <div>• Code organization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5: Module 3 - MCP Protocol */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 3: MCP Protocol & Claude Desktop
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔗</span>
                  Protocol Architecture
                </h3>
                <p className="text-lg mb-4">Transforms M×N integration problem into M+N through standardization</p>
                <ul className="text-base space-y-2">
                  <li>• <span className="text-blue-300 font-semibold">Hosts:</span> AI applications (Claude Desktop)</li>
                  <li>• <span className="text-blue-300 font-semibold">Clients:</span> Protocol connectors</li>
                  <li>• <span className="text-blue-300 font-semibold">Servers:</span> Capability providers</li>
                  <li>• <span className="text-blue-300 font-semibold">JSON-RPC 2.0:</span> Communication foundation</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  Available Servers
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-green-300 font-semibold mb-2">Official:</div>
                    <div>• Filesystem</div>
                    <div>• Git</div>
                    <div>• GitHub</div>
                    <div>• PostgreSQL</div>
                  </div>
                  <div>
                    <div className="text-purple-300 font-semibold mb-2">Community:</div>
                    <div>• Docker</div>
                    <div>• AWS</div>
                    <div>• Slack</div>
                    <div>• MongoDB</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  Configuration Setup
                </h3>
                <div className="bg-slate-900/80 p-4 rounded-lg border border-purple-600/40">
                  <code className="text-purple-300 text-xs">
                    {`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "token"
      }
    }
  }
}`}
                  </code>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  Custom Development
                </h3>
                <p className="text-lg mb-3">Build specialized servers for unique workflows</p>
                <ul className="text-base space-y-2">
                  <li>• <span className="text-orange-300 font-semibold">Python SDK:</span> FastMCP framework</li>
                  <li>• <span className="text-orange-300 font-semibold">TypeScript SDK:</span> Full protocol support</li>
                  <li>• <span className="text-orange-300 font-semibold">Security:</span> OAuth 2.1 & validation</li>
                  <li>• <span className="text-orange-300 font-semibold">Performance:</span> Connection pooling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: Module 4 - Cursor IDE */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 4: Cursor IDE Mastery
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Core AI Features
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-blue-300 font-semibold">Tab completion:</span> Multi-line predictions</li>
                  <li>• <span className="text-blue-300 font-semibold">Chat (⌘+L):</span> Full project context</li>
                  <li>• <span className="text-blue-300 font-semibold">Inline edit (⌘+K):</span> Natural language changes</li>
                  <li>• <span className="text-blue-300 font-semibold">Agent mode (⌘+I):</span> Autonomous multi-file tasks</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Advanced Workflows
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-green-300 font-semibold">Debugging:</span> Intelligent error analysis</li>
                  <li>• <span className="text-green-300 font-semibold">Refactoring:</span> Safe cross-file changes</li>
                  <li>• <span className="text-green-300 font-semibold">Testing:</span> AI-generated edge cases</li>
                  <li>• <span className="text-green-300 font-semibold">Git integration:</span> Smart commits</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  Configuration Options
                </h3>
                <div className="bg-slate-900/80 p-4 rounded-lg border border-purple-600/40">
                  <code className="text-purple-300 text-sm">
                    {`{
  "cursor.chat.model": "claude-3.5-sonnet",
  "cursor.tab.useNextLine": true,
  "cursor.agent.enableBackground": true,
  "cursor.cpp.disabledInDiff": false
}`}
                  </code>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📈</span>
                  Performance Tips
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-orange-300 font-semibold">Model selection:</span> Task-appropriate choices</li>
                  <li>• <span className="text-orange-300 font-semibold">Selective indexing:</span> .gitignore patterns</li>
                  <li>• <span className="text-orange-300 font-semibold">Cost management:</span> Usage monitoring</li>
                  <li>• <span className="text-orange-300 font-semibold">Memory optimization:</span> Large projects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7: Module 5 - Cursor Rules */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 5: Advanced Cursor Rules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  Rules Architecture
                </h3>
                <p className="text-lg mb-4">Persistent context that survives AI conversation resets</p>
                <ul className="text-base space-y-2">
                  <li>• <span className="text-blue-300 font-semibold">Project rules:</span> .cursor/rules/ directory</li>
                  <li>• <span className="text-blue-300 font-semibold">User rules:</span> Global settings</li>
                  <li>• <span className="text-blue-300 font-semibold">Auto attached:</span> Glob pattern matching</li>
                  <li>• <span className="text-blue-300 font-semibold">Manual:</span> @ruleName references</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🏗️</span>
                  Rule Types
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-green-300 font-semibold mb-2">Application:</div>
                    <div>• Always</div>
                    <div>• Auto Attached</div>
                    <div>• Agent Requested</div>
                    <div>• Manual</div>
                  </div>
                  <div>
                    <div className="text-purple-300 font-semibold mb-2">Content:</div>
                    <div>• Code style</div>
                    <div>• Architecture</div>
                    <div>• Security</div>
                    <div>• Testing</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  MDC File Structure
                </h3>
                <div className="bg-slate-900/80 p-4 rounded-lg border border-purple-600/40">
                  <code className="text-purple-300 text-xs">
                    {`---
description: "TypeScript React standards"
globs: ["src/**/*.{ts,tsx}"]
alwaysApply: false
priority: 100
---

# Development Guidelines
## Code Style
- Use functional components
- Implement proper error boundaries
## Examples
\`\`\`typescript
interface Props { title: string; }
\`\`\``}
                  </code>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🌟</span>
                  Best Practices
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-orange-300 font-semibold">Specific instructions:</span> Actionable guidance</li>
                  <li>• <span className="text-orange-300 font-semibold">Minimal references:</span> Avoid token bloat</li>
                  <li>• <span className="text-orange-300 font-semibold">Clear hierarchies:</span> Priority organization</li>
                  <li>• <span className="text-orange-300 font-semibold">Team standards:</span> Collaborative rules</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 8: Module 6 - Integrated Workflows */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Module 6: Integrated Workflows
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  Analysis → Implementation
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-blue-600/40">
                    <div className="text-green-300 text-sm font-semibold mb-1">Step 1: Gemini CLI</div>
                    <div className="text-gray-300 text-sm">Large-scale codebase analysis with 1M token context</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-blue-600/40">
                    <div className="text-blue-300 text-sm font-semibold mb-1">Step 2: Claude CLI</div>
                    <div className="text-gray-300 text-sm">Autonomous implementation of analysis insights</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  Development Environment
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-green-300 font-semibold">Cursor IDE:</span> Primary development</li>
                  <li>• <span className="text-green-300 font-semibold">Claude CLI:</span> Complex autonomous tasks</li>
                  <li>• <span className="text-green-300 font-semibold">Gemini CLI:</span> Large-scale exploration</li>
                  <li>• <span className="text-green-300 font-semibold">MCP servers:</span> External integration</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚨</span>
                  Multi-Tool Debugging
                </h3>
                <ol className="text-base space-y-2">
                  <li><span className="text-purple-300 font-semibold">1. Cursor IDE:</span> Problem identification</li>
                  <li><span className="text-purple-300 font-semibold">2. MCP servers:</span> External system investigation</li>
                  <li><span className="text-purple-300 font-semibold">3. Claude CLI:</span> Root cause analysis & fixes</li>
                  <li><span className="text-purple-300 font-semibold">4. Gemini CLI:</span> Impact assessment</li>
                </ol>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  Production Deployment
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-orange-300 font-semibold">Pre-deploy:</span> Comprehensive AI analysis</li>
                  <li>• <span className="text-orange-300 font-semibold">Execution:</span> Automated testing & security</li>
                  <li>• <span className="text-orange-300 font-semibold">Post-deploy:</span> Real-time monitoring</li>
                  <li>• <span className="text-orange-300 font-semibold">Hotfixes:</span> Automated issue resolution</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9: Hands-on Workshop */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Hands-on Workshop Time
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-5xl mb-4 text-center">🏃‍♂️</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Quick Start</h3>
              <ul className="text-base space-y-2">
                <li>• Install Claude CLI or Gemini CLI</li>
                <li>• Set up authentication</li>
                <li>• Try basic commands</li>
                <li>• Explore project analysis</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-5xl mb-4 text-center">🏗️</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Build & Configure</h3>
              <ul className="text-base space-y-2">
                <li>• Download Cursor IDE</li>
                <li>• Create your first rule</li>
                <li>• Set up MCP server</li>
                <li>• Test integrated workflow</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
              <div className="text-5xl mb-4 text-center">🚀</div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4 text-center">Advanced Challenge</h3>
              <ul className="text-base space-y-2">
                <li>• Create custom MCP server</li>
                <li>• Build automated workflow</li>
                <li>• Design team standards</li>
                <li>• Deploy with AI assistance</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-indigo-900/60 p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-blue-300 mb-4">Choose Your Path & Get Started!</h3>
            <p className="text-xl text-center text-gray-200">
              Work at your own pace. Ask questions. Share discoveries. Let's build something amazing with AI.
            </p>
          </div>
        </section>

        {/* Slide 10: Mastery Assessment */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Mastery Assessment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  Skills Checklist
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-blue-300 font-semibold">Setup:</span> All tools configured & authenticated</li>
                  <li>• <span className="text-blue-300 font-semibold">Rules:</span> Comprehensive project rules created</li>
                  <li>• <span className="text-blue-300 font-semibold">MCP:</span> Custom server development</li>
                  <li>• <span className="text-blue-300 font-semibold">Workflow:</span> Multi-tool integration demonstrated</li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📈</span>
                  Success Metrics
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-green-300 font-semibold">Speed:</span> Reduced development time</li>
                  <li>• <span className="text-green-300 font-semibold">Quality:</span> Improved code consistency</li>
                  <li>• <span className="text-green-300 font-semibold">Debugging:</span> Enhanced problem-solving</li>
                  <li>• <span className="text-green-300 font-semibold">Confidence:</span> Complex refactoring ability</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Challenge Projects
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-purple-600/40">
                    <div className="text-purple-300 font-semibold text-sm">Full-stack Application</div>
                    <div className="text-gray-300 text-sm">Build, test, and deploy complete app using all tools</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-purple-600/40">
                    <div className="text-purple-300 font-semibold text-sm">Legacy Modernization</div>
                    <div className="text-gray-300 text-sm">Refactor existing codebase with AI assistance</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-purple-600/40">
                    <div className="text-purple-300 font-semibold text-sm">Team Workflow Design</div>
                    <div className="text-gray-300 text-sm">Create AI-enhanced development processes</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 p-6 rounded-xl border-2 border-indigo-600/60 shadow-2xl">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔮</span>
                  Future Learning
                </h3>
                <ul className="text-lg space-y-3">
                  <li>• <span className="text-orange-300 font-semibold">Community:</span> Join tool-specific groups</li>
                  <li>• <span className="text-orange-300 font-semibold">Updates:</span> Follow feature releases</li>
                  <li>• <span className="text-orange-300 font-semibold">Contribution:</span> Open-source participation</li>
                  <li>• <span className="text-orange-300 font-semibold">Innovation:</span> Experiment with beta features</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11: The Future is AI-Native */}
        <section data-background-gradient="radial-gradient(circle at center, #312e81 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-8 text-center">
              The Future is AI-Native
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
              <div className="bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                  <span className="text-4xl">🌟</span>
                  Paradigm Shift
                </h3>
                <p className="text-lg md:text-xl text-gray-200">
                  We're witnessing the transformation from <span className="text-blue-300 font-semibold">code-first</span> to <span className="text-purple-300 font-semibold">intent-first</span> development. 
                  These tools are the foundation of the next decade of software engineering.
                </p>
              </div>
              
              <div className="bg-indigo-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4 flex items-center gap-3">
                  <span className="text-4xl">🚀</span>
                  Competitive Advantage
                </h3>
                <p className="text-lg md:text-xl text-gray-200">
                  Organizations mastering these capabilities now will have <span className="text-green-300 font-semibold">significant advantages</span> as AI assistance becomes standard practice.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-purple-500/60 shadow-xl max-w-4xl">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                🤝 Human + AI Collaboration
              </h3>
              <p className="text-xl md:text-2xl text-center text-gray-200 font-medium">
                The future isn't human <span className="text-red-300">vs</span> AI — it's human <span className="text-green-300 font-bold">+ AI</span> collaboration.
                You now have the foundation for that future.
              </p>
            </div>
          </div>
        </section>

        {/* Final Slide: Thank You */}
        <section data-background-gradient="radial-gradient(circle at center, #3730a3 0%, #1e1b4b 100%)">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-8">
              Thank You!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-indigo-900/50 p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6 flex items-center justify-center gap-3">
                  <span className="text-4xl">🎓</span>
                  Keep Learning
                </h3>
                <p className="text-lg md:text-xl text-gray-200 mb-4">
                  The AI development landscape evolves rapidly. Stay curious, keep experimenting, and share your discoveries.
                </p>
                <p className="text-base md:text-lg text-blue-300 italic">
                  "The best time to plant a tree was 20 years ago. The second best time is now."
                </p>
              </div>
              
              <div className="bg-indigo-900/50 p-8 rounded-xl border-2 border-indigo-600/60 shadow-2xl text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-300 mb-6 flex items-center justify-center gap-3">
                  <span className="text-4xl">🌟</span>
                  Build Something Amazing
                </h3>
                <p className="text-lg md:text-xl text-gray-200 mb-4">
                  You now have the tools and knowledge to create software in ways that were impossible just months ago.
                </p>
                <p className="text-base md:text-lg text-purple-300 italic">
                  Go forth and engineer the future!
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <span className="text-6xl md:text-7xl">🚀</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 