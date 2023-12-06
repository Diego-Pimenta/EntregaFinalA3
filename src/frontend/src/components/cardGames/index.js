import React from "react";
import s from "./card.module.css";

import fotoTeste from "../../assets/modal_tw3.png";

import { Link } from "react-router-dom";

export const CardGames = ({ urlImage, title, id }) => {
  return (
    <div className={s.card}>
      <img src={fotoTeste} alt="game-image" />
      <h1>{title}</h1>
    </div>
  );
};
