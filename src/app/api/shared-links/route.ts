import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SharedLink } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json() as Omit<SharedLink, 'id' | 'created_at'>;
    
    // Validate required fields
    if (!body.name || !body.project_url) {
      return NextResponse.json(
        { message: 'Name and project URL are required' },
        { status: 400 }
      );
    }
    
    // Basic URL validation
    try {
      new URL(body.project_url);
    } catch {
      return NextResponse.json(
        { message: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('shared_links')
      .insert([body])
      .select();
    
    if (error) {
      console.error('Error saving to Supabase:', error);
      return NextResponse.json(
        { message: 'Failed to save link' },
        { status: 500 }
      );
    }
    
    // Return success response with the created record
    return NextResponse.json({ 
      message: 'Link shared successfully',
      link: data[0]
    }, { status: 201 });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch recent shared links
    const { data, error } = await supabase
      .from('shared_links')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error('Error fetching from Supabase:', error);
      return NextResponse.json(
        { message: 'Failed to fetch links' },
        { status: 500 }
      );
    }
    
    // Return the shared links
    return NextResponse.json({ 
      links: data
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 