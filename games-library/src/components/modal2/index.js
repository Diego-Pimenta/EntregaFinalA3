import React from "react";

import Modal from "react-modal";
import { useState, useEffect } from "react";

import s from "./modal2.module.css";
import { IoIosClose } from "react-icons/io";

import GTA5 from "../../assets/modal_gta5.png";

Modal.setAppElement("#root");

export const Modal2 = ({ isOpen, closeModal }) => {
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
          src={GTA5}
          alt="gta"
          className={s.image}
        />
      </div>
      <div className={s.modal_info}>
        <div className={s.title}>
          <h1>GTA V</h1>
          <IoIosClose
            onClick={closeModal}
            style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
          />
        </div>
        <div className={s.resume}>
          <p>
            O jogo se passa no estado ficcional de San Andreas, com a história
            da campanha um jogador seguindo três criminosos e seus esforços para
            realizarem assaltos sob a pressão de uma agência governamental. O
            mundo aberto permite que os jogadores naveguem livremente pelas
            áreas rurais e urbanas de San Andreas.
          </p>
          <ul className={s.gender}>
            <li>AÇÃO</li>
            <li>AVENTURA</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
