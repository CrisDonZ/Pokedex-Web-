import axios from "axios";

// URL de tu backend en Render - REEMPLAZA con tu URL real
const backendURL = "https://pokedex-web-.onrender.com/api";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || backendURL,
    withCredentials: true,
});

export default instance;