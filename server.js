let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let exam = require('./app/routes/exam');
let question=require('./app/routes/question');
let User = require('./app/models/user')
let config = require('config'); //we load the db location from the JSON files
//db options
let jwt = require('jsonwebtoken'); //used to create, sign, and verify token
let configs = require('./configs'); //get our mongoose model
let options = {
				server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };
//JWT_SECRET="superSecret";
//db connection
app.set('superSecret', configs.secret); //secret variable 

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

app.use("/exam", require("./app/routes/exam"));
app.use('/users', require('./app/routes/user'));

app.route("/question")
	.get(question.getQuestions)
	.post(question.postQuestion);
app.route("/question/:id")
	.get(question.getQuestion)
	.delete(question.deleteQuestion)
	.put(question.updateQuestion);



app.get('/setup', function(req, res){
	//create a sample user
	var messer = new User({
		name: 'Yemssrach Tessema',
		password: 'pass',
		admin: true
	});
	messer.save(function(err){
		if(err) throw err;

		console.log('User saved successfully');
		res.json({success: true});
	});

});

app.post('/authenticate', function(req, res){
	//find the user 
	User.findOne({
		name:req.body.name
	}, function(err, user){
		if(err) throw err;

		if(!user){
			res.json({success: false, message: 'Authentication failed, User not found. '});
		}else if(user){
			//check if password mathches
			if(user.password != req.body.password){
				res.json({success: false, message: 'Authentication failed. Wrong password. '});
			}else{
				//if user is found and password is right
				// create a token 
				var token = jwt.sign(user, app.get('superSecret'),{
					expiresIn : 60*60*24 //expires in 24 hours
					
				});
			//return the information including token as JSON
			res.json({
				success:true,
				message:'Enjoy your token!',
				token:token
			});
			}
		}
	} );

});

//middleware to verify a token 
app.use(function(req, res, next){
	//check header or url parameters or post parameter for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token. '}); 
			}else{
				//if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	}else{
		//if there is no token 
		//return an error
		return res.status(403).send({
			success:false,
			message:'No token provided'
		});
	}
});




app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
