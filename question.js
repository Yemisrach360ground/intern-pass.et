var express = require('express');
var router = express.Router();
var exams = [
    {id: 1, title: "Question Title 1", question: "1. the question goes here", answer: "1. the answer goes here", level: 1 ,subject: "1. the question subject goes here", timeout: 60 ,icon: "image1.png", instruction: "1. the instruction for the question goes here", explanation:"the explanation 1 goes here", trial: 0 },
    {id: 2, title: "Question Title 2", question: "2. the question goes here", answer: "2. the answer goes here", level: 2 ,subject: "2. the question subject goes here", timeout: 60 ,icon: "image2.png", instruction: "2. the instruction for the question goes here", explanation:"the explanation 2 goes here", trial: 0 },
    {id: 3, title: "Question Title 3", question: "3. the question goes here", answer: "3. the answer goes here", level: 2 ,subject: "3. the question subject goes here", timeout: 60 ,icon: "image3.png", instruction: "3. the instruction for the question goes here", explanation:"the explanation 3 goes here", trial: 0 },
    {id: 4, title: "Question Title 4", question: "4. the question goes here", answer: "4. the answer goes here", level: 1 ,subject: "3. the question subject goes here", timeout: 60 ,icon: "image4.png", instruction: "4. the instruction for the question goes here", explanation:"the explanation 4 goes here", trial: 0 },
    {id: 5, title: "Question Title 5", question: "5. the question goes here", answer: "5. the answer goes here", level: 3 ,subject: "2. the question subject goes here", timeout: 60 ,icon: "image5.png", instruction: "5. the instruction for the question goes here", explanation:"the explanation 5 goes here", trial: 0 },
    {id: 6, title: "Question Title 6", question: "6. the question goes here", answer: "6. the answer goes here", level: 3 ,subject: "1. the question subject goes here", timeout: 60 ,icon: "image6.png", instruction: "6. the instruction for the question goes here", explanation:"the explanation 6 goes here", trial: 0 },

];

//Routes goes here

router.get('/', function(req, res){
    res.json(exams);
});



module.exports = router;
