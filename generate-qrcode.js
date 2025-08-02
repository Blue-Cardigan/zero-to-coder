#!/usr/bin/env node

/**
 * QR Code Generator for Feedback URL
 * This script generates a QR code image for the Zero-to-Coder feedback URL
 */

const fs = require('fs');
const qrcode = require('qrcode');

// The URL to encode
const url = 'https://zerotocoder.uk/feedback';
const outputPath = 'feedback-qrcode.png';

// Generate QR code and save to file
qrcode.toFile(outputPath, url, {
  color: {
    dark: '#000000',  // Black dots
    light: '#FFFFFF'  // White background
  },
  width: 300,
  margin: 4
}, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  
  console.log(`QR code for ${url} generated successfully!`);
  console.log(`Saved to: ${outputPath}`);
  
  // Output file size
  const stats = fs.statSync(outputPath);
  console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
});

console.log('Generating QR code for feedback URL...');
console.log('Note: This script requires the "qrcode" package.');
console.log('If not installed, run: npm install qrcode'); 