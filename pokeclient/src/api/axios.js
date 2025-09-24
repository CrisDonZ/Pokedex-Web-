import axios from "axios";

// URL CORRECTA - reemplaza con tu URL exacta de Render
const backendURL = "https://pokedex-web-z4yg.onrender.com/api";

const instance = axios.create({
    baseURL: backendURL,
    withCredentials: true,
});

export default instance;