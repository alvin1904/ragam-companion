import { getAlbumApi, getAlbumsApi } from ".";
import axios from "axios";

export const createAlbum = async (data) => {
  console.log(data);
  try {
    let response = await axios.post("/api/v1/albums", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};
