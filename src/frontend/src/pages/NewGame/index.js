import React from "react";
import { useState, useEffect } from "react";

import s from "./newGame.module.css";
import axios from "axios";

import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";
import { ModalPlatform } from "../../components/modalPlatform";

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
  platform_id: yup.string().required("Campo obrigatório"),
  status: yup.string().required("Campo obrigatório"),
  grade: yup.string().required("Campo obrigatório"),
});

export const NewGame = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isMobile, setIsMobile] = useState(false);
  const [modalPlatform, setModalPlatform] = useState(false);
  const [allStatusData, setAllStatusData] = useState([]);
  const [allPlatformData, setAllPlatformData] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [userData, setUserData] = useState([]);

  const openModal = () => {
    setModalPlatform(true);
  };

  const closeModal = () => {
    setModalPlatform(false);
  };

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

  useEffect(() => {
    const allStatusData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/statuses`);
        setAllStatusData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

    const allPlatformData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/platforms`);
        setAllPlatformData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };
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
        console.error("Erro ao buscar dados:", error);
      }
    };

    // Chama a função fetchData quando o componente é montado
    fetchData();

    allPlatformData();
    allStatusData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3001/games`, data);
      setGameId(response.data.insertId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Esta função será chamada sempre que gameId for atualizado
    if (gameId) {
      onSubmitGradeStatus({
        grade: watch("grade"),
        status: watch("status"),
      });
    }
  }, [gameId]);

  const onSubmitGradeStatus = async (data) => {
    try {
      const response2 = await axios.post(`http://localhost:3001/grades`, {
        user_id: userData[0]?.id,
        game_id: gameId,
        grade: data.grade,
      });
      const response3 = await axios.post(`http://localhost:3001/statuses`, {
        user_id: userData[0]?.id,
        game_id: gameId,
        status: data.status,
      });
    } catch (error) {
      console.log(error);
    }
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
                      <label htmlFor="">Plataforma:</label>
                      <select
                        name="platform_id"
                        value={watch("platform_id")}
                        {...register("platform_id")}
                      >
                        <option value={""}>Selecione a plataforma...</option>
                        <option value="1">Steam</option>
                        <option value="2">Xbox</option>
                        <option value="3">Origin</option>
                        <option value="4">Epic Games</option>
                        <option value="5">Playstation</option>
                        <option value="6">Battle.net</option>
                        <option value="7">Riot</option>
                        <option value="8">Nintendo</option>
                        <option value="9">uPlay</option>
                        <option value="10">App Store</option>
                        <option value="11">Play Store</option>
                      </select>
                      {errors?.platform_id && (
                        <span className={s.error}>
                          {errors?.platform_id.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={s.form_row}>
                    <div className={s.form_label}>
                      <label htmlFor="">Status:</label>
                      <select
                        name="status"
                        value={watch("allStatusData")}
                        {...register("status")}
                      >
                        <option value={""}>Selecione o status...</option>
                        <option value="jogado">Jogado</option>
                        <option value="jogando">Jogando</option>
                        <option value="zerado">Zerado</option>
                        <option value="recomendo">Recomendo</option>
                        <option value="Não recomendo">Não recomendo</option>
                      </select>
                      {errors?.status && (
                        <span className={s.error}>
                          {errors?.status.message}
                        </span>
                      )}
                    </div>
                    <div className={s.form_label}>
                      <label>Nota:</label>
                      <input
                        type="number"
                        {...register("grade")}
                        placeholder="Nota do jogo"
                      />
                      {errors?.grade && (
                        <span className={s.error}>{errors?.grade.message}</span>
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
          <ModalPlatform isOpen={modalPlatform} closeModal={closeModal} />
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
                  <div>
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
                </div>
                <div className={s.form_row}>
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
                    <div>
                      <label htmlFor="">Plataforma:</label>
                      <select
                        name="platform_id"
                        value={watch("allPlatformData")}
                        {...register("platform_id")}
                      >
                        <option value={""}>Selecione a plataforma...</option>
                        <option value="1">Steam</option>
                        <option value="2">Xbox</option>
                        <option value="3">Origin</option>
                        <option value="4">Epic Games</option>
                        <option value="5">Playstation</option>
                        <option value="6">Battle.net</option>
                        <option value="7">Riot</option>
                        <option value="8">Nintendo</option>
                        <option value="9">uPlay</option>
                        <option value="10">App Store</option>
                        <option value="11">Play Store</option>
                      </select>
                      {errors?.platform_id && (
                        <span className={s.error}>
                          {errors?.platform_id.message}
                        </span>
                      )}
                    </div>
                    <button type="button" onClick={openModal}>
                      Editar plataforma
                    </button>
                  </div>
                </div>
                <div className={s.form_row}>
                  <div className={s.form_label}>
                    <label htmlFor="">Status:</label>
                    <select
                      name="status"
                      value={watch("status")}
                      {...register("status")}
                    >
                      <option value={""}>Selecione o status...</option>
                      <option value="jogado">Jogado</option>
                      <option value="jogando">Jogando</option>
                      <option value="zerado">Zerado</option>
                      <option value="recomendo">Recomendo</option>
                      <option value="Não recomendo">Não recomendo</option>
                    </select>
                    {errors?.status && (
                      <span className={s.error}>{errors?.status.message}</span>
                    )}
                  </div>
                  <div className={s.form_label}>
                    <label>Nota:</label>
                    <input
                      type="number"
                      {...register("grade")}
                      placeholder="Nota do jogo"
                    />
                    {errors?.grade && (
                      <span className={s.error}>{errors?.grade.message}</span>
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
