export const getFromLocalStorage = (val) => {
  let data = JSON.parse(localStorage.getItem(val));
  if (data) return data;
  // else window.location.reload();
  else return {};
  //to reload so that tokenCheck can happen
};

export const setLocalStorage = (data) => {
  if (!data) return false;
  localStorage.setItem("details", JSON.stringify(data));
};
