import { Router } from "express";
import { signin, signout, signup } from "./auth.controller.js";

const auth_route = Router();

auth_route.post('/signup', signup);
auth_route.post('/signin', signin);
auth_route.post('/signout', signout);

export { auth_route }