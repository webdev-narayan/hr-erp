

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/application.js';
    const router = Router();
   
export default {
    api: "applications",
    routes: [
        {
            endpoint: "/api/applications",
            method: "POST",
            name: "Create application",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/applications",
            method: "GET",
            name: "List applications",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/applications/:id",
            method: "GET",
            name: "List Single application",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/applications/:id",
            method: "PUT",
            name: "Update applications",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/applications/:id",
            method: "DELETE",
            name: "Delete application",
            handler: destroy,
            middlewares: []
        },
    ]
}
 