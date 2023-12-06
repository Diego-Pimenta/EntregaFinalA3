import axios from "axios";

export const searchImage = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: "AIzaSyAMQ2GBLl_eDaJ47H-RVIpABiCmw8zUixg",
          cx: "f0bde0c56aba14963",
          q: query,
          searchType: "image",
        },
      }
    );
    if (response.data.items && response.data.items.length > 0) {
      req.imageUrl = response.data.items[0].link; // store the image url in request object
      next();
    } else {
      res.status(404).json({ error: "Image not found!" });
    }
  } catch (error) {
    console.error("Error when searching for image:", error);
    res.status(500).json({ error: "Error when searching for image" });
  }
};
