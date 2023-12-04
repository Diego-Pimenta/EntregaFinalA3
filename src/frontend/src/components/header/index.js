import React from "react";
import { useState, useEffect } from "react";

import s from "./header.module.css";

import logo from "../../assets/logo-image.png";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";

import { Link } from "react-router-dom";

export const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função para verificar a largura da tela e atualizar o estado
    const verificaLarguraTela = () => {
      const larguraTela =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      setIsMobile(larguraTela < 780);
    };

    verificaLarguraTela();

    window.addEventListener("resize", verificaLarguraTela);

    return () => {
      window.removeEventListener("resize", verificaLarguraTela);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={s.tela_mobile}>
          <div className={s.header}>
            <div className={s.container_user}>
              <FaUserCircle
                className={s.icon_user}
                onClick={() => setShowUserInfo(!showUserInfo)}
              />
              {showUserInfo && (
                <div className={s.user_modal}>
                  <h1>
                    Fernando Caires <IoIosMale style={{ color: "blue" }} />
                  </h1>
                  <h1>fc.caires@hotmail.com</h1>
                  <Link to={"/login"} className={s.btnLogout}>
                    <button>Sair</button>
                  </Link>
                </div>
              )}
            </div>
            <div className={s.container_search}>
              <div className={s.content_search}>
                <FiSearch style={{ marginLeft: "5px" }} />
                <input
                  type="text"
                  placeholder="Pesquise seu jogo"
                  className={s.search}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.tela_desktop}>
          <div className={s.header}>
            <div className={s.container_logo}>
              <Link to={"/home"}>
                <img src={logo} alt="logo-image" width="90" />
              </Link>
            </div>
            <div className={s.container_nav}>
              <ul className={s.nav}>
                <Link to={"/home"}>
                  <li>HOME</li>
                </Link>

                <Link to={"/library"}>
                  <li>BIBLIOTECA</li>
                </Link>

                <Link to={"/help"}>
                  <li>AJUDA</li>
                </Link>
              </ul>
            </div>
            <div className={s.container_search}>
              <div className={s.content_search}>
                <FiSearch style={{ marginLeft: "5px" }} />
                <input
                  type="text"
                  placeholder="Pesquise seu jogo"
                  className={s.search}
                />
              </div>
            </div>
            <div className={s.container_user}>
              <FaUserCircle
                className={s.icon_user}
                onClick={() => setShowUserInfo(!showUserInfo)}
              />
              {showUserInfo && (
                <div className={s.user_modal}>
                  <h1>
                    Fernando Caires <IoIosMale style={{ color: "blue" }} />
                  </h1>
                  <h1>fc.caires@hotmail.com</h1>
                  <Link to={"/login"} className={s.btnLogout}>
                    <button>Sair</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
