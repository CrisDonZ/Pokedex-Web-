import axios from "axios";

// URL CORRECTA - usa la URL EXACTA de tu Render
const backendURL = "https://pokedex-web-z4yg.onrender.com/api";

const instance = axios.create({
    baseURL: backendURL,
    withCredentials: true,
});

// Agrega interceptores para debug
instance.interceptors.request.use(config => {
    console.log('🔧 Making request to:', config.baseURL + config.url);
    return config;
});

export default instance;