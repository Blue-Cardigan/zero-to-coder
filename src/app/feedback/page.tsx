'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiCheckCircle, FiStar, FiArrowRight, FiAward, FiCoffee, FiCode, FiTag, FiX, FiPlus } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { validateFeedbackForm, type FeedbackFormData, type ValidationErrors } from '../../lib/validation';
import '../globals.css';
import '../slides/slides.css';

export default function FeedbackPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState<string | null>(null);
  const MAX_TAGS = 50;
  const MAX_TAG_LENGTH = 50;
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    wentWell: '',
    couldImprove: '',
    nextSessionTopics: '',
    projectUrl: '',
    testimonial: ''
  });
  
  // Format tag to ensure consistency
  const formatTag = (tag: string): string => {
    // Trim, lowercase, and only allow alphanumeric characters, spaces and hyphens
    return tag.trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special characters except spaces and hyphens
      .replace(/\s+/g, ' ');     // Replace multiple spaces with a single space
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = validateFeedbackForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setTagError(null); // Clear error when user types
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };
  
  const addTag = () => {
    // Reset error
    setTagError(null);
    
    // Format the tag
    const formattedTag = formatTag(tagInput);
    
    // Validate tag
    if (!formattedTag) {
      setTagError("Tag cannot be empty");
      return;
    }
    
    if (formattedTag.length > MAX_TAG_LENGTH) {
      setTagError(`Tag is too long (max ${MAX_TAG_LENGTH} characters)`);
      return;
    }
    
    if (tags.length >= MAX_TAGS) {
      setTagError(`Maximum ${MAX_TAGS} tags allowed`);
      return;
    }
    
    if (tags.includes(formattedTag)) {
      setTagError("This tag already exists");
      return;
    }
    
    // Add the formatted tag
    setTags(prev => [...prev, formattedTag]);
    setTagInput('');
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
    setTagError(null); // Clear any error when removing a tag
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format all tags one last time before submission to ensure consistency
      const formattedTags = tags.map(formatTag).filter(tag => tag.length > 0);
      
      const { error } = await supabase
        .from('workshop_feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            went_well: formData.wentWell,
            could_improve: formData.couldImprove,
            next_session_topics: formData.nextSessionTopics,
            project_url: formData.projectUrl,
            testimonial: formData.testimonial,
            tags: formattedTags.length > 0 ? formattedTags : null
          }
        ]);
        
      if (error) throw error;
      
      setIsSubmitted(true);
      router.push('/feedback/success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0b1222] text-[#f3f6ff] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(86,184,255,0.12),rgba(255,127,110,0.08)),radial-gradient(circle_at_20%_10%,rgba(86,184,255,0.2),transparent_60%),#0b1222]"></div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(135,145,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(135,145,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-35"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full ztc-surface hero-panel panel-cut p-8 relative z-10"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-[#56b8ff]/20 rounded-full border border-[#56b8ff]/30 flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-[#56b8ff] text-4xl" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 ztc-heading">Thank You!</h1>
            <p className="ztc-muted mb-4">Your feedback has been submitted successfully. I appreciate your time!</p>
            <p className="text-sm text-[#8ac8ff]">Redirecting you to thank you page...</p>
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Calculate form progress percentage
  const requiredFields = ['wentWell', 'couldImprove'];
  const completedRequired = requiredFields.filter(field => formData[field as keyof FeedbackFormData]).length;
  const progress = Math.round((completedRequired / requiredFields.length) * 100);
  
  return (
    <div className="min-h-screen bg-[#0b1222] text-[#f3f6ff] overflow-hidden relative">
      <div className="absolute pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(86,184,255,0.14),rgba(255,127,110,0.1)),radial-gradient(circle_at_20%_10%,rgba(86,184,255,0.22),transparent_60%),#0b1222]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(135,145,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(135,145,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40"></div>
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#56b8ff]/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        {/* Header with logo placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center mb-8"
        >
          <p className="type-kicker mb-3">Workshop retrospectives</p>
          <div className="inline-block p-2 mb-4">
            <h1 className="text-4xl font-bold ztc-heading">
              Workshop Feedback
            </h1>
          </div>
          <p className="ztc-muted max-w-xl mx-auto">
            Make me better at this! Share your experience :)
          </p>
        </motion.div>
        
        {/* Main content area with form and sidebar */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 ztc-surface hero-panel panel-cut p-6 md:p-8"
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[#8ac8ff] mb-1">
                <span>Form Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full h-2 bg-[#121f3a] rounded-full overflow-hidden border border-[#56b8ff]/20">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#56b8ff] to-[#ff7f6e]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      y: errors.name ? [0, -2, 0] : 0,
                      x: errors.name ? [0, 2, -2, 0] : 0
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                      <FiUser className={`mr-2 ${activeField === 'name' ? 'text-[#56b8ff]' : ''}`} />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required={false}
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className={`w-full bg-[#0f1830]/75 border ${errors.name ? 'border-red-500' : activeField === 'name' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="relative"
                    animate={{ 
                      y: errors.email ? [0, -2, 0] : 0,
                      x: errors.email ? [0, 2, -2, 0] : 0
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                      <FiMail className={`mr-2 ${activeField === 'email' ? 'text-[#56b8ff]' : ''}`} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required={false}
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={`w-full bg-[#0f1830]/75 border ${errors.email ? 'border-red-500' : activeField === 'email' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
                    )}
                  </motion.div>
                </div>
                
                <motion.div 
                  className="relative"
                  animate={{ 
                    y: errors.wentWell ? [0, -2, 0] : 0,
                    x: errors.wentWell ? [0, 2, -2, 0] : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                    <FiStar className={`mr-2 text-[#ff7f6e] ${activeField === 'wentWell' ? 'soft-glow' : ''}`} />
                    What went well?
                  </label>
                  <textarea
                    name="wentWell"
                    required
                    value={formData.wentWell}
                    onChange={handleChange}
                    onFocus={() => handleFocus('wentWell')}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full bg-[#0f1830]/75 border ${errors.wentWell ? 'border-red-500' : activeField === 'wentWell' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                    placeholder="Share what you enjoyed about the workshop..."
                  />
                  {errors.wentWell && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.wentWell}</p>
                  )}
                </motion.div>
                
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                    <FiStar className={`mr-2 text-[#56b8ff] ${activeField === 'couldImprove' ? 'soft-glow' : ''}`} />
                    What could have been better?
                  </label>
                  <textarea
                    name="couldImprove"
                    required={true}
                    value={formData.couldImprove}
                    onChange={handleChange}
                    onFocus={() => handleFocus('couldImprove')}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full bg-[#0f1830]/75 border ${errors.couldImprove ? 'border-red-500' : activeField === 'couldImprove' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                    placeholder="Any suggestions for improvement..."
                  />
                  {errors.couldImprove && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.couldImprove}</p>
                  )}
                </div>
                
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                    <FiStar className={`mr-2 text-[#7d88ff] ${activeField === 'nextSessionTopics' ? 'soft-glow' : ''}`} />
                    What would make you excited about Zero-to-Coder&nbsp;<strong>Part 2</strong>?
                  </label>
                  <textarea
                    name="nextSessionTopics"
                    value={formData.nextSessionTopics}
                    onChange={handleChange}
                    onFocus={() => handleFocus('nextSessionTopics')}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full bg-[#0f1830]/75 border ${errors.nextSessionTopics ? 'border-red-500' : activeField === 'nextSessionTopics' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                    placeholder="Topics or skills you'd like to explore in a follow-up session..."
                  />
                  {errors.nextSessionTopics && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.nextSessionTopics}</p>
                  )}
                </div>
                
                <motion.div 
                  className="relative"
                  animate={{ 
                    y: errors.projectUrl ? [0, -2, 0] : 0,
                    x: errors.projectUrl ? [0, 2, -2, 0] : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                    <FiStar className={`mr-2 text-[#ff7f6e] ${activeField === 'testimonial' ? 'soft-glow' : ''}`} />
                    Testimonial for the website
                  </label>
                  <textarea
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleChange}
                    onFocus={() => handleFocus('testimonial')}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full bg-[#0f1830]/75 border ${activeField === 'testimonial' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                    placeholder="Share your experience that I can feature on my website..."
                  />
                </motion.div>
                
                {/* Tag your experience section */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-[#8ac8ff] mb-1">
                    <FiTag className={`mr-2 text-[#56b8ff] ${activeField === 'tags' ? 'soft-glow' : ''}`} />
                    Tag your experience (Then look at the last slide!)
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center bg-[#0f1830]/90 text-[#8ac8ff] text-xs rounded-full px-3 py-1 border border-[#56b8ff]/35"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-[#8ac8ff] hover:text-[#f3f6ff] focus:outline-none"
                        >
                          <FiX size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      onFocus={() => handleFocus('tags')}
                      onBlur={handleBlur}
                      className={`flex-grow bg-[#0f1830]/75 border ${tagError ? 'border-red-500' : activeField === 'tags' ? 'border-[#56b8ff]' : 'border-[#56b8ff]/30'} focus:border-[#56b8ff] rounded-sm rounded-r-none px-4 py-3 text-[#f3f6ff] placeholder-[#8ac8ff]/60 outline-none transition duration-200`}
                      placeholder="'awe-inspiring', '𝓵𝓲𝓯𝓮-𝓬𝓱𝓪𝓷𝓰𝓲𝓷𝓰', 'g̴̢͓̬͖̬͔̤̼͑̐̉͑̐̀̀̈́͆͊̃̚͝͝l̵̡̙̲̭͛̌͋̀̀ͅi̶̱̮̊̿͒̄͊͋͒̃̾̋̏̏̕͠t̴̡̢̜͔̣̫̼̮̱̮̲̥̀̿̄̿͗͘̕͘͜͝͝c̶̨̧̟̭̺͔̳̻̺̫̹̐̊̏̄͋̅̓̍̓̄̅̄͜h̵̲̎́̾̂̑̿͊͠y̵͓̦̒̚'..."
                      maxLength={MAX_TAG_LENGTH}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={tags.length >= MAX_TAGS}
                      className={`${tags.length >= MAX_TAGS ? 'bg-gray-600/60 border-gray-500/50' : 'bg-[#1f355f] hover:bg-[#2a487d] border-[#56b8ff]/50'} text-white px-4 rounded-r-sm border transition-colors duration-200 flex items-center justify-center`}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  {tagError && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{tagError}</p>
                  )}
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#56b8ff]/70 to-[#1f355f] hover:from-[#56b8ff]/85 hover:to-[#2a487d] text-white font-medium py-3 px-4 rounded-sm border border-[#56b8ff]/40 flex items-center justify-center transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <FiSend className="mr-2" /> Submit Feedback
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Sidebar with additional info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 space-y-6"
          >
            {/* About the workshop card */}
            <div className="ztc-surface info-panel panel-sharp p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiAward className="text-[#ff7f6e] mr-2" /> 
                <span className="text-[#8ac8ff]">About Z2C</span>
              </h3>
              <p className="ztc-muted mb-4">
                My workshop is designed to help beginners transform into confident coders from the top-down, starting with results and working backwards.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-[#56b8ff]/15 p-2 rounded-sm mr-3 border border-[#56b8ff]/35">
                    <FiCode className="text-[#8ac8ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#8ac8ff]">Practical Skills</h4>
                    <p className="text-xs ztc-muted">Learn by building real projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#ff7f6e]/15 p-2 rounded-sm mr-3 border border-[#ff7f6e]/35">
                    <FiCoffee className="text-[#ff7f6e]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#8ac8ff]">Supportive Community</h4>
                    <p className="text-xs ztc-muted">Connect with like-minded learners</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials preview */}
            <div className="ztc-surface info-panel panel-soft p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiStar className="text-[#ff7f6e] mr-2" /> 
                <span className="text-[#8ac8ff]">What Others Say</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[#0f1830]/75 rounded-sm p-4 border border-[#56b8ff]/25">
                  <p className="text-sm ztc-muted italic mb-2">&quot;Jethro&apos;s workshop and introduction to tools really helped me reduce the friction and frustration I&apos;ve always had with building anything technical with code. The use of AI tools for generating leads for problem solving makes the process much more… solvable.&quot;</p>
                  <p className="text-xs text-[#8ac8ff] font-medium">- Sarah K.</p>
                </div>
                
                <div className="bg-[#0f1830]/75 rounded-sm p-4 border border-[#ff7f6e]/25">
                  <p className="text-sm ztc-muted italic mb-2">&quot;Really accessible session, felt very well supported to learn how to code using AI. Very impressed.&quot;</p>
                  <p className="text-xs text-[#8ac8ff] font-medium">- Alastair, who made <a href="https://greater-manchester-assembly-helper.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#56b8ff] hover:text-[#f3f6ff] transition-colors">Greater Manchester Assembly Helper</a></p>
                </div>
              </div>
            </div>
            
            {/* Reminder note */}
            <div className="ztc-surface-strong cta-panel panel-cut p-5">
              <div className="flex items-start">
                <div className="shrink-0">
                  <FiArrowRight className="text-[#ff7f6e] text-xl mr-3" />
                </div>
                <p className="text-sm ztc-muted">
                  Your feedback helps me improve my workshops for future coders. Thank you for taking the time to share your thoughts!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-6xl mt-8 pt-4 border-t border-[#56b8ff]/25 text-center"
        >
          <p className="text-xs ztc-muted">
            © {new Date().getFullYear()} Zero to Coder Workshop • All Rights Reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
} 