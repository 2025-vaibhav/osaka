import React from "react";

const VideoLoopBG = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      className="fixed top-0 left-0 w-full h-full object-cover -z-10 bg-black pointer-events-none"
    >
      <source src="/loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoLoopBG;
