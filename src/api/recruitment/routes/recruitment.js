

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/recruitment.js';
    const router = Router();
   
export default {
    api: "recruitments",
    routes: [
        {
            endpoint: "/api/recruitments",
            method: "POST",
            name: "Create recruitment",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/recruitments",
            method: "GET",
            name: "List recruitments",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/recruitments/:id",
            method: "GET",
            name: "List Single recruitment",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/recruitments/:id",
            method: "PUT",
            name: "Update recruitments",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/recruitments/:id",
            method: "DELETE",
            name: "Delete recruitment",
            handler: destroy,
            middlewares: []
        },
    ]
}
 