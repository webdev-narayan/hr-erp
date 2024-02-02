
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Address from "../models/address.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const address = await Address.create(req.body);
           return res.status(200).send(address);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const addresss = await Address.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, addresss.count)
            return res.status(200).send({ data: addresss.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const address = await Address.findByPk(id);
            if (!address) {
                return res.status(404).send(errorResponse({status:404,message:"address not found!"}))
            }
                return res.status(200).send({data:address})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getAddress = await Address.findByPk(id)
            
            if (!getAddress) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[address]] = await Address.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"address updated!",data:address})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getAddress = await Address.findByPk(id)

            if (getAddress) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const address = Address.destroy({ where: { id } });
            return res.status(200).send({message:"address deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

