import { Router } from "express";
import { upload_news, delete_a_news, edit_a_news, get_a_news, get_all_news, upload_event, get_event, edit_event, delete_event, get_all_events, create_programme, get_programme, edit_programme, delete_programme, get_all_programmes, create_administrator, get_administrator, edit_administrator, delete_administrator } from "./admin.controller.js";
import { ADMINISTRATION_URL, EVENTS_URL, NEWS_URL, PROGRAMMES_URL } from "../constants/base.constants.js";

const admin_route = Router();

// NEWS
admin_route.post(`${NEWS_URL}/single/upload`, upload_news);
admin_route.get(`${NEWS_URL}/single/:news_id`, get_a_news);
admin_route.patch(`${NEWS_URL}/single/:news_id/edit`, edit_a_news);
admin_route.delete(`${NEWS_URL}/single/:news_id/delete`, delete_a_news);
admin_route.get(`${NEWS_URL}/multiple/news/all`, get_all_news);
// NEWS

// EVENTS
admin_route.post(`${EVENTS_URL}/single/upload`, upload_event);
admin_route.get(`${EVENTS_URL}/single/:event_id`, get_event);
admin_route.patch(`${EVENTS_URL}/single/:event_id/edit`, edit_event);
admin_route.delete(`${EVENTS_URL}/single/:event_id/delete`, delete_event);
admin_route.get(`${EVENTS_URL}/multiple/event/all`, get_all_events);
// EVENTS

// PROGRAMMES
admin_route.post(`${PROGRAMMES_URL}/single/create`, create_programme);
admin_route.get(`${PROGRAMMES_URL}/single/:programme_id`, get_programme);
admin_route.patch(`${PROGRAMMES_URL}/single/:programme_id/edit`, edit_programme);
admin_route.delete(`${PROGRAMMES_URL}/single/:programme_id/delete`, delete_programme);
admin_route.get(`${PROGRAMMES_URL}/multiple/programme/all`, get_all_programmes);
// PROGRAMMES

// ADMINISTRATIONS
admin_route.post(`${ADMINISTRATION_URL}/create`, create_administrator);
admin_route.get(`${ADMINISTRATION_URL}/:administrator_id`, get_administrator);
admin_route.patch(`${ADMINISTRATION_URL}/:administrator_id/edit`, edit_administrator);
admin_route.delete(`${ADMINISTRATION_URL}/:administrator_id/delete`, delete_administrator);
// ADMINISTRATIONS

export { admin_route }