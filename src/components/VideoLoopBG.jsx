import React from "react";

const VideoLoopBG = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="top-0 left-0 w-full h-full object-cover -z-10 absolute bg-black pointer-events-none"
      >
        <source src="/loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        src="black.png"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150"
      />
    </>
  );
};

export default VideoLoopBG;
