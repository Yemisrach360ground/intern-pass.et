let mongoose = require('mongoose');
let { Question } = require('../models/Question');

/*
 * GET
 */
function getQuestions(req, res) {
	//Query the DB and if no errors, send all the Exams
	let query = Question.find({});
	query.exec((err, Questions) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Questions);
	});
}

/*
 * POST
 */
 function postQuestion(req, res) {
 	//Creates a new Exam
 	var newQuestion = new Question(req.body);
 	//Save it into the DB.
 	newQuestion.save((err,Question) => {
 		if(err) {
 			res.send(err);
 		}
 		else { //If no errors, send it back to the client
 			res.json({message:"Question successfully added!", Question });
 		}
 	});
 }

/*
 * GET by id.
 */
function getQuestion(req, res) {
	Question.findById(req.params.id, (err, Question) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(Question);
	});
}

/*
 * DELETE /Exam/:id to delete a Exam given its id.
 */
function deleteQuestion(req, res) {
	Question.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Question successfully deleted!", result });
	});
}

/*
 * PUT /Question/:id to updatea a Exam given its id
 */
function updateQuestion(req, res) {
	Question.findById({_id: req.params.id}, (err, Question) => {
		if(err) res.send(err);
		Object.assign(Question, req.body).save((err, Question) => {
			if(err) res.send(err);
			res.json({ message: 'Question updated!', Question });
		});
	});
}

//export all the functions
module.exports = { getQuestions, postQuestion, getQuestion, deleteQuestion, updateQuestion };
