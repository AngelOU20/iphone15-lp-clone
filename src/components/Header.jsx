import { DesktopNav, MobileNav } from "./navbar";

export const Header = () => {
  return (
    <header className="w-full bg-black">
      <div className="max-[1100px]:hidden h-10">
        <DesktopNav />
      </div>

      <div className="min-[1100px]:hidden h-10">
        <MobileNav />
      </div>
    </header>
  );
};
