import Joi, { ValidationOptions } from 'joi';
import { Request, Response, NextFunction } from 'express';

const options: ValidationOptions = {
	abortEarly: false, // include all errors
	allowUnknown: true, // ignore unknown props
	stripUnknown: true, // remove unknown props
};

const schemaValidator = (
	schema: Joi.Schema,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error } = schema.validate(req.body, options);
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
	const schema = Joi.object<IProduct>({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required().min(1),
		inventory: Joi.number().required().min(1),
	});

	schemaValidator(schema, req, res, next);
};

export const updateProductPriceValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		price: Joi.number().required(),
	});

	schemaValidator(schema, req, res, next);
};

export const updateProductInfoValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string().required(),
	});

	schemaValidator(schema, req, res, next);
};

export const updateProductInventoryValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		inventory: Joi.number().required(),
	});

	schemaValidator(schema, req, res, next);
};
