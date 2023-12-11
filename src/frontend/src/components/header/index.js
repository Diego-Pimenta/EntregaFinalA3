import React from "react";
import { useState, useEffect } from "react";

import s from "./header.module.css";
import { ModalPassword } from "../modalPassword";

import axios from "axios";

import logo from "../../assets/logo-image.png";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().nullable(),
});

export const Header = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [modalPlatform, setModalPlatform] = useState(false);

  const openModal = () => {
    setModalPlatform(true);
  };

  const closeModal = () => {
    setModalPlatform(false);
  };

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
        navigate("login");
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

  const searchGame = async (data) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/games/search/${watch("title")}`
      );
      setGameId(resp.data[0].title);
    } catch (error) {
      toast.error("Jogo não encontrado");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchGame();
    }
  };

  useEffect(() => {
    // Esta função será chamada sempre que gameId for atualizado
    if (gameId) {
      searchGameDetails({
        id: gameId,
      });
    }
  }, [gameId]);

  const searchGameDetails = (id) => {
    navigate(`/search/${gameId}`);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      {isMobile ? (
        <div className={s.tela_mobile}>
          <ModalPassword isOpen={modalPlatform} closeModal={closeModal} />
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
                  <div className={s.btnRow}>
                    <button className={s.btnLogout} onClick={handleLogout}>
                      Sair
                    </button>
                    <button className={s.btnLogout} onClick={openModal}>
                      Trocar senha
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={s.container_search}>
              <div className={s.content_search}>
                <FiSearch style={{ marginLeft: "5px" }} onClick={searchGame} />
                <input
                  type="text"
                  placeholder="Pesquise seu jogo"
                  className={s.search}
                  value={watch("title")}
                  onKeyPress={handleKeyPress}
                  {...register("title")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.tela_desktop}>
          <ModalPassword isOpen={modalPlatform} closeModal={closeModal} />
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
                <FiSearch style={{ marginLeft: "5px" }} onClick={searchGame} />
                <input
                  type="text"
                  placeholder="Pesquise seu jogo"
                  className={s.search}
                  value={watch("title")}
                  onKeyPress={handleKeyPress}
                  {...register("title")}
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
                  <div className={s.btnRow}>
                    <button className={s.btnLogout} onClick={handleLogout}>
                      Sair
                    </button>
                    <button className={s.btnLogout} onClick={openModal}>
                      Trocar senha
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
