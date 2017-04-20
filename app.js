var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());


var question = require('./question.js');


app.use('/exam', question);

app.listen(3000);
