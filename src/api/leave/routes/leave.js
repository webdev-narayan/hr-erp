

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/leave.js';
    const router = Router();
   
export default {
    api: "leaves",
    routes: [
        {
            endpoint: "/api/leaves",
            method: "POST",
            name: "Create leave",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/leaves",
            method: "GET",
            name: "List leaves",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/leaves/:id",
            method: "GET",
            name: "List Single leave",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/leaves/:id",
            method: "PUT",
            name: "Update leaves",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/leaves/:id",
            method: "DELETE",
            name: "Delete leave",
            handler: destroy,
            middlewares: []
        },
    ]
}
 