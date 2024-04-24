import { res_msg } from '../utils/response.js';

const authorize_page = async (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === '') {
        res_msg({ msg: 'Unauthorized!', code: 401, res })
    } else {
        next();
    }
}

export { authorize_page }