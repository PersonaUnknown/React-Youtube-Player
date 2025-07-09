import { useMediaFullscreenRef } from "media-chrome/dist/react/media-store.js";
import type { ReactNode } from "react";

const VideoContainer = ({ children }: VideoContainerProps) => {
  const fullscreenRefCallback = useMediaFullscreenRef();
  return (
    <div
      id="fullscreen"
      className="bg-black w-[100vw] flex"
    //   className="w-full aspect-[9/16] md:aspect-[16/9] relative bg-black"
      
        ref={fullscreenRefCallback}
    >
      {children}
    </div>
  );
};

interface VideoContainerProps {
    children: ReactNode;
}

export default VideoContainer;