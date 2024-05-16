import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import { BASE_URL, EVENTS_URL, MODE, ADMIN_URL, PORT, PROGRAMMES_URL, AUTH_URL, NEWS_IMGS_FOLDER, UPLOADED_IMGS_BASE_URL, BASE_FOLDER } from './constants/base.constants.js';
import { auth_route } from './auth/auth.route.js';
import { authorize_page } from './auth/auth.middleware.js';
import { authorize_admin } from './admin/admin.middleware.js';
import { admin_route } from './admin/admin.route.js';
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
app.use(`/${NEWS_IMGS_FOLDER}`, express.static(`${NEWS_IMGS_FOLDER}`));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `../${BASE_FOLDER}`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
// Multer configuration

// Middlewares

// Endpoints
// app.use(`${ADMIN_URL}`, authorize_page, authorize_admin,upload.single('image'), admin_route);
app.use(`${AUTH_URL}`, auth_route);
app.use(`${ADMIN_URL}`, upload.single('image'), admin_route);
// Endpoints

app.get(`${BASE_URL}`, (req, res) => {
    res.json({ SERVER_IS_RUNNING__: 'Server running..', BASE_URL });
})

app.listen(PORT, () => {
    console.log(`SERVER_IS_RUNNING__on_ BASE_URL: ${BASE_URL} `);
})