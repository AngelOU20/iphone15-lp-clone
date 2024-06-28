import { footerLinks } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-screen h-full overflow-hidden py-5 sm:px-10 px-5">
      <div className="md:max-w-screen-xl mx-auto md:px-2">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">Find an Apple Store </span>
            or <span className="underline text-blue">other retailer</span> near
            you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 000800-040-1966
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Clone of the iPhone 15 landing page. Created by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/AngelOU20"
              className="text-blue-500"
            >
              AngelOU20
            </a>
            . All rights to original content and design belong to Apple Inc.
          </p>

          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
