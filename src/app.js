import "dotenv/config"; 
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

// Configuración CORS MÁS PERMISIVA temporalmente
app.use(cors({
    origin: function (origin, callback) {
        // Permitir todos los orígenes temporalmente para debug
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Manejar preflight OPTIONS requests
app.options('*', cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Ruta raíz
app.get("/", (req, res) => {
    res.json({ 
        message: "✅ Pokedex API está funcionando!",
        timestamp: new Date().toISOString()
    });
});

// Rutas API
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

export default app;