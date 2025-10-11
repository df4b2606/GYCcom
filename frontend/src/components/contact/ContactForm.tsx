"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log("Email sent successfully:", result);

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      setSubmitStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 dark:bg-white/5 rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-sm">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-white mb-2 font-mono">
            💼 Let&apos;s Connect
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-purple-800 dark:text-white mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.name
                    ? "border-red-500 dark:border-red-400"
                    : "border-purple-200 dark:border-white/30"
                } bg-white/30 dark:bg-white/5 text-purple-900 dark:text-white placeholder-purple-400 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors backdrop-blur-sm`}
                placeholder="Your name"
              />
              {validationErrors.name && (
                <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-red-700 dark:text-red-200 font-medium text-base">
                      {validationErrors.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-purple-800 dark:text-white mb-2"
              >
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-purple-200 dark:border-white/30"
                } bg-white/30 dark:bg-white/5 text-purple-900 dark:text-white placeholder-purple-400 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors backdrop-blur-sm`}
                placeholder="Your company email"
              />
              {validationErrors.email && (
                <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-red-700 dark:text-red-200 font-medium text-base">
                      {validationErrors.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-purple-800 dark:text-white mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.subject
                  ? "border-red-500 dark:border-red-400"
                  : "border-purple-200 dark:border-white/30"
              } bg-white/40 dark:bg-white/10 text-purple-900 dark:text-white placeholder-purple-400 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
              placeholder="Job opportunity, collaboration, etc."
            />
            {validationErrors.subject && (
              <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-700 dark:text-red-200 font-medium text-base">
                    {validationErrors.subject}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-purple-800 dark:text-white mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.message
                  ? "border-red-500 dark:border-red-400"
                  : "border-purple-200 dark:border-white/30"
              } bg-white/40 dark:bg-white/10 text-purple-900 dark:text-white placeholder-purple-400 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none`}
              placeholder="Tell me about your company, the role, and how I can contribute to your team's success!"
            />
            {validationErrors.message && (
              <div className="mt-2 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-700 dark:text-red-200 font-semibold text-lg">
                    {validationErrors.message}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                !isFormValid || isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-lg">
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-700 dark:text-green-200 font-medium">
                  Thank you for reaching out! I&apos;ll get back to you within
                  24 hours. 🎉
                </span>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="text-center p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg">
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-red-700 dark:text-red-200 font-medium">
                  Oops! Something went wrong. Please try again or use the direct
                  contact options below.
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
