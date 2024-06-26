import gsap from "gsap";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";
import { useGSAP } from "@gsap/react";

const useVideoAnimation = (video, setVideo) => {
  const { isEnd, videoId } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);
};

const useVideoProgressAnimation = (
  video,
  videoSpanRef,
  videoDivRef,
  videoRef
) => {
  const { isPlaying, videoId } = video;

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: getProgressBarWidth(),
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "0.5rem",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) anim.restart();

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, isPlaying]);
};

const getProgressBarWidth = () => {
  if (window.innerWidth < 760) return "2rem";
  if (window.innerWidth < 1200) return "3rem";
  return "3rem";
};

const useVideoPlaybackControl = (video, videoRef, loadedData) => {
  const { startPlay, videoId, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else if (startPlay) {
        videoRef.current[videoId].play();
      }
    }

    if (videoId === 2) {
      videoRef.current[videoId].playbackRate = 0.5;
    }
  }, [startPlay, videoId, isPlaying, loadedData]);
};

export const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isLastVideo, isPlaying, videoId } = video;

  useVideoAnimation(video, setVideo);
  useVideoProgressAnimation(video, videoSpanRef, videoDivRef, videoRef);
  useVideoPlaybackControl(video, videoRef, loadedData);

  const handleVideoEnd = (index) => {
    if (index !== 3) {
      handleProcess("video-end", index);
    } else {
      handleProcess("video-last");
    }
  };

  const setVideoRef = useCallback((el, i) => {
    videoRef.current[i] = el;
  }, []);

  const setVideoDivRef = useCallback((el, i) => {
    videoDivRef.current[i] = el;
  }, []);

  const setVideoSpanRef = useCallback((el, i) => {
    videoSpanRef.current[i] = el;
  }, []);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
        break;
      case "pause":
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "change-video":
        videoRef.current[videoId].pause();
        videoRef.current[videoId].currentTime = 0;
        gsap.to("#slider", {
          transform: `translateX(${-100 * i}%)`,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setVideo((prev) => ({
              ...prev,
              videoId: i,
              startPlay: true,
              isPlaying: true,
              isLastVideo: false,
            }));
          },
        });
        break;
      default:
        break;
    }
  };

  const handleLoadedMetaData = useCallback((i, e) => {
    setLoadedData((prev) => [...prev, e]);
  }, []);

  return (
    <>
      <div className="flex items-center px-0 md:px-4">
        {hightlightsSlides?.map((item, i) => (
          <React.Fragment key={item.id}>
            <div id="slider" className="sm:pr-20 pr-0">
              <div className="video-carousel_container">
                <div className="bg-black overflow-hidden md:w-full md:h-full w-screen h-[35rem] flex-center rounded-none md:rounded-3xl">
                  <video
                    id="video"
                    className={`${
                      item.id === 2 && "md:translate-x-44 translate-x-16"
                    } pointer-events-none`}
                    playsInline={true}
                    preload="auto"
                    muted
                    ref={(el) => setVideoRef(el, i)}
                    onEnded={() => handleVideoEnd(i)}
                    onPlay={() =>
                      setVideo((prev) => ({ ...prev, isPlaying: true }))
                    }
                    onClick={() =>
                      handleProcess(
                        isLastVideo
                          ? "video-reset"
                          : !isPlaying
                          ? "play"
                          : "pause"
                      )
                    }
                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                  {item.textLists.map((text, index) => (
                    <p key={index} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-4 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => setVideoDivRef(el, i)}
              onClick={() => handleProcess("change-video", i)}
              className="mx-2 my-1 w-2 h-2 bg-gray-100 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => setVideoSpanRef(el, i)}
              />
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={() =>
            handleProcess(
              isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause"
            )
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};
