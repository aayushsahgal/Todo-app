var express= require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var app=express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/todotask', function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
}); 

var todolistSchema = new mongoose.Schema({
	work : String,
	}, {collection : "todolist"});

var todolist = mongoose.model("todolist", todolistSchema);


app.get('/todolist', function(req, res) {
	console.log("I recieved a get request");
	todolist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/todolist', function(req,res) {
	console.log(req.body);
	var task= new todolist({
		work: req.body.work
	});
	task.save(function(err, doc) {
		res.json(doc);
	});
});

app.delete('/todolist/:id', function(req, res) {
	todolist.remove({_id: req.params.id}, function(err, doc) {
		res.json(doc);
	});
});



app.listen(3000);
console.log("Server running on port 3000");