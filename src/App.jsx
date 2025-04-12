import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VideoLoopBG from "./components/VideoLoopBG";
import Demo from "./screens/Demo";
import Home from "./screens/Home";
import InfoPage from "./screens/InfoPage";
import SelectCraft from "./screens/SelectCraft";
import VideoPage from "./screens/VideoPage";

const App = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <Router>
      <VideoLoopBG />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/select-craft" element={<SelectCraft />} />
        <Route path="/info-page" element={<InfoPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
