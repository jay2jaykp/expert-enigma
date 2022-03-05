import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';

import { adminRoutes, productRoutes } from './routes';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const firebaseApp = admin.initializeApp();
const app = express();
app.use(cors());
app.use('/admin', adminRoutes);
app.use('/', productRoutes);

export const api = functions.https.onRequest(app);

export const signup = functions.auth.user().onCreate((user) => {
	console.log(user);
	firebaseApp.firestore().collection(`/users/${user.uid}`).add({
		email: user.email,
	});
});
