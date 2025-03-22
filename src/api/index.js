import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const sendRequest = async (params) => {
    try {
        const response = API.post("/request", params);
        return (await response).data;
    } catch (err) {
        console.error(err);
    }
};
