let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let exam = require('./app/routes/exam');
let question=require('./app/routes/question');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = {
				server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };

//db connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to our examstore!"}));

app.route("/exam")
	.get(exam.getExams)
	.post(exam.postExam);
app.route("/exam/:id")
	.get(exam.getExam)
	.delete(exam.deleteExam)
	.put(exam.updateExam);

app.route("/question")
	.get(question.getQuestions)
	.post(question.postQuestion);
app.route("/question/:id")
	.get(question.getQuestion)
	.delete(question.deleteQuestion)
	.put(question.updateQuestion);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
