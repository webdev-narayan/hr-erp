
import Joi from "joi";

export const validateRequest = async (req, res, next) => {

    const JoiSchema = Joi.object({
        "name": Joi.string(),
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

