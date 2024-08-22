import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import Router from './router/index.js';
import startAdminPasswordHashing from './middlewares/crypt-faculty-password.js';
import startEducationAdminPasswordHashing from "./middlewares/crypt-education-password.js";
import startStudentPasswordHashing from "./middlewares/crypt-student-password.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', Router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
        await startAdminPasswordHashing();
        await startEducationAdminPasswordHashing();
        await startStudentPasswordHashing();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
}
start()