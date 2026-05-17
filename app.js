var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todosRouter = require("./routes/task");

var app = express();

// mongoose

const mongoose = require("mongoose");

//const mongoDB = "mongodb+srv://cooluser:1234@cluster0.q3t5u8z.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = "mongodb://cooluser:1234@ac-ecv0hmz-shard-00-00.q3t5u8z.mongodb.net:27017,ac-ecv0hmz-shard-00-01.q3t5u8z.mongodb.net:27017,ac-ecv0hmz-shard-00-02.q3t5u8z.mongodb.net:27017/local_library?ssl=true&replicaSet=atlas-vo850n-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de method-override
let methodOverride;
try {
  methodOverride = require('method-override');
} catch(e) {
  // Fallback silencioso por si aún no corres npm install
}

if (methodOverride) {
  app.use(methodOverride('_method'));
} else {
  // Fallback temporal
  app.use(function (req, res, next) {
    if (req.body && req.body._method) {
      req.method = req.body._method.toUpperCase();
      delete req.body._method;
    } else if (req.query && req.query._method) {
      req.method = req.query._method.toUpperCase();
      delete req.query._method;
    }
    next();
  });
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/task", todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const status = err.status || 500;

  res.format({
    html: () => {
      res.status(status).render('error');
    },
    json: () => {
      res.status(status).json({
        metadata: { version: '1.0' },
        data: null,
        links: { self: req.originalUrl },
        errors: [{ message: err.message }]
      });
    },
    default: () => {
      res.status(status).json({
        metadata: { version: '1.0' },
        data: null,
        links: { self: req.originalUrl },
        errors: [{ message: err.message }]
      });
    }
  });
});

module.exports = app;