

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/attendence.js';
    const router = Router();
   
export default {
    api: "attendences",
    routes: [
        {
            endpoint: "/api/attendences",
            method: "POST",
            name: "Create attendence",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/attendences",
            method: "GET",
            name: "List attendences",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/attendences/:id",
            method: "GET",
            name: "List Single attendence",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/attendences/:id",
            method: "PUT",
            name: "Update attendences",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/attendences/:id",
            method: "DELETE",
            name: "Delete attendence",
            handler: destroy,
            middlewares: []
        },
    ]
}
 