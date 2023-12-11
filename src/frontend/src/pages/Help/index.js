import React from "react";
import { useState, useEffect, useRef } from "react";

import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";

import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

import imgSlider1 from "../../assets/imgHelp1.png";
import imgSlider2 from "../../assets/imgHelp2.png";
import imgSlider3 from "../../assets/imgHelp3.png";

import s from "./help.module.css";
export const Help = () => {
  register();

  const [isMobile, setIsMobile] = useState(false);

  const data = [
    {
      id: "1",
      image: imgSlider1,
    },
    { id: "2", image: imgSlider2 },
    { id: "3", image: imgSlider3 },
  ];

  useEffect(() => {
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
            <h1>AJUDA</h1>
          </div>

          <div className={s.container_slider}>
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={item.image}
                    className={s.slide_image}
                    alt="slider"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <FooterNav />
        </div>
      ) : (
        <div className={s.tela_desktop}>
          <Header />
          <div className={s.section_title}>
            <h1>AJUDA</h1>
          </div>
          <div className={s.container_slider}>
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={item.image}
                    className={s.slide_image}
                    alt="slider"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={s.footer}>
            <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
          </div>
        </div>
      )}
    </>
  );
};
