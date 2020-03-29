import express from 'express';
import { authorize } from './routes/authorize.js';
import { authorized } from './routes/authorized.js';

const app = express();

app.get('/authorize', authorize);
app.get('/authorized', authorized);

const port = 8080;
console.log(`Listening on port ${port}`);
app.listen(port);
