import app from "./app.js";
import { connectDB } from "./db.js";
import "dotenv/config";
import express from "express";

const port = process.env.PORT || 5000;
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Configuración específica para Render
const server = app.listen(port, '0.0.0.0', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);

});
