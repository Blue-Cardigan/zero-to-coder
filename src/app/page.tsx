'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCoffee, FiAward, FiMapPin, FiCalendar, FiStar, FiArrowRight } from 'react-icons/fi';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import events from '../data/events.json';
import { testimonialConfig } from '../config/testimonials';
import Link from 'next/link';
import Script from 'next/script';

interface Testimonial {
  id: string;
  name: string;
  testimonial: string;
  project_url?: string;
  went_well?: string;
  could_improve?: string;
}

interface Event {
  date: Date;
  code: string;
  formattedDate: string;
}

export default function HomePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('workshop_feedback')
          .select('*');

        if (error) throw error;

        // Filter testimonials based on whitelist/blacklist from config
        const filteredData = data?.filter(item => {
          // Check if item is blacklisted
          const isBlacklisted = testimonialConfig.blacklist.some(
            blacklistItem => blacklistItem.id === item.id && blacklistItem.column === 'testimonial'
          );
          if (isBlacklisted) return false;

          // Check if item has a whitelisted value
          const isWhitelisted = testimonialConfig.whitelist.some(
            whitelist => whitelist.id === item.id && item[whitelist.column]
          );

          // Include if whitelisted or has a testimonial
          return isWhitelisted || (item.testimonial && item.testimonial.trim() !== '');
        }) || [];

        setTestimonials(filteredData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []); // Remove blacklist from dependencies since we're not using it

  useEffect(() => {
    // Process events once on component mount
    const processEvents = () => {
      const sortedEvents: Event[] = Object.entries(events)
        .map(([dateKey, code]) => {
          const [day, month, year] = dateKey.split('_').map(Number);
          const date = new Date(year, month - 1, day);
          
          const formattedDate = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }).format(date);

          return {
            date,
            code,
            formattedDate
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      const now = new Date();
      const future = sortedEvents.filter(event => event.date > now);
      const past = sortedEvents.filter(event => event.date <= now);
      
      // Set next event (if any)
      setNextEvent(future[0] || null);
      
      // Duplicate past events if needed to ensure at least 5 items
      let processedPastEvents = [...past];
      while (processedPastEvents.length < 5) {
        processedPastEvents = [...processedPastEvents, ...past];
      }
      setPastEvents(processedPastEvents);
    };

    processEvents();
  }, []); // Empty dependency array since events is imported statically

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
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-indigo-900/60 backdrop-blur-lg border-b border-blue-500/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Z2C
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://lu.ma/event/evt-kGkALdzPondGbvj"
              className="luma-checkout--button bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              data-luma-action="checkout"
              data-luma-event-id="evt-kGkALdzPondGbvj"
            >
              Register for the next one
            </a>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Zero to Coder
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Transform from beginner to confident coder in London&apos;s most innovative coding workshops
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <img src="/images/me3.png" alt="Jethro" className="w-20 h-20 rounded-full transform scale-x-[-1]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-300">About Jethro</h2>
                  <p className="text-blue-200">Your Coding Mentor</p>
                </div>
              </div>
              
              <p className="text-blue-200 mb-6">
                I&apos;m passionate about making coding accessible to everyone. With experience in software development and education, I&apos;ve designed a workshop that takes you from zero to building real projects, using modern tools and AI assistance to make the journey smoother.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-blue-200">
                  <FiMapPin className="text-blue-400 mr-3" />
                  <span>Shoreditch, London</span>
                </div>
                <div className="flex items-center text-blue-200">
                  <FiCalendar className="text-blue-400 mr-3" />
                  <span>Regular workshops throughout the year</span>
                </div>
              </div>
            </motion.div>

            {/* Workshop Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-blue-300 mb-6">Workshop Highlights</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <FiCode className="text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Hands-on Learning</h3>
                    <p className="text-blue-200">Build real projects from day one, using modern tools and frameworks.</p>
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
                  <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                    <FiAward className="text-indigo-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">AI-Powered Learning</h3>
                    <p className="text-blue-200">Leverage AI tools to accelerate your learning and problem-solving.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              What People Say
            </h2>
            
            <div className="bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                </div>
              ) : (
                <div className="relative">
                  <div 
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-blue-900/30 pb-4"
                  >
                    <div className="flex animate-scroll-x">
                      {/* First set of testimonials */}
                      {testimonials.map((testimonial) => (
                        <div
                          key={`${testimonial.id}-1`}
                          className="flex-none mx-4 w-[400px] first:ml-0"
                        >
                          <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-700/30 h-full flex flex-col">
                            <div className="flex items-center mb-4">
                              <FiStar className="text-yellow-400 mr-2 flex-shrink-0" />
                              <h3 className="text-lg font-semibold text-blue-300">
                                {getFirstName(testimonial.name)}
                              </h3>
                            </div>
                            <p className="text-blue-200 italic mb-4 whitespace-normal break-words">
                              {testimonial.testimonial}
                            </p>
                            {testimonial.project_url && (
                              <a
                                href={testimonial.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center mt-4"
                              >
                                View their project <FiArrowRight className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* Duplicate set for seamless scrolling */}
                      {testimonials.map((testimonial) => (
                        <div
                          key={`${testimonial.id}-2`}
                          className="flex-none mx-4 w-[400px]"
                        >
                          <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-700/30 h-full flex flex-col">
                            <div className="flex items-center mb-4">
                              <FiStar className="text-yellow-400 mr-2 flex-shrink-0" />
                              <h3 className="text-lg font-semibold text-blue-300">
                                {getFirstName(testimonial.name)}
                              </h3>
                            </div>
                            <p className="text-blue-200 italic mb-4 whitespace-normal break-words">
                              {testimonial.testimonial}
                            </p>
                            {testimonial.project_url && (
                              <a
                                href={testimonial.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center mt-4"
                              >
                                View their project <FiArrowRight className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-4 w-32 bg-gradient-to-r from-indigo-900/60 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-4 w-32 bg-gradient-to-l from-indigo-900/60 to-transparent pointer-events-none"></div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Workshops Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Workshops
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Upcoming Workshop */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Next Workshop</h3>
                <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl h-full">
                  {nextEvent ? (
                    <div className="relative">
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                        Upcoming
                      </div>
                      <div className="text-lg text-blue-300 font-medium mb-4">
                        {nextEvent.formattedDate}
                      </div>
                      <div className="relative">
                        <iframe
                          src={`https://lu.ma/embed/event/${nextEvent.code}/simple`}
                          width="100%"
                          height="600"
                          frameBorder="0"
                          style={{ 
                            border: '1px solid #bfcbda55',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                          }}
                          allowFullScreen
                          aria-hidden="false"
                          tabIndex={0}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-blue-300">
                      No upcoming workshops scheduled
                    </div>
                  )}
                </div>
              </div>

              {/* Past Workshops */}
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Past Workshops</h3>
                <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {pastEvents.slice(0, 5).map((event, index) => (
                      <div
                        key={`${event.code}-${index}`}
                        className="bg-indigo-900/30 rounded-lg p-4 border border-blue-700/30"
                      >
                        <div className="text-sm text-blue-400 font-medium mb-2">
                          {event.formattedDate}
                        </div>
                        <iframe
                          src={`https://lu.ma/embed/event/${event.code}/simple`}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          style={{ 
                            border: '1px solid #bfcbda11',
                            borderRadius: '4px',
                            opacity: '0.7',
                          }}
                          allowFullScreen
                          aria-hidden="false"
                          tabIndex={0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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