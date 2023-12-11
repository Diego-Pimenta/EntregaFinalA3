import React from "react";

import s from "./error.module.css";

import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";

export const Error = () => {
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
        <>
          <div className={s.tela_mobile}>
            <Header />
            <div className={s.main_content}>
              <div className={s.title}>
                <h1>404</h1>
                <p>OPS! NÃO ENCONTRAMOS ESSA PÁGINA</p>
              </div>
            </div>
            <FooterNav />
          </div>
        </>
      ) : (
        <>
          <div className={s.tela_desktop}>
            <Header />
            <div className={s.main_content}>
              <div className={s.title}>
                <h1>404</h1>
                <p>OPS! NÃO ENCONTRAMOS ESSA PÁGINA</p>
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
