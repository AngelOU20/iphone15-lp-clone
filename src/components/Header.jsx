import { DesktopNav, MobileNav } from "./navbar";

export const Header = () => {
  return (
    <header className="w-full bg-black">
      <div className="max-[900px]:hidden h-10">
        <DesktopNav />
      </div>

      <div className="min-[900px]:hidden h-10">
        <MobileNav />
      </div>
    </header>
  );
};
