import { getDetails, loginAdminApi, logoutAdminApi, registerAdminApi, setHead } from ".";

export const LoginAdmin = async (data) => {
  console.log(data);
  try {
    let response = await loginAdminApi(data);
    console.log(response);
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
    console.log(err);
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
      localStorage.removeItem("details");
      localStorage.clear();
      console.log({ msg: res.data.message });
      return { msg: res.data.message };
    }
  } catch (err) {
    console.log(err);
    return { err: "signout error" };
  }
};
