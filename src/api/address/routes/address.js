

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/address.js';
    const router = Router();
   
export default {
    api: "addresss",
    routes: [
        {
            endpoint: "/api/addresss",
            method: "POST",
            name: "Create address",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/addresss",
            method: "GET",
            name: "List addresss",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/addresss/:id",
            method: "GET",
            name: "List Single address",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/addresss/:id",
            method: "PUT",
            name: "Update addresss",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/addresss/:id",
            method: "DELETE",
            name: "Delete address",
            handler: destroy,
            middlewares: []
        },
    ]
}
 