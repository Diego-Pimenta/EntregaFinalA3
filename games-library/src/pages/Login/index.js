import React, { useState, useEffect } from "react";

import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo-image.png";

import s from "./login.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

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

  const [backendData, setBackendData] = useState(null);

  const fazerChamadaBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/exemplo');
      setBackendData(response.data);
    } catch (error) {
      console.error('Erro ao fazer chamada para o backend:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  return (
    <div className={s.tela_desktop}>
      <div className={s.bg_image}>
        <img src={bgImage} alt="bg-image" />
      </div>
      <div className={s.container_main}>
        <div className={s.container_header}>
          <img src={logo} alt="logo-image" width="100" />
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
