import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://63566a79a2d1844a97742c99.mockapi.io/",
  timeout: 1000,
});
