import { HttpError } from "./exceptions/httpError.js";
import axios from "axios";

export class ImageSearchService {
  apiUrl = "https://www.googleapis.com/customsearch/v1";

  async getImageUrl(query) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          key: "AIzaSyAMQ2GBLl_eDaJ47H-RVIpABiCmw8zUixg",
          cx: "f0bde0c56aba14963",
          q: query,
          searchType: "image",
        },
      });
      if (response.data.items && response.data.items.length > 0) {
        // Filtrar as imagens para retornar apenas as que parecem ser capas de jogos
        const filteredImages = response.data.items.filter((item) => {
          // Adicione palavras-chave que podem indicar que é uma capa de jogo
          const keywords = ["cover", "capa", "game"];
          const url = item.link.toLowerCase();

          // Verifica se a URL contém alguma das palavras-chave
          return keywords.some((keyword) => url.includes(keyword));
        });

        // Retorna a primeira imagem que passou pelo filtro (se houver)
        if (filteredImages.length > 0) {
          return filteredImages[0].link;
        }
      }
      return ""; // Retorna vazio se nenhuma imagem de capa for encontrada
    } catch (error) {
      throw new HttpError("Error when searching for image!");
    }
  }
}
