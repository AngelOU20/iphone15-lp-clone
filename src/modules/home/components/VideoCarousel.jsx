import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";
import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // animación deslizante para desplazar el vídeo fuera de la pantalla e introducir el siguiente vídeo
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // animación de vídeo para reproducir el vídeo cuando está en la vista
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animación para mover el indicador
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // obtener el progreso del vídeo
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // establecer la anchura de la barra de progreso
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "2rem" // mobile
                  : window.innerWidth < 1200
                  ? "3rem" // tablet
                  : "3rem", // laptop
              // ease: "back.out",
            });

            // establecer el color de fondo de la barra de progreso
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // al finalizar el vídeo, sustituir la barra de progreso por el indicador y cambiar el color de fondo
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

      if (videoId == 0) {
        anim.restart();
      }

      // actualizar la barra de progreso
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker para actualizar la barra de progreso
        gsap.ticker.add(animUpdate);
      } else {
        // quitar el ticker cuando el vídeo está en pausa (la barra de progreso se detiene)
        gsap.ticker.remove(animUpdate);
      }

      // Terminar la animación
      return () => {
        gsap.ticker.remove(animUpdate);
        // gsap.killTweensOf(videoDivRef.current[videoId]);
        // gsap.killTweensOf(span[videoId]);
      };
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "change-video":
        videoRef.current[videoId].pause();
        videoRef.current[videoId].currentTime = 0;

        // gsap.to(videoSpanRef.current[videoId], {
        //   width: "0.5rem",
        //   backgroundColor: "#afafaf",
        //   delay: 0.1,
        // });

        gsap.to("#slider", {
          transform: `translateX(${-100 * i}%)`,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setVideo((pre) => ({
              ...pre,
              videoId: i,
              startPlay: true,
              isPlaying: true,
            }));
          },
        });
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

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
                    playsInline={true}
                    preload="auto"
                    muted
                    ref={(e) => (videoRef.current[i] = e)}
                    onEnded={() =>
                      i !== 3
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last")
                    }
                    onPlay={() =>
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }))
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
                  {item.textLists.map((text, i) => (
                    <p key={i} className="md:text-2xl text-xl font-medium">
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
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(e) => (videoDivRef.current[i] = e)}
              onClick={() => handleProcess("change-video", i)}
              className="mx-2 my-1 w-2 h-2 bg-gray-100 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(e) => (videoSpanRef.current[i] = e)}
              />
            </span>
          ))}
        </div>

        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
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
