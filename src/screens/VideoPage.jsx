"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";

const VideoPage = ({ onNavigate, sectionId }) => {
  const { language } = useLanguage(sectionId);
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);
  const contentContainerRef = useRef(null);
  const [content, setContent] = useState(null);
  const [initialVideoWidth, setInitialVideoWidth] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const [fullyScrolled, setFullyScrolled] = useState(false);

  useEffect(() => {
    fetch("/videopage-data.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  useEffect(() => {
    const calculateInitialWidth = () => {
      if (contentContainerRef.current) {
        const contentWidth = contentContainerRef.current.offsetWidth;
        setInitialVideoWidth(contentWidth);
      }
    };

    if (content) {
      setTimeout(calculateInitialWidth, 0);
    }

    window.addEventListener("resize", calculateInitialWidth);
    return () => window.removeEventListener("resize", calculateInitialWidth);
  }, [content]);

  const checkIfFullyScrolled = () => {
    if (!scrollContainerRef.current) return false;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    return scrollHeight - clientHeight - scrollTop < 5;
  };

  useEffect(() => {
    if (!content || !scrollContainerRef.current || !initialVideoWidth) return;

    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1);

      // Update video scale transform
      const scale = 1 - scrollPercentage * 0.5; // Reduce by max 50%

      if (videoRef.current) {
        // Scale the video
        videoRef.current.style.transform = `scale(${scale})`;

        // Calculate shrinking amount to adjust content position
        const videoHeight = (initialVideoWidth * 9) / 16;
        const heightReduction = videoHeight * (1 - scale);

        // Move the scroll container up to eliminate the gap
        // This will push content up dynamically as video shrinks
        scrollContainer.style.marginTop = `-${heightReduction * 0.5}px`;
      }

      setFullyScrolled(checkIfFullyScrolled());
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [content, initialVideoWidth]);

  useEffect(() => {
    if (content && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isCurrentlyScrollable =
        container.scrollHeight > container.clientHeight + 2;
      setScrollable(isCurrentlyScrollable);
      setFullyScrolled(!isCurrentlyScrollable || checkIfFullyScrolled());
    }
  }, [content]);

  if (!content)
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full bg-transparent text-[#D4D090] flex justify-center items-center overflow-hidden">
      <div className="gradient-box w-[85vw] h-full rounded-4xl p-8 relative shadow-lg flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("home")}
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

        {/* Heading */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-serif text-center mb-2">
            {content[language].title}
          </h1>
          <p className="text-center text-lg font-serif text-gray-100">
            {content[language].subtitle}
          </p>
        </div>

        <hr className="mb-5 w-[600px] mx-auto" />

        {/* Fixed Height Container to hold both video and content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Container */}
          <div className="flex justify-center mb-4">
            <div
              className="origin-center"
              style={{
                width: `${initialVideoWidth}px`,
                height: `${(initialVideoWidth * 9) / 16}px`,
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                className="w-full h-full object-cover origin-center"
                style={{
                  transition: "transform 0.2s ease-out",
                }}
              >
                <source src="/V.mp4" type="video/mp4" />
                {content[language].videoFallbackText}
              </video>
            </div>
          </div>

          {/* Scrollable Content with Dynamic Height */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto V-Scroll pr-2 flex-1"
            style={{
              transition: "margin-top 0.2s ease-out",
              minHeight: "100px",
            }}
          >
            <div
              ref={contentContainerRef}
              className="w-[70%] text-gray-100 mx-auto text-justify"
            >
              {content[language].paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
              <p className="mb-4 italic text-sm">{content[language].note}</p>
              <div className="h-2"></div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fullyScrolled && onNavigate("select-craft")}
            className={`px-8 py-3 w-28 border rounded-full transition ${
              fullyScrolled
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-gray-500 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!fullyScrolled}
          >
            {language === "english" ? "Next" : "次へ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
