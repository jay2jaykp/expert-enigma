import * as express from 'express';
import {
	addProductController,
	getProductController,
	signUpUserController,
	updateProductInfoController,
	updateProductInventoryController,
	updateProductPriceController,
} from './controllers';
import {
	addProductValidator,
	updateProductPriceValidator,
	updateProductInfoValidator,
	updateProductInventoryValidator,
} from './validators';
// import { firebaseApp } from '.';
export const adminRoutes = express.Router();
export const productRoutes = express.Router();

adminRoutes.post('/product/add', addProductValidator, addProductController);

adminRoutes.post(
	'/product/update/price',
	updateProductPriceValidator,
	updateProductPriceController
);

adminRoutes.post(
	'/product/update/inventory',
	updateProductInventoryValidator,
	updateProductInventoryController
);

adminRoutes.post(
	'/product/update/info',
	updateProductInfoValidator,
	updateProductInfoController
);

productRoutes.get('/product', getProductController);

productRoutes.post('/users', signUpUserController);
