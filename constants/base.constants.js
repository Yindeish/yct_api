import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const MODE = process.env.MODE;
const BASE_URL = `/api/v0`;
const AUTH_URL = `${BASE_URL}/auth`;
const NEWS_URL = `/news`;
const ADMIN_URL = `${BASE_URL}/admin`;
const EVENTS_URL = `/events`;
const PROGRAMMES_URL = `/programmes`;
const ADMINISTRATION_URL = `/administration`;
const NEWS_IMGS_FOLDER = 'uploaded_news_imgs';
const UPLOADED_IMGS_BASE_URL = `http://localhost:${PORT}/${NEWS_IMGS_FOLDER}`;
const BASE_FOLDER = 'new-yabatech-website-backend';

const model_names = {
    admin: 'admin',
    administration: 'administration',
    news: 'news',
    events: 'events',
    programmes: 'programmes',
}


export { BASE_URL, EVENTS_URL, MODE, NEWS_URL, PORT, PROGRAMMES_URL, AUTH_URL, model_names, UPLOADED_IMGS_BASE_URL, NEWS_IMGS_FOLDER, ADMIN_URL, ADMINISTRATION_URL, BASE_FOLDER }