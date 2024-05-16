import { create, delete_by_id, update_by_id, find_by_id, get_all } from '../utils/prisma.js';
import { res_msg, server_err } from '../utils/response.js';
import { NEWS_IMGS_FOLDER, UPLOADED_IMGS_BASE_URL, model_names } from '../constants/base.constants.js'
import fs from 'fs';
import path from 'path';
import { image_upload_handler } from '../utils/image_upload.js';

// NEWS
const upload_news = async (req, res) => {
    const { title, content, image } = req.body;

    try {
        if (!title || !content) res_msg({ code: 400, msg: 'All fields are required!', res });

        image_upload_handler({
            absolute_img_fn: async () => {

                const saved_news = await create({
                    data: {
                        title,
                        content,
                        image,
                        expiry_date: new Date()
                    }, model_name: model_names.news
                })

                if (saved_news) res_msg({ code: 201, msg: 'News was succesfully uploaded', res });
                else res_msg({ code: 400, msg: 'Error in uploading news', res })
            }, relative_img_fn: async ({ img_url }) => {
                const saved_news = await create({
                    data: {
                        title,
                        content,
                        image: img_url,
                        expiry_date: new Date()
                    }, model_name: model_names.news
                })

                if (saved_news) res_msg({ code: 201, msg: 'News was succesfully uploaded', res });
                else res_msg({ code: 400, msg: 'Error in uploading news', res })
            }, req, res, image
        })
    } catch (error) {
        server_err({ error, res })
    }
}

const get_a_news = async (req, res) => {
    const { news_id } = req.params;

    try {
        const news = await find_by_id({ id: Number(news_id), model_name: model_names.news });

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
        const all_news = await get_all({ model_name: model_names.news });

        if (all_news) res_msg({ code: 200, msg: 'News got!', res, data: all_news });
        else res_msg({ code: 400, msg: 'Error in getting all news!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

// NEWS

// EVENTS
const upload_event = async (req, res) => {
    const { name,
        start_date,
        end_date,
        image,
        expiry_date } = req.body;

    try {
        if (!name || !start_date || !end_date || !expiry_date) res_msg({ code: 400, msg: 'All fields are required!', res })
        else {

            image_upload_handler({
                absolute_img_fn: async () => {
                    const saved_event = await create({
                        data: {
                            name,
                            start_date,
                            end_date,
                            image,
                            expiry_date
                        }, model_name: model_names.events
                    })

                    if (saved_event) res_msg({ code: 201, msg: 'Event was succesfully uploaded', res });
                    else res_msg({ code: 400, msg: 'Error in uploading event', res })
                }, relative_img_fn: async ({ img_url }) => {
                    const saved_event = await create({
                        data: {
                            name,
                            start_date,
                            end_date,
                            image: img_url,
                            expiry_date
                        }, model_name: model_names.events
                    })

                    if (saved_event) res_msg({ code: 201, msg: 'Event was succesfully uploaded', res });
                    else res_msg({ code: 400, msg: 'Error in uploading event', res })
                }, image, req, res
            })

        }
    } catch (error) {
        server_err({ error, res })
    }
}

const get_event = async (req, res) => {
    const { event_id } = req.params;

    try {
        const event = await find_by_id({ id: Number(event_id), model_name: model_names.events });

        if (event) res_msg({ code: 200, msg: 'Event got!', res, data: event });
        else res_msg({ code: 404, msg: 'Event not found!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const edit_event = async (req, res) => {
    const { event_id } = req.params;
    const new_event_info = req.body;

    try {
        const edited_event = update_by_id({ data: new_event_info, id: event_id, model_name: model_names.events });

        if (edited_event) res_msg({ code: 200, msg: 'Event was succesfully edited', res });
        else res_msg({ code: 400, msg: 'Error in editing event', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const delete_event = async (req, res) => {
    const { event_id } = req.params;

    try {
        const deleted_event = delete_by_id({ model_name: model_names.events, id: event_id });

        if (deleted_event) res_msg({ code: 200, msg: 'Event was succesfully deleted', res });
        else res_msg({ code: 400, msg: 'Error in deleting event', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const get_all_events = async (req, res) => {
    try {
        const all_events = await get_all({ model_name: model_names.events });

        if (all_events) res_msg({ code: 200, msg: 'Events got!', res, data: all_events });
        else res_msg({ code: 400, msg: 'Error in getting all events!', res });
    } catch (error) {
        server_err({ error, res })
    }
}
// EVENTS

// PROGRAMMES
const create_programme = async (req, res) => {
    const { name,
        duration,
        start_date,
        end_date,
        image } = req.body;

    try {
        if (!name || !start_date || !end_date || !duration) res_msg({ code: 400, msg: 'All fields are required!', res })
        else {
            // image upload config
            const uploadedImage = req.file;
            const uniqueFilename = `programme_${Date.now()}${path.extname(uploadedImage.originalname)}`;
            const destinationPath = path.join(`${NEWS_IMGS_FOLDER}/`, uniqueFilename);
            fs.renameSync(uploadedImage.path, destinationPath);
            // image upload config
            const img_url = `${UPLOADED_IMGS_BASE_URL}/${uniqueFilename}`;
            const saved_event = create({
                data: {
                    name,
                    start_date,
                    end_date,
                    image: img_url,
                    expiry_date
                }, model_name: model_names.programmes
            })

            if (saved_event) res_msg({ code: 201, msg: 'Programme was succesfully uploaded', res });
            else res_msg({ code: 400, msg: 'Error in uploading programme', res })
        }
    } catch (error) {
        server_err({ error, res })
    }
}

const get_programme = async (req, res) => {
    const { programme_id } = req.params;

    try {
        const programme = await find_by_id({ id: Number(programme_id), model_name: model_names.programmes });

        if (programme) res_msg({ code: 200, msg: 'Programme got!', res, data: programme });
        else res_msg({ code: 404, msg: 'programme not found!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const edit_programme = async (req, res) => {
    const { programme_id } = req.params;
    const new_programme_info = req.body;

    try {
        const edited_programme = update_by_id({ data: new_programme_info, id: programme_id, model_name: model_names.programmes });

        if (edited_programme) res_msg({ code: 200, msg: 'Programme was succesfully edited', res });
        else res_msg({ code: 400, msg: 'Error in editing programme', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const delete_programme = async (req, res) => {
    const { programme_id } = req.params;

    try {
        const deleted_programme = delete_by_id({ model_name: model_names.programmes, id: programme_id });

        if (deleted_programme) res_msg({ code: 200, msg: 'Programme was succesfully deleted', res });
        else res_msg({ code: 400, msg: 'Error in deleting programme', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const get_all_programmes = async (req, res) => {
    try {
        const all_programmes = await get_all({ model_name: model_names.programmes });

        if (all_programmes) res_msg({ code: 200, msg: 'Programmes got!', res, data: all_programmes });
        else res_msg({ code: 400, msg: 'Error in getting all programmes!', res });
    } catch (error) {
        server_err({ error, res })
    }
}
// PROGRAMMES

// ADMINISTRATION
const create_administrator = async (req, res) => {
    const { name,
        title,
        about, } = req.body;

    try {
        if (!name || !title || !about) res_msg({ code: 400, msg: 'All fields are required!', res })
        else {
            // image upload config
            const uploadedImage = req.file;
            const uniqueFilename = `admninstrator_${Date.now()}${path.extname(uploadedImage.originalname)}`;
            const destinationPath = path.join(`${NEWS_IMGS_FOLDER}/`, uniqueFilename);
            fs.renameSync(uploadedImage.path, destinationPath);
            // image upload config
            const img_url = `${UPLOADED_IMGS_BASE_URL}/${uniqueFilename}`;
            const saved_event = create({
                data: {
                    name,
                    start_date,
                    end_date,
                    image: img_url,
                    expiry_date
                }, model_name: model_names.administration
            })

            if (saved_event) res_msg({ code: 201, msg: 'Administration was succesfully uploaded', res });
            else res_msg({ code: 400, msg: 'Error in uploading administration', res })
        }
    } catch (error) {
        server_err({ error, res })
    }
}

const get_administrator = async (req, res) => {
    const { administration_id } = req.params;

    try {
        const administration = await find_by_id({ id: Number(administration_id), model_name: model_names.administration });

        if (administration) res_msg({ code: 200, msg: 'Administration got!', res, data: administration });
        else res_msg({ code: 404, msg: 'administration not found!', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const edit_administrator = async (req, res) => {
    const { administration_id } = req.params;
    const aew_Administration_info = req.body;

    try {
        const adited_Administration = update_by_id({ data: aew_Administration_info, id: administration_id, model_name: model_names.administration });

        if (adited_Administration) res_msg({ code: 200, msg: 'Administration was succesfully edited', res });
        else res_msg({ code: 400, msg: 'Error in editing administration', res });
    } catch (error) {
        server_err({ error, res })
    }
}

const delete_administrator = async (req, res) => {
    const { administration_id } = req.params;

    try {
        const deleted_administration = delete_by_id({ model_name: model_names.administration, id: administration_id });

        if (deleted_administration) res_msg({ code: 200, msg: 'Administration was succesfully deleted', res });
        else res_msg({ code: 400, msg: 'Error in deleting administration', res });
    } catch (error) {
        server_err({ error, res })
    }
}

// ADMINISTRATION

export {
    // NEWS
    upload_news, get_a_news, edit_a_news, delete_a_news, get_all_news,
    // NEWS

    // EVENTS
    upload_event, get_event, edit_event, delete_event, get_all_events,
    // EVENTS

    // PROGRAMMES
    create_programme, get_programme, edit_programme, delete_programme, get_all_programmes,
    // PROGRAMMES

    // ADMINISTRATION
    create_administrator, get_administrator, edit_administrator, delete_administrator,
    // ADMINISTRATION
}