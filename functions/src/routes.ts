import * as express from 'express';
import { addProductController } from './controllers';
import { addProductValidator } from './validators';
// import { firebaseApp } from '.';
export const router = express.Router();

// /login
// /logout
// /singup

// for admin user

// admin/product/add
router.post('/admin/product/add', addProductValidator, addProductController);

// admin/product/qty/update
