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
  const [buttonTexts, setButtonTexts] = useState({ english: [], japanese: [] });
  const [isInitialized, setIsInitialized] = useState(false);

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

  const buttonOffsets = {
    0: -120, // loom
    1: 0, // bidiri
    2: 97, // block
    3: 135, // dying
    4: 137, // chakra
    5: 162, // zardozi
  };

  // Default to Loom Weaving if no craft is selected
  const determineDefaultCraft = () => {
    if (selectedCraft) {
      return selectedCraft.toLowerCase();
    }

    if (originalCraftName) {
      const craftMap = {
        Bidriware: "bidri",
        ビドリ: "bidri",
        Zardozi: "zardozi",
        ザルドジ: "zardozi",
        Dyeing: "dyeing",
        染色: "dyeing",
        Charkha: "charkha",
        チャルカ: "charkha",
        "Loom Weaving": "loom weaving",
        織機織り: "loom weaving",
        "Block Printing": "block printing",
        ブロック印刷: "block printing",
      };
      return craftMap[originalCraftName] || "loom weaving";
    }

    return "loom weaving";
  };

  // This handles all initialization at once to prevent race conditions
  useEffect(() => {
    let isMounted = true;
    const defaultCraft = determineDefaultCraft();

    // Initialize background image based on the default craft
    const getBackgroundImage = (craftName) => {
      const imageMap = {
        bidri: "/vinod-pics/bidriware/tools.png",
        zardozi: "/vinod-pics/zardozi/tools.png",
        charkha: "/vinod-pics/charkha/tools.png",
        "loom weaving": "/vinod-pics/loom-weaving/tools.png",
        dyeing: "/vinod-pics/dyeing/tools.png",
        "block printing": "/vinod-pics/block-printing/tools.png",
      };
      return imageMap[craftName] || "/vinod-pics/loom-weaving/tools.png";
    };

    if (isMounted) {
      setBackgroundImage(getBackgroundImage(defaultCraft));

      // Set initial active button
      const buttonIdx = craftToButtonIndex[defaultCraft];
      if (buttonIdx !== undefined) {
        setActiveText(buttonIdx);
      } else {
        // Default to loom weaving (button 0) if no match found
        setActiveText(0);
      }
    }

    // Load button texts
    fetch("/buttonTexts.json")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setButtonTexts(data);
        }
      })
      .catch((error) => {
        console.error("Error loading button texts:", error);
        if (isMounted) {
          setButtonTexts({ english: [], japanese: [] });
        }
      });

    // Load craft data
    fetch("/language-data.json")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setCraftData(data);

          // Set tools text
          const craft = data.crafts.find(
            (c) =>
              c.name.English.toLowerCase() === defaultCraft ||
              c.name.English.toLowerCase() === defaultCraft.replace(" ", "_")
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
        if (isMounted) {
          setToolsText(
            language === "english"
              ? "Failed to load tools information."
              : "道具情報の読み込みに失敗しました。"
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsInitialized(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this only runs once at mount

  // This effect handles updates when selectedCraft or language changes
  useEffect(() => {
    if (!isInitialized) return;

    const currentCraft = determineDefaultCraft();

    // Update background image
    const getBackgroundImage = (craftName) => {
      const imageMap = {
        bidri: "/vinod-pics/bidriware/tools.png",
        zardozi: "/vinod-pics/zardozi/tools.png",
        charkha: "/vinod-pics/charkha/tools.png",
        "loom weaving": "/vinod-pics/loom-weaving/tools.png",
        dyeing: "/vinod-pics/dyeing/tools.png",
        "block printing": "/vinod-pics/block-printing/tools.png",
      };
      return imageMap[craftName] || "/vinod-pics/loom-weaving/tools.png";
    };

    setBackgroundImage(getBackgroundImage(currentCraft));

    // Update active button
    const buttonIdx = craftToButtonIndex[currentCraft];
    if (buttonIdx !== undefined) {
      setActiveText(buttonIdx);
    }

    // Update tools text
    if (craftData) {
      const craft = craftData.crafts.find(
        (c) =>
          c.name.English.toLowerCase() === currentCraft ||
          c.name.English.toLowerCase() === currentCraft.replace(" ", "_")
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
  }, [selectedCraft, language, isInitialized, craftData, originalCraftName]);

  // Console logs for debugging
  useEffect(() => {
    console.log("Current state:", {
      selectedCraft,
      originalCraftName,
      activeText,
      backgroundImage,
      buttonTextsLength: buttonTexts[language]?.length || 0,
      isInitialized,
    });
  }, [
    selectedCraft,
    originalCraftName,
    activeText,
    backgroundImage,
    buttonTexts,
    language,
    isInitialized,
  ]);

  // Force default selection if activeText is still null after initialization
  useEffect(() => {
    if (isInitialized && activeText === null) {
      console.log("Setting default activeText to 0");
      setActiveText(0);
    }
  }, [isInitialized, activeText]);

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

          {/* Default text if activeText is null or button texts aren't loaded yet */}
          {(activeText === null || buttonTexts[language]?.length === 0) && (
            <div className="bg-black/80 border text-center border-[#f2e9c9] rounded p-4 mb-4 text-white text-sm">
              {language === "english"
                ? "Select a point to explore frequencies"
                : "周波数を探索するポイントを選択してください"}
            </div>
          )}

          {/* Text boxes - Only render if we have data and activeText is set */}
          {activeText !== null &&
            buttonTexts[language]?.length > 0 &&
            buttonTexts[language].map((text, index) => (
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
            ))}

          {/* Positioned buttons */}
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
                      ? "ring-2 ring-white relative heartbeat"
                      : ""
                  }`}
                />
              </div>

              {/* Arrow connections - Only render if activeText is set and equals this index */}
              {activeText === index && buttonTexts[language]?.length > 0 && (
                <Xarrow
                  start={buttonIds[index]}
                  end={textBoxIds[index]}
                  startAnchor="middle"
                  endAnchor={{
                    position: "bottom",
                    offset: { x: buttonOffsets[index] },
                  }}
                  color="#f2e9c9"
                  strokeWidth={1}
                  path="straight"
                  curveness={0}
                  headSize={0}
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
