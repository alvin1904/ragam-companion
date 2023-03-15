import { createAlbumApi, deleteAlbumsApi, getAlbumApi, getAlbumsApi, fetchAlbumDetailsApi } from ".";

export const createAlbum = async (formdata) => {
  console.log("Request data: ", formdata);
  try {
    const response = await createAlbumApi(formdata);
    const res = await getAlbums();
    return response;
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
    return response;
  } catch (error) {
    return error;
  }
};

export const getAlbum = async (id) => {
  try {
    const response = await getAlbumApi(id);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteAlbum = async (id) => {
  try {
    const response = await deleteAlbumsApi(id);
    await getAlbums();
    return response;
  } catch (error) {
    return error;
  }
};

export const getAlbumDetails = async () => {
  try {
    const response = await fetchAlbumDetailsApi();
    return response;
  } catch (err) {
    return err;
  }
};
