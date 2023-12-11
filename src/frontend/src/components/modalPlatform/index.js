import React from "react";

import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";

import { IoIosClose } from "react-icons/io";

import s from "./modalPlatform.module.css";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  platform_id: yup.string().nullable(),
  platform_name: yup.string().nullable(),
});

Modal.setAppElement("#root");

export const ModalPlatform = ({ isOpen, closeModal }) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [allPlatformData, setAllPlatformData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [editedPlatformName, setEditedPlatformName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handlePlatformChange = (e) => {
    const selectedPlatformId = e.target.value;
    const platform = allPlatformData.find(
      (p) => p.id === parseInt(selectedPlatformId, 10)
    );
    setSelectedPlatform(platform);
    setEditedPlatformName(platform.name);
    setIsEditing(true);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setInputValue(""); // Limpa o valor do input ao trocar a opção
  };

  useEffect(() => {
    const allPlatformData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/platforms`);
        setAllPlatformData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

    allPlatformData();
  }, []);

  const createPlatform = async () => {
    try {
      const resp = await axios.post("http://localhost:3001/platforms", {
        name: watch("platform_name"),
      });
      toast.success("Nova plataforma criada!");
      window.location.reload();
    } catch (error) {
      toast.error("Falha ao criar plataforma!");
    }
  };

  const deletePlatform = async (ata) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3001/platforms/${watch("platform_id")}`
      );
      toast.success("Plataforma excluída com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error("Falha ao excluir plataforma!");
    }
  };

  const editPlatform = async () => {
    try {
      const resp = await axios.put(
        `http://localhost:3001/platforms/${watch("platform_id")}`,
        { id: watch("platform_id"), name: watch("platform_name") }
      );
      toast.success("Plataforma editada com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error("Falha ao editar plataforma!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal platform"
      className={s.react_modal_content}
      overlayClassName={s.react_modal_overlay}
    >
      <ToastContainer />
      <div className={s.modalTitle}>
        <h1 style={{ marginLeft: "50px" }}>EDITAR PLATAFORMAS</h1>
        <IoIosClose
          onClick={closeModal}
          style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
        />
      </div>
      <div className={s.modalForm}>
        <div className={s.formRow}>
          <label htmlFor="">Ações na plataforma:</label>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Selecione uma ação...</option>
            <option value="editar">Editar plataforma</option>
            <option value="criar">Criar nova plataforma</option>
            <option value="excluir">Excluir plataforma</option>
          </select>
        </div>

        {selectedOption && (
          <div className={s.formRow}>
            <label htmlFor="">
              {(selectedOption === "excluir" && "Excluir plataforma") ||
                (selectedOption === "editar" && "Editar plataforma") ||
                (selectedOption === "criar" && "Criar nova plataforma")}
              :
            </label>
            {(selectedOption === "excluir" && (
              <>
                <select
                  name="platform_id"
                  value={watch("platform_id")}
                  {...register("platform_id")}
                >
                  <option value={""}>Excluir plataforma</option>
                  {allPlatformData.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
                <div className={s.container_btn}>
                  <button onClick={deletePlatform} className={s.btn}>
                    EXCLUIR
                  </button>
                </div>
              </>
            )) ||
              (selectedOption === "criar" && (
                <>
                  <input
                    type="text"
                    placeholder="Nome da nova plataforma"
                    value={watch("platform_name")}
                    {...register("platform_name")}
                  />
                  <div className={s.container_btn}>
                    <button onClick={createPlatform} className={s.btn}>
                      CRIAR
                    </button>
                  </div>
                </>
              )) ||
              (selectedOption === "editar" && (
                <>
                  <select
                    name="platform_id"
                    value={watch("platform_id")}
                    {...register("platform_id")}
                  >
                    <option value={""}>Selecione uma plataforma</option>
                    {allPlatformData.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="">Alterar nome para:</label>
                  <input
                    type="text"
                    value={watch("platform_name")}
                    {...register("platform_name")}
                    placeholder="Novo nome para a plataforma selecionada..."
                  />
                  <div className={s.container_btn}>
                    <button onClick={editPlatform} className={s.btn}>
                      EDITAR
                    </button>
                  </div>
                </>
              ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
