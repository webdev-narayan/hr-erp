
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/user.js';
import { createSchema, updateSchema } from '../middlewares/user.js';


export default {
    api: "users",
    routes: [
        {
            endpoint: "/api/users",
            method: "POST",
            name: "Create User",
            handler: create,
            middlewares: [createSchema]
        },
        {
            endpoint: "/api/users",
            method: "GET",
            name: "List Users",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/users/:id",
            method: "GET",
            name: "List Single User",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/users/:id",
            method: "PUT",
            name: "Update User",
            handler: update,
            middlewares: [updateSchema]
        },
        {
            endpoint: "/api/users/:id",
            method: "DELETE",
            name: "Delete User",
            handler: destroy,
            middlewares: []
        },
    ]
}
