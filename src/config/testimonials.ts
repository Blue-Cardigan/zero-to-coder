export interface TestimonialConfig {
  blacklist: {
    id: number;
    column: string;
  }[];
  whitelist: {
    id: number;
    column: string;
  }[];
}

export const testimonialConfig: TestimonialConfig = {
  blacklist: [
    { id: 26, column: "testimonial" }
  ],
  whitelist: [
    { id: 21, column: "went_well" },
    { id: 22, column: "went_well" },
    { id: 26, column: "went_well" }
  ]
}; 