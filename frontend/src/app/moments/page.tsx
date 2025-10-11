// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { getAllMoments, formatTimestamp, Moment } from "../../data/moments";
// import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
// import LatestUpdatesCard from "@/components/home_components/LatestUpdatesCard";
// import TagsCard from "@/components/home_components/TagsCard";
// import { useTheme } from "@/components/common/ThemeProvider";

// const MomentCard = ({
//   moment,
//   onLike,
//   onComment,
// }: {
//   moment: Moment;
//   onLike: (id: number) => void;
//   onComment: (id: number) => void;
// }) => {
//   const { isDark } = useTheme();
//   return (
//     <article
//       className={`${
//         isDark
//           ? "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
//           : "bg-white border border-black/10 hover:border-black/20"
//       } backdrop-blur-sm rounded-xl p-5 transition-all duration-300 group cursor-pointer`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//             <span className="text-white font-bold text-sm">GYC</span>
//           </div>
//           <div>
//             <h3
//               className={`${
//                 isDark ? "text-white" : "text-gray-900"
//               } font-semibold text-base`}
//             >
//               GYC
//             </h3>
//             <p
//               className={`${
//                 isDark ? "text-gray-400" : "text-gray-600"
//               } text-sm`}
//             >
//               {formatTimestamp(moment.timestamp)}
//             </p>
//           </div>
//         </div>

//         {moment.location && (
//           <div
//             className={`flex items-center space-x-1 ${
//               isDark ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="text-xs">{moment.location}</span>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="mb-4">
//         <p
//           className={`${
//             isDark ? "text-gray-200" : "text-gray-800"
//           } leading-relaxed mb-3 text-base`}
//         >
//           {moment.content}
//         </p>

//         {/* Image */}
//         {moment.image && (
//           <div className="rounded-lg overflow-hidden mb-3">
//             <Image
//               src={moment.image}
//               alt="Moment image"
//               width={400}
//               height={240}
//               className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         )}

//         {/* Tags */}
//         {moment.tags && moment.tags.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {moment.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className={`${
//                   isDark
//                     ? "px-2 py-1 bg-blue-500/20 text-blue-300"
//                     : "px-2 py-1 bg-blue-100 text-blue-700"
//                 } rounded-full text-xs font-medium transition-colors cursor-pointer`}
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Actions */}
//       <div
//         className={`flex items-center justify-between pt-3 border-t ${
//           isDark ? "border-white/10" : "border-black/10"
//         }`}
//       >
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={() => onLike(moment.id)}
//             className={`flex items-center space-x-2 transition-colors p-2 rounded-full ${
//               isDark ? "hover:bg-white/10" : "hover:bg-black/5"
//             } ${
//               moment.isLiked
//                 ? "text-red-500"
//                 : isDark
//                 ? "text-gray-400"
//                 : "text-gray-600"
//             }`}
//           >
//             <svg
//               className="w-5 h-5"
//               fill={moment.isLiked ? "currentColor" : "none"}
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//               />
//             </svg>
//             <span className="text-sm">{moment.likes}</span>
//           </button>

//           <button
//             onClick={() => onComment(moment.id)}
//             className={`flex items-center space-x-2 transition-colors p-2 rounded-full ${
//               isDark
//                 ? "text-gray-400 hover:text-blue-500 hover:bg-white/10"
//                 : "text-gray-600 hover:text-blue-600 hover:bg-black/5"
//             }`}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//             <span className="text-sm">{moment.comments}</span>
//           </button>

//           <button className="flex items-center space-x-1 text-gray-400 hover:text-green-500 transition-colors">
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
//               />
//             </svg>
//           </button>
//         </div>

//         <button
//           className={`${
//             isDark
//               ? "text-gray-400 hover:text-white"
//               : "text-gray-600 hover:text-black"
//           } transition-colors`}
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//             />
//           </svg>
//         </button>
//       </div>
//     </article>
//   );
// };

// const NewMomentForm = ({
//   onSubmit,
// }: {
//   onSubmit: (content: string) => void;
// }) => {
//   const [content, setContent] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (content.trim()) {
//       onSubmit(content);
//       setContent("");
//       setIsExpanded(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6 hover:border-white/20 transition-all duration-200"
//     >
//       <div className="flex items-start space-x-3">
//         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//           <span className="text-white font-bold text-xs">GYC</span>
//         </div>

//         <div className="flex-1">
//           <textarea
//             value={content}
//             onChange={(e) => {
//               setContent(e.target.value);
//               setCharCount(e.target.value.length);
//             }}
//             onFocus={() => setIsExpanded(true)}
//             placeholder="有什么新想法？"
//             className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-sm"
//             rows={isExpanded ? 3 : 1}
//             maxLength={280}
//           />

//           {isExpanded && (
//             <div className="flex items-center justify-between mt-3">
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="button"
//                   className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span className="text-xs">图片</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <span className="text-xs">位置</span>
//                 </button>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <span
//                   className={`text-xs ${
//                     charCount > 200 ? "text-red-400" : "text-gray-400"
//                   }`}
//                 >
//                   {charCount}/280
//                 </span>

//                 <button
//                   type="submit"
//                   disabled={!content.trim() || charCount > 280}
//                   className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all duration-200 text-sm shadow-lg shadow-blue-500/25"
//                 >
//                   发布
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default function MomentsPage() {
//   const [moments, setMoments] = useState(getAllMoments());
//   const [filter, setFilter] = useState("全部");
//   const { isDark } = useTheme();

//   const filters = ["全部", "生活", "工作", "思考", "摄影"];

//   const handleLike = (id: number) => {
//     setMoments((prev) =>
//       prev.map((moment) =>
//         moment.id === id
//           ? {
//               ...moment,
//               isLiked: !moment.isLiked,
//               likes: moment.isLiked ? moment.likes - 1 : moment.likes + 1,
//             }
//           : moment
//       )
//     );
//   };

//   const handleComment = (id: number) => {
//     // 这里可以实现评论功能
//     console.log(`评论动态 ${id}`);
//   };

//   const handleNewMoment = (content: string) => {
//     const newMoment: Moment = {
//       id: Math.max(...moments.map((m) => m.id)) + 1,
//       content,
//       timestamp: new Date().toISOString(),
//       likes: 0,
//       comments: 0,
//       isLiked: false,
//       tags: [],
//     };

//     setMoments((prev) => [newMoment, ...prev]);
//   };

//   const filteredMoments =
//     filter === "全部"
//       ? moments
//       : moments.filter((moment) => moment.tags?.includes(filter));

//   return (
//     <div
//       className={`${
//         isDark
//           ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
//           : "min-h-screen bg-gray-100"
//       }`}
//     >
//       {/* Personal Info Card - Top Right */}
//       <PersonalInfoCard className="absolute top-24 right-6 w-72 hidden lg:block z-10" />

//       {/* Tags Card - Right Middle */}
//       <TagsCard className="absolute right-6 top-[22rem] w-72 hidden lg:block z-10" />

//       {/* Latest Updates Card - Right Bottom */}
//       <LatestUpdatesCard className="absolute right-6 top-[50.5rem] w-72 hidden lg:block z-10" />

//       {/* Main Content - Twitter-style layout */}
//       <div className="px-6 lg:pl-6 lg:pr-80 pb-20 pt-24">
//         <div className="max-w-4xl lg:max-w-4xl mx-auto lg:mx-0">
//           {/* New Moment Form */}
//           <div className="mb-6">
//             <NewMomentForm onSubmit={handleNewMoment} />
//           </div>

//           {/* Filter Tabs */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {filters.map((filterOption) => (
//               <button
//                 key={filterOption}
//                 onClick={() => setFilter(filterOption)}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
//                   filter === filterOption
//                     ? isDark
//                       ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
//                       : "bg-blue-600 text-white"
//                     : isDark
//                     ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm"
//                     : "bg-black/5 text-gray-700 hover:bg-black/10"
//                 }`}
//               >
//                 {filterOption}
//               </button>
//             ))}
//           </div>

//           {/* Moments List - Twitter-style vertical layout */}
//           <div className="space-y-4">
//             {filteredMoments.map((moment) => (
//               <MomentCard
//                 key={moment.id}
//                 moment={moment}
//                 onLike={handleLike}
//                 onComment={handleComment}
//               />
//             ))}
//           </div>

//           {/* Load More */}
//           {filteredMoments.length > 0 && (
//             <div className="text-center mt-6">
//               <button
//                 className={`${
//                   isDark
//                     ? "px-6 py-2 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20"
//                     : "px-6 py-2 bg-white text-gray-800 rounded-lg border border-black/10 hover:bg-black/5"
//                 } transition-all group`}
//               >
//                 <span className="group-hover:translate-x-1 transition-transform inline-block text-sm">
//                   加载更多
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/common/ThemeProvider";

export default function MomentsPage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image, consistent with homepage */}
      {isDark ? (
        <div className="fixed inset-0 z-0">
          <Image
            src="/DSC07098.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
      ) : (
        <div className="fixed inset-0 z-0" />
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
                isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl lg:text-2xl mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The author hasn&apos;t shared any moments yet
          </p>

          {/* Description */}
          <div
            className={`text-lg mb-12 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <p className="mb-4">
              Stay tuned! I&apos;m working on sharing my daily moments and
              thoughts with you.
            </p>
            <p>
              In the meantime, feel free to explore other sections of my website
              or connect with me through the contact page.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Back to Home
            </Link>
            <Link
              href="/about"
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 border ${
                isDark
                  ? "border-white text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              About Me
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full animate-pulse ${
                  isDark ? "bg-white/30" : "bg-gray-400"
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
