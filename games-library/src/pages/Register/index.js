import React from "react";

import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo-image.png";

import s from "./register.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório!"),
  email: yup
    .string()
    .email("Digite um e-mail válido!")
    .required("E-mail é obrigatório!"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres!")
    .required("Senha é obrigatória!"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "A senha não está igual!")
    .required("Confirmação de senha é obrigatória!"),
  birthDate: yup.string().required("Data de nascimento é obrigatório!"),
  gender: yup.string().required("Gênero é obrigatório!"),
});

export const Register = () => {
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
    navigate("/");
  };

  return (
    <div className={s.tela_desktop}>
      <div className={s.bg_image}>
        <img src={bgImage} alt="bg-image" />
      </div>
      <div className={s.container_main}>
        <div className={s.container_header}>
          <img src={logo} alt="logo-image" width="90" />
        </div>
        <div className={s.container_form}>
          <h1>CADASTRE-SE:</h1>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="nome"
              placeholder="NOME"
              style={
                errors?.name
                  ? {
                      color: "red",
                      borderRadius: "6px 6px 0 0",
                    }
                  : { borderRadius: "6px 6px 0 0" }
              }
              {...register("name")}
            />
            {errors?.name && <span>{errors?.name?.message}</span>}
            <input
              type="email"
              id="email"
              placeholder="E-MAIL"
              style={errors?.email ? { color: "red" } : {}}
              {...register("email")}
            />
            {errors?.email && <span>{errors?.email?.message}</span>}
            <input
              type="password"
              id="senha"
              placeholder="SENHA"
              style={errors?.password ? { color: "red" } : {}}
              {...register("password")}
            />
            {errors?.password && <span>{errors?.password?.message}</span>}
            <input
              type="password"
              id="senha-confirmacao"
              placeholder={"CONFIRME SUA SENHA"}
              style={errors?.passwordConfirm ? { color: "red" } : {}}
              {...register("passwordConfirm")}
            />
            {errors?.passwordConfirm && (
              <span>{errors?.passwordConfirm?.message}</span>
            )}
            <input
              type="date"
              id="birth-date"
              placeholder="DATA DE NASCIMENTO"
              style={errors?.birthDate ? { color: "red" } : {}}
              {...register("birthDate")}
            />
            {errors?.birthDate && <span>{errors?.birthDate?.message}</span>}
            <select
              name="Select"
              type="genero"
              id="genero"
              style={
                errors?.gender
                  ? {
                      color: "red",
                      borderRadius: "0px 0px 6px 6px",
                    }
                  : { borderRadius: "0px 0px 6px 6px" }
              }
              {...register("gender")}
            >
              <option value={""}>GÊNERO</option>
              <option value={"masc"}>Masculino</option>
              <option value={"fem"}>Feminino</option>
            </select>
            {errors?.gender && <span>{errors?.gender?.message}</span>}
            <div className={s.container_btn}>
              <button id="btnLogin" className={s.btn} type="submit">
                CRIAR CONTA
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={s.container_footer}>
        <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
      </div>
    </div>
  );
};
