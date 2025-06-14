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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 