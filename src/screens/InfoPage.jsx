import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LeftSection from "../columns/LeftSection";
import MiddleSection from "../columns/MiddleSection";
import RightSection from "../columns/RightSection";
import { useLanguage } from "../LanguageContext";

// Import your images (adjust paths as needed)
import bidriwareIcon from "/craft/3.png";
import zardoziIcon from "/craft/4.png";
import dyeingIcon from "/craft/5.png";
import charkhaIcon from "/craft/1.png";
import loomWeavingIcon from "/craft/6.png";
import blockPrintingIcon from "/craft/5.png";

export default function InfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  // Map display names to JSON data names for both languages
  const craftMapping = {
    english: {
      Bidriware: "Bidri",
      Zardozi: "Zardozi",
      Dyeing: "Dyeing",
      Charkha: "Charkha",
      "Loom Weaving": "Loom weaving",
      "Block Printing": "Block Printing",
    },
    japanese: {
      ビドリ: "Bidri",
      ザルドジ: "Zardozi",
      染色: "Dyeing",
      チャルカ: "Charkha",
      織機織り: "Loom weaving",
      ブロック印刷: "Block Printing",
    },
  };

  // Get the corresponding craft name in the other language
  const getCorrespondingCraft = (craftName, currentLang, targetLang) => {
    // Find the English name first
    let englishName = null;
    for (const [key, value] of Object.entries(craftMapping.english)) {
      if (currentLang === "english") {
        if (key === craftName) {
          englishName = value;
          break;
        }
      } else {
        if (key === craftMapping.japanese[craftName]) {
          englishName = value;
          break;
        }
      }
    }

    // Now find the corresponding name in the target language
    if (englishName) {
      if (targetLang === "english") {
        for (const [key, value] of Object.entries(craftMapping.english)) {
          if (value === englishName) return key;
        }
      } else {
        for (const [key, value] of Object.entries(craftMapping.japanese)) {
          if (value === englishName) return key;
        }
      }
    }

    // Default return the first craft if not found
    return targetLang === "english" ? "Bidriware" : "ビドリ";
  };

  // Get selected craft from navigation state or default
  const [selectedCraft, setSelectedCraft] = useState(() => {
    const fromState = location.state?.selectedCraft;
    if (fromState) return fromState;
    return language === "english" ? "Bidriware" : "ビドリ";
  });

  // Craft data for both languages
  const crafts = {
    english: [
      { name: "Bidriware", icon: bidriwareIcon },
      { name: "Zardozi", icon: zardoziIcon },
      { name: "Dyeing", icon: dyeingIcon },
      { name: "Charkha", icon: charkhaIcon },
      { name: "Loom Weaving", icon: loomWeavingIcon },
      { name: "Block Printing", icon: blockPrintingIcon },
    ],
    japanese: [
      { name: "ビドリ", icon: bidriwareIcon },
      { name: "ザルドジ", icon: zardoziIcon },
      { name: "染色", icon: dyeingIcon },
      { name: "チャルカ", icon: charkhaIcon },
      { name: "織機織り", icon: loomWeavingIcon },
      { name: "ブロック印刷", icon: blockPrintingIcon },
    ],
  };

  // Handle language change without resetting the selected craft
  const handleLanguageChange = (newLanguage) => {
    const correspondingCraft = getCorrespondingCraft(
      selectedCraft,
      language,
      newLanguage
    );
    setSelectedCraft(correspondingCraft);
    setLanguage(newLanguage);
  };

  return (
    <div className="w-full h-screen gradient-box py-6 px-10 flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden mb-4">
        <LeftSection selectedCraft={craftMapping[language][selectedCraft]} />
        <MiddleSection selectedCraft={selectedCraft} />
        <RightSection selectedCraft={craftMapping[language][selectedCraft]} />
      </div>

      {/* Bottom Navigation - Fixed with stable positioning */}
      <div className="mt-auto">
        <div className="flex items-center justify-between px-4">
          {/* Home Button - Fixed width */}
          <div className="w-32 flex justify-center">
            <button
              className="flex items-center z-10 text-white gap-2"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-house text-4xl"></i>
              <span className="text-lg whitespace-nowrap">
                {language === "english" ? "Home" : "ホーム"}
              </span>
            </button>
          </div>

          {/* Craft Icons - Fixed width items */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-6 max-w-4xl mx-auto">
              {crafts[language].map((craft, index) => {
                const isActive = selectedCraft === craft.name;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCraft(craft.name)}
                    className="flex flex-col py-5 items-center cursor-pointer"
                    style={{ minWidth: "90px" }}
                  >
                    <div
                      className={`aspect-square h-20 rounded-full transition-all duration-300 ease-in-out ${
                        isActive
                          ? "border-2 border-yellow-200 shadow-[0_0_10px_2px_#D3CF9A]"
                          : "border border-transparent opacity-70"
                      } bg-[#e8e0c0] flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={craft.icon}
                        alt={craft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white text-xs mt-2 transition-opacity duration-300 whitespace-nowrap w-full text-center">
                      {craft.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Language Toggle - Switch Style */}
          <div className="w-32 flex justify-center">
            <label className="relative flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={language === "japanese"}
                onChange={() =>
                  handleLanguageChange(
                    language === "english" ? "japanese" : "english"
                  )
                }
                className="sr-only"
              />
              {/* Track */}
              <div className="w-24 h-10 flex items-center justify-between rounded-full px-3 bg-[#BF9886] transition-colors duration-300">
                <span className="text-xs font-bold text-white">EN</span>
                <span className="text-xs font-bold text-white">JPN</span>
              </div>

              {/* Toggle */}
              <div
                className={`absolute top-0 left-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-black transition-transform duration-300 ${
                  language === "japanese" ? "translate-x-14" : "translate-x-0"
                }`}
              >
                {language === "english" ? "EN" : "JPN"}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
