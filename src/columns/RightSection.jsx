"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import { useLanguage } from "../LanguageContext";

const RightSection = ({ selectedCraft, sectionId, originalCraftName }) => {
  const { language } = useLanguage(sectionId);
  const [craftData, setCraftData] = useState(null);
  const [toolsText, setToolsText] = useState("");
  const [activeText, setActiveText] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonTexts, setButtonTexts] = useState({ english: [], japanese: [] }); // Initialize with empty arrays

  const craftToButtonIndex = {
    bidri: 1,
    zardozi: 5,
    charkha: 4,
    "loom weaving": 0,
    dyeing: 3,
    "block printing": 2,
  };

  const buttonIds = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6"];
  const textBoxIds = ["text1", "text2", "text3", "text4", "text5", "text6"];

  const buttonPositions = [
    { top: 397, left: 86 },
    { top: 488, right: 203 },
    { top: 450, right: 110 },
    { top: 318, right: 72 },
    { top: 455, left: 345 },
    { top: 465, right: 43 },
  ];

  useEffect(() => {
    // Load button texts from JSON file
    fetch("/buttonTexts.json")
      .then((response) => response.json())
      .then((data) => {
        setButtonTexts(data);
      })
      .catch((error) => {
        console.error("Error loading button texts:", error);
        // Fallback to empty arrays if loading fails
        setButtonTexts({ english: [], japanese: [] });
      });

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

    // Automatically select the corresponding dot for the selected craft
    if (selectedCraft) {
      // Try to match by selectedCraft first
      let buttonIndex = craftToButtonIndex[selectedCraft.toLowerCase()];

      // If not found and we have originalCraftName, try to match by that
      if (buttonIndex === undefined && originalCraftName) {
        // Map original craft names to their corresponding button indices
        const originalCraftMapping = {
          Bidriware: 1,
          ビドリ: 1,
          Zardozi: 5,
          ザルドジ: 5,
          Charkha: 4,
          チャルカ: 4,
          "Loom Weaving": 0,
          織機織り: 0,
          Dyeing: 3,
          染色: 3,
          "Block Printing": 2,
          ブロック印刷: 2,
        };

        buttonIndex = originalCraftMapping[originalCraftName];
      }

      if (buttonIndex !== undefined) {
        setActiveText(buttonIndex);
      }
    }
  }, [selectedCraft, language, originalCraftName]);

  return (
    <div className="w-[25%] flex flex-col gap-4 pl-4">
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

      {/* Explore Frequencies */}
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
                  onClick={() => setActiveText(index)}
                  className={`bg-red-500 h-3 w-3 rounded-full ${
                    activeText === index
                      ? "ring-2 ring-white relative heartbeat "
                      : ""
                  }`}
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
                  path="straight"
                  curveness={0}
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
