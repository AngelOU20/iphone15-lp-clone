import { AppleIcon, NavList } from "@/components";
import { searchImg, bagImg } from "@/utils";

export const DesktopNav = () => {
  return (
    <nav className="md:flex md:max-w-screen-2xl mx-auto px-4 md:px-2 h-full justify-center items-center text-xs gap-x-8">
      <div className="cursor-pointer text-white/90 hover:text-white transition-all ease-in-out delay-100">
        <AppleIcon className="w-4 h-4" />
      </div>
      <NavList />
      <div className="flex items-center gap-x-8 cursor-pointer">
        <img src={searchImg} className="w-3.5 h-3.5" alt="search" />
        <img src={bagImg} className="w-3.5 h-3.5" alt="search" />
      </div>
    </nav>
  );
};
