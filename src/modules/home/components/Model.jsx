import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ModelView } from "./";
import { yellowImg } from "@/utils";
import {
  animateWithGsap,
  animateWithGsapTimeline,
} from "@/utils/animations.js";
import { models, sizes } from "@/constants";

import * as THREE from "three";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-120%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size, smallRotation, largeRotation, tl]);

  useGSAP(() => {
    animateWithGsap("#heading", { opacity: 1, y: 0 });
  }, []);

  // animación del toggle
  const sizeBallRef = useRef();

  useEffect(() => {
    const sizeIndex = sizes.findIndex(({ value }) => value === size);
    const newPosition = sizeIndex * 54; // Ajusta según el ancho de cada botón
    gsap.to(sizeBallRef.current, {
      x: newPosition,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [size]);

  return (
    <section className="w-screen h-full overflow-hidden common-padding">
      <div className="md:max-w-screen-xl mx-auto md:px-2">
        <h3 id="heading" className="section-heading px-4">
          Take a closer look.
        </h3>

        <div className="flex flex-col items-center mt-5">
          <div className="w-10/12 md:w-full h-[65vh] md:h-[70vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className={`w-6 h-6 rounded-full mx-2 cursor-pointer ${
                      model.title === item.title
                        ? "outline outline-2 outline-white/90 ring-4"
                        : ""
                    }`}
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <div className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      zIndex: 1,
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
                <span
                  ref={sizeBallRef}
                  className="absolute z-0 bg-white ring-2 rounded-full w-12 h-12 shadow transform-gpu"
                  style={{
                    top: "50%",
                    left: "9%",
                    transform: "translateY(-50%)",
                  }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
