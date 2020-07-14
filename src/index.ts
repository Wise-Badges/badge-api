import express, { Application, Request, Response } from 'express';

let indexRouter = require('./routes/home');

const PORT = 5000;
const app: Application = express();


// routes setup
app.use('/', indexRouter);

// database setup
let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let mongoDB = 'mongodb://localhost/wise';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
