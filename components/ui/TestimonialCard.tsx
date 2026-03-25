"use client";

import { useState, useMemo } from "react";
import { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const CHAR_LIMIT = 150; // characters before we truncate

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [showModal, setShowModal] = useState(false);


  const isTruncated = testimonial.review.length > CHAR_LIMIT;

  // Truncate at the last full word before CHAR_LIMIT
  const truncatedText = useMemo(() => {
    if (!isTruncated) return testimonial.review;
    const sliced = testimonial.review.slice(0, CHAR_LIMIT);
    const lastSpace = sliced.lastIndexOf(" ");
    return lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
  }, [testimonial.review, isTruncated]);

  return (
    <>
      <div className="flex flex-col w-[340px] md:w-[380px] h-[280px] flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl border border-[var(--color-neutral-200)] p-7 transition-all duration-300 hover:shadow-lg hover:border-[var(--color-primary-200)] group">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-[18px] h-[18px] ${i < testimonial.rating
                  ? "text-[var(--color-accent-400)]"
                  : "text-[var(--color-neutral-200)]"
                }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Review Text — inline "Read more" */}
        <blockquote className="flex-grow overflow-hidden mb-5">
          <p className="text-[var(--color-neutral-700)] text-[15px] leading-relaxed">
            &ldquo;{truncatedText}
            {isTruncated && (
              <>
                {"… "}
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] font-medium hover:underline transition-colors cursor-pointer inline"
                >
                  Read&nbsp;more
                </button>
              </>
            )}
            {!isTruncated && <>&rdquo;</>}
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-neutral-100)] mt-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-[var(--color-neutral-900)] text-sm truncate">
              {testimonial.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* Google icon */}
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs text-[var(--color-neutral-400)]">
                {testimonial.date || "Google Review"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Review Modal — max-height with scroll */}
      {showModal && (
        <div
          className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-8 flex-1">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating
                        ? "text-[var(--color-accent-400)]"
                        : "text-[var(--color-neutral-200)]"
                      }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Full Review */}
              <blockquote className="mb-6">
                <p className="text-[var(--color-neutral-700)] text-base leading-relaxed">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[var(--color-neutral-100)]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-neutral-900)] text-sm">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-xs text-[var(--color-neutral-400)]">
                      {testimonial.date || "Google Review"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
