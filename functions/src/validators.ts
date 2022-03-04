import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schemaValidator = (
	schema: Joi.Schema,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.message);
	} else {
		next();
	}
};

export const addProductValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required().min(1),
		tags: Joi.array().items(Joi.string()),
		qty: Joi.number().required().min(1),
	});

	schemaValidator(schema, req, res, next);
};
