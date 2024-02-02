
import { create, find, update, destroy, findOne, loginAdmin, allPermissions } from '../controllers/admin.js';


export default {
    api: "admins",
    routes: [
        {
            endpoint: "/api/admins/register",
            method: "POST",
            name: "create admin",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/admins/permissions",
            method: "POST",
            name: "login admin",
            handler: allPermissions,
            middlewares: []
        },
        {
            endpoint: "/api/admins/login",
            method: "POST",
            name: "login admin",
            handler: loginAdmin,
            middlewares: []
        },
        {
            endpoint: "/api/admins",
            method: "GET",
            name: "list admin",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/admins/:id",
            method: "GET",
            name: "list single admin",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/admins/:id",
            method: "PUT",
            name: "update admin",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/admins/:id",
            method: "DELETE",
            name: "delete admin",
            handler: destroy,
            middlewares: []
        },
    ]
}
