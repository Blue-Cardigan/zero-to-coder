import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PasscodeScreenProps {
  onPasscodeCorrect: () => void;
}

export default function PasscodeScreen({ onPasscodeCorrect }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const correctPasscode = 'premiumanddelightful'; // You can change this to any passcode you want

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      onPasscodeCorrect();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-blue-200 mb-2">
              Enter Passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 bg-indigo-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter passcode"
            />
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