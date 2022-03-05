import { Request, Response } from 'express';
import { UserInfo } from 'firebase-functions/v1/auth';
import { firebaseApp } from '.';

export const addProductController = (req: Request, res: Response) => {
	firebaseApp
		.firestore()
		.collection('/products')
		.add(req.body as IProduct)
		.then((doc) => {
			res.status(201).send(`Product added at ${doc.id}`);
		})
		.catch((err) => {
			res.status(500).send(`Error: ${err}`);
		});
};

export const updateProductPriceController = async (
	req: Request,
	res: Response
) => {
	const ref = firebaseApp
		.firestore()
		.collection('/products')
		.doc(req.body.id);
	const doc = await ref.get();
	if (doc.exists) {
		ref.update({
			price: req.body.price,
		})
			.then((result) => {
				console.log('done', result);
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log('error', err);
				res.sendStatus(500);
			});
	} else {
		res.status(404).send(`Product with id ${req.body.id} not found`);
	}
};

export const updateProductInfoController = async (
	req: Request,
	res: Response
) => {
	const ref = firebaseApp
		.firestore()
		.collection('/products')
		.doc(req.body.id);
	const doc = await ref.get();
	if (doc.exists) {
		ref.update({
			name: req.body.name,
			description: req.body.description,
		})
			.then((result) => {
				console.log('done', result);
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log('error', err);
				res.sendStatus(500);
			});
	} else {
		res.status(404).send(`Product with id ${req.body.id} not found`);
	}
};

export const updateProductInventoryController = async (
	req: Request,
	res: Response
) => {
	const ref = firebaseApp
		.firestore()
		.collection('/products')
		.doc(req.body.id);
	const doc = await ref.get();
	if (doc.exists) {
		ref.update({
			inventory: req.body.inventory,
		})
			.then((result) => {
				console.log('done', result);
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log('error', err);
				res.sendStatus(500);
			});
	} else {
		res.status(404).send(`Product with id ${req.body.id} not found`);
	}
};

export const getProductController = async (req: Request, res: Response) => {
	try {
		const snapshot = await firebaseApp
			.firestore()
			.collection('/products')
			.get();
		const data: any[] = [];
		snapshot.forEach((e) => {
			data.push({ ...e.data(), id: e.id });
		});
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const signUpUserController = async (req: Request, res: Response) => {
	try {
		const currentUser = req.body as UserInfo;
		console.log(currentUser);
		// check if user exists already
		const user = await firebaseApp
			.firestore()
			.collection('/users')
			.doc(currentUser.email)
			.get();
		if (user.exists) {
			res.status(200).send(user.data());
		} else {
			await firebaseApp
				.firestore()
				.collection(`/users/${currentUser.email}`)
				.add({
					cart: 0,
				})
				.then(() => {
					res.sendStatus(201);
				});
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
