"use client";

import { useState } from "react";
import { Button } from "./Button";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddReviewModal({ isOpen, onClose }: AddReviewModalProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, review }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onClose();
        setName("");
        setRating(5);
        setReview("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Leave a Review</h2>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your review has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-shadow"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-transform hover:scale-110 focus:outline-none ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                id="review"
                required
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-shadow resize-none"
                placeholder="Share your experience with Healing Hands..."
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm">Failed to submit review. Please try again.</p>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full justify-center"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
