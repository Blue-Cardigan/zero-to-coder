import React from 'react';

export default function TagCloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      {children}
    </div>
  );
} 