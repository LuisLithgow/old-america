'use strict'

const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
// const dotenv      = (DEV) ? require('dotenv').config() : undefined;

const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');
const homeRoute   = require('./routes/home_rt');
const userRoute   = require('./routes/user_rt');
const searchRoute = require('./routes/search_rt');
const app         = express();
const PORT        = process.argv[2] || process.env.PORT || 3000;
const session        = require('express-session');
const methodOverride = require('method-override');

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sooopersekret',
  cookie: {maxAge: 60000}
}));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(methodOverride('_method'));

//ROUTES

app.use('/', homeRoute);
app.use('/search', searchRoute);
// app.use('/user', userRoute);

// app.use( express.static(path.join(__dirname, 'dist')));

// app.get('', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })


app.listen(PORT , () => console.log(`Server magic on`, PORT ) );



