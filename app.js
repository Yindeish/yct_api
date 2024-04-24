import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import { BASE_URL, EVENTS_URL, MODE, NEWS_URL, PORT, PROGRAMMES_URL, AUTH_URL } from './constants/base.constants.js';
import { news_route } from './news/news.route.js';
import { auth_route } from './auth/auth.route.js';

dotenv.config();


const app = express();

// Middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
// Middlewares

// Endpoints
app.use(`${NEWS_URL}`, news_route);
app.use(`${AUTH_URL}`, auth_route);
// Endpoints

app.listen(PORT, () => {
    console.log({ BASE_URL, AUTH_URL });
})