import api from "../axios";

export const syncUser = async () => {
    console.log("Sync User is Running >>")
    const res = await api.post("/users");    
    await api.post(`/users/me/stats`);
     
    return res.data.data[0];
}