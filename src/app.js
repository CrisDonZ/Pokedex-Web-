import "dotenv/config"; 
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";



const app = express();

app.use(cors({
    origin: [
        'https://grand-beignet-93fc4c.netlify.app', // Tu frontend real
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


// ✅ AGREGAR ESTA RUTA RAÍZ
app.get('/', (req, res) => {
    res.json({ 
        message: 'Pokedex API está funcionando!',
        status: 'OK',
        endpoints: {
            auth: '/api/register, /api/login, /api/logout',
            users: '/api/users',
            tasks: '/api/tasks'
        }
    });
});

app.use('/api',authRoutes);
app.use('/api',taskRoutes);
app.use('/api',userRoutes);


export default app;
