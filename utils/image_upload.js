import { res_msg } from '../utils/response.js';
import { NEWS_IMGS_FOLDER, UPLOADED_IMGS_BASE_URL } from '../constants/base.constants.js'
import fs from 'fs';
import path from 'path';

const image_upload_handler = async ({ req, res, absolute_img_fn, relative_img_fn, image }) => {
    const img_url_absolute = image?.toString().indexOf('http://') !== 1;
    // if image url is an absolute url
    if (img_url_absolute && image) absolute_img_fn();
    else {
        if (!req.file) res_msg({ code: 400, msg: 'Image is required!', res })
        else {
            // image upload config
            const uploadedImage = req.file;
            const uniqueFilename = `news_${Date.now()}${path.extname(uploadedImage.originalname)}`;
            const destinationPath = path.join(`${NEWS_IMGS_FOLDER}/`, uniqueFilename);
            fs.renameSync(uploadedImage.path, destinationPath);
            // image upload config
            const img_url = `${UPLOADED_IMGS_BASE_URL}/${uniqueFilename}`;

            relative_img_fn({ img_url });
        }
    }
}

export { image_upload_handler }