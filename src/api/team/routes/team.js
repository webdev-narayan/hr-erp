

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/team.js';
    const router = Router();
   
export default {
    api: "teams",
    routes: [
        {
            endpoint: "/api/teams",
            method: "POST",
            name: "Create team",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/teams",
            method: "GET",
            name: "List teams",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/teams/:id",
            method: "GET",
            name: "List Single team",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/teams/:id",
            method: "PUT",
            name: "Update teams",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/teams/:id",
            method: "DELETE",
            name: "Delete team",
            handler: destroy,
            middlewares: []
        },
    ]
}
 