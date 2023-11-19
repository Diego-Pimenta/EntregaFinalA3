import React from "react";
import "./welcome.css";
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
    <div className="tela-desktop">
      <div className="bg-image">
        <img src={bgImage} alt="bg-image" />
      </div>

      <div className="container-header">
        <img src={logo} alt="logo-image" width="100" />
      </div>

      <div className="container-main">
        <div className="container-title">
          <h1>
            CRIE A SUA PRÓPRIA
            <br />
            <span className="span-title">BIBLIOTECA DE JOGOS</span>
          </h1>
        </div>

        <div className="container-plataforms">
          <ul className="plataforms-list">
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
        <div className="container-btn">
          <Link to="/login">
            <button className="btn">FAZER LOGIN</button>
          </Link>
          <Link to="/">
            <button className="btn">CADASTRE-SE</button>
          </Link>
        </div>
      </div>
      <div className="container-footer">
        <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
      </div>
    </div>
  );
};
