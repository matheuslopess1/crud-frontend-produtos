import axios from "axios";

function api() {
  const instance = axios.create({ baseURL: "http://127.0.0.1:3333/api" });

  return instance;
}

export default api;
