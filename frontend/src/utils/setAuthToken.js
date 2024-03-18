import axios from "axios";

const setAuthToken = (token) => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    sessionStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    sessionStorage.removeItem("token");
  }
};

export default setAuthToken;
