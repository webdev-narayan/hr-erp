

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/module.js';
    const router = Router();
   
export default {
    api: "modules",
    routes: [
        {
            endpoint: "/api/modules",
            method: "POST",
            name: "Create module",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/modules",
            method: "GET",
            name: "List modules",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/modules/:id",
            method: "GET",
            name: "List Single module",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/modules/:id",
            method: "PUT",
            name: "Update modules",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/modules/:id",
            method: "DELETE",
            name: "Delete module",
            handler: destroy,
            middlewares: []
        },
    ]
}
 