"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AboutMeButton from "@/components/button/AboutMeButton";

export interface PersonalInfoCardProps {
  className?: string;
}

const PersonalInfoCard = ({ className = "" }: PersonalInfoCardProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    // 获取当前时间和时区
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);

      // 获取时区信息
      const timezoneOffset = now.getTimezoneOffset();
      const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60));
      const timezoneMinutes = Math.abs(timezoneOffset % 60);
      const timezoneSign = timezoneOffset > 0 ? "-" : "+";
      setTimezone(
        `UTC${timezoneSign}${timezoneHours
          .toString()
          .padStart(2, "0")}:${timezoneMinutes.toString().padStart(2, "0")}`
      );
    };

    // 立即更新一次
    updateTime();

    // 每秒更新一次
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/personal.jpg"
            alt="GYC Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">GYC</h3>
          <div className="mt-1 flex items-center gap-2">
            {[
              {
                src: "/icons/email.svg",
                alt: "Email",
                href: "mailto:davidguo59@outlook.com",
              },
              {
                src: "/icons/github.svg",
                alt: "GitHub",
                href: "https://github.com/df4b2606",
              },
              {
                src: "/icons/linkedin.svg",
                alt: "LinkedIn",
                href: "https://www.linkedin.com/in/yuechenguo59/",
              },
              { src: "/icons/wechat.svg", alt: "WeChat", href: "#" },
              {
                src: "/icons/xiaohongshu.svg",
                alt: "Xiaohongshu",
                href: "https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e",
              },
            ].map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center transition hover:opacity-90 w-4 h-4 flex-shrink-0"
                aria-label={icon.alt}
                title={icon.alt}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Shanghai, China
        </div>
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          Available for projects
        </div>
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-mono">{currentTime}</span>
          <span className="ml-2 text-xs opacity-75">({timezone})</span>
        </div>
      </div>
      <div className="mt-4">
        <AboutMeButton variant="gradient" className="w-full" />
      </div>
      {/* icons moved next to the name */}
    </div>
  );
};

export default PersonalInfoCard;
