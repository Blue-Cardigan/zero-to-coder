import { createClient } from '@supabase/supabase-js';

// Define database types
export type FeedbackRecord = {
  id?: number;
  created_at?: string;
  name: string;
  email: string;
  went_well: string;
  could_improve: string;
  project_url: string;
  testimonial: string;
  tags?: string[];
};

export type Database = {
  public: {
    Tables: {
      workshop_feedback: {
        Row: FeedbackRecord;
        Insert: Omit<FeedbackRecord, 'id' | 'created_at'>;
        Update: Partial<FeedbackRecord>;
      };
    };
  };
};

// Next.js client-side environment variables need to be prefixed with NEXT_PUBLIC_
// But since we're using existing variables, we'll access them directly
const supabaseUrl = 'https://igksmsrhfilnfkyvnhlf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna3Ntc3JoZmlsbmZreXZuaGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTg5NDAsImV4cCI6MjA1ODY5NDk0MH0.gk1ufbfs3OwLttzA4HVawZ1JpRvOeQeFCnuWmOI1Yrs';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 