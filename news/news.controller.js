import { create, delete_by_id, update_by_id } from '../utils/prisma.js';
import { res_msg, server_err } from '../utils/response.js';

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

export { create_a_news, edit_a_news, delete_a_news }