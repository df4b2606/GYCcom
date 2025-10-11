"use client";

import { useEffect, useState } from "react";

// Footer Component
const Footer = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    // Get current Seattle time
    const updateTime = () => {
      const now = new Date();

      // Convert to Seattle time (PST/PDT)
      const seattleTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      );

      const timeString = seattleTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);

      // Set timezone to Seattle
      setTimezone("PST/PDT");
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-black/80 dark:bg-black/90 backdrop-blur-sm text-white py-12 mt-0 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About GYC
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Xiaohongshu (RedNote)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yuechenguo59/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/df4b2606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: davidguo59@outlook.com</li>
              <li>Phone: +1 206 849 8203</li>
              <li>Seattle, USA</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">GYC Local Time</h4>
            <div className="text-sm text-gray-300">
              <div className="font-mono text-lg text-white">{currentTime}</div>
              <div className="text-xs opacity-75">({timezone})</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 GYC.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
