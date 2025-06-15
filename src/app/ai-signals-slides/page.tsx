'use client';

import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

export default function AISignalsSlides() {
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

    deck.initialize();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        {/* Slide 13: Thank You */}
        <section className="thank-you-slide">
          <h1 style={{
            fontSize: '5rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #ffa726 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Thank you - Questions?
          </h1>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet" width="200" height="200">
              <defs>
                <linearGradient id="qrGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0070f3" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <linearGradient id="qrGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#ffa726" />
                </linearGradient>
                <linearGradient id="qrGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffa726" />
                  <stop offset="100%" stopColor="#ff6b6b" />
                </linearGradient>
                <linearGradient id="qrGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#0070f3" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="transparent" cx="0" cy="0"></rect>
              <path 
                d="M4,4l8,0 0,8 -8,0 0,-8z M12,4l8,0 0,8 -8,0 0,-8z M20,4l8,0 0,8 -8,0 0,-8z M28,4l8,0 0,8 -8,0 0,-8z M36,4l8,0 0,8 -8,0 0,-8z M44,4l8,0 0,8 -8,0 0,-8z M52,4l8,0 0,8 -8,0 0,-8z M84,4l8,0 0,8 -8,0 0,-8z M116,4l8,0 0,8 -8,0 0,-8z M124,4l8,0 0,8 -8,0 0,-8z" 
                stroke="transparent" 
                fill="url(#qrGradient1)" 
                rx="1.5" 
                ry="1.5"
                style={{
                  animation: 'qrGradientTransition 10s ease-in-out infinite',
                  transition: 'fill 3s ease'
                }}
              />
            </svg>
            <p style={{
              fontSize: '1.5rem',
              color: '#0070f3',
              fontWeight: 500,
              margin: 0
            }}>
              lu.ma/zerotocoder
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes qrGradientTransition {
          0% {
            fill: url(#qrGradient1);
          }
          25% {
            fill: url(#qrGradient2);
          }
          50% {
            fill: url(#qrGradient3);
          }
          75% {
            fill: url(#qrGradient4);
          }
          100% {
            fill: url(#qrGradient1);
          }
        }
        
        .reveal {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          background-attachment: fixed;
        }
        
        .thank-you-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
} 