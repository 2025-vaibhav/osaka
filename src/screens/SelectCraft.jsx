import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useLanguage } from "../LanguageContext";

const SelectCraft = ({ onNavigate, sectionId }) => {
  const controls = useAnimation();
  const { language } = useLanguage(sectionId);

  const totalCircles = 5;
  const containerSize = 530;
  const centerCircleSize = 180;
  const outerCircleSize = 130;
  const orbitRadius = (containerSize - outerCircleSize) / 2 - 20;

  // Craft names with translations
  const crafts = {
    english: {
      items: [
        {
          name: "Charkha",
          image: "/craft-buttons/1.png",
          bgImage: "/tags/Charkha.png",
        },
        {
          name: "Block Printing",
          image: "/craft-buttons/2.png",
          bgImage: "/tags/Block Printing.png",
        },
        {
          name: "Bidriware",
          image: "/craft-buttons/3.png",
          bgImage: "/tags/Bidriware.png",
        },
        {
          name: "Zardozi",
          image: "/craft-buttons/4.png",
          bgImage: "/tags/Zardozi.png",
        },
        { name: "Dyeing", image: "/craft-buttons/5.png", bgImage: "/tags/Dyeing.png" },
      ],
      center: {
        name: "Loom Weaving",
        image: "/craft-buttons/6.png",
        bgImage: "/tags/Loom weaving.png",
      },
      title: "Select a craft practice to explore more",
      back: "Back",
    },
    japanese: {
      items: [
        {
          name: "チャルカ",
          image: "/craft-buttons/1.png",
          bgImage: "/tags/Charkha.png",
        },
        {
          name: "ブロック印刷",
          image: "/craft-buttons/2.png",
          bgImage: "/tags/Block Printing.png",
        },
        {
          name: "ビドリ",
          image: "/craft-buttons/3.png",
          bgImage: "/tags/Bidriware.png",
        },
        {
          name: "ザルドジ",
          image: "/craft-buttons/4.png",
          bgImage: "/tags/Zardozi.png",
        },
        { name: "染色", image: "/craft-buttons/5.png", bgImage: "/tags/Dyeing.png" },
      ],
      center: {
        name: "織機織り",
        image: "/craft-buttons/6.png",
        bgImage: "/tags/Loom weaving.png",
      },
      title: "探求する工芸を選択してください",
      back: "戻る",
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleCraftSelect = (craft) => {
    onNavigate("info-page", { selectedCraft: craft });
  };

  // Animation variants
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
      className="relative min-h-full bg-transparent text-[#f2e9c9] flex flex-col items-center justify-center px-4 py-8 overflow-hidden"
    >
      <h2 className="text-xl absolute top-5 md:text-4xl font-serif mb-14 text-center z-10">
        {crafts[language].title}
      </h2>

      <button
        onClick={() => onNavigate("video-page")}
        className="md:px-8 px-2 md:py-3 py-2 absolute md:top-10 top-12 md:left-10 left-6 bg-black/50 md:w-28 w-20 md:text-base text-[12px] border border-white rounded-full text-white hover:bg-white hover:text-black transition"
      >
        {crafts[language].back}
      </button>

      <div className="relative flex items-center">
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
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCraftSelect(crafts[language].center.name)}
            >
            <img
              src={crafts[language].center.image}
              alt={crafts[language].center.name}
              className="w-full h-full object-cover"
              />
          </motion.div>

          {/* Center Reference Box */}
          <motion.div
            variants={centerVariants}
            className="absolute h-fit flex justify-center items-center text-center w-fit"
            onClick={() => handleCraftSelect(crafts[language].center.name)}
            style={{
              top: `calc(50% - ${centerCircleSize / 2 - 180}px)`,
              left: `calc(50% - ${centerCircleSize / 2 - 100}px)`,
              width: "380px", // or any fixed size
              height: "auto",
              backgroundImage: `url(${crafts[language].center.bgImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
          >
            <img
              src={"/tags/Loom weaving.png"}
              alt={"center"}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Outer Circles with Reference Boxes */}
          {crafts[language].items.map((item, idx) => {
            // Custom angles to bring 3rd and 4th circles closer
            let angle;
            if (idx === 0) {
              angle = (360 / totalCircles) * idx - 50; // Charkha (1st)
            } else if (idx === 1) {
              angle = (360 / totalCircles) * idx - 35;
            } else if (idx === 2) {
              // Bidriware (3rd)
              angle = (360 / totalCircles) * idx - 35;
            } else if (idx === 3) {
              // Zardozi (4th)
              angle = (360 / totalCircles) * idx - 50;
            } else {
              angle = (360 / totalCircles) * idx - 55; // Default spacing for others
            }
            const radians = (angle * Math.PI) / 180;
            const circleX =
              Math.cos(radians) * orbitRadius +
              containerSize / 2 -
              outerCircleSize / 2;
            const circleY =
              Math.sin(radians) * orbitRadius +
              containerSize / 2 -
              outerCircleSize / 2;

            // Calculate reference box position with custom offsets for each position
            const getPositionConfig = (index) => {
              const configs = [
                { distance: 190, offset: 5 }, // Top (Charkha)
                { distance: 80, offset: -40 }, // Top-right (Block Printing)
                { distance: 290, offset: 40 }, // Bottom-right (Bidriware)
                { distance: 340, offset: 20 }, // Bottom-left (Zardozi)
                { distance: 320, offset: -20 }, // Top-left (Dyeing)
              ];
              return configs[index];
            };

            const { distance, offset } = getPositionConfig(idx);
            const boxRadians = ((angle + offset) * Math.PI) / 180;
            const boxX =
              Math.cos(boxRadians) * (orbitRadius + distance) +
              containerSize / 2;
            const boxY =
              Math.sin(boxRadians) * (orbitRadius + distance) +
              containerSize / 2;

            return (
              <React.Fragment key={idx}>
                {/* Circle Image */}
                <motion.div
                  variants={circleVariants}
                  custom={idx}
                  className="absolute rounded-full overflow-hidden border border-gray-300 bg-gray-700"
                  style={{
                    width: `${idx !== 0 ? outerCircleSize : 160}px`,
                    height: `${idx !== 0 ? outerCircleSize : 160}px`,
                    left: `${circleX}px`,
                    top: `${circleY}px`,
                  }}
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCraftSelect(item.name)}
                  >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Reference Box */}
                <motion.div
                  variants={buttonVariants}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  className="absolute h-fit flex justify-center items-center text-center w-fit z-10"
                  onClick={() => handleCraftSelect(item.name)}
                  style={{
                    left: `${boxX - 80}px`,
                    top: `${boxY - 32}px`,
                    transform: "translate(-50%, -50%)",
                    width: "380px", // or any fixed size
                    height: "auto",
                    // transformOrigin: 'center',
                    // transform: `rotate(${angle + offset}deg) translateX(${distance/2}px) rotate(-${angle + offset}deg)`,
                  }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95, filter: "brightness(0.8)" }}
                >
                  <img
                    src={item.bgImage}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SelectCraft;
