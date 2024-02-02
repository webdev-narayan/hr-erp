

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/designation.js';
    const router = Router();
   
export default {
    api: "designations",
    routes: [
        {
            endpoint: "/api/designations",
            method: "POST",
            name: "Create designation",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/designations",
            method: "GET",
            name: "List designations",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/designations/:id",
            method: "GET",
            name: "List Single designation",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/designations/:id",
            method: "PUT",
            name: "Update designations",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/designations/:id",
            method: "DELETE",
            name: "Delete designation",
            handler: destroy,
            middlewares: []
        },
    ]
}
 