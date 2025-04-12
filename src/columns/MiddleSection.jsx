import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const MiddleSection = ({ selectedCraft }) => {
  const { language } = useLanguage();
  const [craftData, setCraftData] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    // Set hero image and gallery images based on selected craft
    let craftPath = "";
    let imageCount = 0;

    switch (selectedCraft.toLowerCase()) {
      case "bidriware":
      case "ビドリ":
        craftPath = "bidriware";
        imageCount = 8;
        setHeroImage("/vinod-pics/bidriware/hero.png");
        break;
      case "zardozi":
      case "ザルドジ":
        craftPath = "zardozi";
        imageCount = 5;
        setHeroImage("/vinod-pics/zardozi/hero.png");
        break;
      case "charkha":
      case "チャルカ":
        craftPath = "charkha";
        imageCount = 6;
        setHeroImage("/vinod-pics/charkha/hero.png");
        break;
      case "loom weaving":
      case "織機織り":
        craftPath = "loom-weaving";
        imageCount = 6;
        setHeroImage("/vinod-pics/loom-weaving/hero.png");
        break;
      case "dyeing":
      case "染色":
        craftPath = "dyeing";
        imageCount = 6;
        setHeroImage("/vinod-pics/dyeing/hero.png");
        break;
      case "block printing":
      case "ブロック印刷":
        craftPath = "block-printing";
        imageCount = 5;
        setHeroImage("/vinod-pics/block-printing/hero.png");
        break;
      default:
        setHeroImage("");
        setSlideImages([]);
        return;
    }

    // Generate the gallery image paths
    const images = [];
    for (let i = 1; i <= imageCount; i++) {
      images.push(
        `/vinod-pics/${craftPath}/gallery/${i}.${
          i === imageCount ? "jpeg" : "png"
        }`
      );
    }
    setSlideImages(images);
    setCurrentSlide(0); // Reset to first slide when craft changes

    fetch("/english-data.json")
      .then((res) => res.json())
      .then((data) => {
        setCraftData(data);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, [selectedCraft]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-[45%] flex flex-col gap-4">
      {/* Title Section with Hero Image */}
      <div
        className="rounded-xl overflow-hidden h-32 relative bg-black/40 border-1 border-[#f2e9c9]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={selectedCraft || "default"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-serif italic text-white text-center"
            >
              {selectedCraft || (language === "english" ? "Craft" : "工芸")}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="rounded-xl overflow-hidden flex-grow relative bg-black/40 border-1 border-[#f2e9c9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slideImages[currentSlide]})` }}
          ></motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute top-0 left-0 p-4 z-20 w-full">
          <h2 className="text-2xl font-serif italic p-5 text-white">
            {language === "english" ? "Photo Gallery" : "写真ギャラリー"}
          </h2>
        </div>

        {/* Navigation buttons only show if there are images */}
        {slideImages.length > 0 && (
          <>
            {/* Previous Button */}
            <motion.button
              onClick={goToPrevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-6 bottom-5 rounded-full text-white text-5xl transition-all flex items-center justify-center z-30 p-3 cursor-pointer"
            >
              <i className="bi bi-arrow-left-circle"></i>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={goToNextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 bottom-5 rounded-full text-white text-5xl transition-all flex items-center justify-center z-30 p-3 cursor-pointer"
            >
              <i className="bi bi-arrow-right-circle"></i>
            </motion.button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
              {slideImages.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentSlide === index ? "bg-white" : "bg-gray-400"
                  }`}
                  animate={{
                    scale: currentSlide === index ? 1.25 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                  aria-label={`${
                    language === "english" ? "Go to photo" : "写真へ"
                  } ${index + 1}`}
                ></motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiddleSection;
