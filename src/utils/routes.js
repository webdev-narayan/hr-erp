import express from "express"
import generator from "../api/permission/services/generator.js";
import RBAC from "../middlewares/RBAC.js";
import notFoundHandler from "../middlewares/notFoundHandler.js";
import { app } from "../../server.js";
const router = express.Router();
const { routes } = await generator()


routes.forEach((item) => {
    router[item.method.toLowerCase()](item.endpoint, [RBAC, ...item.middlewares], item.handler)
})
app.use(router);
app.use(notFoundHandler);