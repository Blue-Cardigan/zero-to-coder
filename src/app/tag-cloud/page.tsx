'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

type WordCloudWord = {
  text: string;
  size: number;
  color: string;
};

type TagResponse = {
  tag: string;
};

// Define proper types for d3-cloud words and events
type CloudWord = WordCloudWord & {
  x?: number;
  y?: number;
  rotate?: number;
  startX?: number;
  startY?: number;
  startRotate?: number;
  text: string;
  size: number;
};

type WordData = {
  x: number;
  y: number;
  rotate: number;
  transform?: string;
};

// Move colorScale outside component to prevent re-renders
const colorScale = d3.scaleOrdinal<string>()
  .range(['#60A5FA', '#818CF8', '#A78BFA', '#C084FC', '#E879F9', '#F472B6', '#38BDF8', '#34D399'])
  .domain(['0', '1', '2', '3', '4', '5', '6', '7']);

// Enhanced mock data for workshop-related tags
const mockTags: WordCloudWord[] = [
  { text: 'Feedback', size: 80, color: '#60A5FA' }
];

export default function TagCloudPage() {
  const [tags, setTags] = useState<WordCloudWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousTagsSignatureRef = useRef<string>('');
  
  // Generate a complete signature of the tags (including text and size) for change detection
  const generateTagSignature = useCallback((wordList: WordCloudWord[]) => {
    return JSON.stringify(
      wordList
        .map(tag => ({ text: tag.text, size: tag.size }))
        .sort((a, b) => a.text.localeCompare(b.text))
    );
  }, []);
  
  // Compare and process new data only if changes detected
  const processNewData = useCallback((data: TagResponse[]) => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        // Only update if currently not using mock data
        if (!useMockData) {
          console.log('No tags returned from procedure, switching to mock data');
          setUseMockData(true);
          setTags(mockTags);
        }
        return;
      }
      
      // Count tag occurrences
      const tagFrequency: Record<string, number> = {};
      data.forEach(tagObj => {
        if (tagObj && tagObj.tag) {
          const tag = tagObj.tag.trim().toLowerCase();
          if (tag) {
            tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
          }
        }
      });
      
      // Find the minimum and maximum frequencies for better scaling
      const frequencies = Object.values(tagFrequency);
      const minFreq = Math.min(...frequencies);
      const maxFreq = Math.max(...frequencies);
      
      // Create a logarithmic scale for tag sizes that maximizes space usage
      const sizeScale = d3.scaleLog()
        .domain([Math.max(1, minFreq), Math.max(2, maxFreq)])
        .range([80, 160]) // Reduced base range to allow for more dynamic scaling
        .clamp(true);
        
      // Convert to format needed for d3-cloud
      const newWords: WordCloudWord[] = Object.keys(tagFrequency)
        .filter(tag => tag.length > 0)
        .map(tag => {
          const frequency = tagFrequency[tag];
          const size = Math.round(sizeScale(frequency));
          
          // Use deterministic color assignment based on tag text
          const colorIndex = Math.abs(tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 8;
          
          return {
            text: tag,
            size,
            color: colorScale(colorIndex.toString())
          };
        })
        .sort((a, b) => b.size - a.size);
      
      if (newWords.length === 0) {
        // Only update if currently not using mock data
        if (!useMockData) {
          console.log('No valid tags found, switching to mock data');
          setUseMockData(true);
          setTags(mockTags);
          previousTagsSignatureRef.current = generateTagSignature(mockTags);
        }
        return;
      }
      
      // Create a signature of the new tag data for comparison (including text and size)
      const newTagsSignature = generateTagSignature(newWords);
      
      // Only update if the tags have changed
      if (previousTagsSignatureRef.current !== newTagsSignature) {
        console.log('Tags have changed, updating cloud');
        setUseMockData(false);
        setTags(newWords);
        previousTagsSignatureRef.current = newTagsSignature;
      } else {
        console.log('No changes in tags, maintaining current visualization');
      }
    } catch (err: unknown) {
      console.error('Error comparing tag data:', err);
      // Only update if error and currently not using mock data
      if (!useMockData) {
        setUseMockData(true);
        setTags(mockTags);
        previousTagsSignatureRef.current = generateTagSignature(mockTags);
      }
    }
  }, [generateTagSignature, useMockData]);

  // Function to fetch data from the API
  const fetchData = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      
      // Try to use stored procedure first - RLS is now disabled
      console.log("Fetching tags using stored procedure...");
      const { data: procData, error: procError } = await supabase.rpc('get_all_tags');
      
      if (procError) {
        console.log("Stored procedure failed:", procError.message);
        // Fall back to mock data
        setUseMockData(true);
        setTags(mockTags);
      } else if (!procData || procData.length === 0) {
        // If procedure returned empty data
        console.log('Procedure returned no data');
        setUseMockData(true);
        setTags(mockTags);
      } else {
        // Process data from procedure
        console.log(`Successfully retrieved ${procData.length} tags from procedure at ${new Date().toISOString()}`);
        processNewData(procData);
      }
    } catch (err: unknown) {
      console.error('Error processing tags:', err);
      setUseMockData(true);
      setTags(mockTags);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  }, [processNewData]);

  useEffect(() => {
    // Initialize the previous tags signature
    previousTagsSignatureRef.current = generateTagSignature(tags);
    
    // First load
    fetchData(true);
    
    // Set up polling
    pollingIntervalRef.current = setInterval(() => {
      fetchData(false);
    }, 5000); // Poll every 5 seconds
    
    // Clean up on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchData, generateTagSignature, tags]);

  // Memoize the renderCloud function to prevent unnecessary recreations
  const renderCloud = useCallback(() => {
    if (tags.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);
      
      // Get container dimensions instead of window
      const container = svg.node()?.parentElement;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width * 0.95;
      const height = containerRect.height * 0.92;

      // Store previous word positions if available for smoother transitions
      const prevWords = new Map<string, WordData>();
      svg.selectAll<SVGTextElement, CloudWord>(".word").each(function(d) {
        if (d && d.text) {
          const transform = d3.select(this).attr("transform");
          prevWords.set(d.text, {
            x: d.x || 0,
            y: d.y || 0,
            rotate: d.rotate || 0,
            transform
          });
        }
      });

      // Clear any existing elements
      svg.selectAll("*").remove();

      // Create word cloud layout with more padding for sparse and readable cloud
      const layout = cloud<CloudWord>()
        .size([width * 0.77, height]) // Constrain width to two-thirds
        .words(tags as CloudWord[])
        .padding(() => {
          // Dynamic padding based on tag count
          // Fewer tags = less padding to maximize space
          if (tags.length <= 5) return 12;
          if (tags.length <= 10) return 10;
          if (tags.length <= 20) return 8;
          if (tags.length <= 50) return 6;
          return 4; // Minimum padding for large tag sets
        })
        .rotate(() => {
          // Allow full rotation for actual tags, but keep the placeholder text straight
          const isPlaceholderTag = tags.length === 1 && tags[0].text.includes("Add tags in your feedback");
          if (isPlaceholderTag) {
            return 0; // Keep placeholder text horizontal
          }
          // Use standard D3 cloud rotation angles for normal tags
          return ~~(Math.random() * 3) * 30 - 30;
        })
        .fontSize(d => {
          // Use the size directly from sizeScale, with a minimum size
          return Math.max(d.size, 14);
        })
        .spiral("rectangular") // Use rectangular spiral for better space utilization
        .random(() => 0.5) // Deterministic layout
        .on("end", draw);

      // Start generating layout
      layout.start();

      // Draw the word cloud with animations
      function draw(words: CloudWord[]) {
        const g = svg
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width * 0.67},${height / 2})`); // Shift to right two-thirds

        // Update background glow for better visibility
        g.selectAll<SVGTextElement, CloudWord>(".word-bg")
          .data(words)
          .enter()
          .append("text")
          .attr("class", "word-bg")
          .style("font-size", (d: CloudWord) => `${d.size}px`)
          .style("font-family", "'Inter', sans-serif")
          .style("font-weight", "bold")
          .style("fill", "#193166")
          .style("opacity", 0.4) // Increased from 0.3 for better contrast
          .attr("text-anchor", "middle")
          .attr("transform", (d: CloudWord) => {
            // For smooth transitions, check if this word existed before
            const prev = prevWords.get(d.text);
            
            // Start from previous position if available
            const x = prev ? prev.x : d.x || 0;
            const y = prev ? prev.y : d.y || 0;
            const rotate = prev ? prev.rotate : d.rotate || 0;
            
            // Update the position on the data object for later use
            d.startX = x;
            d.startY = y;
            d.startRotate = rotate;
            
            return `translate(${x},${y}) rotate(${rotate})`;
          })
          .attr("dy", "0.35em") // Vertically center text
          .text((d: CloudWord) => d.text)
          .style("opacity", 0)
          .transition()
          .delay((_, i) => i * 30)
          .duration(700)
          .style("opacity", 0.3)
          // Animate to the new position
          .attr("transform", function(this: SVGTextElement) {
            const d = d3.select(this).datum() as CloudWord;
            const x = d.x || 0;
            const y = d.y || 0;
            const rotate = d.rotate || 0;
            return `translate(${x},${y}) rotate(${rotate})`;
          });

        // Update main words with stronger glow and opacity
        g.selectAll<SVGTextElement, CloudWord>(".word")
          .data(words)
          .enter()
          .append("text")
          .attr("class", "word")
          .style("font-size", (d: CloudWord) => `${d.size}px`)
          .style("font-family", "'Inter', sans-serif")
          .style("font-weight", "bold")
          .style("fill", (d: CloudWord) => d.color)
          .style("text-shadow", (d: CloudWord) => `
            0 0 10px ${d.color}50,
            0 0 15px ${d.color}30,
            0 0 20px ${d.color}20
          `) // Enhanced glow effect
          .attr("text-anchor", "middle")
          .attr("transform", (d: CloudWord) => {
            // Start from previous position for smoother transitions
            const x = d.startX !== undefined ? d.startX : d.x || 0;
            const y = d.startY !== undefined ? d.startY : d.y || 0;
            const rotate = d.startRotate !== undefined ? d.startRotate : d.rotate || 0;
            return `translate(${x},${y}) rotate(${rotate})`;
          })
          .attr("dy", "0.35em") // Vertically center text
          .text((d: CloudWord) => d.text)
          .style("opacity", 0.4) // Start slightly visible
          .transition()
          .delay((_, i) => i * 30)
          .duration(300)
          .style("opacity", 0.85) // Increased from 0.7
          .transition()
          .duration(700)
          .attr("transform", function(this: SVGTextElement) {
            const d = d3.select(this).datum() as CloudWord;
            const x = d.x || 0;
            const y = d.y || 0;
            const rotate = d.rotate || 0;
            return `translate(${x},${y}) rotate(${rotate})`;
          })
          .style("opacity", 1);

        // Update hover effects for more dramatic interaction
        g.selectAll<SVGTextElement, CloudWord>(".word")
          .on("mouseover", function(_, d: CloudWord) {
            d3.select(this)
              .transition()
              .duration(200)
              .style("filter", "brightness(1.3)") // Increased from 1.2
              .style("text-shadow", function(this: SVGTextElement) {
                const d = d3.select(this).datum() as CloudWord;
                return `
                  0 0 15px ${d.color}70,
                  0 0 20px ${d.color}50,
                  0 0 25px ${d.color}30
                `;
              })
              .attr("transform", () => {
                const x = d.x || 0;
                const y = d.y || 0;
                const rotate = d.rotate || 0;
                return `translate(${x},${y}) rotate(${rotate}) scale(1.15)`;
              });
          })
          .on("mouseout", function(_, d: CloudWord) {
            d3.select(this)
              .transition()
              .duration(200)
              .style("filter", "brightness(1)")
              .attr("transform", () => {
                // Reset to original transform
                const x = d.x || 0;
                const y = d.y || 0;
                const rotate = d.rotate || 0;
                return `translate(${x},${y}) rotate(${rotate})`;
              });
          });
      }
    }
  }, [tags]);

  useEffect(() => {
    // Initial render with a small delay to ensure container is ready
    const initialRender = setTimeout(() => {
      renderCloud();
    }, 100);

    // Add window resize event listener
    const handleResize = () => {
      renderCloud();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialRender);
    };
  }, [renderCloud]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-6"></div>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Generating tag cloud...
          </p>
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white bg-indigo-900/50 p-8 rounded-lg backdrop-blur-md max-w-lg">
          <p className="text-xl">No tags have been submitted yet</p>
          <p className="mt-4 text-blue-300">Add tags in your feedback to see them appear here!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #4338ca 0%, #1e1b4b 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* Mock data badge */}
        {useMockData && (
          <div className="absolute top-4 right-4 bg-indigo-900/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white border border-indigo-700/50 shadow-lg">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              No tags submitted yet
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 