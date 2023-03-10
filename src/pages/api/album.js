import { createAlbumApi, getAlbumsApi } from ".";

export const createAlbum = async (formdata) => {
  console.log("Request data: ", formdata);
  try {
    const response = await createAlbumApi(formdata);
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
