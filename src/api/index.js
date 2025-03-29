import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getBudget = async () => {
    try {
        const response = await API.get("/api/v1/budgets");
        return response.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
export const setBudget = async (params) => {
    try {
        const response = await API.post("/api/v1/payments",params);
        return response.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const sendRequest = async (params) => {
    try {
        const response = await API.post("/api/v1/requests", params);
        return response.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
