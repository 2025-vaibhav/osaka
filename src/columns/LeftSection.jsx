"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const LeftSection = ({ selectedCraft }) => {
  const { language } = useLanguage();
  const [craftData, setCraftData] = useState(null);
  const [introText, setIntroText] = useState("");
  const [designText, setDesignText] = useState("");
  const [historyText, setHistoryText] = useState("");
  const [processes, setProcesses] = useState([]);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);

  useEffect(() => {
    fetch("/english-data.json")
      .then((res) => res.json())
      .then((data) => {
        setCraftData(data);
        updateCraftInfo(data, selectedCraft);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, []);

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
      height: "5rem",
      width: "5rem",
    },
    expanded: {
      borderRadius: "3rem",
      height: "10rem",
      width: "100%",
    },
  };

  return (
    <div className="w-[25%] flex flex-col gap-4 pr-4">
      {/* Introduction Panel */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c9] transition-all duration-700 ease-in-out ${
          expandedPanel === "introduction" ? "h-80" : "h-32"
        }`}
        onClick={() => togglePanel("introduction")}
      >
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "Introduction" : "紹介"}
          </h2>
          <div
            className={`text-gray-300 text-sm overflow-hidden ${
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
                    layout // This enables layout animations
                  >
                    <motion.div
                      className={`select-none overflow-hidden bg-black/40 border-1 border-[#f2e9c0] flex items-center justify-center mb-2`}
                      variants={circleVariants}
                      initial="collapsed"
                      animate={
                        selectedCircle === index ? "expanded" : "collapsed"
                      }
                      transition={{ type: "spring", damping: 20 }}
                      onClick={(e) => handleCircleClick(index, e)}
                    >
                      {selectedCircle === index ? (
                        <div className="p-4 text-white w-full h-full flex flex-col">
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
                              className="text-sm flex-grow text-center overflow-hidden"
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
                          className="text-white text-xs text-center px-1"
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
                      className={`select-none overflow-hidden bg-black/40 border-1 border-[#f2e9c0] flex items-center justify-center mb-2`}
                      variants={circleVariants}
                      initial="collapsed"
                      animate={
                        selectedCircle === index ? "expanded" : "collapsed"
                      }
                      transition={{ type: "spring", damping: 20 }}
                      onClick={(e) => handleCircleClick(index, e)}
                    >
                      <motion.span
                        className="text-white text-sm text-center px-1"
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
            ? "h-64"
            : expandedPanel === "history"
            ? "h-0"
            : "h-32"
        }`}
        onClick={() => togglePanel("designs")}
      >
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "Designs" : "デザイン"}
          </h2>
          <div
            className={`text-gray-300 text-sm overflow-hidden ${
              expandedPanel === "designs"
                ? "h-40 overflow-y-auto custom-scrollbar"
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
      </div>

      {/* History Panel */}
      <div
        className={`rounded-xl overflow-hidden relative bg-black/40 border-1 border-[#f2e9c0] transition-all duration-700 ease-in-out ${
          expandedPanel === "history"
            ? "h-64"
            : expandedPanel === "designs" || expandedPanel === "introduction"
            ? "h-0"
            : "h-32"
        }`}
        onClick={() => togglePanel("history")}
      >
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute p-4 z-20 flex flex-col justify-end">
          <h2 className="text-2xl font-serif italic text-white">
            {language === "english" ? "History" : "歴史"}
          </h2>
          <div
            className={`text-gray-300 text-sm overflow-hidden ${
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
      </div>
    </div>
  );
};

export default LeftSection;
