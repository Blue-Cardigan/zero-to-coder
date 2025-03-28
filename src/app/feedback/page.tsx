'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiLink, FiCheckCircle, FiStar, FiArrowRight, FiAward, FiCoffee, FiCode, FiTag, FiX, FiPlus } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { validateFeedbackForm, type FeedbackFormData, type ValidationErrors } from '../../lib/validation';
import '../globals.css';

export default function FeedbackPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    wentWell: '',
    couldImprove: '',
    projectUrl: '',
    testimonial: ''
  });
  
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
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('workshop_feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            went_well: formData.wentWell,
            could_improve: formData.couldImprove,
            project_url: formData.projectUrl,
            testimonial: formData.testimonial,
            tags: tags.length > 0 ? tags : null
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-indigo-900/60 rounded-xl p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-green-400 text-4xl drop-shadow-glow" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Thank You!</h1>
            <p className="text-blue-200 mb-4">Your feedback has been submitted successfully. We appreciate your time!</p>
            <p className="text-sm text-blue-300">Redirecting you to thank you page...</p>
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Enhanced animated background */}
      <div className="absolute opacity-60 pointer-events-none overflow-hidden w-full h-full top-0 left-0">
        <div className="animate-blob animation-delay-2000 absolute top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob absolute -bottom-40 left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="animate-blob animation-delay-2000 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        {/* Header with logo placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center mb-8"
        >
          <div className="inline-block p-2 bg-white/10 rounded-xl backdrop-blur-sm mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Workshop Feedback
            </h1>
          </div>
          <p className="text-blue-200 max-w-xl mx-auto">
            Make me better at this! Share your experience :)
          </p>
        </motion.div>
        
        {/* Main content area with form and sidebar */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 bg-indigo-900/60 rounded-xl p-6 md:p-8 backdrop-blur-lg border border-blue-500/50 shadow-xl"
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-blue-300 mb-1">
                <span>Form Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
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
                    <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                      <FiUser className={`mr-2 ${activeField === 'name' ? 'text-blue-400' : ''}`} />
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
                      className={`w-full bg-blue-950/40 border ${errors.name ? 'border-red-500' : activeField === 'name' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
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
                    <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                      <FiMail className={`mr-2 ${activeField === 'email' ? 'text-blue-400' : ''}`} />
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
                      className={`w-full bg-blue-950/40 border ${errors.email ? 'border-red-500' : activeField === 'email' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
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
                  <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                    <FiStar className={`mr-2 text-yellow-400 ${activeField === 'wentWell' ? 'drop-shadow-glow' : ''}`} />
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
                    className={`w-full bg-blue-950/40 border ${errors.wentWell ? 'border-red-500' : activeField === 'wentWell' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
                    placeholder="Share what you enjoyed about the workshop..."
                  />
                  {errors.wentWell && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.wentWell}</p>
                  )}
                </motion.div>
                
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                    <FiStar className={`mr-2 text-blue-400 ${activeField === 'couldImprove' ? 'drop-shadow-glow' : ''}`} />
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
                    className={`w-full bg-blue-950/40 border ${errors.couldImprove ? 'border-red-500' : activeField === 'couldImprove' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
                    placeholder="Any suggestions for improvement..."
                  />
                  {errors.couldImprove && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.couldImprove}</p>
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
                  <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                    <FiLink className={`mr-2 ${activeField === 'projectUrl' ? 'text-blue-400' : ''}`} />
                    Link to your project
                  </label>
                  <input
                    type="url"
                    name="projectUrl"
                    required={false}
                    value={formData.projectUrl}
                    onChange={handleChange}
                    onFocus={() => handleFocus('projectUrl')}
                    onBlur={handleBlur}
                    className={`w-full bg-blue-950/40 border ${errors.projectUrl ? 'border-red-500' : activeField === 'projectUrl' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
                    placeholder="https://your-project.vercel.app"
                  />
                  {errors.projectUrl && (
                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.projectUrl}</p>
                  )}
                </motion.div>
                
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                    <FiStar className={`mr-2 text-purple-400 ${activeField === 'testimonial' ? 'drop-shadow-glow' : ''}`} />
                    Testimonial for our website
                  </label>
                  <textarea
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleChange}
                    onFocus={() => handleFocus('testimonial')}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full bg-blue-950/40 border ${activeField === 'testimonial' ? 'border-blue-400' : 'border-blue-700/50'} focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
                    placeholder="Share your experience that we can feature on our website..."
                  />
                </div>
                
                {/* Tag your experience section */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-blue-300 mb-1">
                    <FiTag className={`mr-2 text-teal-400 ${activeField === 'tags' ? 'drop-shadow-glow' : ''}`} />
                    Tag your experience (optional, see text appear in the slides)
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center bg-teal-900/40 text-teal-300 text-xs rounded-full px-3 py-1 border border-teal-500/30"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-teal-300 hover:text-teal-200 focus:outline-none"
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
                      className={`flex-grow bg-blue-950/40 border ${activeField === 'tags' ? 'border-teal-400' : 'border-blue-700/50'} focus:border-teal-500 rounded-lg rounded-r-none px-4 py-3 text-white placeholder-blue-400/60 outline-none transition duration-200`}
                      placeholder="Add tags like 'helpful', 'inspiring', 'practical'..."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-teal-600/60 hover:bg-teal-600/80 text-white px-4 rounded-r-lg border border-teal-500/50 transition-colors duration-200 flex items-center justify-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <p className="text-xs text-blue-300 mt-1 ml-1">
                    Press Enter or click the + button to add a tag
                  </p>
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
            <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiAward className="text-yellow-400 mr-2 drop-shadow-glow" /> 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">About Zero to Coder</span>
              </h3>
              <p className="text-blue-200 mb-4">
                My workshop is designed to help beginners transform into confident coders from the top-down, starting with results and working backwards.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                    <FiCode className="text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-300">Practical Skills</h4>
                    <p className="text-xs text-blue-200/80">Learn by building real projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                    <FiCoffee className="text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-300">Supportive Community</h4>
                    <p className="text-xs text-blue-200/80">Connect with like-minded learners</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials preview */}
            <div className="bg-indigo-900/60 rounded-xl p-6 backdrop-blur-lg border border-blue-500/50 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <FiStar className="text-yellow-400 mr-2 drop-shadow-glow" /> 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">What Others Say</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/30">
                  <p className="text-sm text-blue-200 italic mb-2">&quot;Jethro&apos;s workshop and introduction to tools really helped me reduce the friction and frustration I&apos;ve always had with building anything technical with code. The use of AI tools for generating leads for problem solving makes the process much more… solvable.&quot;</p>
                  <p className="text-xs text-blue-300 font-medium">- Sarah K.</p>
                </div>
                
                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                  <p className="text-sm text-blue-200 italic mb-2">&quot;Really accessible session, felt very well supported to learn how to code using AI. Very impressed.&quot;</p>
                  <p className="text-xs text-blue-300 font-medium">- Alastair, who made <a href="https://greater-manchester-assembly-helper.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Greater Manchester Assembly Helper</a></p>
                </div>
              </div>
            </div>
            
            {/* Reminder note */}
            <div className="bg-gradient-to-br from-blue-900/70 to-purple-900/70 rounded-xl p-5 backdrop-blur-lg border border-blue-400/30 shadow-xl">
              <div className="flex items-start">
                <div className="shrink-0">
                  <FiArrowRight className="text-yellow-400 text-xl mr-3 drop-shadow-glow" />
                </div>
                <p className="text-sm text-blue-100">
                  Your feedback helps us improve our workshops for future coders. Thank you for taking the time to share your thoughts!
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
          className="w-full max-w-6xl mt-8 pt-4 border-t border-blue-800/30 text-center"
        >
          <p className="text-xs text-blue-300/70">
            © {new Date().getFullYear()} Zero to Coder Workshop • All Rights Reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
} 