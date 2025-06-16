'use client';

import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './slides.css';

export default function AISignalsSlides() {    
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    // Pause the video when closing modal
    const video = document.querySelector('.video-modal video') as HTMLVideoElement;
    if (video) {
      video.pause();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // Close modal if clicking outside the video content
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  };

  // Initialize Reveal.js
  useEffect(() => {
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

    // Tech Noir background
    document.querySelector('.reveal')?.setAttribute(
      'style', 
      'background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); background-attachment: fixed;'
    );

    deck.initialize();
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        closeVideoModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoModalOpen]);

  return (
    <div className="reveal">
      <div className="slides">
        {/* Slide 0: Title Slide */}
        <section className="title-slide">
          <h1 className="main-title">Zero to Coder: A Vibe Coder's Story</h1>
          <h2 className="subtitle">AI's Impact on Software Development Careers</h2>
          <div className="event-info">
            <p><strong>Lightning Talk - AI Signals London</strong></p>
          </div>
        </section>

        {/* Slide 1: The Hook */}
        <section className="hook-slide">
          <h2 className="hook-title">18 months ago, I couldn't code "Hello World"</h2>
          <h2 className="hook-result">Today, I'm employed full-time building production tools</h2>
          <p className="hook-question"><em>What changed? And what does this mean for everyone in this room?</em></p>
        </section>

        {/* Slide 2: The Timeline That Shouldn't Exist */}
        <section className="timeline-slide">
          <h2>The Timeline That Shouldn't Exist</h2>
          <div className="timeline">
            <div className="timeline-item fragment fade-left">
              <strong>Month 1:</strong> First data science contract + lots of side projects
            </div>
            <div className="timeline-item fragment fade-left">
              <strong>Month 6:</strong> UK-DBT tool frontend redesign with crack Python team
            </div>
            <div className="timeline-item fragment fade-left">
              <strong>Month 12:</strong> Independent consultancy offering full-stack development
            </div>
            <div className="timeline-item fragment fade-left">
              <strong>Month 18:</strong> Full-time developer role
            </div>
          </div>
          <p className="traditional-path"><em>Traditional path: 3-5 years minimum</em></p>
        </section>

        {/* Slide 3: The Secret Sauce */}
        <section className="secret-slide">
          <h2>The Secret Sauce</h2>
          <h3 className="secret-reveal">It wasn't talent. It wasn't grinding LeetCode.</h3>
          <h3 className="secret-truth">It was AI-assisted development arriving at exactly the right moment.</h3>
          <ul className="secret-list pt-10">
            <li>Cursor for real-time code help</li>
            <li>Models getting smarter at a blistering pace</li>
          </ul>
          <div className="secret-insight fragment fade-left">
            <p><em>But the same is true as always has been: <br/>
            - Projects, projects, projects<br/>
            - Mentors are motivators<br/>
            - You make your own luck
            </em></p>
          </div>
        </section>
        
        {/* Slide 4: What This Looks Like in Practice */}
        <section className="practice-slide">
          <h2>What This Looks Like in Practice</h2>
          <div className="before-after">
            <div className="before">
              <h3>Before:</h3>
              <p>Weeks reading books and completing leetcode challenges</p>
              <pre><code className="language-python">
                # Staring at error messages<br/>
                # Hours debugging dependency conflicts<br/>
                # Decoding cryptic documentation<br/>
              </code></pre>
            </div>
            <div className="after">
              <h3>After:</h3>
              <p>Minutes to find the right architecture, minutes to build</p>
              <pre><code className="language-python">
                # "Build an SSH tunnel to connect to the company PostgreSQL service."<br/><br/>
                # "Add a simple webpage to perform data manipulations and visualization."<br/><br/>
                # "What actually *is* an SQL?"<br/>
              </code></pre>
            </div>
          </div>
        </section>

        {/* Slide 5: The Developer Paradox */}
        <section className="paradox-slide">
          <h2>The Developer Paradox</h2>
          <h3>For experienced developers in the room</h3>
          <p>This probably sounds either:</p>
          <ul className="paradox-list">
            <li><strong>Impossible</strong>&nbsp;(junior devs need years to be useful*)</li>
            <li><strong>Terrifying</strong>&nbsp;(AI is replacing us all)</li>
            <li><strong>Familiar</strong>&nbsp;(you're already using these tools)</li>
          </ul>
          <p className="fragment fade-right footnote">*And AI tools usually make them <em>worse</em></p>
        </section>

        {/* Slide 6: Question from a developer */}
        <section className="question-slide">
          <h2>Question from a developer</h2>
          <h3 className="interactive-question">One question from a developer before I continue</h3>
          <p className="question-text"><em>What's your biggest concern about AI-assisted beginners entering the field?</em></p>
        </section>

        {/* Slide 7: Now, For Everyone Else... */}
        <section className="everyone-else-slide">
          <h2>Now, For Everyone Else...</h2>
          <h3>Operations managers, project leads, analysts, sales & marketing...</h3>
          <p>I met an ops manager who built a LinkedIn extension like this one:</p>
          <div className="example-link" onClick={openVideoModal}>
            <video 
              src="/videos/linkedin-generator.mov"
              muted
              preload="metadata"
            >
              <p>Your browser doesn't support embedded videos. <a href="/videos/linkedin-generator.mov" target="_blank" rel="noopener noreferrer">View the video here</a></p>
            </video>
          </div>
          <div className="key-point">
            <p><strong>That Ops manager didn't become a "developer"</strong></p>
            <p><strong>He became someone who could build exactly what his team needed</strong></p>
          </div>
        </section>


        {/* Slide 12: The Real Impact */}
        <section className="impact-slide">
          <h2>The Real Impact</h2>
          <h3 className="impact-statement">This isn't about replacing developers</h3>
          <h3 className="impact-truth">It's about democratising the ability to solve problems with code</h3>
          <div className="impact-examples">
            <p><em>Every operations person who builds their own reporting tool</em></p>
            <p><em>Every project manager who automates their workflow</em></p>
            <p><em>Every analyst who processes their own data</em></p>
          </div>
          <h3 className="impact-result">= More developers freed up for complex, creative work</h3>
        </section>

        {/* Slide 8: What Happens Next? */}
        <section className="next-slide">
          <h2>What Happens Next?</h2>
          <h3 className="next-question"><span className="text-red-500">The question isn't</span> whether AI will change how we work with software</h3>
          <h3 className="next-choice"><span className="text-green-500">The question is</span> Will you be someone who uses these tools, or someone who wishes they had?</h3>
          
          <div className="workshop-images fragment fade-in">
            <img 
              src="/images/first-workshop-1.jpg" 
              alt="First workshop attendees learning" 
              className="workshop-photo"
            />
            <img 
              src="/images/workshop-attendees-ramen.jpg" 
              alt="Workshop attendees enjoying ramen together" 
              className="workshop-photo"
            />
            <img 
              src="/images/first-workshop-2.jpg" 
              alt="Workshop coding session" 
              className="workshop-photo"
            />
          </div>
        </section>


        {/* Slide 10: What's Actually Possible Now */}
        <section className="possible-slide">
          <h2>What's Actually Possible Now</h2>
          <h3 className="text-sm">Real examples from my workshops</h3>
          <ul className="examples-list">
            <li>✅ <strong>&nbsp;Automated hospital website scraper</strong> - NHS Analyst</li>
            <li>✅ <strong>&nbsp;Custom data processors</strong> - Finance Professional, eliminated 3 different spreadsheets</li>
            <li>✅ <strong>&nbsp;User Interview Segmentation</strong> - Independent, built user feedback segmentation tool</li>
          </ul>
          <div className="barrier-change">
            <h3>The Barrier Has Dropped</h3>
            <p><strong>From:</strong> "Computer science degree required"</p>
            <p><strong>To:</strong> "Can you describe what you want?"</p>
            <div className="new-skill">
              <p><strong>The new skill isn't coding syntax</strong></p>
              <p><strong>It's clear thinking about problems + knowing how to collaborate with AI</strong></p>
            </div>
          </div>
        </section>
        
        {/* Slide 9: The Old Way vs The New Way */}
        <section className="comparison-slide">
          <h2>The Old Way vs The New Way</h2>
          <div className="comparison">
            <div className="old-way" style={{width: "88%"}}>
              <h3>Traditional development</h3>
              <ul>
                <li>Hire developer (£50K+ salary)</li>
                <li>Months of back-and-forth</li>
                <li>Maintenance headaches</li>
              </ul>
              <p><strong>OR Get lucky:</strong></p>
              <ul>
                <li>After days/weeks of research</li>
                <li>Find a £10k+/month SaaS tool</li>
                <li>Which integrates with your system</li>
              </ul>
            </div>
            <div className="new-way" style={{width: "110%", marginLeft: "-10%"}}>
            <h3>AI-assisted tool building</h3>
              <ul>
                <li>Build it yourself over coffee</li>
                <li>Iterate in real-time</li>
                <li>No handoff delays</li>
                <li>You understand every piece</li>
              </ul>
              <h3>✅ Perfect for:</h3>
              <ul>
                <li>Ops folks tired of manual processes</li>
                <li>PMs who know exactly what's needed</li>
                <li>Analysts who understand their data</li>
                <li>Team leads who can't wait months for IT</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Slide 13: Thank You */}
        <section className="thank-you-slide">
          <h1 className="thank-you">Thank you - Questions?</h1>
          <div className="qr-container">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 208 208" preserveAspectRatio="xMinYMin meet" width="240" height="240">
            <rect width="100%" height="100%" fill="transparent" cx="0" cy="0"/>
            <path d="M4,4l8,0 0,8 -8,0 0,-8z M12,4l8,0 0,8 -8,0 0,-8z M20,4l8,0 0,8 -8,0 0,-8z M28,4l8,0 0,8 -8,0 0,-8z M36,4l8,0 0,8 -8,0 0,-8z M44,4l8,0 0,8 -8,0 0,-8z M52,4l8,0 0,8 -8,0 0,-8z M68,4l8,0 0,8 -8,0 0,-8z M84,4l8,0 0,8 -8,0 0,-8z M92,4l8,0 0,8 -8,0 0,-8z M116,4l8,0 0,8 -8,0 0,-8z M124,4l8,0 0,8 -8,0 0,-8z M132,4l8,0 0,8 -8,0 0,-8z M148,4l8,0 0,8 -8,0 0,-8z M156,4l8,0 0,8 -8,0 0,-8z M164,4l8,0 0,8 -8,0 0,-8z M172,4l8,0 0,8 -8,0 0,-8z M180,4l8,0 0,8 -8,0 0,-8z M188,4l8,0 0,8 -8,0 0,-8z M196,4l8,0 0,8 -8,0 0,-8z M4,12l8,0 0,8 -8,0 0,-8z M52,12l8,0 0,8 -8,0 0,-8z M100,12l8,0 0,8 -8,0 0,-8z M108,12l8,0 0,8 -8,0 0,-8z M116,12l8,0 0,8 -8,0 0,-8z M148,12l8,0 0,8 -8,0 0,-8z M196,12l8,0 0,8 -8,0 0,-8z M4,20l8,0 0,8 -8,0 0,-8z M20,20l8,0 0,8 -8,0 0,-8z M28,20l8,0 0,8 -8,0 0,-8z M36,20l8,0 0,8 -8,0 0,-8z M52,20l8,0 0,8 -8,0 0,-8z M68,20l8,0 0,8 -8,0 0,-8z M76,20l8,0 0,8 -8,0 0,-8z M84,20l8,0 0,8 -8,0 0,-8z M92,20l8,0 0,8 -8,0 0,-8z M100,20l8,0 0,8 -8,0 0,-8z M116,20l8,0 0,8 -8,0 0,-8z M132,20l8,0 0,8 -8,0 0,-8z M148,20l8,0 0,8 -8,0 0,-8z M164,20l8,0 0,8 -8,0 0,-8z M172,20l8,0 0,8 -8,0 0,-8z M180,20l8,0 0,8 -8,0 0,-8z M196,20l8,0 0,8 -8,0 0,-8z M4,28l8,0 0,8 -8,0 0,-8z M20,28l8,0 0,8 -8,0 0,-8z M28,28l8,0 0,8 -8,0 0,-8z M36,28l8,0 0,8 -8,0 0,-8z M52,28l8,0 0,8 -8,0 0,-8z M76,28l8,0 0,8 -8,0 0,-8z M84,28l8,0 0,8 -8,0 0,-8z M100,28l8,0 0,8 -8,0 0,-8z M116,28l8,0 0,8 -8,0 0,-8z M132,28l8,0 0,8 -8,0 0,-8z M148,28l8,0 0,8 -8,0 0,-8z M164,28l8,0 0,8 -8,0 0,-8z M172,28l8,0 0,8 -8,0 0,-8z M180,28l8,0 0,8 -8,0 0,-8z M196,28l8,0 0,8 -8,0 0,-8z M4,36l8,0 0,8 -8,0 0,-8z M20,36l8,0 0,8 -8,0 0,-8z M28,36l8,0 0,8 -8,0 0,-8z M36,36l8,0 0,8 -8,0 0,-8z M52,36l8,0 0,8 -8,0 0,-8z M76,36l8,0 0,8 -8,0 0,-8z M108,36l8,0 0,8 -8,0 0,-8z M116,36l8,0 0,8 -8,0 0,-8z M148,36l8,0 0,8 -8,0 0,-8z M164,36l8,0 0,8 -8,0 0,-8z M172,36l8,0 0,8 -8,0 0,-8z M180,36l8,0 0,8 -8,0 0,-8z M196,36l8,0 0,8 -8,0 0,-8z M4,44l8,0 0,8 -8,0 0,-8z M52,44l8,0 0,8 -8,0 0,-8z M68,44l8,0 0,8 -8,0 0,-8z M76,44l8,0 0,8 -8,0 0,-8z M84,44l8,0 0,8 -8,0 0,-8z M92,44l8,0 0,8 -8,0 0,-8z M132,44l8,0 0,8 -8,0 0,-8z M148,44l8,0 0,8 -8,0 0,-8z M196,44l8,0 0,8 -8,0 0,-8z M4,52l8,0 0,8 -8,0 0,-8z M12,52l8,0 0,8 -8,0 0,-8z M20,52l8,0 0,8 -8,0 0,-8z M28,52l8,0 0,8 -8,0 0,-8z M36,52l8,0 0,8 -8,0 0,-8z M44,52l8,0 0,8 -8,0 0,-8z M52,52l8,0 0,8 -8,0 0,-8z M68,52l8,0 0,8 -8,0 0,-8z M84,52l8,0 0,8 -8,0 0,-8z M100,52l8,0 0,8 -8,0 0,-8z M116,52l8,0 0,8 -8,0 0,-8z M132,52l8,0 0,8 -8,0 0,-8z M148,52l8,0 0,8 -8,0 0,-8z M156,52l8,0 0,8 -8,0 0,-8z M164,52l8,0 0,8 -8,0 0,-8z M172,52l8,0 0,8 -8,0 0,-8z M180,52l8,0 0,8 -8,0 0,-8z M188,52l8,0 0,8 -8,0 0,-8z M196,52l8,0 0,8 -8,0 0,-8z M84,60l8,0 0,8 -8,0 0,-8z M100,60l8,0 0,8 -8,0 0,-8z M116,60l8,0 0,8 -8,0 0,-8z M132,60l8,0 0,8 -8,0 0,-8z M4,68l8,0 0,8 -8,0 0,-8z M20,68l8,0 0,8 -8,0 0,-8z M52,68l8,0 0,8 -8,0 0,-8z M60,68l8,0 0,8 -8,0 0,-8z M100,68l8,0 0,8 -8,0 0,-8z M108,68l8,0 0,8 -8,0 0,-8z M116,68l8,0 0,8 -8,0 0,-8z M124,68l8,0 0,8 -8,0 0,-8z M132,68l8,0 0,8 -8,0 0,-8z M156,68l8,0 0,8 -8,0 0,-8z M180,68l8,0 0,8 -8,0 0,-8z M196,68l8,0 0,8 -8,0 0,-8z M4,76l8,0 0,8 -8,0 0,-8z M12,76l8,0 0,8 -8,0 0,-8z M20,76l8,0 0,8 -8,0 0,-8z M68,76l8,0 0,8 -8,0 0,-8z M84,76l8,0 0,8 -8,0 0,-8z M108,76l8,0 0,8 -8,0 0,-8z M116,76l8,0 0,8 -8,0 0,-8z M124,76l8,0 0,8 -8,0 0,-8z M132,76l8,0 0,8 -8,0 0,-8z M148,76l8,0 0,8 -8,0 0,-8z M156,76l8,0 0,8 -8,0 0,-8z M172,76l8,0 0,8 -8,0 0,-8z M180,76l8,0 0,8 -8,0 0,-8z M196,76l8,0 0,8 -8,0 0,-8z M4,84l8,0 0,8 -8,0 0,-8z M12,84l8,0 0,8 -8,0 0,-8z M20,84l8,0 0,8 -8,0 0,-8z M52,84l8,0 0,8 -8,0 0,-8z M100,84l8,0 0,8 -8,0 0,-8z M124,84l8,0 0,8 -8,0 0,-8z M132,84l8,0 0,8 -8,0 0,-8z M156,84l8,0 0,8 -8,0 0,-8z M172,84l8,0 0,8 -8,0 0,-8z M188,84l8,0 0,8 -8,0 0,-8z M196,84l8,0 0,8 -8,0 0,-8z M4,92l8,0 0,8 -8,0 0,-8z M12,92l8,0 0,8 -8,0 0,-8z M20,92l8,0 0,8 -8,0 0,-8z M36,92l8,0 0,8 -8,0 0,-8z M76,92l8,0 0,8 -8,0 0,-8z M84,92l8,0 0,8 -8,0 0,-8z M92,92l8,0 0,8 -8,0 0,-8z M108,92l8,0 0,8 -8,0 0,-8z M132,92l8,0 0,8 -8,0 0,-8z M140,92l8,0 0,8 -8,0 0,-8z M148,92l8,0 0,8 -8,0 0,-8z M172,92l8,0 0,8 -8,0 0,-8z M188,92l8,0 0,8 -8,0 0,-8z M12,100l8,0 0,8 -8,0 0,-8z M28,100l8,0 0,8 -8,0 0,-8z M36,100l8,0 0,8 -8,0 0,-8z M44,100l8,0 0,8 -8,0 0,-8z M52,100l8,0 0,8 -8,0 0,-8z M68,100l8,0 0,8 -8,0 0,-8z M76,100l8,0 0,8 -8,0 0,-8z M84,100l8,0 0,8 -8,0 0,-8z M92,100l8,0 0,8 -8,0 0,-8z M100,100l8,0 0,8 -8,0 0,-8z M108,100l8,0 0,8 -8,0 0,-8z M124,100l8,0 0,8 -8,0 0,-8z M132,100l8,0 0,8 -8,0 0,-8z M148,100l8,0 0,8 -8,0 0,-8z M172,100l8,0 0,8 -8,0 0,-8z M196,100l8,0 0,8 -8,0 0,-8z M12,108l8,0 0,8 -8,0 0,-8z M20,108l8,0 0,8 -8,0 0,-8z M36,108l8,0 0,8 -8,0 0,-8z M44,108l8,0 0,8 -8,0 0,-8z M68,108l8,0 0,8 -8,0 0,-8z M100,108l8,0 0,8 -8,0 0,-8z M124,108l8,0 0,8 -8,0 0,-8z M132,108l8,0 0,8 -8,0 0,-8z M140,108l8,0 0,8 -8,0 0,-8z M148,108l8,0 0,8 -8,0 0,-8z M156,108l8,0 0,8 -8,0 0,-8z M172,108l8,0 0,8 -8,0 0,-8z M180,108l8,0 0,8 -8,0 0,-8z M188,108l8,0 0,8 -8,0 0,-8z M196,108l8,0 0,8 -8,0 0,-8z M4,116l8,0 0,8 -8,0 0,-8z M12,116l8,0 0,8 -8,0 0,-8z M28,116l8,0 0,8 -8,0 0,-8z M36,116l8,0 0,8 -8,0 0,-8z M52,116l8,0 0,8 -8,0 0,-8z M60,116l8,0 0,8 -8,0 0,-8z M100,116l8,0 0,8 -8,0 0,-8z M108,116l8,0 0,8 -8,0 0,-8z M116,116l8,0 0,8 -8,0 0,-8z M124,116l8,0 0,8 -8,0 0,-8z M148,116l8,0 0,8 -8,0 0,-8z M164,116l8,0 0,8 -8,0 0,-8z M180,116l8,0 0,8 -8,0 0,-8z M196,116l8,0 0,8 -8,0 0,-8z M20,124l8,0 0,8 -8,0 0,-8z M28,124l8,0 0,8 -8,0 0,-8z M36,124l8,0 0,8 -8,0 0,-8z M44,124l8,0 0,8 -8,0 0,-8z M60,124l8,0 0,8 -8,0 0,-8z M76,124l8,0 0,8 -8,0 0,-8z M84,124l8,0 0,8 -8,0 0,-8z M92,124l8,0 0,8 -8,0 0,-8z M100,124l8,0 0,8 -8,0 0,-8z M116,124l8,0 0,8 -8,0 0,-8z M124,124l8,0 0,8 -8,0 0,-8z M132,124l8,0 0,8 -8,0 0,-8z M156,124l8,0 0,8 -8,0 0,-8z M172,124l8,0 0,8 -8,0 0,-8z M4,132l8,0 0,8 -8,0 0,-8z M12,132l8,0 0,8 -8,0 0,-8z M52,132l8,0 0,8 -8,0 0,-8z M108,132l8,0 0,8 -8,0 0,-8z M116,132l8,0 0,8 -8,0 0,-8z M132,132l8,0 0,8 -8,0 0,-8z M140,132l8,0 0,8 -8,0 0,-8z M148,132l8,0 0,8 -8,0 0,-8z M156,132l8,0 0,8 -8,0 0,-8z M164,132l8,0 0,8 -8,0 0,-8z M172,132l8,0 0,8 -8,0 0,-8z M68,140l8,0 0,8 -8,0 0,-8z M108,140l8,0 0,8 -8,0 0,-8z M116,140l8,0 0,8 -8,0 0,-8z M132,140l8,0 0,8 -8,0 0,-8z M164,140l8,0 0,8 -8,0 0,-8z M196,140l8,0 0,8 -8,0 0,-8z M4,148l8,0 0,8 -8,0 0,-8z M12,148l8,0 0,8 -8,0 0,-8z M20,148l8,0 0,8 -8,0 0,-8z M28,148l8,0 0,8 -8,0 0,-8z M36,148l8,0 0,8 -8,0 0,-8z M44,148l8,0 0,8 -8,0 0,-8z M52,148l8,0 0,8 -8,0 0,-8z M68,148l8,0 0,8 -8,0 0,-8z M76,148l8,0 0,8 -8,0 0,-8z M92,148l8,0 0,8 -8,0 0,-8z M132,148l8,0 0,8 -8,0 0,-8z M148,148l8,0 0,8 -8,0 0,-8z M164,148l8,0 0,8 -8,0 0,-8z M180,148l8,0 0,8 -8,0 0,-8z M196,148l8,0 0,8 -8,0 0,-8z M4,156l8,0 0,8 -8,0 0,-8z M52,156l8,0 0,8 -8,0 0,-8z M84,156l8,0 0,8 -8,0 0,-8z M108,156l8,0 0,8 -8,0 0,-8z M124,156l8,0 0,8 -8,0 0,-8z M132,156l8,0 0,8 -8,0 0,-8z M164,156l8,0 0,8 -8,0 0,-8z M188,156l8,0 0,8 -8,0 0,-8z M4,164l8,0 0,8 -8,0 0,-8z M20,164l8,0 0,8 -8,0 0,-8z M28,164l8,0 0,8 -8,0 0,-8z M36,164l8,0 0,8 -8,0 0,-8z M52,164l8,0 0,8 -8,0 0,-8z M92,164l8,0 0,8 -8,0 0,-8z M100,164l8,0 0,8 -8,0 0,-8z M108,164l8,0 0,8 -8,0 0,-8z M124,164l8,0 0,8 -8,0 0,-8z M132,164l8,0 0,8 -8,0 0,-8z M140,164l8,0 0,8 -8,0 0,-8z M148,164l8,0 0,8 -8,0 0,-8z M156,164l8,0 0,8 -8,0 0,-8z M164,164l8,0 0,8 -8,0 0,-8z M172,164l8,0 0,8 -8,0 0,-8z M188,164l8,0 0,8 -8,0 0,-8z M196,164l8,0 0,8 -8,0 0,-8z M4,172l8,0 0,8 -8,0 0,-8z M20,172l8,0 0,8 -8,0 0,-8z M28,172l8,0 0,8 -8,0 0,-8z M36,172l8,0 0,8 -8,0 0,-8z M52,172l8,0 0,8 -8,0 0,-8z M76,172l8,0 0,8 -8,0 0,-8z M100,172l8,0 0,8 -8,0 0,-8z M124,172l8,0 0,8 -8,0 0,-8z M132,172l8,0 0,8 -8,0 0,-8z M140,172l8,0 0,8 -8,0 0,-8z M164,172l8,0 0,8 -8,0 0,-8z M172,172l8,0 0,8 -8,0 0,-8z M180,172l8,0 0,8 -8,0 0,-8z M188,172l8,0 0,8 -8,0 0,-8z M4,180l8,0 0,8 -8,0 0,-8z M20,180l8,0 0,8 -8,0 0,-8z M28,180l8,0 0,8 -8,0 0,-8z M36,180l8,0 0,8 -8,0 0,-8z M52,180l8,0 0,8 -8,0 0,-8z M68,180l8,0 0,8 -8,0 0,-8z M76,180l8,0 0,8 -8,0 0,-8z M84,180l8,0 0,8 -8,0 0,-8z M100,180l8,0 0,8 -8,0 0,-8z M108,180l8,0 0,8 -8,0 0,-8z M116,180l8,0 0,8 -8,0 0,-8z M124,180l8,0 0,8 -8,0 0,-8z M132,180l8,0 0,8 -8,0 0,-8z M140,180l8,0 0,8 -8,0 0,-8z M164,180l8,0 0,8 -8,0 0,-8z M188,180l8,0 0,8 -8,0 0,-8z M196,180l8,0 0,8 -8,0 0,-8z M4,188l8,0 0,8 -8,0 0,-8z M52,188l8,0 0,8 -8,0 0,-8z M84,188l8,0 0,8 -8,0 0,-8z M92,188l8,0 0,8 -8,0 0,-8z M100,188l8,0 0,8 -8,0 0,-8z M116,188l8,0 0,8 -8,0 0,-8z M132,188l8,0 0,8 -8,0 0,-8z M140,188l8,0 0,8 -8,0 0,-8z M148,188l8,0 0,8 -8,0 0,-8z M164,188l8,0 0,8 -8,0 0,-8z M172,188l8,0 0,8 -8,0 0,-8z M4,196l8,0 0,8 -8,0 0,-8z M12,196l8,0 0,8 -8,0 0,-8z M20,196l8,0 0,8 -8,0 0,-8z M28,196l8,0 0,8 -8,0 0,-8z M36,196l8,0 0,8 -8,0 0,-8z M44,196l8,0 0,8 -8,0 0,-8z M52,196l8,0 0,8 -8,0 0,-8z M68,196l8,0 0,8 -8,0 0,-8z M76,196l8,0 0,8 -8,0 0,-8z M108,196l8,0 0,8 -8,0 0,-8z M116,196l8,0 0,8 -8,0 0,-8z M132,196l8,0 0,8 -8,0 0,-8z M156,196l8,0 0,8 -8,0 0,-8z M196,196l8,0 0,8 -8,0 0,-8z " stroke="transparent" fill="#000000" rx="1.5" ry="1.5"/></svg>
            <p className="qr-url">lu.ma/zerotocoder</p>
          </div>
          <div className="workshop-info">
            <p><em>Small group workshops every other weekend</em></p>
            <p><em>Perfect for those who spend their days thinking "there should be a simple tool for this"</em></p>
            <p className="contact-info">(Want me to train your team? Let's talk after)</p>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className={`video-modal ${isVideoModalOpen ? 'active' : ''}`} onClick={handleModalClick}>
          <div className="video-modal-content">
            <video 
              src="/videos/linkedin-generator.mov"
              controls
              autoPlay
              className="modal-video"
            >
              <p>Your browser doesn't support embedded videos.</p>
            </video>
          </div>
        </div>
      )}
    </div>
  );
} 