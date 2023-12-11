import React from "react";
import s from "./card.module.css";

import fotoTeste from "../../assets/modal_tw3.png";

export const CardGames = ({ urlImage, title, id, image }) => {
  return (
    <div className={s.card}>
      <img src={image} alt="game-image" />
      <h1>{title}</h1>
    </div>
  );
};
