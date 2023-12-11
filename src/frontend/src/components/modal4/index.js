import React from "react";

import Modal from "react-modal";
import { useState, useEffect } from "react";

import s from "./modal4.module.css";
import { IoIosClose } from "react-icons/io";

import Blood from "../../assets/modal_bloodborne.png";
Modal.setAppElement("#root");

export const Modal4 = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal 2"
      className={s.react_modal_content}
      overlayClassName={s.react_modal_overlay}
    >
      <div className={s.modal_image}>
        <img
          src={Blood}
          alt="blood-borne"
          width={400}
          style={{ borderRadius: "15px 0px 0px 15px", height: "100%" }}
        />
      </div>
      <div className={s.modal_info}>
        <div className={s.title}>
          <h1>Bloodborne</h1>
          <IoIosClose
            onClick={closeModal}
            style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
          />
        </div>
        <div className={s.resume}>
          <p>
            Bloodborne tem lugar em Yharnam, uma cidade gótica/vitoriana e em
            ruínas, onde segundo os rumores, alberga um poderoso medicamento. Ao
            longo dos anos muitos viajantes faziam peregrinações à cidade
            procurando cura para as suas aflições; o jogador tem o papel de um
            desses viajantes. Quando chega a Yharnam, no entanto, descobre que a
            cidade está atormentada por uma doença endémica que transformou a
            maioria dos seus habitantes em criaturas bestiais. O jogador para
            sobreviver tem assim de percorrer as ruas de Yharnam e superar os
            seus habitantes violentamente enlouquecidos e os monstros
            horripilantes.
          </p>
          <ul className={s.gender}>
            <li>RPG</li>
            <li>AÇÃO</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
