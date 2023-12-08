import { HttpError } from "./exceptions/httpError.js";
import axios from "axios";
import { apiKey } from "../configs/config.js";

export class ImageSearchService {
  apiUrl = "https://www.googleapis.com/customsearch/v1";

  async getImageUrl(query) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          key: apiKey,
          cx: "f0bde0c56aba14963",
          q: `${query} cover art`,
          searchType: "image",
        },
      });
      if (response.data.items && response.data.items.length > 0) {
        const filteredImages = response.data.items.filter((item) => {
          const url = item.link.toLowerCase();
          const keywords = ["cover", "capa", "game"];
          return keywords.some((keyword) => url.includes(keyword));
        });
        if (filteredImages.length > 0) {
          return filteredImages[0].link;
        }
      }
      return "";
    } catch (error) {
      throw new HttpError(500, "Error when searching for image!");
    }
  }
}
