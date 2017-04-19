var express = require('express');
var bodyParser = require('body-parser');
//todo why would you need the two packages below?
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());


var question = require('./question.js');


app.use('/exam', question);

app.listen(3000);
