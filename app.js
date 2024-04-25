import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import { BASE_URL, EVENTS_URL, MODE, NEWS_URL, PORT, PROGRAMMES_URL, AUTH_URL } from './constants/base.constants.js';
import { news_route } from './news/news.route.js';
import { auth_route } from './auth/auth.route.js';
import { authorize_page } from './auth/auth.middleware.js';
import { authorize_admin } from './admin/admin.middleware.js';
import multer from 'multer';

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
app.use('/uploads', express.static('uploads'));

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
// Multer configuration

// Middlewares

// Endpoints
// authorize_admin,
app.use(`${NEWS_URL}`, authorize_page, upload.single('image'), news_route);
app.use(`${AUTH_URL}`, auth_route);
// Endpoints

app.get('/api/v0', (req, res) => {
    res.json('Server running..')
})

app.listen(PORT, () => {
    console.log({ BASE_URL });
})