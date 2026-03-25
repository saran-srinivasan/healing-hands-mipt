"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Testimonial } from "@/lib/testimonials";
import { TestimonialCard } from "../ui/TestimonialCard";
import { Button } from "../ui/Button";
import { AddReviewModal } from "../ui/AddReviewModal";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // We duplicate enough times so the content is wide enough for seamless loop
  const repeatCount = testimonials.length <= 3 ? 4 : 2;
  const displayTestimonials = Array.from({ length: repeatCount }, () => testimonials).flat();

  // Check scroll boundaries for button states
  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
  }, []);

  // Auto-scroll animation with seamless looping
  useEffect(() => {
    const container = scrollRef.current;
    const inner = innerRef.current;
    if (!container || !inner || testimonials.length <= 1) return;

    let animationId: number;
    const scrollSpeed = 0.5; // pixels per frame

    // Calculate width of one full set of testimonials
    // Each set is (total children / repeatCount) items
    const itemsPerSet = testimonials.length;
    const totalItems = displayTestimonials.length;
    const oneSetWidth = (inner.scrollWidth / totalItems) * itemsPerSet;

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        // When we've scrolled past one full set, jump back seamlessly
        if (container.scrollLeft >= oneSetWidth) {
          container.scrollLeft -= oneSetWidth;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, testimonials.length]);

  // Update button states on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  // Manual scroll by one card width
  const scrollByCard = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 380 + 24; // card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--color-primary-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-[var(--color-neutral-500)] mb-6 text-lg">Be the first to share your experience!</p>
        <Button onClick={() => setIsModalOpen(true)}>Leave a Review</Button>
        <AddReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  return (
    <div>
      {/* Auto-scrolling Marquee with Nav Buttons */}
      <div
        className="relative -mx-4 md:-mx-8 lg:-mx-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[var(--color-primary-50)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[var(--color-primary-50)] to-transparent z-10 pointer-events-none" />

        {/* Left nav button */}
        <button
          onClick={() => scrollByCard("left")}
          aria-label="Previous testimonial"
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--color-neutral-200)] shadow-md flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-110 hover:border-[var(--color-primary-300)] ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg className="w-5 h-5 text-[var(--color-neutral-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right nav button */}
        <button
          onClick={() => scrollByCard("right")}
          aria-label="Next testimonial"
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--color-neutral-200)] shadow-md flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-110 hover:border-[var(--color-primary-300)] ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg className="w-5 h-5 text-[var(--color-neutral-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-4 px-4 md:px-8 lg:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={innerRef} className="flex gap-6">
            {displayTestimonials.map((testimonial, i) => (
              <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Review CTA */}
      <div className="flex justify-center mt-10">
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="px-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Share Your Experience
        </Button>
      </div>

      <AddReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
