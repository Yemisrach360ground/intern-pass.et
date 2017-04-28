let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.get('/', (req, res) => {
    User.find({}, function(err, users){
		res.json(users);
	});
})

router.post('/', (req, res) => {
let user = new User(req.body);
	user.save((err, user) => {
		if(err) {
			res.json({error , message: "Failure"})
		} else {
			res.json(user);
		}
	});
});

module.exports = router;