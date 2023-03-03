import express from "express";
import { localsMiddleware } from "./middlewares";
import { getJoin, getLogin, home, postJoin, postLogin } from "./userController";

const userRouter = express.Router();

userRouter.get("/", home);
userRouter.route("/join").all(localsMiddleware).get(getJoin).post(postJoin);
userRouter.route("/login").all(localsMiddleware).get(getLogin).post(postLogin);

export default userRouter;
