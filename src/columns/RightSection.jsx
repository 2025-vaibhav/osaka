import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import { useLanguage } from "../LanguageContext";

const RightSection = ({ selectedCraft, sectionId }) => {
  const { language } = useLanguage(sectionId);
  const [craftData, setCraftData] = useState(null);
  const [toolsText, setToolsText] = useState("");
  const [activeText, setActiveText] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const buttonTexts = {
    english: [
      "The loom produces a rhythmic clack-clack as the shuttle shoots back and forth through the threads. You can also hear a soft thud when the beater presses the weft into place, along with the occasional swish of yarn being adjusted or pulled tight.",
      "The scraping produces a coarse, grating noise—shhhrrrk, shhhrrrkclink, clink—as the artisan strikes tools against the metal surface. The scraping produces a coarse, grating noise—shhhrrrk, shhhrrrk—as a pointed tool is dragged to carve fine patterns into the alloy.",
      "Block printing creates a thump or thud as the wooden block is pressed firmly onto the fabric. You might also hear a light squeezing sound when the block picks up ink or dye. A soft tap-tap as artisans align and stamp the block repeatedly across the cloth.",
      "Dyeing involves the gentle sloshing and swishing of fabric being dipped into solution of dye. You might also hear dripping water as the cloth is lifted out, and the squeeze or squelch of excess dye being wrung out by hand.",
      "The charkha produces a soft, continuous whirr as the wheel spins. Among various sounds, one is a gentle click or creak from the wooden parts, along with the faint zip of fibre twisting into thread between the fingers.",
      "Zardozi work creates a soft prick-prick sound as the needle pierces the stretched fabric. The faint tink of varies in its volume when metal threads or sequins brush against each other. And the occasional rustle of the fabric during varies process of embellishing the textile.",
    ],
    japanese: [
      "織機は、シャトルが糸の間を往復するたびに、カチカチというリズミカルな音を立てます。また、ビーターが緯糸を所定の位置に押し込むときに、かすかなドスンという音も聞こえ、時折、糸を調整したり、きつく引っ張ったりするときに、シューッという音が聞こえます。",
      "職人が金属の表面に道具をこすりつけると、その削りくずのような粗い音（シュッ、シュッ、チリン、チリン）が生まれます。先の尖った道具を滑らせて合金に細かい模様を刻むと、その削りくずのような粗い音（シュッ、シュッ、チリン）が生まれます。",
      "木版捺染では、木版が布にしっかりと押し付けられるため、ドンドンという音がします。また、版がインクや染料を吸収する際に、軽く押すような音が聞こえることもあります。職人が版を布に合わせ、繰り返し押し付ける際に、柔らかく「トントン」という音が聞こえます。",
      "染色は、布を染料溶液に浸し、優しく揺すったり、振ったりしながら行います。布を引き上げる際に水が滴る音や、余分な染料を手で絞り出す際に水が滴る音も聞こえるかもしれません。",
      "チャルカは、車輪が回転するたびに、柔らかく、持続的な音を発します。様々な音の中には、木製の部品から発せられる穏やかなカチッという音や、きしむ音、そして指の間で繊維が糸に絡み合うかすかな音などがあります。",
      "ザルドジ細工は、針が張られた布地を刺すときに、柔らかな「チクチク」という音を生み出します。金属糸やスパンコールが擦れ合うと、かすかな「チリンチク」という音が聞こえ、音量は変化します。そして、織物に装飾を施す様々な工程で、時折、布地が擦れる音も聞こえます。",
    ],
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
