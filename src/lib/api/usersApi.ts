import api from "../axios";

export const syncUser = async () => {
    console.log("Sync User is Running >>")
    const res = await api.post("/users");
    const clerkuserid = res.data.data[0].clerkuserid;
    console.log("Response : ",res.data);

    const res2 = await api.post(`/users/${clerkuserid}/stats`)
    console.log("Response :",res2.data);
     
    return res.data.data[0];
}