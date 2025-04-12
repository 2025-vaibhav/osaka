import React from "react";

const VideoLoopBG = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 bg-black pointer-events-none"
      >
        <source src="/loop1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        src="black.png"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150"
      />
    </div>
  );
};

export default VideoLoopBG;
