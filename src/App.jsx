import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Section from "./components/Section";
import { LanguageProvider } from "./LanguageContext";

const App = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const sectionClass =
    "h-[1026px] border border-zinc-700 w-[1856px] z-10 relative rounded-[56px] overflow-hidden";

  return (
    <LanguageProvider>
      <Router>
        <div className="grid grid-cols-2 grid-rows-2 gap-11 p-8 bg-[#0a0a0a]">
          <Section
            sectionId="section1"
            className={`${sectionClass} rotate-180`}
          />
          <Section
            sectionId="section2"
            className={`${sectionClass} rotate-180`}
          />
          <Section sectionId="section3" className={sectionClass} />
          <Section sectionId="section4" className={sectionClass} />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
