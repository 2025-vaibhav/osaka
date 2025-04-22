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
  const [expandedPanel, setExpandedPanel] = useState(null);

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
    { top: 392, left: 86 },
    { top: 480, right: 203 },
    { top: 442, right: 110 },
    { top: 313, right: 72 },
    { top: 445, left: 345 },
    { top: 458, right: 43 },
  ];

  const buttonOffsets = {
    0: -120, // loom
    1: 0, // bidiri
    2: 97, // block
    3: 135, // dying
    4: 137, // chakra
    5: 162, // zardozi
  };

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

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

  const togglePanel = (panel) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  // This handles all initialization at once to prevent race conditions
  useEffect(() => {
    let isMounted = true;
    const defaultCraft = determineDefaultCraft();

    const getBackgroundImage = (craftName) => {
      const imageMap = {
        bidri: "/craft-pics/bidriware/tools.png",
        zardozi: "/craft-pics/zardozi/tools.png",
        charkha: "/craft-pics/charkha/tools.png",
        "loom weaving": "/craft-pics/loom-weaving/tools.png",
        dyeing: "/craft-pics/dyeing/tools.png",
        "block printing": "/craft-pics/block-printing/tools.png",
      };
      return imageMap[craftName] || "/craft-pics/loom-weaving/tools.png";
    };

    if (isMounted) {
      setBackgroundImage(getBackgroundImage(defaultCraft));
      const buttonIdx = craftToButtonIndex[defaultCraft];
      if (buttonIdx !== undefined) {
        setActiveText(buttonIdx);
      } else {
        setActiveText(0);
      }
    }

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

    fetch("/language-data.json")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setCraftData(data);
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
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const currentCraft = determineDefaultCraft();

    const getBackgroundImage = (craftName) => {
      const imageMap = {
        bidri: "/craft-pics/bidriware/tools.png",
        zardozi: "/craft-pics/zardozi/tools.png",
        charkha: "/craft-pics/charkha/tools.png",
        "loom weaving": "/craft-pics/loom-weaving/tools.png",
        dyeing: "/craft-pics/dyeing/tools.png",
        "block printing": "/craft-pics/block-printing/tools.png",
      };
      return imageMap[craftName] || "/craft-pics/loom-weaving/tools.png";
    };

    setBackgroundImage(getBackgroundImage(currentCraft));
    const buttonIdx = craftToButtonIndex[currentCraft];
    if (buttonIdx !== undefined) {
      setActiveText(buttonIdx);
    }

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

  useEffect(() => {
    if (isInitialized && activeText === null) {
      setActiveText(0);
    }
  }, [isInitialized, activeText]);

  return (
    <div className="w-[25%] flex flex-col gap-4 pl-4">
      {/* Tools Panel - Updated with expand/collapse functionality */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c9] transition-all duration-700 ease-in-out ${
          expandedPanel === "tools" ? "h-[300px]" : "h-32"
        }`}
        onClick={() => togglePanel("tools")}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute top-0 left-0 p-4 z-20 pt-8 text-xl w-full h-full">
          {/* <h2 className="text-2xl font-serif italic text-white mb-2">
            {language === "english" ? "Tools" : "道具"}
          </h2> */}
          <div
            className={`text-gray-300  ${
              expandedPanel === "tools"
                ? "h-[calc(100%-3rem)] overflow-y-auto custom-scrollbar"
                : "line-clamp-2"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={toolsText}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                {toolsText}
                <div className="mt-2">
                  {language === "english"
                    ? "- PM Narendra Modi"
                    : "- ナレンドラ・モディ首相"}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {expandedPanel === "tools" && (
          <motion.div
            className="absolute top-2 right-2 z-30 text-white text-xl cursor-pointer hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedPanel(null);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="bi bi-x"></i>
          </motion.div>
        )}
      </div>

      {/* Explore Frequencies */}
      <div className="rounded-xl overflow-hidden flex-grow relative border-1 bg-black border-[#f2e9c9] circuit-board">
        <div className="absolute top-0 left-0 p-4 z-20 w-full">
          <h2 className="text-2xl font-serif italic text-center text-white mb-4">
            {language === "english" ? "Explore Frequencies" : "周波数を探索"}
          </h2>

          {(activeText === null || buttonTexts[language]?.length === 0) && (
            <div className="bg-black/80 border text-center border-[#f2e9c9] rounded p-4 mb-4 text-white ">
              {language === "english"
                ? "Select a point to explore frequencies"
                : "周波数を探索するポイントを選択してください"}
            </div>
          )}

          {activeText !== null &&
            buttonTexts[language]?.length > 0 &&
            buttonTexts[language].map((text, index) => (
              <React.Fragment key={index}>
                {activeText === index && (
                  <div
                    id={textBoxIds[index]}
                    className="bg-black/80 border text-center border-[#f2e9c9] rounded p-4 mb-4 text-white text-lg"
                  >
                    {text}
                  </div>
                )}
              </React.Fragment>
            ))}

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
