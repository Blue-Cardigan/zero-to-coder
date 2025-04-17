export type FeedbackFormData = {
  name: string;
  email: string;
  wentWell: string;
  couldImprove: string;
  nextSessionTopics: string;
  projectUrl: string;
  testimonial: string;
  tags?: string[]; // Optional array of tag strings
};

export type ValidationErrors = Record<string, string>;

export function validateFeedbackForm(data: FeedbackFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  // Name validation is optional now
  if (data.name && data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  // Email validation is optional now
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // "What went well" validation
  if (!data.wentWell.trim()) {
    errors.wentWell = 'Please share what went well';
  }
  
  // "Could improve" validation is now required
  if (!data.couldImprove.trim()) {
    errors.couldImprove = 'Please share what could be improved';
  }
  
  // Project URL validation is optional now 
  if (data.projectUrl && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(data.projectUrl)) {
    errors.projectUrl = 'Please enter a valid URL';
  }
  
  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
} 