
import Joi from "joi";

export const createRequest = async (req = request, res = response, next) => {
    const JoiSchema = Joi.object({
        "name": Joi.string().required(),
        "description": Joi.string().required(),
        "deadline": Joi.string().required(),
        "note": Joi.string().required(),
        "status": Joi.string().valid("NOT_STARTED", "IN_PROGRESS", "COMPLETED", "HOLD").optional(),
        "TeamId": Joi.number().positive().required(),
        "modules": Joi.array().items(Joi.object({
            "name": Joi.string().required(),
            "note": Joi.string().optional(),
            "users": Joi.array().items(Joi.number()).required().min(1)
        }).required()).min(1).required()
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

