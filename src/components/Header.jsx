import { DesktopNav, MobileNav } from "./navbar";

export const Header = () => {
  return (
    <header className="w-full bg-black">
      <div className="h-11 hidden md:block">
        <DesktopNav />
      </div>

      <div className="min-[900px]:hidden">
        <MobileNav />
      </div>
    </header>
  );
};
