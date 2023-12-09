import React from "react";

import Modal from "react-modal";
import { useState, useEffect } from "react";

import { IoIosClose } from "react-icons/io";

import s from "./modalPlatform.module.css";
import TheWitcher from "../../assets/modal_tw3.png";

Modal.setAppElement("#root");

export const ModalPlatform = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal platform"
      className={s.react_modal_content}
      overlayClassName={s.react_modal_overlay}
    >
      <div className={s.modal_image}>
        <img src={TheWitcher} alt="the-witcher" className={s.image} />
      </div>
      <div className={s.modal_info}>
        <div className={s.title}>
          <h1>The Witcher 3</h1>
          <IoIosClose
            onClick={closeModal}
            style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
          />
        </div>
        <div className={s.resume}>
          <p>
            The Witcher 3: Wild Hunt é um jogo eletrônico de RPG de ação em
            mundo aberto desenvolvido pela CD Projekt RED e lançado no dia 19 de
            maio de 2015 para as plataformas Microsoft Windows, PlayStation 4,
            Xbox One e em outubro de 2019 para o Nintendo Switch, sendo o
            terceiro título da série de jogos The Witcher.{" "}
          </p>
          <ul className={s.gender}>
            <li>RPG</li>
            <li>AÇÃO</li>
            <li>AVENTURA</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
