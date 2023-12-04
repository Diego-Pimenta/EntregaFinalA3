import React from "react";
import { useState, useEffect } from "react";

import s from "./newGame.module.css";

import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  genre: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  price: yup.string().required("Campo obrigatório"),
  developed_by: yup.string().required("Campo obrigatório"),
  release_date: yup.string().required("Campo obrigatório"),
  file: yup.mixed().required("Campo obrigatório"),
});

export const NewGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isMobile, setIsMobile] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className={s.tela_mobile}>
            <Header />

            <div className={s.section_title}>
              <h1>ADICIONAR NOVO JOGO</h1>
            </div>
            <div className={s.scroll}>
              <div className={s.main_content}>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className={s.form_row}>
                    <div className={s.form_label}>
                      <label>Título:</label>
                      <input
                        type="text"
                        placeholder="Nome do jogo"
                        {...register("title")}
                      />
                      {errors?.title && (
                        <span className={s.error}>{errors?.title.message}</span>
                      )}
                    </div>
                    <div className={s.form_label}>
                      <label htmlFor="">Foto do jogo:</label>
                      <label className={s.inputFile}>
                        <span className={s.inputFile_custom}></span>
                        <input type="file" id="file" {...register("file")} />
                        {errors?.file && (
                          <span className={s.error}>
                            {errors?.file.message}
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className={s.form_row}>
                    <div className={s.form_label}>
                      <label>Gênero:</label>
                      <input
                        type="text"
                        {...register("genre")}
                        placeholder="Gênero do jogo"
                      />
                      {errors?.genre && (
                        <span className={s.error}>{errors?.genre.message}</span>
                      )}
                    </div>
                    <div className={s.form_label}>
                      <label>Preço:</label>
                      <input
                        type="number"
                        {...register("price")}
                        placeholder="Preço do jogo"
                      />
                      {errors?.price && (
                        <span className={s.error}>{errors?.price.message}</span>
                      )}
                    </div>
                  </div>
                  <div className={s.form_row}>
                    <div className={s.form_label}>
                      <label>Desenvolvedora:</label>
                      <input
                        type="text"
                        {...register("developed_by")}
                        placeholder="Desenvolvido por"
                      />
                      {errors?.developed_by && (
                        <span className={s.error}>
                          {errors?.developed_by.message}
                        </span>
                      )}
                    </div>
                    <div className={s.form_label}>
                      <label>Data de lançamento:</label>
                      <input
                        type="date"
                        {...register("release_date")}
                        placeholder="Data de lançamento do jogo"
                      />
                      {errors?.release_date && (
                        <span className={s.error}>
                          {errors?.release_date.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={s.form_row}>
                    <div className={s.form_label}>
                      <label>Descrição:</label>
                      <input
                        type="text"
                        {...register("description")}
                        placeholder="Descrição do jogo"
                      />
                      {errors?.description && (
                        <span className={s.error}>
                          {errors?.description.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={s.form_row}>
                    <div className={s.container_btn}>
                      <button id="btnLogin" className={s.btn} type="submit">
                        CADASTRAR NOVO JOGO
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <FooterNav />
          </div>
        </>
      ) : (
        <>
          <div className={s.tela_desktop}>
            <Header />
            <div className={s.section_title}>
              <h1>ADICIONAR NOVO JOGO</h1>
            </div>
            <div className={s.main_content}>
              <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className={s.form_row}>
                  <div className={s.form_label}>
                    <label>Título:</label>
                    <input
                      type="text"
                      placeholder="Nome do jogo"
                      {...register("title")}
                    />
                    {errors?.title && (
                      <span className={s.error}>{errors?.title.message}</span>
                    )}
                  </div>
                  <div className={s.form_label}>
                    <label htmlFor="">Foto do jogo:</label>
                    <label className={s.inputFile}>
                      <span className={s.inputFile_custom}></span>
                      <input type="file" id="file" {...register("file")} />
                      {errors?.file && (
                        <span className={s.error}>{errors?.file.message}</span>
                      )}
                    </label>
                  </div>
                </div>
                <div className={s.form_row}>
                  <div className={s.form_label}>
                    <label>Gênero:</label>
                    <input
                      type="text"
                      {...register("genre")}
                      placeholder="Gênero do jogo"
                    />
                    {errors?.genre && (
                      <span className={s.error}>{errors?.genre.message}</span>
                    )}
                  </div>
                  <div className={s.form_label}>
                    <label>Preço:</label>
                    <input
                      type="number"
                      {...register("price")}
                      placeholder="Preço do jogo"
                    />
                    {errors?.price && (
                      <span className={s.error}>{errors?.price.message}</span>
                    )}
                  </div>
                </div>
                <div className={s.form_row}>
                  <div className={s.form_label}>
                    <label>Desenvolvedora:</label>
                    <input
                      type="text"
                      {...register("developed_by")}
                      placeholder="Desenvolvido por"
                    />
                    {errors?.developed_by && (
                      <span className={s.error}>
                        {errors?.developed_by.message}
                      </span>
                    )}
                  </div>
                  <div className={s.form_label}>
                    <label>Data de lançamento:</label>
                    <input
                      type="date"
                      {...register("release_date")}
                      placeholder="Data de lançamento do jogo"
                    />
                    {errors?.release_date && (
                      <span className={s.error}>
                        {errors?.release_date.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className={s.form_row}>
                  <div className={s.form_label}>
                    <label>Descrição:</label>
                    <input
                      type="text"
                      {...register("description")}
                      placeholder="Descrição do jogo"
                    />
                    {errors?.description && (
                      <span className={s.error}>
                        {errors?.description.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className={s.form_row}>
                  <div className={s.container_btn}>
                    <button id="btnLogin" className={s.btn} type="submit">
                      CADASTRAR NOVO JOGO
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
