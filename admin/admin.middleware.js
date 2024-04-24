import { verify_token } from '../utils/verify_token.js';
import { find_by_id, find_by_key } from '../utils/prisma.js';
import { model_names } from '../constants/base.constants.js';
import { res_msg, server_err } from '../utils/response.js';

const authorize_admin = async (req, res, next) => {
    try {
        verify_token(req, res, async admin_id => {
            const admin = await find_by_id({ id: admin_id, model_name: model_names.admin });

            if (admin) {
                req.admin = admin;
                next();
            } else res_msg({ msg: `You're not an admin or a super admin!`, code: 401, res })
        })
    } catch (error) {
        server_err({ error, res })
    }
}

export { authorize_admin }