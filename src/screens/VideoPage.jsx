"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const VideoPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const scrollContainerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [content, setContent] = useState(null);
  const [videoWidth, setVideoWidth] = useState(500);
  const [scrollable, setScrollable] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    fetch("/videopage-data.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  useEffect(() => {
    if (!content || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        console.log("Not enough content to scroll");
        setIsScrolledToBottom(true);
        return;
      }

      const atBottom = scrollTop >= maxScroll - 10;
      setIsScrolledToBottom(atBottom);

      const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
      const newWidth = 544 - scrollPercentage * (544 - 300);
      setVideoWidth(newWidth);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [content]);

  useEffect(() => {
    if (content && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isCurrentlyScrollable =
        container.scrollHeight > container.clientHeight;
      setScrollable(isCurrentlyScrollable);
      if (!isCurrentlyScrollable) {
        setIsScrolledToBottom(true);
      }
    }
  }, [content]);

  if (!content)
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        Loading...
      </div>
    );

  const videoHeight = (videoWidth * 9) / 16;

  return (
    <div className="w-screen h-screen bg-transparent text-[#D4D090] flex justify-center items-center overflow-hidden">
      <div className="gradient-box w-[856px] h-[620px] rounded-4xl p-8 relative shadow-lg flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="w-[80px] h-[32px] text-[8px] absolute top-[27px] left-[30px] border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          {language === "english" ? "Back" : "戻る"}
        </button>

        {/* Dots */}
        <div className="absolute top-[45px] right-[42px] flex gap-1">
          <i className="bi bi-square-fill text-[5px]"></i>
          <i className="bi bi-square-fill text-[5px]"></i>
          <i className="bi bi-square-fill text-[5px]"></i>
          <i className="bi bi-square-fill text-[5px]"></i>
        </div>

        {/* Heading - Fixed position */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-[32px] font-serif text-center mb-2">
            {content[language].title}
          </h1>
          <p className="text-center text-[14px] font-serif text-gray-100">
            {content[language].subtitle}
          </p>
        </div>

        <hr className="mb-5 w-[320px] mx-auto" />

        {/* Video with default controls */}
        <div className="flex justify-center mb-4">
          <div
            ref={videoContainerRef}
            className="bg-black border border-gray-400"
            style={{
              width: `${videoWidth}px`,
              height: `${videoHeight}px`,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
              boxSizing: "border-box",
            }}
          >
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noplaybackrate" 
              onContextMenu={(e) => e.preventDefault()} 
              className="w-full h-full object-cover "
            >
              <source src="/v2.mp4" type="video/mp4" />
              {content[language].videoFallbackText}
            </video>
          </div>
        </div>

        {/* Scrollable Area - Takes remaining space */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto V-Scroll pr-2 flex-grow text-justify"
        >
          <div className="w-[544px] text-[14px] text-gray-100 mx-auto">
            {/* Text Content */}
            {content[language].paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            <p className="mb-4 italic text-sm">{content[language].note}</p>
          </div>
        </div>

        {/* Next Button - Fixed at bottom */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigate("/select-craft")}
            disabled={!isScrolledToBottom}
            className={`h-[36px] w-[122px] text-[10px] border rounded-full transition ${
              isScrolledToBottom
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-gray-500 text-gray-500 cursor-not-allowed"
            }`}
          >
            {language === "english" ? "Next" : "次へ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
