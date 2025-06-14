import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

interface QRCodeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  bgColor: string;
  fgColor: string;
}

export default function QRCodeOverlay({ isOpen, onClose, url, bgColor, fgColor }: QRCodeOverlayProps) {
  const [copiedPassword, setCopiedPassword] = React.useState(false);
  const password = 'premiumanddelightful';

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative p-8 bg-indigo-900/90 rounded-2xl border border-indigo-700/50 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-300 hover:text-blue-400 transition-colors"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <QRCodeSVG
                value={url}
                size={400}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                className="rounded-lg"
              />
              <p className="mt-4 text-blue-300 text-center">
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  {url}
                </a>
              </p>
              
              {/* Password section */}
              <div className="mt-6 bg-indigo-800/50 p-4 rounded-xl border border-indigo-600/40 w-full max-w-md">
                <h3 className="text-blue-300 font-bold text-center mb-3">Password</h3>
                <div className="relative">
                  <button
                    onClick={handleCopyPassword}
                    className="w-full bg-slate-900/80 p-3 rounded-lg border border-indigo-600/40 text-blue-300 font-mono text-lg hover:bg-slate-800/80 transition-colors group relative"
                  >
                    <span className="relative z-10">{password}</span>
                    <span className={`absolute inset-0 bg-blue-500/20 rounded-lg transition-opacity duration-200 ${copiedPassword ? 'opacity-100' : 'opacity-0'}`}></span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-500/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      📋 Click to copy
                    </span>
                  </button>
                  {copiedPassword && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-green-300 text-sm font-medium">
                      Copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 