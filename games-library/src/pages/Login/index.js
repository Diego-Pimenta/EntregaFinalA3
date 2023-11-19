import React from "react";

import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo-image.png";

import "./login.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import { useHistory } from "react-router-dom";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="tela-desktop">
      <div className="bg-image">
        <img src={bgImage} alt="bg-image" />
      </div>
      <div className="container-main">
        <div className="container-header">
          <img src={logo} alt="logo-image" width="100" />
        </div>
        <div className="container-form">
          <h1>LOGIN:</h1>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              id="email"
              style={{borderRadius: "6px 6px 0px 0px"}}
              placeholder="E-MAIL"
              {...register("email")}
            />
            {errors?.email && (
              <span className="error">{errors?.email?.message}</span>
            )}
            <input
              type="password"
              id="senha"
              style={{borderRadius: "0px 0px 6px 6px"}}
              placeholder="SENHA"
              {...register("password")}
            />
            {errors?.password && (
              <span className="error">{errors?.password?.message}</span>
            )}
            <p>
              Não tem um login?&nbsp;
              <span>
                <Link to={"/"}>CADASTRE-SE</Link>
              </span>
            </p>
            <div className="container-btn">
              <button id="btnLogin" className="btn" type="submit">
                FAZER LOGIN
              </button>
            </div>
          </form>
        </div>
        <div className="container-footer">
          <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
        </div>
      </div>
    </div>
  );
};
