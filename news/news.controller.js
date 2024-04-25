import { create, delete_by_id, update_by_id, find_by_id, get_all } from '../utils/prisma.js';
import { res_msg, server_err } from '../utils/response.js';
import { model_names } from '../constants/base.constants.js'
import fs from 'fs';
import path from 'path';
import { request } from "http";
import prisma from '../mySQL/db.config.js';

const create_a_news = async (req, res) => {
    const { title, content, image } = req.body;

    try {
        const saved_news = create({
            data: {
                title,
                content,
                image,
            }, model_name: 'News'
        })

        if (saved_news) res_msg({ code: 201, msg: 'News was succesfully created', res });
        else res_msg({ code: 400, msg: 'Error in creating news', res })
    } catch (error) {
        server_err({ error, res })
    }
}

const upload_news_img = async (req, res) => {
    const { admin } = req;
    const { news_id } = req.params;

    try {
        if (!req.file) {
            status_msg({ code: 400, res, msg: 'No file uploaded', res });
        }
        const uploadedImage = req.file;
        const uniqueFilename = `avatar_${admin?.UserID}${path.extname(uploadedImage.originalname)}`;
        const destinationPath = path.join('uploads/', uniqueFilename);
        fs.renameSync(uploadedImage.path, destinationPath);

        res_msg({ msg: 'Image uploaded successfully', code: 201, res })
    } catch (error) {
        server_err({ error, res })
    }
}

// const create_a_news = async (req, res) => {
//     const { title, content } = req.body;
//     const image = req.file;

//     try {
//         if (!image) {
//             return status_msg({ code: 400, res, msg: 'No file uploaded' });
//         }

//         const uniqueFilename = `avatar_${req.admin?.UserID}${path.extname(image.originalname)}`;
//         const destinationPath = path.join('uploads/', uniqueFilename);
//         fs.renameSync(image.path, destinationPath);

//         const saved_news = await create({
//             data: {
//                 title,
//                 content,
//                 image: uniqueFilename,
//             },
//             model_name: 'News',
//         });

//         res.json({ saved_news })

//         // if (saved_news) {
//         //     res_msg({ code: 201, msg: 'News was successfully created', res });
//         // } else {
//         //     res_msg({ code: 400, msg: 'Error in creating news', res });
//         // }
//     } catch (error) {
//         server_err({ error, res });
//     }
// };

const get_a_news = async (req, res) => {
    const { news_id } = req.params;

    try {
        const news = await find_by_id({ id: news_id, model_name: model_names.news });

        if (news) res_msg({ code: 200, msg: 'News got!', res, data: news });
        else res_msg({ code: 404, msg: 'News not found!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const edit_a_news = async (req, res) => {
    const { news_id } = req.params;
    const new_news_info = req.body;

    try {
        const edited_news = update_by_id({ data: new_news_info, id: news_id, model_name: 'News' });

        if (edited_news) res_msg({ code: 200, msg: 'News was succesfully edited', res });
        else res_msg({ code: 400, msg: 'Error in editing news', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const delete_a_news = async (req, res) => {
    const { news_id } = req.params;

    try {
        const deleted_news = delete_by_id({ model_name: 'News', id: news_id });

        if (deleted_news) res_msg({ code: 200, msg: 'News was succesfully deleted', res });
        else res_msg({ code: 400, msg: 'Error in deleting news', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const get_all_news = async (req, res) => {
    try {
        // const all_news = await get_all({ model_name: model_names.news });
        const all_news = await prisma.news.findMany({})

        if (all_news) res_msg({ code: 200, msg: 'News got!', res, data: all_news });
        else res_msg({ code: 400, msg: 'Error in getting all news!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

export { create_a_news, get_a_news, edit_a_news, delete_a_news, get_all_news, upload_news_img }