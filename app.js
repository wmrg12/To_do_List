var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todosRouter = require("./routes/task");

var app = express();

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
  // Fallback silencioso por si 
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
        metadata: { version: '1.0', status: status },
        data: [],
        links: { self: req.originalUrl },
        errors: [{ message: err.message }]
      });
    },
    default: () => {
      res.status(status).json({
        metadata: { version: '1.0', status: status },
        data: [],
        links: { self: req.originalUrl },
        errors: [{ message: err.message }]
      });
    }
  });
});

module.exports = app;