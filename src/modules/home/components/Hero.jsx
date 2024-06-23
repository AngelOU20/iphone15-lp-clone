import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "@/utils";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";

export const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("reisze", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 1.5 });
    gsap.to("#cta_btn", { opacity: 1, delay: 2, y: -50 });
    gsap.to("#cta_feature", { opacity: 1, delay: 2.2, y: -50 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="md:max-w-screen-xl mx-auto h-full px-4 md:px-2 flex flex-col justify-center">
        <div className="h-2/3 md:h-2/3 w-full flex flex-col items-center justify-center">
          <h1 id="hero" className="hero-title">
            iPhone 15 Pro
          </h1>
          <div className="md:w-11/12 w-full">
            <video
              className="pointer-events-none"
              autoPlay
              muted
              playsInline={true}
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 translate-y-20">
          <a id="cta_btn" href="#" className="btn opacity-0">
            Buy
          </a>
          <p
            id="cta_feature"
            className="text-lg md:text-xl font-bold text-center opacity-0"
          >
            From $999 or $41.62/mo. for 24 mo.1
          </p>
        </div>
      </div>
    </section>
  );
};
