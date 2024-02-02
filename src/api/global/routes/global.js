

import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/global.js';
const router = Router();

export default {
    api: "globals",
    routes: [
        {
            endpoint: "/api/globals",
            method: "POST",
            name: "create global",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/globals",
            method: "GET",
            name: "list global",
            handler: create,
            middlewares: []
        },
    ]
}
