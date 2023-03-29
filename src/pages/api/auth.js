import { getFromLocalStorage } from "@/helper/LocalStorage";
import {
  getDetails,
  loginAdminApi,
  logoutAdminApi,
  registerAdminApi,
  setHead,
  updateUserName,
} from ".";

export const LoginAdmin = async (data) => {
  try {
    let response = await loginAdminApi(data);
    if (data && response && response.data && response.data.token)
      await addtoLocalStorage(response.data.token);
    return response;
  } catch (err) {
    return err;
  }
};

const addtoLocalStorage = async (token) => {
  try {
    setHead(token);
    const response = await getDetails();
    let temp = response.data;
    temp.token = token; //adding a token key
    localStorage.setItem("details", JSON.stringify(temp));
  } catch (err) {
    alert("token expire or net down");
  }
};

export const RegisterAdmin = async (data) => {
  let temp = { ...data };
  delete temp.password1;
  try {
    let res = await registerAdminApi(temp);
    return res;
  } catch (err) {
    return err;
  }
};

export const handleLogOut = async () => {
  try {
    const res = await logoutAdminApi();
    setHead("");
    if (res.status == 200) {
      localStorage.clear();
      return res;
    }
  } catch (err) {
    return err;
  }
};

export const handleUpdateArtist = async (data) => {
  try {
    let response = await updateUserName(data);
    const token = getFromLocalStorage("details").token;
    await addtoLocalStorage(token);
    return response;
  } catch (err) {
    return err;
  }
};
