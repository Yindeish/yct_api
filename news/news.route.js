import { Router } from "express";
import { create_a_news, delete_a_news, edit_a_news } from "./news.controller.js";

const news_route = Router();

news_route.post('/create', create_a_news);
news_route.patch('/:news_id/edit', edit_a_news);
news_route.delete('/:news_id/delete', delete_a_news);

export { news_route }