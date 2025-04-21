import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftSection from "../columns/LeftSection";
import MiddleSection from "../columns/MiddleSection";
import RightSection from "../columns/RightSection";
import { useLanguage } from "../LanguageContext";

// Import your images (adjust paths as needed)
import charkhaIcon from "/craft/1.png";
import bidriwareIcon from "/craft/3.png";
import zardoziIcon from "/craft/4.png";
import {
  default as blockPrintingIcon,
  default as dyeingIcon,
} from "/craft/5.png";
import loomWeavingIcon from "/craft/6.png";

export default function InfoPage({ onNavigate, sectionId }) {
  const [searchParams] = useSearchParams();
  const { language, setLanguage } = useLanguage(sectionId);

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

  // Get selected craft from URL parameters or default
  const [selectedCraft, setSelectedCraft] = useState(() => {
    const fromParams = searchParams.get(`${sectionId}_selectedCraft`);
    if (fromParams) return fromParams;
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

  // Handle craft selection with URL parameter update
  const handleCraftSelect = (craft) => {
    setSelectedCraft(craft);
    onNavigate("info-page", { selectedCraft: craft });
  };

  // Log the current state for debugging
  console.log("InfoPage state:", {
    selectedCraft,
    mappedCraft: craftMapping[language][selectedCraft],
    language,
  });

  return (
    <div className="w-full h-full gradient-box p-10 flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden mb-4">
        <LeftSection
          sectionId={sectionId}
          selectedCraft={craftMapping[language][selectedCraft]}
        />
        <MiddleSection sectionId={sectionId} selectedCraft={selectedCraft} />
        <RightSection
          sectionId={sectionId}
          selectedCraft={craftMapping[language][selectedCraft]}
          originalCraftName={selectedCraft} // Pass the original craft name
        />
      </div>

      {/* Bottom Navigation - Fixed with stable positioning */}
      <div className="mt-auto">
        <div className="flex items-center justify-between px-4">
          {/* Home Button - Fixed width */}
          <div className="w-32 scale-150 flex justify-center">
            <button
              className="flex items-center z-10 text-white gap-2"
              onClick={() => onNavigate("home")}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.17141 17.5019H15.0717C15.7356 17.5019 16.3376 17.2315 16.775 16.7941C17.2118 16.3573 17.4827 15.7547 17.4827 15.0914V7.26293C17.4827 6.8475 17.3889 6.46299 17.2101 6.12627C17.0308 5.78898 16.7649 5.49666 16.4214 5.2645L10.5211 1.28225C10.104 1.00062 9.63743 0.860083 9.17197 0.860083C8.70652 0.860083 8.2405 1.00062 7.82282 1.28225L1.92254 5.2645C1.57907 5.49666 1.31261 5.78954 1.13385 6.12627C0.954524 6.46299 0.861208 6.8475 0.861208 7.26236V15.0908C0.861208 15.7541 1.13216 16.3568 1.56895 16.7935C2.00574 17.2303 2.60836 17.5013 3.27225 17.5013H9.17253L9.17141 17.5019ZM4.79623 10.597H13.546C13.9238 10.597 14.2673 10.7516 14.5169 11.0012L14.5185 11.0029C14.7676 11.2519 14.9227 11.5959 14.9227 11.9737V13.4392C14.9227 13.817 14.7681 14.1605 14.5185 14.41L14.5169 14.4117C14.2673 14.6608 13.9238 14.8159 13.546 14.8159H4.79623C4.41847 14.8159 4.075 14.6613 3.8254 14.4117L3.82372 14.41C3.57469 14.1605 3.41953 13.817 3.41953 13.4392V11.9737C3.41953 11.5959 3.57412 11.2525 3.82372 11.0029L3.8254 11.0012C4.075 10.7522 4.41847 10.597 4.79623 10.597ZM13.546 11.4577H4.79623C4.65401 11.4577 4.52527 11.5156 4.4314 11.6089C4.33864 11.7022 4.28074 11.8315 4.28074 11.9737V13.4392C4.28074 13.5814 4.33864 13.7102 4.4314 13.8041C4.52527 13.8968 4.65401 13.9547 4.79623 13.9547H13.546C13.6883 13.9547 13.817 13.8968 13.9109 13.8041C14.0036 13.7102 14.0615 13.5814 14.0615 13.4392V11.9737C14.0615 11.8315 14.0036 11.7022 13.9109 11.6089C13.817 11.5156 13.6883 11.4577 13.546 11.4577ZM15.0711 18.3631H3.27113C2.37001 18.3631 1.55208 17.9954 0.959583 17.4035C0.367081 16.811 0 15.9931 0 15.0919V7.26349C0 6.70584 0.128731 6.18473 0.373827 5.72377C0.618923 5.26281 0.978696 4.86481 1.4419 4.55282L7.34219 0.570578C7.90546 0.190567 8.53843 0 9.17197 0C9.80551 0 10.4385 0.190005 11.0018 0.570578L16.902 4.55282C17.3647 4.86537 17.725 5.26337 17.9701 5.72377C18.2152 6.18473 18.3439 6.70584 18.3439 7.26349V15.0919C18.3439 15.9931 17.9763 16.811 17.3844 17.4035C16.7919 17.996 15.9739 18.3631 15.0728 18.3631H15.0711Z"
                  fill="#D3CF9B"
                />
              </svg>

              <span className="text-lg whitespace-nowrap text-[#D3CF9B]">
                {language === "english" ? "Home" : "ホーム"}
              </span>
            </button>
          </div>

          {/* Craft Icons - Fixed width items */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-20 max-w-4xl mx-auto">
              {crafts[language].map((craft, index) => {
                const isActive = selectedCraft === craft.name;
                return (
                  <div
                    key={index}
                    onClick={() => handleCraftSelect(craft.name)}
                    className="flex flex-col py-5 items-center cursor-pointer"
                    style={{ minWidth: "90px" }}
                  >
                    <div
                      className={`aspect-square h-28 rounded-full transition-all duration-300 ease-in-out ${
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
          <div className="w-24 flex justify-center">
            {/* Reduced width from w-32 to w-24 */}
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
              <div className="w-20 h-10 flex items-center justify-between rounded-full px-2 bg-[#BF9886] transition-colors duration-300">
                {/* Reduced width from w-24 to w-20 and px-3 to px-2 */}
                <span className="text-xs font-bold text-white">EN</span>
                <span className="text-xs font-bold text-white">JPN</span>
              </div>

              <div
                className={`absolute top-0 left-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-black transition-transform duration-300 ${
                  language === "japanese"
                    ? "translate-x-10"
                    : "translate-x-0" /* Changed translate-x-14 to translate-x-10 */
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
