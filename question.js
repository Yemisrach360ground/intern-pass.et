var express = require('express');
var router = express.Router();
var exams = [
    //todo rewrite this array of objects downwards instead of horizontal for redability. Just like the first item here
    {
        //todo include options array with indices
        //todo answer must be one of the indices of these options
        //todo rename timeout to duration
        //todo make instructions a comman separated list of strings without the leading number
        //todo same goes with answer, question, and subject - I mean removing the leading number
        //todo what is level?
        //todo what is trial?
        id: 1001,
        title: "Question Title 1", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionA", 
        level: 1,
        subject: "the question subject goes here",
        duration: 60,
        icon: "image1.png",
        instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }],
        explanation:"the explanation 1 goes here",
        trial: 0
    },
    {
        id: 1002, 
        title: "Question Title 2", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionB", 
        level: 2, 
        subject: "the question subject goes here", 
        duration: 60 ,icon: "image2.png", 
        instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }],
        explanation:"the explanation 2 goes here", 
        trial: 0 
    },
    {
        id: 1003, 
        title: "Question Title 3", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionC", 
        level: 2, 
        subject: "the question subject goes here", 
        duration: 60 ,
        icon: "image3.png", 
         instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }],
    },
    {
        id: 1004, 
        title: "Question Title 4", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionD", 
        level: 1,
        subject: "the question subject goes here", 
        duration: 60 ,
        icon: "image4.png", 
         instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }], 
        explanation:"the explanation 4 goes here", 
        trial: 0 },
    {
        id: 1005, 
        title: "Question Title 5", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionA",  
        level: 3, 
        subject: "the question subject goes here", 
        duration: 60, 
        icon: "image5.png", 
         instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }],
        explanation:"the explanation 5 goes here", 
        trial: 0 },
    {
        id: 1006, 
        title: "Question Title 6", 
        question: "the question goes here", 
        options: [{
            optionA:"option a element",
            optionB:"option b element", 
            optionC:"option c element",
            optionD:"option d element "
        }],
        answer: "options.optionB", 
        level: 3,
        subject: "the question subject goes here", 
        duration: 60 ,
        icon: "image6.png", 
         instruction: [{
            inst1:"the instruction for the question goes here", 
            inst2: "the instruction for the question goes here"
        }],
        explanation:"the explanation 6 goes here", 
        trial: 0 },

];

//id
//title
//question
//answer
//level
//subject
//duration
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
    //todo what are this regular expressions doing
    if(!req.body.title ||
        !req.body.level.toString().match(/^[0-9]{1}$/g) ||
        !req.body.trial.toString().match(/^[0-9]{1}$/g) ||
        !req.body.duration.toString().match(/^[0-9]{2}$/g))
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
            duration: req.body.duration,
            icon: req.body.icon,
            instruction: req.body.instruction,
            explanation: req.body.explanation,
            trial: req.body.trial
        });
        //todo give the exam object itself as the response
        res.json({message: "New question created.", location: "/exam/" + newId});
    }
});


//working on the put request for the api

router.put('/:id', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.title ||

      !req.body.level.toString().match(/^[0-9]{1}$/g) ||
       !req.body.trial.toString().match(/^[0-9]{1}$/g) ||
       !req.body.duration.toString().match(/^[0-9]{2}$/g) ||
       !req.params.id.toString().match(/^[0-9]{4,}$/g)
    )
      {
      res.status(400);
      res.json({message: "Bad Request"});
    }
    else{
        //Gets us the index of movie with given id.
        var updateIndex = exams.map(function(exam){
            return exam.id;
        }).indexOf(parseInt(req.params.id));
        if(updateIndex === -1){

            //Movie not found, create new
            exams.push({
                id: req.params.id,
                title: req.body.title,
                question: req.body.question,
                answer: req.body.answer,
                level: req.body.level,
                subject: req.body.subject,
                duration: req.body.duration,
                icon: req.body.icon,
                instruction: req.body.instruction,
                explanation: req.body.explanation,
                trial: req.body.trial
            });
            //todo return the exam object itself as json
            res.json({message: "New question created.", location: "/exams/" + req.params.id});

        }
        else{
            //Update existing movie
            exams[updateIndex] = {
              id: req.params.id,
              title: req.body.title,
              question: req.body.question,
              answer: req.body.answer,
              level: req.body.level,
              subject: req.body.subject,
              duration: req.body.duration,
              icon: req.body.icon,
              instruction: req.body.instruction,
              explanation: req.body.explanation,
              trial: req.body.trial
            };
            //todo return the exam object itself
            res.json({message: "question id " + req.params.id + " updated.", location: "/exams/" + req.params.id});
        }
    }
});


//to delete exam question

router.delete('/:id', function(req, res){
    var removeIndex = exams.map(function(exam){
        return exam.id;
    }).indexOf(req.params.id);
    if(removeIndex === -1){
        res.json({message: "question not found"});
    }else{
        exam.splice(removeIndex, 1);

        //todo return the deleted exam object itself
        res.send({message: "question id " + req.params.id + " is removed.", location: "/delete/"});

    }
});
//todo remove extra (unnecessary) newlines
module.exports = router;
