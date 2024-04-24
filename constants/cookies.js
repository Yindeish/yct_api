const httpOnly = process.env.MODE == 'DEVELOPMENT' ? true : false;
const secure = process.env.MODE == 'DEVELOPMENT' ? true : false;
const sameSite = process.env.MODE == 'DEVELOPMENT' ? 'none' : 'strict';
const path = '/';
const maxAge = 30 * 24 * 60 * 60 * 1000

export { httpOnly, path, sameSite, secure, maxAge }