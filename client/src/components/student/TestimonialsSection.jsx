import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-4 sm:px-8 md:px-0 max-w-7xl mx-auto">
      <div className="text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-800">Testimonials</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-3xl mx-auto md:mx-0">
          Hear from our learners as they share their journeys of transformation, success, and how our 
          platform has made a difference in their lives
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-10 sm:mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-200 p-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-50">
              <img
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-base sm:text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-4 sm:h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-4 text-sm sm:text-base">
                {testimonial.feedback.length > 120 
                  ? `${testimonial.feedback.substring(0, 120)}...`
                  : testimonial.feedback}
              </p>
            </div>
            <a href="#" className="text-blue-500 text-sm hover:text-blue-600 px-5 inline-block mt-2">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;