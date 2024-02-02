

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/project.js';
    const router = Router();
   
export default {
    api: "projects",
    routes: [
        {
            endpoint: "/api/projects",
            method: "POST",
            name: "Create project",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/projects",
            method: "GET",
            name: "List projects",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/projects/:id",
            method: "GET",
            name: "List Single project",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/projects/:id",
            method: "PUT",
            name: "Update projects",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/projects/:id",
            method: "DELETE",
            name: "Delete project",
            handler: destroy,
            middlewares: []
        },
    ]
}
 