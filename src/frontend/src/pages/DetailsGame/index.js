import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { FooterNav } from "../../components/footerNav";
import s from "./details.module.css";
import axios from "axios";
import image from "../../assets/modal_tw3.png";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  genre: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  developed_by: yup.string().required(),
  release_date: yup.string().required(),
  grade: yup.string().required(),
  status: yup.string().required(),
  platform: yup.string().required(),
});

export const DetailsGame = () => {
  const navigate = useNavigate();

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
  const [gradeData, setGradeData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [allPlatformData, setAllPlatformData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  //const [allStatusData, setAllStatusData] = useState([]);

  const onSubmit = async (data) => {
    try {
      const gameUrl = `http://localhost:3001/games/${id}`;
      const gradeUrl = `http://localhost:3001/grades/${id}`;
      // const platformsUrl = `http://localhost:3001/platforms/${id}`;
      const statusesUrl = `http://localhost:3001/statuses/${id}`;
      // const platformAssociation = `http://localhost:3001/games/${id}/platform/${watch(
      //   "platformId"
      // )}`;

      await Promise.all([
        axios.put(gameUrl, {
          title: data.title,
          price: data.price,
          description: data.description,
          genre: data.genre,
          developed_by: data.developed_by,
          release_date: data.release_date,
          platform_id: data.platformId,
        }),
        axios.put(gradeUrl, { grade: data.grade, gradeId: watch("gradeId") }),
        axios.put(statusesUrl, {
          status: data.status,
        }),
      ]);
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao editar jogo");
    }
  };

  const removeGame = async () => {
    try {
      const gameUrl = `http://localhost:3001/games/${id}`;
      const gradeUrl = `http://localhost:3001/grades/${watch("gradeId")}`;
      const statusesUrl = `http://localhost:3001/statuses/${watch("statusId")}`;
      await Promise.all([
        axios.delete(gameUrl),
        axios.delete(gradeUrl),
        axios.delete(statusesUrl),
      ]);
      navigate("/library");
    } catch (error) {}
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

    const gradesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/grades/game/${id}`
        );
        setGradeData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

    const statusData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/statuses/game/${id}`
        );
        setStatusData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

    // const allStatusData = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:3001/statuses`);
    //     setAllStatusData(response.data);
    //   } catch (error) {
    //     console.error("Erro ao fazer chamada para o backend:", error);
    //   }
    // };

    const allPlatformData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/platforms`);
        setAllPlatformData(response.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };
    const platformData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/games/${id}/platforms`
        );
        setPlatformData(response?.data);
      } catch (error) {
        console.error("Erro ao fazer chamada para o backend:", error);
      }
    };

    platformData();
    allPlatformData();
    // allStatusData();
    statusData();
    gradesData();
    fetchData();
  }, [id]);

  useEffect(() => {
    // const releaseDateStr = gamesData[0]?.release_date;
    // const releaseDateMoment = moment(releaseDateStr);
    // const formattedReleaseDate = releaseDateMoment.format("DD/MM/YYYY");

    setValue("title", gamesData[0]?.title);
    setValue("price", gamesData[0]?.price);
    setValue(
      "release_date",
      moment(gamesData[0]?.release_date).format("YYYY-MM-DD")
    );
    setValue("description", gamesData[0]?.description);
    setValue("genre", gamesData[0]?.genre);
    setValue("developed_by", gamesData[0]?.developed_by);
    setValue("grade", gradeData[0]?.grade);
    setValue("platform", platformData[0]?.name);
    setValue("status", statusData[0]?.status);
    setValue("gradeId", gradeData[0]?.id);
    setValue("statusId", statusData[0]?.id);
    setValue("gameId", gamesData[0]?.id);
    setValue("image", gamesData[0]?.image);
    setValue("platformId", platformData[0]?.id);
  }, [gamesData, gradeData, statusData, platformData, setValue]);

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
        <div className={s.tela_mobile}>
          <Header />
          <div className={s.section_title}>
            <h1>DETALHES</h1>
          </div>
          <div className={s.scroll}>
            <div className={s.main_content}>
              <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.image}>
                  <img src={watch("image")} alt="" width={350} height={500} />
                </div>
                <div className={s.infos}>
                  <div className={s.formRow}>
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
                        value={watch("price")}
                        {...register("price")}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={s.responsive}>
                      <label htmlFor="">Data de lançamento:</label>
                      <input
                        type="date"
                        value={moment(watch("release_date")).format(
                          "YYYY-MM-DD"
                        )}
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
                  </div>
                  <div>
                    <div className={s.responsive}>
                      <label htmlFor="">Desenvolvedora:</label>
                      <input
                        type="text"
                        value={watch("developed_by")}
                        {...register("developed_by")}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Plataforma:</label>
                      <select
                        name="platform"
                        value={watch("platformId")?.id}
                        {...register("platformId")}
                      >
                        <option value={platformData[0]?.id}>
                          {platformData[0]?.name}
                        </option>
                        {allPlatformData.map((platform) => (
                          <option key={platform.id} value={platform.id}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={s.formRow}>
                    <div>
                      <label htmlFor="">Status:</label>
                      <select
                        name="status"
                        value={watch("status")}
                        {...register("status")}
                      >
                        <option value={statusData[0]?.status}>
                          {statusData[0]?.status}
                        </option>
                        <option value="jogado">Jogado</option>
                        <option value="jogando">Jogando</option>
                        <option value="zerado">Zerado</option>
                        <option value="recomendo">Recomendo</option>
                        <option value="Não recomendo">Não recomendo</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">Nota:</label>
                      <input
                        type="text"
                        value={watch("grade")}
                        {...register("grade")}
                      />
                    </div>
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
                  <div className={s.btnRow}>
                    <div className={s.container_btn}>
                      <button className={s.btn} type="submit">
                        EDITAR
                      </button>
                    </div>
                    <div className={s.container_btn}>
                      <button
                        type="button"
                        className={s.btn}
                        onClick={removeGame}
                      >
                        EXCLUIR
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <FooterNav />
        </div>
      ) : (
        <div className={s.tela_desktop}>
          <Header />
          <div className={s.section_title}>
            <h1>DETALHES</h1>
          </div>
          <div className={s.main_content}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={s.image}>
                <img src={watch("image")} width={400} height={500} />
              </div>
              <div className={s.infos}>
                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label htmlFor="">Titulo:</label>
                    <input
                      type="text"
                      value={watch("title")}
                      {...register("title")}
                    />
                  </div>
                  <div className={s.formField}>
                    <label htmlFor="">Preço:</label>
                    <input
                      type="number"
                      value={watch("price")}
                      {...register("price")}
                    />
                  </div>
                </div>
                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label htmlFor="">Data de lançamento:</label>
                    <input
                      id="date"
                      type="date"
                      value={moment(watch("release_date")).format("YYYY-MM-DD")}
                      {...register("release_date")}
                    />
                  </div>
                  <div className={s.formField}>
                    <label htmlFor="">Gênero:</label>
                    <input
                      type="text"
                      value={watch("genre")}
                      {...register("genre")}
                    />
                  </div>
                </div>

                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label htmlFor="">Desenvolvedora:</label>
                    <input
                      type="text"
                      value={watch("developed_by")}
                      {...register("developed_by")}
                    />
                  </div>
                  <div className={s.formField}>
                    <label htmlFor="">Plataforma:</label>
                    <select
                      name="platform"
                      value={watch("platformId")?.id}
                      {...register("platformId")}
                    >
                      <option value={platformData[0]?.name}>
                        {platformData[0]?.name}
                      </option>
                      {allPlatformData.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label htmlFor="">Status:</label>
                    <select
                      name="status"
                      value={watch("status")}
                      {...register("status")}
                    >
                      <option value={statusData[0]?.status}>
                        {statusData[0]?.status}
                      </option>
                      <option>Jogado</option>
                      <option>Jogando</option>
                      <option>Zerado</option>
                      <option>Recomendo</option>
                      <option>Não recomendo</option>
                    </select>
                  </div>
                  <div className={s.formField}>
                    <label htmlFor="">Nota:</label>
                    <input
                      type="text"
                      value={watch("grade")}
                      {...register("grade")}
                    />
                  </div>
                </div>
                <div className={s.formRow}>
                  <div className={s.description}>
                    <label htmlFor="">Descrição:</label>
                    <textarea
                      className={s.description}
                      value={watch("description")}
                      cols={70}
                      {...register("description")}
                    ></textarea>
                  </div>
                </div>
                <div className={s.btnRow}>
                  <div className={s.container_btn}>
                    <button className={s.btn}>EDITAR</button>
                  </div>
                  <div className={s.container_btn}>
                    <button
                      type="button"
                      className={s.btn}
                      onClick={removeGame}
                    >
                      EXCLUIR
                    </button>
                  </div>
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
