import jwt from "jsonwebtoken";
import { res_msg } from '../utils/response.js';

const verify_token = (req, res, fnToRun) => {
    const token = req?.cookies?.token;

    if (!token || token === '') {
        res_msg({ msg: 'Unauthorized. Signin required!', code: 401, res });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res_msg({ msg: 'Error in getting token!', code: 400, res })
        } else {
            const user_id = decoded.user_id;
            if (user_id) {
                fnToRun(user_id);
            }
            else res_msg(401).json({ msg: 'Signin required!', code: 401, res })
        }
    });
}

export { verify_token }