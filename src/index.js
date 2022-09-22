import express from 'express';
import bodyParser from 'body-parser';
// database
import { db } from './databases/init.mongodb.js'
// Routes v1
import UserRouter from './api/v1/routes/user.route.js';
import ClassRouter from './api/v1/routes/class.route.js';
// Routes v2
import InsertScore from './api/v2/routes/user.route.js';

const app = express();
app.use(bodyParser.json());

// init database
db;

// Home page
app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
});

// use Routes v1
app.use('/v1/user/', UserRouter);
app.use('/v1/class/', ClassRouter);

// user Routes v2
app.use('/v2/user/', InsertScore);

export default app;