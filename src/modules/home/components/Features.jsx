import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "@/utils/animations.js";
import { explore1Img, explore2Img, exploreVideo } from "@/utils";
import { useRef } from "react";
import gsap from "gsap";

export const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    animateWithGsap("#title-feat", { opacity: 1, y: 0 });

    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );

    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="w-screen h-full overflow-hidden common-padding bg-zinc">
      <div className="md:max-w-screen-xl mx-auto md:px-2">
        <h3 id="title-feat" className="section-heading px-4 md:px-0">
          Explore the full story.
        </h3>

        <div className="md:mb-24 mb-12 md:pl-32 pl-20 md:mt-40 mt-20 w-11/12 md:w-full">
          <h4 className="text-4xl lg:text-7xl font-semibold">
            iPhone. <br />
            Forged in titanium.
          </h4>
        </div>

        <div className="flex flex-col items-center overflow-hidden">
          <div className="flex-center flex-col w-full md:w-11/12 sm:px-10">
            <div className="relative h-[50vh] w-full flex justify-center items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex items-center flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium 2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
