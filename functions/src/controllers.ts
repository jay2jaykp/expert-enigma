import { Request, Response } from 'express';
import { firebaseApp } from '.';

export const addProductController = (req: Request, res: Response) => {
	firebaseApp
		.firestore()
		.collection('/products')
		.add(req.body)
		.then((doc) => {
			res.status(201).send(`Product added at ${doc.id}`);
		})
		.catch((err) => {
			res.status(500).send(`Error: ${err}`);
		});
};
