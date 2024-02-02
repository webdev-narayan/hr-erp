
import { create, find, update, destroy, findOne } from '../controllers/department.js';


export default {
    api: "departments",
    routes: [
        {
            endpoint: "/api/departments",
            method: "POST",
            name: "create department",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/departments",
            method: "GET",
            name: "list department",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/departments/:id",
            method: "GET",
            name: "list single department",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/departments/:id",
            method: "PUT",
            name: "update department",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/departments/:id",
            method: "DELETE",
            name: "delete department",
            handler: destroy,
            middlewares: []
        },
    ]
}
