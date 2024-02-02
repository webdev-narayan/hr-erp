

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/sub_module.js';
    const router = Router();
   
export default {
    api: "sub_modules",
    routes: [
        {
            endpoint: "/api/sub_modules",
            method: "POST",
            name: "Create sub_module",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/sub_modules",
            method: "GET",
            name: "List sub_modules",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/sub_modules/:id",
            method: "GET",
            name: "List Single sub_module",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/sub_modules/:id",
            method: "PUT",
            name: "Update sub_modules",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/sub_modules/:id",
            method: "DELETE",
            name: "Delete sub_module",
            handler: destroy,
            middlewares: []
        },
    ]
}
 