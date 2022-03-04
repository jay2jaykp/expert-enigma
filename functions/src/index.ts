import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';

import { router } from './routes';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const firebaseApp = admin.initializeApp();
const app = express();
app.use('/v1', router);

export const api = functions.https.onRequest(app);
