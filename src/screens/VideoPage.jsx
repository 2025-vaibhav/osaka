"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";

const VideoPage = ({ onNavigate, sectionId }) => {
  const { language } = useLanguage(sectionId);
  const [content, setContent] = useState(null);

  const styleVariables = {
    "--video-height": "70%", 
    "--text-width": "55%", 
    "--video-object-fit": "contain", 
  };

  useEffect(() => {
    fetch("/videopage-data.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error loading content:", err));
  }, []);

  if (!content)
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div
      className="w-full h-full bg-transparent text-[#D4D090] flex justify-center items-center overflow-hidden"
      style={styleVariables}
    >
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

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Container */}
          <div
            className="flex items-center justify-center mb-4"
            style={{ height: "var(--video-height)" }}
          >
            <div className="w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                className="w-full h-full"
                style={{ objectFit: "var(--video-object-fit)" }}
              >
                <source src="/V.mp4" type="video/mp4" />
                {content[language].videoFallbackText}
              </video>
            </div>
          </div>

          {/* Text Content Container */}
          <div
            className="overflow-y-auto V-Scroll pr-2"
            style={{
              height: "calc(100% - var(--video-height))",
              width: "100%",
            }}
          >
            <div
              className="text-gray-100 mx-auto text-justify"
              style={{ width: "var(--text-width)" }}
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
            onClick={() => onNavigate("select-craft")}
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
