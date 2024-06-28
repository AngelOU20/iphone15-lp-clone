import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "@/utils";
import { animateWithGsap } from "@/utils/animations.js";

export const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="w-screen h-full overflow-hidden common-padding">
      <div className="md:max-w-screen-xl mx-auto md:px-2">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h4 className="hiw-title mb-10">
            A17 Pro chip. <br />A monster win for gaming.
          </h4>
          <p className="hiw-subtitle">
            It’s here. The biggest redesign in the history of Apple GPUs.
          </p>

          <div className="w-10/12 mt-10 md:mt-20 mb-14">
            <div className="relative h-full flex-center">
              <div className="overflow-hidden">
                <img
                  src={frameImg}
                  alt="frame"
                  className="bg-transparent relative z-10"
                />
              </div>
              <div className="hiw-video">
                <video
                  className="pointer-events-none"
                  playsInline
                  preload="none"
                  muted
                  autoPlay
                  ref={videoRef}
                >
                  <source src={frameVideo} type="video/mp4" />
                </video>
              </div>
            </div>
            <p className="text-gray font-semibold text-center mt-3">
              Honkai: Star Rail
            </p>
          </div>

          <div className="md:w-4/5 px-16 md:px-20 gap-5 md:gap-24 flex flex-col md:flex-row justify-center items-start">
            <div className="md:w-1/2">
              <p className="hiw-text mb-5 g_fadeIn">
                A17 Pro is an entirely new class of iPhone chip that delivers
                our{" "}
                <span className="text-white">
                  best graphics performance by far.
                </span>
              </p>

              <p className="hiw-text g_fadeIn">
                Mobile{" "}
                <span className="text-white">
                  games will look and feel so immersive
                </span>
                , with incredibly detailed environments and more realistic
                characters. And with industry-leading speed and efficiency, A17
                Pro takes fast and runs with it.
              </p>
            </div>
            <div className="md:w-1/2 g_fadeIn">
              <p className="hiw-text">New</p>
              <p className="hiw-bigtext">Pro-class GPU</p>
              <p className="hiw-text">with 6 cores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
