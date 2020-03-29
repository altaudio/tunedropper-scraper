import express from 'express';
import dotenv from 'dotenv';
import { authorize } from './routes/authorize.js';
import { authorized } from './routes/authorized.js';

dotenv.config();

const app = express();

app.get('/authorize', authorize);
app.get('/authorized', authorized);

const port = 8080;
console.log(`Listening on port ${port}`);
app.listen(port);
