"use client";

import { useState } from "react";

interface SocialLinksPopupProps {
  linkedinUrl?: string;
  githubUrl?: string;
  emailAddress?: string;
  resumeFileName?: string;
}

export default function SocialLinksPopup({
  linkedinUrl = "https://linkedin.com/in/yourprofile",
  githubUrl = "https://github.com/yourusername",
  emailAddress = "your.email@example.com",
  resumeFileName = "resume1003.pdf",
}: SocialLinksPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Handle resume download
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = `/${resumeFileName}`;
    link.download = resumeFileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle email click: smooth-scroll to "Let's Connect" section if present
  // Falls back to opening the default mail app if the target is not found
  const handleEmailClick = () => {
    // Prefer an element with id "contact"; adjust here if the section id changes
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Fallback to mailto if no target section exists on the page
    window.location.href = `mailto:${emailAddress}`;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Show button when hidden */}
        <button
          onClick={() => setIsVisible(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Show social links"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Social links - always visible */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/30 dark:border-white/20 relative">
        {/* Hide button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Hide social links"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-1.5 sm:p-2 grid grid-cols-2 gap-1.5 sm:gap-2">
          {/* Resume Download */}
          <button
            onClick={handleResumeDownload}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="Download Resume"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Document outline */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              {/* CV text */}
              <text
                x="12"
                y="11"
                textAnchor="middle"
                className="text-xs font-bold fill-current"
                fontSize="8"
              >
                CV
              </text>
            </svg>
          </button>

          {/* Email action: scroll to Let's Connect / Contact section */}
          <button
            onClick={handleEmailClick}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="Let's Connect"
            aria-label="Jump to Let's Connect section"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* LinkedIn Link */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* GitHub Link */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
            title="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
