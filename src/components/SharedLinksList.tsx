'use client';

import { useState, useEffect } from 'react';
import { SharedLink } from '@/lib/supabase';

export default function SharedLinksList() {
  const [links, setLinks] = useState<SharedLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch('/api/shared-links');
        if (!response.ok) {
          throw new Error('Failed to fetch links');
        }
        
        const data = await response.json();
        setLinks(data.links || []);
      } catch (err) {
        console.error('Error fetching links:', err);
        setError('Failed to load shared projects');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLinks();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
        <p className="text-gray-200 text-center">No projects shared yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-900/60 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl">
      <h3 className="text-sm font-bold text-blue-300 mb-2">Shared Projects</h3>
      <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        <div className="space-y-2">
          {links.map((link) => (
            <div 
              key={link.id} 
              className="bg-indigo-800/40 p-2 rounded-lg border border-indigo-600/40 hover:border-indigo-500/60 transition-colors"
            >
              <a 
                href={link.project_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex justify-between items-center">
                  <div className="truncate max-w-[40%]">
                    <p className="font-medium text-blue-300 text-sm truncate">{link.name}</p>
                  </div>
                  <div className="text-blue-300 text-sm flex-shrink-0">
                    <span>→</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 