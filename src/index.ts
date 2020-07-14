import express, { Application, Request, Response } from 'express';

let indexRouter = require('./routes/home');

const PORT = 5000;
const app: Application = express();


// routes setup
app.use('/', indexRouter);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
