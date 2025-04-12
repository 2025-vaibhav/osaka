import { useState } from "react";
import { useLanguage } from "../LanguageContext";

export default function Demo({ onNavigate, sectionId }) {
  const [enabled, setEnabled] = useState(false);
  const { language } = useLanguage(sectionId);

  return (
    <div className="w-full h-full bg-transparent text-white flex flex-col items-center justify-center px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('select-craft')}
        className="absolute top-8 left-8 px-8 py-3 w-28 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
      >
        {language === "english" ? "Back" : "戻る"}
      </button>

      <div className="gradient-box p-8 rounded-lg">
        <h2 className="text-2xl mb-6 text-center">
          {language === "english" ? "Demo Controls" : "デモコントロール"}
        </h2>
        
        <label className="flex items-center w-max cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className="sr-only"
          />

          {/* Background track with static ON/OFF labels */}
          <div className="w-24 h-10 flex items-center justify-between rounded-full px-3 transition-colors bg-blue-500 duration-300">
            <span className="text-xs font-bold text-white">
              {language === "english" ? "ON" : "オン"}
            </span>
            <span className="text-xs font-bold text-white">
              {language === "english" ? "OFF" : "オフ"}
            </span>
          </div>

          {/* White toggle ball showing the opposite of the current state */}
          <div
            className={`absolute w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-black transition-transform duration-300 ${
              enabled ? "translate-x-14" : "translate-x-0"
            }`}
          >
            {enabled
              ? language === "english" ? "OFF" : "オフ"
              : language === "english" ? "ON" : "オン"}
          </div>
        </label>
      </div>
    </div>
  );
}
