import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const sendRequest = async (params) => {
    try {
        const response = await API.post("/api/v1/requests", params);
        return response.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
