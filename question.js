var express = require('express');
var router = express.Router();
var exams = [
    {id: 1001, title: "Question Title 1", question: "1. the question goes here", answer: "1. the answer goes here", level: 1 ,subject: "1. the question subject goes here", timeout: 60 ,icon: "image1.png", instruction: "1. the instruction for the question goes here", explanation:"the explanation 1 goes here", trial: 0 },
    {id: 1002, title: "Question Title 2", question: "2. the question goes here", answer: "2. the answer goes here", level: 2 ,subject: "2. the question subject goes here", timeout: 60 ,icon: "image2.png", instruction: "2. the instruction for the question goes here", explanation:"the explanation 2 goes here", trial: 0 },
    {id: 1003, title: "Question Title 3", question: "3. the question goes here", answer: "3. the answer goes here", level: 2 ,subject: "3. the question subject goes here", timeout: 60 ,icon: "image3.png", instruction: "3. the instruction for the question goes here", explanation:"the explanation 3 goes here", trial: 0 },
    {id: 1004, title: "Question Title 4", question: "4. the question goes here", answer: "4. the answer goes here", level: 1 ,subject: "3. the question subject goes here", timeout: 60 ,icon: "image4.png", instruction: "4. the instruction for the question goes here", explanation:"the explanation 4 goes here", trial: 0 },
    {id: 1005, title: "Question Title 5", question: "5. the question goes here", answer: "5. the answer goes here", level: 3 ,subject: "2. the question subject goes here", timeout: 60 ,icon: "image5.png", instruction: "5. the instruction for the question goes here", explanation:"the explanation 5 goes here", trial: 0 },
    {id: 1006, title: "Question Title 6", question: "6. the question goes here", answer: "6. the answer goes here", level: 3 ,subject: "1. the question subject goes here", timeout: 60 ,icon: "image6.png", instruction: "6. the instruction for the question goes here", explanation:"the explanation 6 goes here", trial: 0 },

];

//id
//title
//question
//answer
//level
//subject
//timeout
//icon
//instruction
//explanation
//trial


//Routes goes here


// getting all the datas
router.get('/', function(req, res){
    res.json(exams);
});


// getting an exam by using an id

router.get('/:id([0-9]{4,})', function(req, res){
    var currExam = exams.filter(function(exam){
        if(exam.id == req.params.id){
            return true;
        }
    });
    if(currExam.length == 1){
        res.json(currExam[0])
    }
    else{
        res.status(404);//Set status to 404 as exam was not found
        res.json({message: "SORRY! The Exam was Not Found"});
    }
});

// creating a new question

router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
        !req.body.level.toString().match(/^[0-9]{4}$/g) ||
        !req.body.trial.toString().match(/^[0-9]{4}$/g) ||
        !req.body.timeout.toString().match(/^[0-9]{4}$/g))
        {
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        var newId = exams[exams.length-1].id+1;
        exams.push({
            id: newId,
            title: req.body.title,
            question: req.body.question,
            answer: req.body.answer,
            level: req.body.level,
            subject: req.body.subject,
            timeout: req.body.timeout,
            icon: req.body.icon,
            instruction: req.body.instruction,
            explanation: req.body.explanation,
            trial: req.body.trial
        });
        res.json({message: "New question created.", location: "/exam/" + newId});
    }
});



module.exports = router;
