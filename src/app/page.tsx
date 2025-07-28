'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCoffee, FiAward, FiMapPin, FiCalendar, FiStar, FiArrowRight, FiUser } from 'react-icons/fi';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { testimonialConfig } from '../config/testimonials';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

interface DisplayTestimonial {
  id: number;
  name: string;
  content: string;
  project_url?: string;
}

const RotatingWord = () => {
  const words = ['innovative', 'vibey', 'intuitive'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start wobble 500ms before change
      setIsWobbling(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsWobbling(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-block relative h-[1.2em] w-[200px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: words[currentIndex] === 'innovative' ? 0.85 :
                   words[currentIndex] === 'vibey' ? 1.15 : 
                   1,
            rotate: isWobbling ? [0, -2, 2, -1, 1, 0] : 0
          }}
          exit={{ y: -20, opacity: 0, scale: 1.2 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1],
            rotate: {
              duration: 0.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }
          }}
          className="absolute left-0 right-0 top-1 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold text-3xl"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default function HomePage() {
  const [displayTestimonials, setDisplayTestimonials] = useState<DisplayTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('workshop_feedback')
          .select('id, name, testimonial, went_well, project_url');

        if (error) throw error;

        const processedTestimonials: DisplayTestimonial[] = [];

        data?.forEach(item => {
          // For each column (testimonial, went_well), check if it should be included
          const columns = {
            testimonial: item.testimonial?.trim(),
            went_well: item.went_well?.trim()
          };

          Object.entries(columns).forEach(([column, value]) => {
            if (!value) return; // Skip empty values

            const isBlacklisted = testimonialConfig.blacklist.some(b => 
              b.id === item.id && b.column === column
            );
            const isWhitelisted = testimonialConfig.whitelist.some(w => 
              w.id === item.id && w.column === column
            );

            // Include if:
            // 1. It's a testimonial that's not blacklisted, OR
            // 2. It's a whitelisted value from another column
            if ((column === 'testimonial' && !isBlacklisted) || isWhitelisted) {
              processedTestimonials.push({
                id: item.id,
                name: item.name,
                content: value,
                project_url: item.project_url
              });
            }
          });
        });

        // Shuffle and space out testimonials from the same person
        const spaceOutTestimonials = (testimonials: DisplayTestimonial[]): DisplayTestimonial[] => {
          // First shuffle randomly
          const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
          const result: DisplayTestimonial[] = [];
          
          // For each testimonial, find the best position that maintains spacing
          shuffled.forEach(testimonial => {
            let bestPosition = 0;
            let maxSpacing = -1;

            // Try each possible position
            for (let i = 0; i <= result.length; i++) {
              // Check spacing to previous and next same-id items
              let prevSameId = -1;
              let nextSameId = -1;

              // Look backwards for same id
              for (let j = i - 1; j >= 0; j--) {
                if (result[j].id === testimonial.id) {
                  prevSameId = j;
                  break;
                }
              }

              // Look forwards for same id
              for (let j = i; j < result.length; j++) {
                if (result[j].id === testimonial.id) {
                  nextSameId = j;
                  break;
                }
              }

              // Calculate minimum spacing at this position
              const spacing = Math.min(
                prevSameId === -1 ? Infinity : i - prevSameId,
                nextSameId === -1 ? Infinity : nextSameId - i
              );

              // Update best position if this spacing is better
              if (spacing > maxSpacing) {
                maxSpacing = spacing;
                bestPosition = i;
              }
            }

            // Insert at the best position
            result.splice(bestPosition, 0, testimonial);
          });

          return result;
        };

        const spacedTestimonials = spaceOutTestimonials(processedTestimonials);
        setDisplayTestimonials(spacedTestimonials);

      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute opacity-60 pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="animate-blob animation-delay-2000 absolute top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob absolute -bottom-40 left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="">
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col justify-center items-center text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Zero to Coder
            </h1>
            <p className="text-2xl md:text-3xl text-blue-200 mx-auto">
              London&apos;s most<RotatingWord />coding workshops
            </p>
          </motion.div>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl h-full flex flex-col"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <Image 
                    src="/images/me3.png" 
                    alt="Jethro" 
                    width={80} 
                    height={80}
                    className="rounded-full transform scale-x-[-1]" 
                  />
                </div>
                <div className="space-y-4">
                <div className="flex items-center text-blue-200">
                  <FiUser className="text-blue-400 mr-3" />
                  <span>Workshops by Jethro</span>
                </div>
                <div className="flex items-center text-blue-200">
                  <FiMapPin className="text-blue-400 mr-3" />
                  <span>in London</span>
                </div>
                <div className="flex items-center text-blue-200">
                  <FiCalendar className="text-blue-400 mr-3" />
                  <span>Every 2 weeks</span>
                </div>
              </div>
              </div>
              
              <motion.p 
                className="text-md font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Learn the streamlined version of my own path.
              </motion.p>

              <div className="space-y-4 flex-grow">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>
                  <div className="space-y-6 pl-6">
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-blue-400/20"></div>
                      <div className="w-24 text-sm text-blue-400 font-medium">Oct 2023</div>
                      <div className="text-blue-200 mt-1">Total beginner & fresh graduate</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/20"></div>
                      <div className="w-24 text-sm text-purple-400 font-medium">Nov 2023</div>
                      <div className="text-blue-200 mt-1">First data science contract</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-pink-400 ring-4 ring-pink-400/20"></div>
                      <div className="w-24 text-sm text-pink-400 font-medium">Jun 2024</div>
                      <div className="text-blue-200 mt-1">First React developer contract</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-blue-400/20"></div>
                      <div className="w-24 text-sm text-blue-400 font-medium">Mar 2025</div>
                      <div className="text-blue-200 mt-1">Full time developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workshop Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl h-full flex flex-col"
            >              
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                    <FiAward className="text-indigo-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">AI-Powered Learning</h3>
                    <p className="text-blue-200">Leverage AI tools to accelerate your learning.</p>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center space-x-2 text-blue-200 bg-indigo-500/10 p-2 rounded-md hover:bg-indigo-500/20 transition-colors">
                        <FiStar className="text-indigo-300" />
                        <span>Bolt</span>
                      </li>
                      <li className="flex items-center space-x-2 text-blue-200 bg-indigo-500/10 p-2 rounded-md hover:bg-indigo-500/20 transition-colors">
                        <FiStar className="text-indigo-300" />
                        <span>Cursor</span>
                      </li>
                      <li className="flex items-center space-x-2 text-blue-200 bg-indigo-500/10 p-2 rounded-md hover:bg-indigo-500/20 transition-colors">
                        <FiStar className="text-indigo-300" />
                        <span>NextJS</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                    <FiCoffee className="text-purple-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Small Group Setting</h3>
                    <p className="text-blue-200">Intimate workshops with personalised attention and support.</p>
                  </div>
                </div>
                                
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <FiCode className="text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Hands-on Learning</h3>
                    <p className="text-blue-200">Build real projects from day one, using modern tools and frameworks.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Workshops Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center"
          >
            <div className="w-full">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Upcoming Workshops
              </h2>
              
              <div className="gap-8">
                {/* Upcoming/Most Recent Workshop */}
                <div className="gap-4">
                  <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl">
                    <div className="relative h-full">
                      <iframe
                        src="https://lu.ma/embed/calendar/cal-EnG2LIAEMCY2vYF/events"
                        className="w-full"
                        height="450"
                        frameBorder="0"
                        style={{
                          border: "1px solid #bfcbda88",
                          borderRadius: "4px"
                        }}
                        aria-hidden="false"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                    </motion.div>

        </div>
      </div>

      {/* Testimonials - Full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col justify-center relative"
      >
        <div className="w-full container mx-auto px-4 relative z-10 mb-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            What People Say
          </h2>
        </div>
        
        <div className="w-full overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <div className="relative">
              <div 
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-blue-900/30 pb-4"
              >
                <div className="flex animate-scroll-x px-8">
                  {/* First set of testimonials */}
                  {displayTestimonials.map((testimonial, index) => (
                    <div
                      key={`${testimonial.id}-${index}-1`}
                      className="flex-none mx-4 w-[500px] first:ml-0"
                    >
                      <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/30 flex flex-col">
                        <div className="flex items-center mb-3">
                          <FiStar className="text-yellow-400 mr-2 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-blue-300">
                            {getFirstName(testimonial.name)}
                          </h3>
                        </div>
                        <p className="text-blue-200 italic mb-3 whitespace-normal break-words line-clamp-4">
                          {testimonial.content}
                        </p>
                        {testimonial.project_url && (
                          <a
                            href={testimonial.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center mt-auto"
                          >
                            View their project <FiArrowRight className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless scrolling */}
                  {displayTestimonials.map((testimonial, index) => (
                    <div
                      key={`${testimonial.id}-${index}-2`}
                      className="flex-none mx-4 w-[500px]"
                    >
                      <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/30 flex flex-col">
                        <div className="flex items-center mb-3">
                          <FiStar className="text-yellow-400 mr-2 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-blue-300">
                            {getFirstName(testimonial.name)}
                          </h3>
                        </div>
                        <p className="text-blue-200 italic mb-3 whitespace-normal break-words line-clamp-4">
                          {testimonial.content}
                        </p>
                        {testimonial.project_url && (
                          <a
                            href={testimonial.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center mt-auto"
                          >
                            View their project <FiArrowRight className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
          
      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-500/30 bg-indigo-900/60 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-sm text-blue-300/70">
            © {new Date().getFullYear()} Zero to Coder Workshop
          </p>
          <Link 
            href="/slides" 
            className="text-sm text-blue-300 hover:text-blue-200 transition-colors flex items-center space-x-1"
          >
            <span>View Slides</span>
            <FiArrowRight className="text-xs" />
        </Link>
        </div>
      </footer>

      {/* Luma Script */}
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
    </div>
  );
}