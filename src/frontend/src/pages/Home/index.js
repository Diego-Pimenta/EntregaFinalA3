import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";
import { Modal1 } from "../../components/modal1";
import { Modal2 } from "../../components/modal2";
import { Modal3 } from "../../components/modal3";
import { Modal4 } from "../../components/modal4";

import gta5 from "../../assets/gta5.png";
import fire_icon from "../../assets/fire_icon.png";
import gta from "../../assets/gta.png";
import theWitcher from "../../assets/theWitcher.png";
import gow from "../../assets/gow.png";
import bloodBorne from "../../assets/bloodborne.png";

import s from "./home.module.css";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [modal3IsOpen, setModal3IsOpen] = useState(false);
  const [modal4IsOpen, setModal4IsOpen] = useState(false);

  const openModal1 = () => {
    setModal3IsOpen(false);
    setModal1IsOpen(true);
    setModal2IsOpen(false);
    setModal4IsOpen(false);
  };

  const closeModal1 = () => {
    setModal1IsOpen(false);
  };

  const openModal2 = () => {
    setModal3IsOpen(false);
    setModal1IsOpen(false);
    setModal2IsOpen(true);
    setModal4IsOpen(false);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
  };
  const openModal3 = () => {
    setModal3IsOpen(true);
    setModal1IsOpen(false);
    setModal2IsOpen(false);
    setModal4IsOpen(false);
  };

  const closeModal3 = () => {
    setModal3IsOpen(false);
  };
  const openModal4 = () => {
    setModal3IsOpen(false);
    setModal1IsOpen(false);
    setModal2IsOpen(false);
    setModal4IsOpen(true);
  };

  const closeModal4 = () => {
    setModal4IsOpen(false);
  };

  

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
        <>
          <Modal1 isOpen={modal1IsOpen} closeModal={closeModal1} />
          <Modal2 isOpen={modal2IsOpen} closeModal={closeModal2} />
          <Modal3 isOpen={modal3IsOpen} closeModal={closeModal3} />

          <div className={s.tela_mobile}>
            <Header />
            <div className={s.section_title}>
              <h1>HOME</h1>
            </div>
            <div className={s.scroll}>
              <div className={s.main_content}>
                <div className={s.container_primary}>
                  <div className={s.container_paragrafo}>
                    <p>
                      Organize, avalie e compartilhe sua biblioteca de jogos
                      pessoais agora mesmo e sem dificuldades
                    </p>
                  </div>
                  <img src={gta5} alt="game-image" width="250" />
                </div>
                <div className={s.container_secundary}>
                  <div className={s.header_secundary}>
                    <div className={s.secundary_paragrafo}>
                      <p>Jogos do momento</p>
                      <img src={fire_icon} alt="fire-icon" />
                    </div>
                  </div>
                  <div className={s.container_games}>
                    <div className={s.card_games} onClick={openModal1}>
                      <img
                        src={theWitcher}
                        alt="the-witcher-image"
                        width="100"
                      />
                      <label for="">The Witcher</label>
                    </div>
                    <div className={s.card_games} onClick={openModal2}>
                      <img src={gta} alt="gta-image" width="100" />
                      <label for="">GTA V</label>
                    </div>
                    <div className={s.card_games} onClick={openModal3}>
                      <img src={gow} alt="god-of-war-image" width="100" />
                      <label for="">God Of War</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FooterNav />
          </div>
        </>
      ) : (
        <>
          <Modal1 isOpen={modal1IsOpen} closeModal={closeModal1} />
          <Modal2 isOpen={modal2IsOpen} closeModal={closeModal2} />
          <Modal3 isOpen={modal3IsOpen} closeModal={closeModal3} />
          <Modal4 isOpen={modal4IsOpen} closeModal={closeModal4} />

          <div className={s.tela_desktop}>
            <Header />
            <div className={s.section_title}>
              <h1>HOME</h1>
            </div>
            <div className={s.main_content}>
              <div className={s.container_primary}>
                <div className={s.container_paragrafo}>
                  <p>
                    Organize, avalie e compartilhe sua biblioteca de jogos
                    pessoais agora mesmo e sem dificuldades
                  </p>
                </div>
                <img src={gta5} alt="game-image" width="400" />
              </div>
              <div className={s.container_secundary}>
                <div className={s.header_secundary}>
                  <div className={s.secundary_paragrafo}>
                    <p>Jogos do momento</p>
                    <img src={fire_icon} alt="fire-icon" />
                  </div>
                  <div className={s.container_btn}>
                    <button className={s.btn}>
                      <Link to={"/library"}>VER TODOS</Link>
                    </button>
                  </div>
                </div>
                <div className={s.container_games}>
                  <div
                    className={s.card_games}
                    onClick={openModal1}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={theWitcher} alt="the-witcher-image" />
                    <label htmlFor="">The Witcher</label>
                  </div>
                  <div
                    className={s.card_games}
                    onClick={openModal2}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={gta} alt="gta-image" />
                    <label htmlFor="">GTA V</label>
                  </div>
                  <div
                    className={s.card_games}
                    onClick={openModal3}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={gow} alt="god-of-war-image" />
                    <label htmlFor="">God Of War</label>
                  </div>
                  <div
                    className={s.card_games}
                    id={s.card_block}
                    onClick={openModal4}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={bloodBorne} alt="bloodborne-image" />
                    <label htmlFor="">Bloodborne</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.footer}>
              <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
