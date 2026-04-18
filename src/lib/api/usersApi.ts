import { useMutation } from "@tanstack/react-query";
import api from "../axios";

export const SyncUser = () => {
    return useMutation({
        mutationFn: async () => {
            console.log("Sync User is Running >>")
            const res = await api.post("/users");
            await api.post(`/users/me/stats`);
            
            return res.data.data[0];
        },
    });
};