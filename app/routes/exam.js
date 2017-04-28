let mongoose = require('mongoose');
let { Exam } = require('../models/exam');
let router = require('express').Router();

router.get('/', (req, res) => {
	//Query the DB and if no errors, send all the Exams
	let query = Exam.find({});
	query.exec((err, Exams) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Exams);
	});
});

router.post('/', (req, res) => {
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
})


router.get('/:id', (req, res) => {
	Exam.findById(req.params.id, (err, exam) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(exam);
	});
})

router.put('/:id', (req, res) => {
	Exam.findById({_id: req.params.id}, (err, Exam) => {
		if(err) res.send(err);
		Object.assign(Exam, req.body).save((err, Exam) => {
			if(err) res.send(err);
			res.json({ message: 'Exam updated!', Exam });
		});
	});
});

router.delete('/:id', (req, res) => {
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
})

//export all the functions
module.exports = router;
