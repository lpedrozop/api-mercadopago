import express from "express";
import morgan from "morgan";
import MercadoRouter from "./routes/index.js";

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(MercadoRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app;

