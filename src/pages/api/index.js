import axios from "axios";

const baseurl = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const api2 = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api2.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginAdminApi = (data) => api.post("artist/auth/login", data);
export const registerAdminApi = (data) =>
  api.post("/artist/auth/register", data);
export const logoutAdminApi = () => api.get("/artist/auth/logout");
export const getDetails = () => api.get("/artist");
export const updateUserName = (data) => api2.patch("/artist/auth/edit", data);
export const updatePassword = (data) =>
  api.patch("/artist/auth/edit/password", data);

export const createAlbumApi = (formdata) => api2.post("/albums", formdata);
export const getAlbumApi = () => api.get("/album");
export const getAlbumsApi = () => api.get("/albums");
export const deleteAlbumsApi = (albumId) => api.delete(`/albums/${albumId}`);

export const uploadSongDetails = (formdata) => api2.post("/songs", formdata);
export const uploadSongImage = (formdata, songId) =>
  api2.patch(`/songs/${songId}`, formdata);
