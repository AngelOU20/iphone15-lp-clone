import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { searchImg, bagImg } from "@/utils";
import { AppleIcon } from "@/components";
// import { navList } from "@/constants";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(".line1", { rotation: 45, y: 4, duration: 0.3 });
      gsap.to(".line2", { rotation: -45, y: -4, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(".line1", { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(".line2", { rotation: 0, y: 0, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <nav className="w-full bg-black text-white">
      <div className="flex justify-between items-center p-3">
        <AppleIcon className="w-5 h-5 cursor-pointer" />
        <div className="flex items-center gap-8">
          <img src={searchImg} className="mobile-icon" alt="search" />
          <img src={bagImg} className="mobile-icon" alt="bag" />
          <div
            className="flex flex-col justify-center gap-y-1.5 w-6 h-6 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="line1 w-4 h-0.5 bg-white"></div>
            <div className="line2 w-4 h-0.5 bg-white"></div>
          </div>
        </div>
      </div>
      {/* <div
        ref={menuRef}
        className="overflow-hidden bg-black text-white"
        style={{ height: 0 }}
      >
        <ul className="flex flex-col gap-y-4 p-4">
          {navList.map((item) => (
            <li key={item}>
              <a href="#" className="text-gray-200 hover:text-white transition-all ease-in-out delay-100">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div> */}
    </nav>
  );
};
