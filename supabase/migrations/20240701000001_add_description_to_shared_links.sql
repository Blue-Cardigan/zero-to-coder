-- Add description column to shared_links table
ALTER TABLE public.shared_links
REMOVE COLUMN description;