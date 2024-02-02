
import { create, find, update, destroy, findOne } from '../controllers/role.js';
import { validateRequest } from '../middlewares/role.js';

export default {
    api: "roles",
    routes: [
        {
            endpoint: "/api/roles",
            method: "POST",
            name: "Create role",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/roles",
            method: "GET",
            name: "List roles",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/roles/:id",
            method: "GET",
            name: "List Single User",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/roles/:id",
            method: "PUT",
            name: "Update User",
            handler: update,
            middlewares: [validateRequest]
        },
        {
            endpoint: "/api/roles/:id",
            method: "DELETE",
            name: "Delete role",
            handler: destroy,
            middlewares: []
        },
    ]
}
