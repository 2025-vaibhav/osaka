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

  const sectionClass = "h-[1026px] border border-white w-[1856px] relative rounded-[56px] overflow-hidden";

  return (
    <LanguageProvider>
      <Router>
        <div className="grid grid-cols-2 grid-rows-2 gap-8 p-8">
          <Section 
            sectionId="section1" 
            className={`${sectionClass} rotate-180`} 
          />
          <Section 
            sectionId="section2" 
            className={`${sectionClass} rotate-180`} 
          />
          <Section 
            sectionId="section3" 
            className={sectionClass} 
          />
          <Section 
            sectionId="section4" 
            className={sectionClass} 
          />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
