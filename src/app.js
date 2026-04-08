import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AdoptMe API",
            version: "1.0.0",
            description: "API para gestión de adopciones de mascotas",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./src/routes/*.router.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.send("AdoptMe API funcionando correctamente 🐾");
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Conectado a MongoDB Atlas ✅");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
            console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs 📚`);
        });
    })
    .catch((error) => {
        console.error("Error conectando a MongoDB:", error);
    });

export default app;