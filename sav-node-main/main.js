const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    multer = require('multer'),
    bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MIDDLEWARE
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'))

// ROUTES
const ROUTES = require("./src/routes")
app.use('/api/auth/', ROUTES.authRouter);
app.use('/api/device/', ROUTES.deviceRouter);
app.use('/api/intervention/', ROUTES.interRouter);
app.use('/api/discharge/', ROUTES.dischRouter);
app.use('/api/available_client/', ROUTES.clientRouter);
app.use('/api/notification/', ROUTES.notiftRouter);
app.use('/api/swap/', ROUTES.swapRouter);


// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


// SERVER
(app).listen(3000, () => {
    console.log('[!] server run on http://localhost:3000');
});


