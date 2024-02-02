
import Joi from "joi";
import { errorResponse } from "../../../services/errorResponse.js";

export const createSchema = async (req, res, next) => {
    const JoiSchema = Joi.object({
        "name": Joi.string(),
        "username": Joi.string(),
        "email": Joi.string().email().required(),
        "phone": Joi.string().min(10).max(13).required(),
        "password": Joi.string().min(6).required(),
        "DepartmentId": Joi.number().optional(),
    });
    let result = JoiSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send(errorResponse({
            message: result.error.message,
            details: result.error.details
        }));
    }
    await next();
}
export const updateSchema = async (req, res, next) => {
    const JoiSchema = Joi.object({
        "name": Joi.string(),
        "username": Joi.string(),
        "email": Joi.string().email().required(),
        "phone": Joi.string().min(10).max(13).required(),
        "password": Joi.string().min(6).required(),
        "DepartmentId": Joi.number().optional(),
    });
    let result = JoiSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send(errorResponse({
            message: result.error.message,
            details: result.error.details
        }));

    }
    await next();
}
