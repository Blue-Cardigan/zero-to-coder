import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PasscodeScreenProps {
  onPasscodeCorrect: () => void;
}

export default function PasscodeScreen({ onPasscodeCorrect }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const correctPasscode = 'premiumanddelightful'; // You can change this to any passcode you want

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      if (rememberMe) {
        // Store authentication with timestamp
        const authData = {
          authenticated: true,
          timestamp: Date.now()
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-900/60 p-8 rounded-xl backdrop-blur-lg border border-blue-500/50 shadow-xl max-w-md w-full mx-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Zero to Coder Slides
        </h1>
        
        {/* <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
          <p className="text-yellow-200 text-sm text-center">
            🔓 <strong>Challenge:</strong> Can you break in to find the password? 
            <br />
            <span className="text-xs text-yellow-300">Hint: Check the source code or browser dev tools!</span>
          </p>
        </div> */}

        {/* QR Code and Link Section */}
        <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white p-2 rounded-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(slidesUrl)}`}
                alt="QR Code for slides"
                className="w-32 h-32"
              />
            </div>
            <div className="text-center">
              <a 
                href={slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 text-sm underline break-all"
              >
                {slidesUrl}
              </a>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 bg-indigo-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter Code"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-blue-200">
              Remember me on this device
            </label>
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              Incorrect passcode. Please try again.
            </motion.p>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Access Slides
          </button>
        </form>
      </motion.div>
    </div>
  );
} 