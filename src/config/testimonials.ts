export interface TestimonialConfig {
  blacklist: {
    id: number;
    column: string;
  }[];
  whitelist: {
    id: string;
    column: string;
  }[];
}

export const testimonialConfig: TestimonialConfig = {
  blacklist: [
    { id: 26, column: "testimonial" }
  ],
  whitelist: [
    // Example: { id: "456", column: "went_well" }
  ]
}; 