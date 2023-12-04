import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";
import { Link } from "react-router-dom";
import axios from "axios";

import s from "./library.module.css";

export const Library = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/games");
        setBackendData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

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
  return (
    <>
      {isMobile ? (
        <div className={s.tela_mobile}>
          <Header />
          <div className={s.section_title}>
            <h1>BIBLIOTECA</h1>
            <div className={s.container_btn}>
              <Link to={"/newGame"}>
                <button className={s.btn}>ADICIONAR NOVO JOGO</button>
              </Link>
            </div>
          </div>
          <div className={s.scroll}></div>
          <FooterNav />
        </div>
      ) : (
        <div className={s.tela_desktop}>
          <Header />
          <div className={s.section_title}>
            <h1>BIBLIOTECA</h1>
            <div className={s.container_btn}>
              <Link to={"/newGame"}>
                <button className={s.btn}>ADICIONAR NOVO JOGO</button>
              </Link>
            </div>
          </div>
          <div className={s.main_content}>
            
          </div>
        </div>
      )}
    </>
  );
};
