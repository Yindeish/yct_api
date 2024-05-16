import prisma from "../mySQL/db.config.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpOnly, path, sameSite, secure, maxAge } from '../constants/cookies.js';
import { res_msg, server_err } from '../utils/response.js';
import { create, find_by_id, find_by_key, get_all } from '../utils/prisma.js';
import { model_names } from '../constants/base.constants.js'

const signup = async (req, res) => {
    const { email, password, full_name, role } = req.body;

    if (!(email || password || full_name)) res_msg({ msg: 'Fill in all credentials!', code: 400 })

    try {
        const admin_exist = await find_by_key({ key: 'email', model_name: model_names.admin, value: email });

        if (admin_exist) {
            res_msg({ msg: "This account already exists. Pick another gmail.", code: 401, res });
        }
        if (!admin_exist) {
            const hashed_password = await bcrypt.hash(password, Number(process.env.BYCRYPT_HASH_NUMBER));

            const admin_saved = create({
                data: {
                    email,
                    password: hashed_password,
                    full_name,
                    role
                }, model_name: 'Admin'
            });

            if (admin_saved)
                res_msg({ msg: 'Your account was created', code: 201, res })
            else res_msg({ msg: 'Error in creating your account!', code: 400, res })
        }

    } catch (error) {
        server_err({ error, res })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await find_by_key({ key: 'email', model_name: model_names.admin, value: email })

        if (!admin) res_msg({ msg: 'Account not found. Enter the right email', code: 404, res });

        const password_is_correct = await bcrypt.compare(password, admin?.password);

        if (admin && password_is_correct) {
            const token = jwt.sign({ user_id: admin?.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            const one_month_from_now = new Date();
            one_month_from_now.setMonth(one_month_from_now.getMonth() + 1);

            res.cookie("token", token, {
                httpOnly,
                maxAge,
                secure,
                sameSite,
                path
            });

            res_msg({ token, msg: `You are signed in`, code: 200, res });
        }

        if (!password_is_correct) res_msg({ msg: 'Password is not correct!', code: 401, res });

    } catch (error) {
        server_err({ error, res })
    }
}

const signout = async (req, res) => {
    try {
        const token = req?.cookies?.token;

        if (!token || token === '') {
            res_msg({ msg: 'You were not signed in', code: 401, res });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res_msg({ msg: 'Error in getting token!', code: 500, res });
            } else {
                const user_id = decoded.user_id;
                const admin = await find_by_id({ id: user_id, model_name: 'admin' })

                if (admin) {
                    res.cookie("token", '', {
                        httpOnly,
                        maxAge,
                        secure,
                        sameSite,
                        path
                    });

                    res_msg({ msg: "You're logged out", code: 200, res });
                } else {
                    res_msg({ msg: 'User not found', code: 404, res });
                }
            }
        });
    } catch (error) {
        server_err({ msg: 'Internal server error', error, res });
    }
};


export { signup, signin, signout }
