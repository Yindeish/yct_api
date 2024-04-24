import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const MODE = process.env.MODE;
const BASE_URL = `/api/v0`;
const AUTH_URL = `${BASE_URL}/auth`;
const NEWS_URL = `${BASE_URL}/news`;
const EVENTS_URL = `${BASE_URL}/events`;
const PROGRAMMES_URL = `${BASE_URL}/programmes`;

const model_names = {
    admin: 'admin',
    news: 'news',
    events: 'events',
    progremmes: 'progremmes',
}


export { BASE_URL, EVENTS_URL, MODE, NEWS_URL, PORT, PROGRAMMES_URL, AUTH_URL, model_names }