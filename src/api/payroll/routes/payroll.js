

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/payroll.js';
    const router = Router();
   
export default {
    api: "payrolls",
    routes: [
        {
            endpoint: "/api/payrolls",
            method: "POST",
            name: "Create payroll",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/payrolls",
            method: "GET",
            name: "List payrolls",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/payrolls/:id",
            method: "GET",
            name: "List Single payroll",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/payrolls/:id",
            method: "PUT",
            name: "Update payrolls",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/payrolls/:id",
            method: "DELETE",
            name: "Delete payroll",
            handler: destroy,
            middlewares: []
        },
    ]
}
 