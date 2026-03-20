import api from "../axios";

export const syncUser = async () => {
    console.log("Sync User is Running >>")
    const res = await api.post("/users");
    const clerkuserid = res.data.data[0].clerkuserid;

    const res2 = await api.post(`/users/${clerkuserid}/stats`)
     
    return res.data.data[0];
}