import React from "react";

import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";

import s from "./modalPassword.module.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres!")
    .required("Senha é obrigatória!"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "A senha não está igual!")
    .required("Confirmação de senha é obrigatória!"),
});

Modal.setAppElement("#root");

export const ModalPassword = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:3001/auth/authorize",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          // Armazena os dados no estado do componente
          setUserData(response.data);
        } else {
          // Tratar caso não haja token
          console.error("Token não encontrado no localStorage.");
        }
      } catch (error) {
        navigate("login");
        console.error("Erro ao buscar dados:", error);
      }
    };

    // Chama a função fetchData quando o componente é montado
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    delete data.passwordConfirm;

    try {
      const response = await axios.put(
        `http://localhost:3001/users/${userData[0].id}`,
        {
          password: watch("password"),
        }
      );

      toast.success("Senha editada com sucesso!");
    } catch (error) {
      const errorMessages = {
        "Bad Request! Username already in use!":
          "Nome de usuário já está em uso",
        "Bad Request! Email already in use!": "Email já está em uso",
      };

      toast.error(
        errorMessages[error.response?.data?.message] || "Erro ao cadastrar"
      );
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
        <h1 style={{ marginLeft: "50px" }}>EDITAR SENHA</h1>
        <IoIosClose
          onClick={closeModal}
          style={{ fontSize: "50px", color: "#ee6c4d", cursor: "pointer" }}
        />
      </div>
      <div className={s.modalForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formRow}>
            <label htmlFor="">Nova senha:</label>
            <input
              type="password"
              placeholder="Digite a nova senha..."
              value={watch("password")}
              style={errors?.password ? { color: "red" } : {}}
              {...register("password")}
            />
            {errors?.password && (
              <span style={{ color: "red" }}>{errors?.password?.message}</span>
            )}
            <label htmlFor="">Confirmação da senha:</label>
            <input
              type="password"
              placeholder="Digite a senha novamente..."
              value={watch("passwordConfirm")}
              style={errors?.passwordConfirm ? { color: "red" } : {}}
              {...register("passwordConfirm")}
            />
            {errors?.passwordConfirm && (
              <span style={{ color: "red" }}>
                {errors?.passwordConfirm?.message}
              </span>
            )}
          </div>
          <div className={s.container_btn}>
            <button type="submit" className={s.btn}>
              EDITAR
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
