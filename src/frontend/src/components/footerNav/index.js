import React from "react";
import { Link } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { IoMdHelpCircleOutline } from "react-icons/io";

import lib from "../../assets/lib.png";

import s from "./footerNav.module.css";

export const FooterNav = () => {
  return (
    <div className={s.container_nav}>
      <ul className={s.nav}>
        <li>
          <Link to={"/home"}>
            <BiSolidHome />
          </Link>
        </li>
        <li>
          <Link to={"/library"}>
            <img src={lib} alt="lib-logo" />
          </Link>
        </li>
        <li>
          <Link to={"/help"}>
            <IoMdHelpCircleOutline />
          </Link>
        </li>
      </ul>
    </div>
  );
};
