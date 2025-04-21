import React from "react";
import { useLanguage } from "../LanguageContext";

const Home = ({ onNavigate, sectionId }) => {
  const { language, setLanguage } = useLanguage(sectionId);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    onNavigate('video-page');
  };

  return (
    <div className="flex items-center justify-center h-full bg-transparent px-4 relative overflow-hidden">
      
      <img
        src="black.png"
        className="z-[-999] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150"
      />

      {/* Content */}
      <div className="gradient-box cut-card text-white shadow-lg px-12 py-10 text-center space-y-8 max-w-[600px] w-full border-gray-700 relative z-[9999]">
        <h1 className="text-4xl font-serif text-[#f2e9c9]">
          Threaded Frequencies
        </h1>

        <p className="text-base">Choose Your preferred Language</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleLanguageSelect("english")}
            className="px-8 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect("japanese")}
            className="px-8 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
          >
            日本語
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
