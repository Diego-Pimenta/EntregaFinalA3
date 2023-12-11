import React, { useState, useEffect } from "react";

import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo-image.png";

import s from "./login.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido!")
    .required("E-mail é obrigatório!"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres!")
    .required("Senha é obrigatória!"),
});

export const Login = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const resp = await axios.post("http://localhost:3001/auth/authenticate", {
        email: watch("email"),
        password: watch("password"),
      });

      if (resp.status === 200) {
        localStorage.setItem("token", resp.data.token);
        setToken(resp.data.token);
        navigate("/home");
      } else {
        console.error(
          "Resposta inesperada do servidor:",
          resp.status,
          resp.data
        );
      }
    } catch (error) {
      toast.error("Email ou senha incorreta!");
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const resp = await axios.get("http://localhost:3001/auth/authorize", {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });

  //     // Lida com a resposta do backend
  //   } catch (error) {
  //     console.error("Erro ao buscar dados:", error);
  //   }
  // };

  return (
    <div className={s.tela_desktop}>
      <ToastContainer />
      <div className={s.bg_image}>
        <img src={bgImage} alt="bg-image" />
      </div>
      <div className={s.container_main}>
        <div className={s.container_header}>
          <Link to={"/"}>
            <img src={logo} alt="logo-image" width="100" />
          </Link>
        </div>
        <div className={s.container_form}>
          <h1>LOGIN:</h1>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              id="email"
              style={{ borderRadius: "6px 6px 0px 0px" }}
              placeholder="E-MAIL"
              {...register("email")}
            />
            {errors?.email && (
              <span className={s.error}>{errors?.email?.message}</span>
            )}
            <input
              type="password"
              id="senha"
              style={{ borderRadius: "0px 0px 6px 6px" }}
              placeholder="SENHA"
              {...register("password")}
            />
            {errors?.password && (
              <span className={s.error}>{errors?.password?.message}</span>
            )}
            <p>
              Não tem um login?&nbsp;
              <span style={{ textDecoration: "underline" }}>
                <Link to={"/register"}>CADASTRE-SE</Link>
              </span>
            </p>
            <div className={s.container_btn}>
              <button id="btnLogin" className={s.btn} type="submit">
                FAZER LOGIN
              </button>
            </div>
          </form>
        </div>
        <div className={s.container_footer}>
          <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
        </div>
      </div>
    </div>
  );
};
