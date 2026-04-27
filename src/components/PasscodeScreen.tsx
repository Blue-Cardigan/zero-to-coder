import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react';
import '@/app/slides/slides.css';

interface PasscodeScreenProps {
  onPasscodeCorrect: () => void;
}

export default function PasscodeScreen({ onPasscodeCorrect }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const correctPasscode = 'premiumanddelightful';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      if (rememberMe) {
        const authData = {
          authenticated: true,
          timestamp: Date.now(),
        };
        localStorage.setItem('slides-auth', JSON.stringify(authData));
      }
      onPasscodeCorrect();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const slidesUrl = 'https://zerotocoder.uk/slides';

  return (
    <div
      className="ztc-slide bg-hero-grid min-h-screen w-full flex items-center justify-center px-4 py-10"
      style={{ color: 'var(--ztc-text)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="hero-panel panel-cut p-8 md:p-10 max-w-md w-full"
      >
        <p className="type-kicker mb-3">Workshop access</p>
        <h1 className="text-4xl md:text-5xl font-bold ztc-heading mb-2">
          Zero to Coder
        </h1>
        <p className="text-base md:text-lg ztc-muted mb-8">
          Enter the passcode to open the slides.
        </p>

        <div className="editorial-column p-4 md:p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-sm shrink-0">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(slidesUrl)}`}
                alt="QR code linking to the slides"
                className="w-24 h-24 block"
              />
            </div>
            <div className="min-w-0">
              <p className="type-kicker mb-1">Or open on your device</p>
              <a
                href={slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg font-medium break-all hover:underline"
                style={{ color: 'var(--ztc-accent-a)' }}
              >
                zerotocoder.uk/slides
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock
              className="absolute inset-y-0 left-3 my-auto h-4 w-4"
              style={{ color: 'var(--ztc-accent-a)' }}
              aria-hidden="true"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-12 py-3 bg-slate-950/60 border border-cyan-400/25 rounded-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder:text-slate-500"
              placeholder="Enter passcode"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={`${showPassword ? 'Hide' : 'Show'} passcode`}
              className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-200"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm ztc-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
            Remember me on this device
          </label>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm"
              style={{ color: 'var(--ztc-accent-b)' }}
            >
              Incorrect passcode. Please try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base md:text-lg font-semibold bg-blue-500/25 border border-blue-400/45 rounded-sm hover:bg-blue-500/35 transition-colors"
          >
            Access Slides
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
