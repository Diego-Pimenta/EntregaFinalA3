import React from "react";
import s from "./welcome.module.css";
import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo-image.png";
import steam from "../../assets/steam.png";
import epic from "../../assets/epic.png";
import origin from "../../assets/origin.png";
import xbox from "../../assets/xbox.png";
import ps from "../../assets/ps.png";

import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className={s.tela_desktop}>
      <div className={s.bg_image}>
        <img src={bgImage} alt="bg-image" />
      </div>

      <div className={s.container_header}>
        <img src={logo} alt="logo-image" width="100" />
      </div>

      <div className={s.container_main}>
        <div className={s.container_title}>
          <h1>
            CRIE A SUA PRÓPRIA
            <br />
            <span className={s.span_title}>BIBLIOTECA DE JOGOS</span>
          </h1>
        </div>

        <div className={s.container_plataforms}>
          <ul className={s.plataforms_list}>
            <li>
              <img src={steam} alt="steam-logo" />
            </li>
            <li>
              <img src={epic} alt="epic-logo" />
            </li>
            <li>
              <img src={origin} alt="origin-logo" />
            </li>
            <li>
              <img src={xbox} alt="xbox-logo" />
            </li>
            <li>
              <img src={ps} alt="ps-logo" />
            </li>
          </ul>
        </div>
        <div className={s.container_btn}>
          <Link to="/login">
            <button className={s.btn}>FAZER LOGIN</button>
          </Link>
          <Link to="/register">
            <button className={s.btn}>CADASTRE-SE</button>
          </Link>
        </div>
      </div>
      <div className={s.container_footer}>
        <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
      </div>
    </div>
  );
};
