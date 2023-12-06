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
        return response.data.items[0].link;
      } else {
        return "";
      }
    } catch (error) {
      throw new HttpError("Error when searching for image!");
    }
  }
}
