import express from 'express';
import bodyParser from 'body-parser';
// database
import { db } from './databases/init.mongodb.js'
// Routes
import UserRouter from './api/v1/routes/user.route.js';

const app = express();
app.use(bodyParser.json());

// init database
db;

// Home page
app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
});

// use Routes
app.use('/v1/user/', UserRouter);

export default app;