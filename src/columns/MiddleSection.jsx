import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const MiddleSection = ({ selectedCraft }) => {
  const { language } = useLanguage();
  const [craftData, setCraftData] = useState(null);
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    // Set hero image based on selected craft
    switch (selectedCraft.toLowerCase()) {
      case "bidriware":
      case "ビドリ":
        setHeroImage("/vinod-pics/bidriware/hero.png");
        break;
      case "zardozi":
      case "ザルドジ":
        setHeroImage("/vinod-pics/zardozi/hero.png");
        break;
      case "charkha":
      case "チャルカ":
        setHeroImage("/vinod-pics/charkha/hero.png");
        break;
      case "loom weaving":
      case "織機織り":
        setHeroImage("/vinod-pics/loom-weaving/hero.png");
        break;
      case "dyeing":
      case "染色":
        setHeroImage("/vinod-pics/dyeing/hero.png");
        break;
      case "block printing":
      case "ブロック印刷":
        setHeroImage("/vinod-pics/block-printing/hero.png");
        break;
      default:
        setHeroImage("");
    }

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
  const slideImages = [
    "https://media.istockphoto.com/id/1442179368/photo/maldives-island.jpg?s=612x612&w=0&k=20&c=t38FJQ6YhyyZGN91A8tpn3nz9Aqcy_aXolImsOXOZ34=",
    "https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=",
    "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=",
  ];

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
      </div>
    </div>
  );
};

export default MiddleSection;
