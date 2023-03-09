import { createAlbumApi, getAlbumsApi } from ".";

export const createAlbum = async (data) => {
  console.log("Request data: ", data);
  try {
    const response = await createAlbumApi(data);
    const res = await getAlbums();
    return response.data;
  } catch (error) {
    return error;
  }
};

const addAlbumsToLS = (data) =>
  localStorage.setItem("albums", JSON.stringify(data));

export const getAlbums = async () => {
  try {
    const response = await getAlbumsApi();
    addAlbumsToLS(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
