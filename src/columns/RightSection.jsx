import React, { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const RightSection = ({ selectedCraft }) => {
  const { language } = useLanguage();
  const [craftData, setCraftData] = useState(null);
  const [toolsText, setToolsText] = useState("");
  const [activeText, setActiveText] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const buttonTexts = {
    english: [
      "Sample Text 1",
      "Sample Text 2",
      "Sample Text 3",
      "Sample Text 4",
    ],
    japanese: [
      "サンプルテキスト 1",
      "サンプルテキスト 2",
      "サンプルテキスト 3",
      "サンプルテキスト 4",
    ],
  };

  const buttonIds = ["btn1", "btn2", "btn3", "btn4"];
  const textBoxIds = ["text1", "text2", "text3", "text4"];

  const buttonPositions = [
    { top: 278, left: 72 },
    { top: 352, right: 169 },
    { top: 322, right: 92 },
    { top: 212, right: 60 },
  ];

  useEffect(() => {
    // Set background image based on selected craft
    switch (selectedCraft.toLowerCase()) {
      case "bidri":
        setBackgroundImage("/vinod-pics/bidriware/tools.png");
        break;
      case "zardozi":
        setBackgroundImage("/vinod-pics/zardozi/tools.png");
        break;
      case "charkha":
        setBackgroundImage("/vinod-pics/charkha/tools.png");
        break;
      case "loom weaving":
        setBackgroundImage("/vinod-pics/loom-weaving/tools.png");
        break;
      case "dyeing":
        setBackgroundImage("/vinod-pics/dyeing/tools.png");
        break;
      case "block printing":
        setBackgroundImage("/vinod-pics/block-printing/tools.png");
        break;
      default:
        setBackgroundImage("");
    }

    fetch("/english-data.json")
      .then((res) => res.json())
      .then((data) => {
        setCraftData(data);
        if (selectedCraft) {
          const craft = data.crafts.find(
            (craft) =>
              craft.name.English.toLowerCase() ===
                selectedCraft.toLowerCase() ||
              craft.name.English.toLowerCase() ===
                selectedCraft.replace(" ", "_").toLowerCase()
          );
          if (craft && craft.tools_text) {
            setToolsText(
              language === "english"
                ? craft.tools_text.English
                : craft.tools_text.Japanese || craft.tools_text.English
            );
          } else {
            setToolsText(
              language === "english"
                ? "No tools information available for this craft."
                : "この工芸に関する道具の情報はありません。"
            );
          }
        }
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setToolsText(
          language === "english"
            ? "Failed to load tools information."
            : "道具情報の読み込みに失敗しました。"
        );
      });
  }, [selectedCraft, language]);

  const handleButtonClick = (index) => {
    setActiveText(activeText === index ? null : index);
  };

  return (
    <div className="w-[30%] flex flex-col gap-4 pl-4">
      <div
        className="rounded-xl overflow-hidden h-32 relative bg-black/40 border-1 border-[#f2e9c9]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute top-0 left-0 p-4 z-20 w-full h-full">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "Tools" : "道具"}
          </h2>
          <div className="text-gray-300 text-sm h-[calc(100%-40px)] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={toolsText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {toolsText}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explore Frequencies - Simplified without animations */}
      <div className="rounded-xl overflow-hidden flex-grow relative border-1 bg-black border-[#f2e9c9] circuit-board">
        <div className="absolute top-0 left-0 p-4 z-20 w-full">
          <h2 className="text-2xl font-serif italic text-center text-white mb-4">
            {language === "english" ? "Explore Frequencies" : "周波数を探索"}
          </h2>

          {/* Text boxes - Simplified */}
          {buttonTexts[language === "english" ? "english" : "japanese"].map(
            (text, index) => (
              <React.Fragment key={index}>
                {activeText === index && (
                  <div
                    id={textBoxIds[index]}
                    className="bg-black/80 border text-center border-[#f2e9c9] rounded p-4 mb-4 text-white text-sm"
                  >
                    {text}
                  </div>
                )}
              </React.Fragment>
            )
          )}

          {/* Positioned buttons - Simplified */}
          {buttonPositions.map((pos, index) => (
            <React.Fragment key={index}>
              <div
                id={buttonIds[index]}
                style={{
                  position: "absolute",
                  top: `${pos.top}px`,
                  left: pos.left ? `${pos.left}px` : undefined,
                  right: pos.right ? `${pos.right}px` : undefined,
                  width: "12px",
                  height: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className={`bg-red-500 h-3 w-3 rounded-full hover:bg-red-400 transition-colors ${
                    activeText === index ? "ring-2 ring-white" : ""
                  }`}
                  onClick={() => handleButtonClick(index)}
                />
              </div>

              {/* Arrow connections */}
              {activeText === index && (
                <Xarrow
                  start={buttonIds[index]}
                  end={textBoxIds[index]}
                  startAnchor="middle"
                  endAnchor="bottom"
                  color="#f2e9c9"
                  strokeWidth={1}
                  path="smooth"
                  curveness={0.4}
                  headSize={10}
                  zIndex={10}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
