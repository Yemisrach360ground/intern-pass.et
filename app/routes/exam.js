let mongoose = require('mongoose');
let { Exam } = require('../models/exam');

/*
 * GET /Exam route to retrieve all the Exams.
 */
function getExams(req, res) {
	//Query the DB and if no errors, send all the Exams
	let query = Exam.find({});
	query.exec((err, Exams) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Exams);
	});
}

/*
 * POST /Exam to save a new Exam.
 */
function postExam(req, res) {
	//Creates a new Exam
	let newExam = new Exam(req.body);
	//Save it into the DB.
	newExam.save((err, exam) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message:"Exam successfully added!", exam });
		}
	});
}

/*
 * GET /Exam/:id route to retrieve a Exam given its id.
 */
function getExam(req, res) {
	Exam.findById(req.params.id, (err, exam) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(exam);
	});
}

/*
 * DELETE /Exam/:id to delete a Exam given its id.
 */
function deleteExam(req, res) {
	Exam.remove({_id : req.params.id}, (err) => {
		// if (err) res.send(err);
		// res.json({ message: 'Exam successfully deleted!' });
		
		if (err) {
			res.send({error: err, message: "failures"});
			return;
		}

		Exam.findOne({_id: req.params.id}, (err, exam) => {
			if(err) {
				res.json({message: 'Exam does not exist'});
			} else {
				res.json({ message: "Exam successfully deleted!" });
			}
		})
	});
}

/*
 * PUT /Exam/:id to updatea a Exam given its id
 */
function updateExam(req, res) {
	Exam.findById({_id: req.params.id}, (err, Exam) => {
		if(err) res.send(err);
		Object.assign(Exam, req.body).save((err, Exam) => {
			if(err) res.send(err);
			res.json({ message: 'Exam updated!', Exam });
		});
	});
}

//export all the functions
module.exports = { getExams, postExam, getExam, deleteExam, updateExam };
