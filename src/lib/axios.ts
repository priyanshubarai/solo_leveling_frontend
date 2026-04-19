import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
