'use client';

import { useState } from 'react';
import { SharedLink } from '@/lib/supabase';

export default function LinkShareForm() {
  const [formData, setFormData] = useState<Omit<SharedLink, 'id' | 'created_at'>>({
    name: '',
    project_url: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/shared-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit link');
      }

      setIsSuccess(true);
      setFormData({ name: '', project_url: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-indigo-900/60 p-4 md:p-6 text-sm rounded-lg backdrop-blur-sm border border-indigo-700/50 shadow-xl w-full max-w-md">
      {isSuccess ? (
        <div className="text-center">
          <div className="text-green-400 text-4xl mb-4">✓</div>
          <h3 className="text-md font-bold text-blue-300 mb-2">Link Shared Successfully!</h3>
          <p className="text-gray-200 mb-4">Your project has been added to our showcase!</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Share Another
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-md font-bold text-blue-300 mb-3">Share Your Project</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 text-sm bg-indigo-800/50 border border-indigo-600 rounded-lg text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <input
                type="url"
                id="project_url"
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 text-sm bg-indigo-800/50 border border-indigo-600 rounded-lg text-white"
                placeholder="https://your-project.vercel.app"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-1.5 px-4 rounded-lg font-medium text-sm ${
                isSubmitting 
                  ? 'bg-indigo-700 text-indigo-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
            >
              {isSubmitting ? 'Submitting...' : 'Share Your Link'}
            </button>
          </form>
        </>
      )}
    </div>
  );
} 