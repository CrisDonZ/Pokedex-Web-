import "dotenv/config"; 
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

// Middlewares básicos PRIMERO
app.use(cors({
    origin: [
        'https://grand-beignet-93fc4c.netlify.app',
        'http://localhost:5173'
    ],
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
    res.json({ 
        message: "✅ Pokedex API está funcionando!",
        timestamp: new Date().toISOString()
    });
});

// Ruta de prueba para /api
app.get("/api", (req, res) => {
    res.json({ 
        message: "✅ API routes are working!",
        availableEndpoints: [
            "POST /api/register",
            "POST /api/login", 
            "POST /api/logout",
            "GET /api/verify",
            "GET /api/profile"
        ]
    });
});

// Montar las rutas DESPUÉS de los middlewares
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
    res.status(404).json({ 
        error: "Route not found",
        path: req.originalUrl,
        method: req.method
    });
});

export default app;