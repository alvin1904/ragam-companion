import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "http://192.168.0.123:3000/",
  //   baseURL: "https://myTodo1904Personal-api.onrender.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginAdminApi = (data) => api.post("admin/auth/login", data);
export const registerAdminApi = (data) => api.post("/admin/auth/register", data);
export const logoutAdminApi = () => api.get("/admin/auth/logout");
export const getDetails = () => api.get("/admin");
export const updateUserName = (data) => api.patch("/admin/auth/edit", data);
export const updatePassword = (data) => api.patch("/admin/auth/edit/password", data);
