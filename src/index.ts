import express, { Application, Request, Response, NextFunction} from 'express';

let createError = require('http-errors');
let path = require('path');

let indexRouter = require('./routes/main');

const PORT = 5000;
const app: Application = express();


// routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// database setup
let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let mongoDB = 'mongodb://localhost/wise';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// listen on specified port
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    //show error
    res.status(err.status || 404).send();
  });
