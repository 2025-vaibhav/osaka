import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const SelectCraft = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const { language } = useLanguage();

  const totalCircles = 5;
  const containerSize = 530;
  const centerCircleSize = 180;
  const outerCircleSize = 130;
  const orbitRadius = (containerSize - outerCircleSize) / 2 - 20;

  // Craft names with translations
  const crafts = {
    english: {
      leftBoxes: ["Dyeing", "Zardozi", "Bidriware"],
      rightBoxes: ["Charkha", "Block Printing", "Loom Weaving"],
      title: "Select a craft practice to explore more",
      back: "Back",
    },
    japanese: {
      leftBoxes: ["染色", "ザルドジ", "ビドリ"],
      rightBoxes: ["チャルカ", "ブロック印刷", "織機織り"],
      title: "探求する工芸を選択してください",
      back: "戻る",
    },
  };

  // Image paths for each circle
  const circleImages = [
    "/craft/1.png",
    "/craft/2.png",
    "/craft/3.png",
    "/craft/4.png",
    "/craft/5.png",
  ];

  const centerImage = "/craft/6.png";

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const rightButtonVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const centerVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-transparent text-[#D4D090] flex flex-col items-center justify-center px-4 py-8 overflow-hidden"
    >
      <h2 className="text-[32px] absolute top-[30px] font-serif mb-14 text-center z-10">
        {crafts[language].title}
      </h2>

      <button
        onClick={() => navigate("/video-page")}
        className="w-[80px] h-[32px] text-[8px] absolute top-[54px] left-[100px] bg-black/50 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
      >
        {crafts[language].back}
      </button>

      <div className="relative flex items-center">
        {/* Left Boxes */}
        <div className="flex fixed flex-col justify-center gap-16 left-60 z-10">
          {crafts[language].leftBoxes.map((item, index) => (
            <motion.button
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              onClick={() =>
                navigate("/info-page", { state: { selectedCraft: item } })
              }
              className={`gradient-box small-card w-[174px] h-[68px] flex justify-center items-center border-gray-400 rounded-md text-center ${
                index === 1 ? "-ml-12" : ""
              }`}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Central Circle with Outer Circles */}
        <motion.div
          className="relative"
          style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
        >
          {/* Center Circle */}
          <motion.div
            variants={centerVariants}
            className="absolute rounded-full overflow-hidden border border-gray-300 bg-gray-700 z-10"
            style={{
              top: `calc(50% - ${centerCircleSize / 2}px)`,
              left: `calc(50% - ${centerCircleSize / 2}px)`,
              width: `${centerCircleSize}px`,
              height: `${centerCircleSize}px`,
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <img
              src={centerImage}
              alt="Center Craft"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Outer Circles */}
          {Array.from({ length: totalCircles }).map((_, idx) => {
            const angle = (360 / totalCircles) * idx - 90;
            const radians = (angle * Math.PI) / 180;
            const x =
              Math.cos(radians) * orbitRadius +
              containerSize / 2 -
              outerCircleSize / 2;
            const y =
              Math.sin(radians) * orbitRadius +
              containerSize / 2 -
              outerCircleSize / 2;

            return (
              <motion.div
                key={idx}
                variants={circleVariants}
                custom={idx}
                className="absolute rounded-full overflow-hidden border border-gray-300 bg-gray-700"
                style={{
                  width: `${outerCircleSize}px`,
                  height: `${outerCircleSize}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                whileHover={{ scale: 1.1, zIndex: 20 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={circleImages[idx]}
                  alt={
                    crafts[language].leftBoxes[idx] ||
                    crafts[language].rightBoxes[
                      idx - crafts[language].leftBoxes.length
                    ]
                  }
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Boxes */}
        <div className="flex fixed flex-col justify-center gap-16 right-48 z-10">
          {crafts[language].rightBoxes.map((item, index) => (
            <motion.button
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rightButtonVariants}
              onClick={() =>
                navigate("/info-page", { state: { selectedCraft: item } })
              }
              className={`gradient-box small-card w-[174px] h-[68px] flex justify-center items-center border-gray-400 rounded-md text-center ${
                index === 1 ? "ml-12" : ""
              }`}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SelectCraft;
