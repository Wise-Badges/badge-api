import express, { Application, Request, Response, NextFunction } from 'express';

const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const path = require('path');

const indexRouter = require('./routes/main');
const badgeclassRouter = require('./routes/badgeclass');
const assertionRouter = require('./routes/assertion');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const app: Application = express();

// routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/badgeclass', badgeclassRouter);
app.use('/assertion', assertionRouter);

// database setup
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// listen on specified port
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //show error
  res.status(err.status || 404).send();
});
