import React from "react";
import { useState, useEffect } from "react";

import s from "./header.module.css";

import axios from "axios";

import logo from "../../assets/logo-image.png";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:3001/auth/authorize",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          // Armazena os dados no estado do componente
          setUserData(response.data);
        } else {
          // Tratar caso não haja token
          console.error("Token não encontrado no localStorage.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    // Chama a função fetchData quando o componente é montado
    fetchData();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

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
                    {userData[0]?.username}
                    {userData[0]?.gender === "masc" ? (
                      <IoIosMale style={{ color: "blue" }} />
                    ) : (
                      <IoIosFemale style={{ color: "pink" }} />
                    )}
                  </h1>
                  <h1>{userData[0]?.email}</h1>
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
                    {userData[0]?.username}
                    {userData[0]?.gender === "masc" ? (
                      <IoIosMale style={{ color: "blue" }} />
                    ) : (
                      <IoIosFemale style={{ color: "pink" }} />
                    )}
                  </h1>
                  <h1>{userData[0]?.email}</h1>
                  <button className={s.btnLogout} onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
