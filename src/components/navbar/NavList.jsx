import React from "react";
import { navList } from "@/constants";

export const NavList = () => {
  return (
    <ul className="flex gap-x-5">
      {navList.map((item) => (
        <React.Fragment key={item}>
          <li className="p-2 text-gray-200 hover:text-white transition-all ease-in-out delay-100">
            <a href="#">{item}</a>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};
