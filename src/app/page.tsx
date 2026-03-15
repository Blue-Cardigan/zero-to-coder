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
import './slides/slides.css';

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
    <div className="min-h-screen bg-[#0b1222] text-[#f3f6ff] overflow-hidden relative">
      {/* Slides-inspired background */}
      <div className="absolute pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(86,184,255,0.14),rgba(255,127,110,0.12)),radial-gradient(circle_at_20%_10%,rgba(86,184,255,0.22),transparent_60%),#0b1222]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(135,145,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(135,145,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-45"></div>
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#56b8ff]/20 blur-3xl"></div>
      </div>

      <div className="">
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col justify-center items-center text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 ztc-heading">
              Zero to Coder
            </h1>
            <p className="text-2xl md:text-3xl ztc-muted mx-auto">
              London&apos;s most<RotatingWord />coding workshops
            </p>
          </motion.div>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ztc-surface hero-panel panel-cut p-8 h-full flex flex-col"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[#56b8ff]/15 rounded-full flex items-center justify-center mr-4 border border-[#56b8ff]/25">
                  <Image 
                    src="/images/me3.png" 
                    alt="Jethro" 
                    width={80} 
                    height={80}
                    className="rounded-full transform scale-x-[-1]" 
                  />
                </div>
                <div className="space-y-4">
                <div className="flex items-center ztc-muted">
                  <FiUser className="text-[#56b8ff] mr-3" />
                  <span>Workshops by Jethro</span>
                </div>
                <div className="flex items-center ztc-muted">
                  <FiMapPin className="text-[#56b8ff] mr-3" />
                  <span>in London</span>
                </div>
                <div className="flex items-center ztc-muted">
                  <FiCalendar className="text-[#56b8ff] mr-3" />
                  <span>Every 2 weeks</span>
                </div>
              </div>
              </div>
              
              <motion.p 
                className="type-kicker mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Learn the streamlined version of my own path.
              </motion.p>

              <div className="space-y-4 flex-grow">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#56b8ff] to-[#ff7f6e]"></div>
                  <div className="space-y-6 pl-6">
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#56b8ff] ring-4 ring-[#56b8ff]/20"></div>
                      <div className="w-24 text-sm text-[#8ac8ff] font-medium">Oct 2023</div>
                      <div className="ztc-muted mt-1">Total beginner & fresh graduate</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#7d88ff] ring-4 ring-[#7d88ff]/20"></div>
                      <div className="w-24 text-sm text-[#7d88ff] font-medium">Nov 2023</div>
                      <div className="ztc-muted mt-1">First data science contract</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#ff7f6e] ring-4 ring-[#ff7f6e]/20"></div>
                      <div className="w-24 text-sm text-[#ff7f6e] font-medium">Jun 2024</div>
                      <div className="ztc-muted mt-1">First React developer contract</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#56b8ff] ring-4 ring-[#56b8ff]/20"></div>
                      <div className="w-24 text-sm text-[#8ac8ff] font-medium">Mar 2025</div>
                      <div className="ztc-muted mt-1">Full time developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workshop Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ztc-surface info-panel panel-sharp p-8 h-full flex flex-col"
            >              
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#56b8ff]/15 p-3 rounded-sm mr-4 border border-[#56b8ff]/35">
                    <FiAward className="text-[#8ac8ff] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#8ac8ff] mb-2">AI-Powered Learning</h3>
                    <p className="ztc-muted">Leverage AI tools to accelerate your learning.</p>
                    <ul className="space-y-2 mt-2">
                      <li className="rail-item flex items-center space-x-2 ztc-muted bg-[#56b8ff]/10 p-2 rounded-sm transition-colors">
                        <FiStar className="text-[#8ac8ff]" />
                        <span>Bolt</span>
                      </li>
                      <li className="rail-item flex items-center space-x-2 ztc-muted bg-[#56b8ff]/10 p-2 rounded-sm transition-colors">
                        <FiStar className="text-[#8ac8ff]" />
                        <span>Cursor</span>
                      </li>
                      <li className="rail-item flex items-center space-x-2 ztc-muted bg-[#56b8ff]/10 p-2 rounded-sm transition-colors">
                        <FiStar className="text-[#8ac8ff]" />
                        <span>NextJS</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ff7f6e]/15 p-3 rounded-sm mr-4 border border-[#ff7f6e]/35">
                    <FiCoffee className="text-[#ff7f6e] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#8ac8ff] mb-2">Small Group Setting</h3>
                    <p className="ztc-muted">Intimate workshops with personalised attention and support.</p>
                  </div>
                </div>
                                
                <div className="flex items-start">
                  <div className="bg-[#7d88ff]/15 p-3 rounded-sm mr-4 border border-[#7d88ff]/35">
                    <FiCode className="text-[#7d88ff] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#8ac8ff] mb-2">Hands-on Learning</h3>
                    <p className="ztc-muted">Build real projects from day one, using modern tools and frameworks.</p>
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
              <h2 className="text-3xl font-bold text-center mb-8 ztc-heading">
                Upcoming Workshops
              </h2>
              
              <div className="gap-8">
                {/* Upcoming/Most Recent Workshop */}
                <div className="gap-4">
                  <div className="ztc-surface-strong cta-panel panel-cut p-6">
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
          <h2 className="text-3xl font-bold text-center ztc-heading">
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
                      <div className="ztc-surface info-panel panel-soft p-4 flex flex-col h-full">
                        <div className="flex items-center mb-3">
                          <FiStar className="text-[#ff7f6e] mr-2 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-[#8ac8ff]">
                            {getFirstName(testimonial.name)}
                          </h3>
                        </div>
                        <p className="ztc-muted italic mb-3 whitespace-normal break-words line-clamp-4">
                          {testimonial.content}
                        </p>
                        {testimonial.project_url && (
                          <a
                            href={testimonial.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8ac8ff] hover:text-[#f3f6ff] transition-colors text-sm inline-flex items-center mt-auto"
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
                      <div className="ztc-surface info-panel panel-soft p-4 flex flex-col h-full">
                        <div className="flex items-center mb-3">
                          <FiStar className="text-[#ff7f6e] mr-2 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-[#8ac8ff]">
                            {getFirstName(testimonial.name)}
                          </h3>
                        </div>
                        <p className="ztc-muted italic mb-3 whitespace-normal break-words line-clamp-4">
                          {testimonial.content}
                        </p>
                        {testimonial.project_url && (
                          <a
                            href={testimonial.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8ac8ff] hover:text-[#f3f6ff] transition-colors text-sm inline-flex items-center mt-auto"
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
      <footer className="relative z-10 border-t border-[#56b8ff]/30 bg-[#121f3a]/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-sm ztc-muted">
            © {new Date().getFullYear()} Zero to Coder Workshop
          </p>
          <Link 
            href="/slides" 
            className="text-sm text-[#8ac8ff] hover:text-[#f3f6ff] transition-colors flex items-center space-x-1"
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