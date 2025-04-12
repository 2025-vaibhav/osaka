import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    navigate("/video-page");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-transparent px-4 relative overflow-hidden">
      {/* Content */}
      <div className="gradient-box cut-card text-white shadow-lg text-center space-y-8 max-w-[600px] w-full border-gray-700 relative z-10">
        <h1 className="text-[32px] font-serif text-[#f2e9c9]">
          Threaded Frequencies
        </h1>
        <p className="text-[11.4px] relative mt-5">Choose Your preferred Language</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleLanguageSelect("english")}
            className="border border-white rounded-full text-white hover:bg-white hover:text-black transition text-[11.4px] h-[40px] w-[140px]"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect("japanese")}
            className="border border-white rounded-full text-white hover:bg-white hover:text-black transition text-[11.4px] h-[40px] w-[140px]"
          >
            日本語
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
