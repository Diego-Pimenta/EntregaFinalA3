import React from "react";

import Modal from "react-modal";
import { useState, useEffect } from "react";
import s from "./modal3.module.css";
import { IoIosClose } from "react-icons/io";

import GOW from "../../assets/modal_gow.png";
Modal.setAppElement("#root");

export const Modal3 = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal 2"
      className={s.react_modal_content}
      overlayClassName={s.react_modal_overlay}
    >
      <div className={s.modal_image}>
        <img src={GOW} alt="gta" className={s.image} />
      </div>
      <div className={s.modal_info}>
        <div className={s.title}>
          <h1>God Of War</h1>
          <IoIosClose
            onClick={closeModal}
            style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
          />
        </div>
        <div className={s.resume}>
          <p>
            God of War é um jogo eletrônico de ação-aventura desenvolvido pela
            Santa Monica Studio e publicado pela Sony Interactive Entertainment
            Ao contrário dos jogos anteriores, que eram vagamente baseados na
            mitologia grega, este título é vagamente baseado na mitologia
            nórdica, com a maior parte do tempo situado na antiga Noruega no
            reino de Midgard. Pela primeira vez na série, há dois protagonistas
            principais: Kratos, o antigo deus da guerra grego que é acompanhado
            por seu jovem filho Atreus.
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
