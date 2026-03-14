import { createClient } from '@supabase/supabase-js';

// Define database types
export type FeedbackRecord = {
  id?: number;
  created_at?: string;
  name: string;
  email: string;
  went_well: string;
  could_improve: string;
  next_session_topics: string;
  project_url: string;
  testimonial: string;
  tags?: string[];
};

export type SharedLink = {
  id?: number;
  created_at?: string;
  name: string;
  project_url: string;
  description?: string;
};

export type Database = {
  public: {
    Tables: {
      workshop_feedback: {
        Row: FeedbackRecord;
        Insert: Omit<FeedbackRecord, 'id' | 'created_at'>;
        Update: Partial<FeedbackRecord>;
      };
      shared_links: {
        Row: SharedLink;
        Insert: Omit<SharedLink, 'id' | 'created_at'>;
        Update: Partial<SharedLink>;
      };
    };
  };
};

export const supabase = createClient<Database>(process.env.NEXT_PUBLIC_PROJECT_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); 