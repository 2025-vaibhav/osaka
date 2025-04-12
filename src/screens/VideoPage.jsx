"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageContext";

const VideoPage = ({ onNavigate, sectionId }) => {
  const { language } = useLanguage(sectionId);
  const scrollContainerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [content, setContent] = useState(null);
  const [videoWidth, setVideoWidth] = useState(500);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    // Load content from JSON
    fetch("/videopage-data.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  useEffect(() => {
    // Only set up scroll listener after content is loaded
    if (!content || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Avoid division by zero
      if (maxScroll <= 0) {
        console.log("Not enough content to scroll");
        return;
      }

      const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
      console.log("Scroll percentage:", scrollPercentage);

      // Calculate new width based on scroll percentage (500px at top, 400px at bottom)
      const newWidth = 500 - scrollPercentage * 100;

      // Update video width
      setVideoWidth(newWidth);
    };

    // Add scroll event listener
    scrollContainer.addEventListener("scroll", handleScroll);
    console.log("Scroll listener added to", scrollContainer);

    // Initial calculation in case content is already scrolled
    handleScroll();

    // Clean up event listener
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      console.log("Scroll listener removed");
    };
  }, [content]);

  useEffect(() => {
    if (content && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isCurrentlyScrollable =
        container.scrollHeight > container.clientHeight;
      setScrollable(isCurrentlyScrollable);
      console.log("Scroll container dimensions:", {
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
        isScrollable: isCurrentlyScrollable,
      });
    }
  }, [content]);

  if (!content)
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        Loading...
      </div>
    );

  // Calculate height based on 16:9 aspect ratio
  const videoHeight = (videoWidth * 9) / 16;

  return (
    <div className="w-full h-full bg-transparent text-[#D4D090] flex justify-center items-center overflow-hidden">
      <div className="gradient-box w-[85vw] h-full rounded-4xl p-8 relative shadow-lg flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-3 w-28 absolute top-8 left-8 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          {language === "english" ? "Back" : "戻る"}
        </button>

        {/* Dots */}
        <div className="absolute top-8 right-8 flex gap-1">
          <i className="bi bi-square-fill scale-50"></i>
          <i className="bi bi-square-fill scale-50"></i>
          <i className="bi bi-square-fill scale-50"></i>
        </div>

        {/* Heading - Fixed position */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-serif text-center mb-2">
            {content[language].title}
          </h1>
          <p className="text-center text-lg font-serif text-gray-100">
            {content[language].subtitle}
          </p>
        </div>

        <hr className="mb-5 w-[600px] mx-auto" />

        {/* Video - Dynamic width based on scroll */}
        <div className="flex justify-center mb-4">
          <div
            ref={videoContainerRef}
            className="bg-black border border-gray-400"
            style={{
              width: `${videoWidth}px`,
              height: `${videoHeight}px`,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              className="w-full h-full object-cover"
            >
              <source src="/V.mp4" type="video/mp4" />
              {content[language].videoFallbackText}
            </video>
          </div>
        </div>

        {/* Scrollable Area - Only for text content */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto V-Scroll pr-2 flex-1 text-justify"
          style={{ minHeight: "100px", maxHeight: "calc(100% - 200px)" }}
        >
          <div className="max-w-full-md text-gray-100 mx-auto">
            {/* Text Content */}
            {content[language].paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            <p className="mb-4 italic text-sm">{content[language].note}</p>

            {/* Add extra paragraphs to ensure scrollability for testing */}
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <p key={`extra-${i}`} className="mb-4">
                  {content[language].paragraphs[0] ||
                    "Additional content to ensure scrollability"}
                </p>
              ))}
          </div>
        </div>

        {/* Next Button - Fixed position */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => onNavigate('select-craft')}
            className="px-8 py-3 w-28 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
          >
            {language === "english" ? "Next" : "次へ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
