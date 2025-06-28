import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js"
import cors from "cors";
import authRouter from './routes/authRouter.js'
import privateRouter from "./routes/privateRoutes.js";
// console.clear()


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/test";
connectDB(DATABASE_URL);

app.use('/api/auth', authRouter);
app.use('/api', privateRouter);
app.get(
    '/',
    (req, res) => {
        res.send("Hello world from backend");
    }
)


app.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🚀 Server running at http://localhost:${port}`);
    }
});
