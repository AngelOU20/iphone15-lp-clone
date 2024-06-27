import { useGSAP } from "@gsap/react";
import { watchImg, rightImg } from "@/utils";
import { animateWithGsap } from "@/utils/animations.js";
import { VideoCarousel } from "./";

export const Highlights = () => {
  useGSAP(() => {
    animateWithGsap("#title", { opacity: 1, y: 0 });
    animateWithGsap(".link-animated", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen h-full overflow-hidden common-padding bg-zinc"
    >
      <div className="md:max-w-screen-xl mx-auto md:px-2">
        <div className="flex flex-col md:flex-row flex-wrap md:items-end justify-between gap-6 md:gap-0 px-4 mb-10">
          <h2 id="title" className="highlights-title">
            Get the highlights.
          </h2>

          <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-10">
            <div className="link-animated flex opacity-0 translate-y-20">
              <a className="link">Watch the film</a>
              <img
                src={watchImg}
                alt="play"
                className="mt-1 ml-2 cursor-pointer"
              />
            </div>
            <div className="link-animated flex opacity-0 translate-y-20">
              <a className="link">Watch the event</a>
              <img
                src={rightImg}
                alt="right"
                className="mt-1 ml-2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};
