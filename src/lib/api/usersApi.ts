import api from "../axios";

export const syncUser = () => api.post("/users");
