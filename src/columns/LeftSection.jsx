"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";

const LeftSection = ({ selectedCraft, sectionId }) => {
  const { language } = useLanguage(sectionId);
  const [craftData, setCraftData] = useState(null);
  const [introText, setIntroText] = useState("");
  const [designText, setDesignText] = useState("");
  const [historyText, setHistoryText] = useState("");
  const [processes, setProcesses] = useState([]);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [introBackground, setIntroBackground] = useState("");
  const [designBackground, setDesignBackground] = useState("");
  const [historyBackground, setHistoryBackground] = useState("");
  const [processBackgrounds, setProcessBackgrounds] = useState([]);

  useEffect(() => {
    // Set background images based on selected craft
    switch (selectedCraft.toLowerCase()) {
      case "bidri":
      case "bidriware":
      case "ビドリ":
        setIntroBackground("/craft-pics/bidriware/introduction.png");
        setDesignBackground("/craft-pics/bidriware/design.png");
        setHistoryBackground("/craft-pics/bidriware/history.png");
        setProcessBackgrounds([
          "/craft-pics/bidriware/Process/1.jpeg",
          "/craft-pics/bidriware/Process/2.jpeg",
          "/craft-pics/bidriware/Process/3.jpeg",
          "/craft-pics/bidriware/Process/4.jpeg",
          "/craft-pics/bidriware/Process/5.jpeg",
        ]);
        break;
      case "zardozi":
      case "ザルドジ":
        setIntroBackground("/craft-pics/zardozi/introduction.png");
        setDesignBackground("/craft-pics/zardozi/design.png");
        setHistoryBackground("/craft-pics/zardozi/history.png");
        setProcessBackgrounds([
          "/craft-pics/zardozi/process/1.png",
          "/craft-pics/zardozi/process/2.png",
          "/craft-pics/zardozi/process/3.png",
          "/craft-pics/zardozi/process/4.png",
          "/craft-pics/zardozi/process/5.png",
        ]);
        break;
      case "charkha":
      case "チャルカ":
        setIntroBackground("/craft-pics/charkha/introduction.png");
        setDesignBackground("/craft-pics/charkha/design.png");
        setHistoryBackground("/craft-pics/charkha/history.png");
        setProcessBackgrounds([
          "/craft-pics/charkha/process/1.png",
          "/craft-pics/charkha/process/2.png",
          "/craft-pics/charkha/process/3.png",
          "/craft-pics/charkha/process/4.png",
          "/craft-pics/charkha/process/5.png",
        ]);
        break;
      case "loom weaving":
      case "loom_weaving":
      case "織機織り":
        setIntroBackground("/craft-pics/loom-weaving/introduction.png");
        setDesignBackground("/craft-pics/loom-weaving/design.png");
        setHistoryBackground("/craft-pics/loom-weaving/history.png");
        setProcessBackgrounds([
          "/craft-pics/loom-weaving/process/1.png",
          "/craft-pics/loom-weaving/process/2.png",
          "/craft-pics/loom-weaving/process/3.png",
          "/craft-pics/loom-weaving/process/4.png",
          "/craft-pics/loom-weaving/process/5.png",
        ]);
        break;
      case "dyeing":
      case "染色":
        setIntroBackground("/craft-pics/dyeing/introduction.png");
        setDesignBackground("/craft-pics/dyeing/design.png");
        setHistoryBackground("/craft-pics/dyeing/history.png");
        setProcessBackgrounds([
          "/craft-pics/dyeing/process/1.png",
          "/craft-pics/dyeing/process/2.png",
          "/craft-pics/dyeing/process/3.png",
          "/craft-pics/dyeing/process/4.png",
          "/craft-pics/dyeing/process/5.png",
        ]);
        break;
      case "block printing":
      case "block_printing":
      case "ブロック印刷":
        setIntroBackground("/craft-pics/block-printing/introduction.png");
        setDesignBackground("/craft-pics/block-printing/design.png");
        setHistoryBackground("/craft-pics/block-printing/history.png");
        setProcessBackgrounds([
          "/craft-pics/block-printing/process/1.png",
          "/craft-pics/block-printing/process/2.png",
          "/craft-pics/block-printing/process/3.png",
          "/craft-pics/block-printing/process/4.png",
          "/craft-pics/block-printing/process/5.png",
        ]);
        break;
      default:
        setIntroBackground("");
        setDesignBackground("");
        setHistoryBackground("");
        setProcessBackgrounds([]);
    }

    fetch("/language-data.json")
      .then((res) => res.json())
      .then((data) => {
        setCraftData(data);
        updateCraftInfo(data, selectedCraft);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, [selectedCraft]);

  useEffect(() => {
    if (craftData) {
      updateCraftInfo(craftData, selectedCraft);
    }
  }, [selectedCraft, craftData, language]);

  const updateCraftInfo = (data, craftName) => {
    if (!data || !craftName) return;

    const craft = data.crafts.find(
      (c) =>
        c.name.English.toLowerCase() === craftName.toLowerCase() ||
        c.name.English.toLowerCase() ===
          craftName.replace(" ", "_").toLowerCase()
    );

    if (craft) {
      const textField = language === "english" ? "English" : "Japanese";
      setIntroText(craft.introduction_text?.[textField] || "");
      setDesignText(craft.design_text?.[textField] || "");
      setHistoryText(craft.history_text?.[textField] || "");
      setProcesses(craft.processes || []);
    }
  };

  const togglePanel = (panel) => {
    setSelectedCircle(null);
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  const handleCircleClick = (index, event) => {
    event.stopPropagation();
    setExpandedPanel(null);
    setSelectedCircle(selectedCircle === index ? null : index);
  };

  const handleCloseCircle = (event) => {
    event.stopPropagation();
    setSelectedCircle(null);
  };

  const getLocalizedText = (process, field) => {
    return (
      process[field]?.[language === "english" ? "English" : "Japanese"] ||
      process[field]?.English ||
      ""
    );
  };

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Animation variants for process circles
  const circleVariants = {
    collapsed: {
      borderRadius: "50%",
      height: "10rem",
      width: "10rem",
    },
    expanded: {
      borderRadius: "0.8rem",
      height: "10rem",
      width: "100%",
    },
  };

  // Animation variants for the overlay div to match the circle shape
  const overlayVariants = {
    collapsed: {
      borderRadius: "50%",
    },
    expanded: {
      borderRadius: "0.8rem",
    },
  };

  return (
    <div className="w-[25%] flex flex-col gap-4 pr-4">
      {/* Introduction Panel */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c9] transition-all duration-700 ease-in-out ${
          expandedPanel === "introduction" ? "h-160" : "h-64"
        }`}
        onClick={() => togglePanel("introduction")}
        style={{
          backgroundImage: `url(${introBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "Introduction" : "紹介"}
          </h2>
          <div
            className={`text-gray-300  overflow-hidden ${
              expandedPanel === "introduction"
                ? "h-56 overflow-y-auto custom-scrollbar"
                : "line-clamp-1"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`intro-${introText}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                {introText ||
                  (language === "english" ? "Loading..." : "読み込み中...")}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {expandedPanel === "introduction" && (
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

      {/* Process Section */}
      <div className="flex-grow">
        <h2 className="text-2xl font-serif text-white mb-2">
          {language === "english" ? "Process" : "工程"}
        </h2>
        <div className="border-t border-gray-500 mb-4"></div>
        <div
          className={`overflow-x-auto pb-2 mt-2 ${
            selectedCircle === null ? "custom-scrollbar" : "overflow-hidden"
          } transition-all duration-500 ease-in-out`}
        >
          <div
            className={`flex gap-4 px-2 ${
              selectedCircle !== null ? "block w-full" : "min-w-max"
            } transition-all duration-500`}
          >
            {processes.length > 0
              ? processes.map((process, index) => (
                  <motion.div
                    key={index}
                    className={`relative group transition-all duration-500 ease-in-out ${
                      selectedCircle !== null
                        ? selectedCircle === index
                          ? "w-full"
                          : "hidden"
                        : "flex-shrink-0"
                    }`}
                    layout
                  >
                    <motion.div
                      className={`select-none overflow-hidden bg-black/40 border-1 border-[#f2e9c0] flex items-center justify-center mb-2 relative`}
                      variants={circleVariants}
                      initial="collapsed"
                      animate={
                        selectedCircle === index ? "expanded" : "collapsed"
                      }
                      transition={{ type: "spring", damping: 20 }}
                      onClick={(e) => handleCircleClick(index, e)}
                      style={{
                        backgroundImage: processBackgrounds[index]
                          ? `url(${processBackgrounds[index]})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-black/50 z-0"
                        variants={overlayVariants}
                        initial="collapsed"
                        animate={
                          selectedCircle === index ? "expanded" : "collapsed"
                        }
                        transition={{ type: "spring", damping: 20 }}
                      />
                      {selectedCircle === index ? (
                        <div className="p-4 text-white w-full h-full flex flex-col relative z-10">
                          <motion.h3
                            className="font-semibold mb-2 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {getLocalizedText(process, "name")}
                          </motion.h3>
                          <AnimatePresence>
                            <motion.p
                              key={`process-desc-${index}-${language}`}
                              className=" flex-grow text-center overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {getLocalizedText(process, "description")}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.span
                          className="text-white text text-center px-1 relative z-10"
                          whileHover={{ scale: 1.1 }}
                        >
                          {getLocalizedText(process, "name") || index + 1}
                        </motion.span>
                      )}
                    </motion.div>
                    {selectedCircle === index && (
                      <motion.div
                        className="absolute top-5 right-5 z-30 text-white text-xl cursor-pointer hover:text-gray-300"
                        onClick={handleCloseCircle}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <i className="bi bi-x"></i>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              : ["1", "2", "3", "4", "5"].map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative group transition-all duration-500 ease-in-out ${
                      selectedCircle !== null
                        ? selectedCircle === index
                          ? "w-full"
                          : "hidden"
                        : "flex-shrink-0"
                    }`}
                    layout
                  >
                    <motion.div
                      className={`select-none overflow-hidden bg-black/40 border-1 border-[#f2e9c0] flex items-center justify-center mb-2 relative`}
                      variants={circleVariants}
                      initial="collapsed"
                      animate={
                        selectedCircle === index ? "expanded" : "collapsed"
                      }
                      transition={{ type: "spring", damping: 20 }}
                      onClick={(e) => handleCircleClick(index, e)}
                      style={{
                        backgroundImage: processBackgrounds[index]
                          ? `url(${processBackgrounds[index]})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-black/50 z-0"
                        variants={overlayVariants}
                        initial="collapsed"
                        animate={
                          selectedCircle === index ? "expanded" : "collapsed"
                        }
                        transition={{ type: "spring", damping: 20 }}
                      />
                      <motion.span
                        className="text-white  text-center px-1 relative z-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        {step}
                      </motion.span>
                    </motion.div>
                    {selectedCircle === index && (
                      <motion.div
                        className="absolute top-2 right-2 z-30 text-white text-xl cursor-pointer hover:text-gray-300"
                        onClick={handleCloseCircle}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <i className="bi bi-x"></i>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
          </div>
        </div>
      </div>

      {/* Designs Panel */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c0] transition-all duration-700 ease-in-out ${
          expandedPanel === "designs"
            ? "h-128"
            : expandedPanel === "history"
            ? "h-0"
            : "h-64"
        }`}
        onClick={() => togglePanel("designs")}
        style={{
          backgroundImage: `url(${designBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "Designs" : "デザイン"}
          </h2>
          <div
            className={`text-gray-300  overflow-hidden ${
              expandedPanel === "designs"
                ? "h-80 overflow-y-auto custom-scrollbar"
                : expandedPanel === "history"
                ? "h-0"
                : "line-clamp-1"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`design-${designText}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                {designText ||
                  (language === "english" ? "Loading..." : "読み込み中...")}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {expandedPanel === "designs" && (
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

      {/* History Panel */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c0] transition-all duration-700 ease-in-out ${
          expandedPanel === "history"
            ? "h-128"
            : expandedPanel === "designs" || expandedPanel === "introduction"
            ? "h-0"
            : "h-64"
        }`}
        onClick={() => togglePanel("history")}
        style={{
          backgroundImage: `url(${historyBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "History" : "歴史"}
          </h2>
          <div
            className={`text-gray-300  overflow-hidden ${
              expandedPanel === "history"
                ? "h-40 overflow-y-auto custom-scrollbar"
                : expandedPanel === "designs" ||
                  expandedPanel === "introduction"
                ? "h-0"
                : "line-clamp-1"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`history-${historyText}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                {historyText ||
                  (language === "english" ? "Loading..." : "読み込み中...")}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {expandedPanel === "history" && (
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
    </div>
  );
};

export default LeftSection;
