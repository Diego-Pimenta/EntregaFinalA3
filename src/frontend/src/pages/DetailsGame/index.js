import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";
import s from "./details.module.css";
import axios from "axios";
import image from "../../assets/modal_tw3.png";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().nullable(),
  genre: yup.string().nullable(),
  description: yup.string().nullable(),
  price: yup.string().nullable(),
  developed_by: yup.string().nullable(),
  release_date: yup.string().nullable(),
  file: yup.mixed().nullable(),
});

export const DetailsGame = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isMobile, setIsMobile] = useState(false);
  const [gamesData, setGamesData] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/games/${id}`);
        setGamesData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const releaseDateStr = gamesData[0]?.release_date;
    const releaseDateMoment = moment(releaseDateStr);
    const formattedReleaseDate = releaseDateMoment.format("DD/MM/YYYY");

    setValue("title", gamesData[0]?.title);
    setValue("price", gamesData[0]?.price);
    setValue("release_date", formattedReleaseDate);
    setValue("description", gamesData[0]?.description);
    setValue("genre", gamesData[0]?.genre);
  }, [gamesData, setValue]);

  useEffect(() => {
    // Função para verificar a largura da tela e atualizar o estado
    const verificaLarguraTela = () => {
      const larguraTela =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      setIsMobile(larguraTela < 780);
    };

    verificaLarguraTela();

    window.addEventListener("resize", verificaLarguraTela);

    return () => {
      window.removeEventListener("resize", verificaLarguraTela);
    };
  }, []);
  return (
    <>
      {isMobile ? (
        <div></div>
      ) : (
        <div className={s.tela_desktop}>
          <Header />
          <div className={s.section_title}>
            <h1>DETALHES</h1>
          </div>
          <div className={s.main_content}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={s.image}>
                <img src={image} alt="" />
              </div>
              <div className={s.infos}>
                <div>
                  <label htmlFor="">Titulo:</label>
                  <input
                    type="text"
                    value={watch("title")}
                    {...register("title")}
                  />
                </div>
                <div>
                  <label htmlFor="">Preço:</label>
                  <input
                    type="number"
                    value={watch("priec")}
                    {...register("price")}
                  />
                </div>
                <div>
                  <label htmlFor="">Data de lançamento:</label>
                  <input
                    type="text"
                    value={watch("release_date")}
                    {...register("release_date")}
                  />
                </div>
                <div>
                  <label htmlFor="">Gênero:</label>
                  <input
                    type="text"
                    value={watch("genre")}
                    {...register("genre")}
                  />
                </div>
                <div>
                  <label htmlFor="">Plataforma:</label>
                  <input
                    type="text"
                    value={watch("platform")}
                    {...register("platform")}
                  />
                </div>
                <div className={s.description}>
                  <label htmlFor="">Descrição:</label>
                  <textarea
                    className={s.description}
                    value={watch("description")}
                    cols={70}
                    {...register("description")}
                  ></textarea>
                </div>

                <div className={s.container_btn}>
                  <button className={s.btn}>EDITAR</button>
                </div>
              </div>
            </form>
          </div>
          <div className={s.footer}>
            <p>Copyright © 2023 All rights Reserved - GamesLibrary</p>
          </div>
        </div>
      )}
    </>
  );
};
