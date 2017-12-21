var express = require('express');
var bodyParser = require('body-parser')
var app = express();
require("./helpers/consoleDriver");

const DB = require("./helpers/db");
dbService = new DB('db');

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// TODO: DRY
app.get('/api/posts', function (req, res) {
	dbService.get("posts", function (err, value) {
		if (!err && value !== undefined) {
			res.send(value);
		}
		else {
			res.send([]);
		}
	});
});
// TODO: DRY
app.post('/api/posts', function (req, res) {
	let dbKey = "posts";
	dbService.get(dbKey, function (err, value) {
		if (!err && value !== undefined) {
			saveToDb(dbKey, value, req.body);
		} else {
			saveToDb(dbKey, [], req.body);
		}
	});
	res.send({ success: true });
});

// TODO: DRY
app.get('/api/descriptions', function (req, res) {
	dbService.get("descriptions", function (err, value) {
		if (!err && value !== undefined) {
			res.send(value);
		}
		else {
			res.send([]);
		}
	});
});
// TODO: DRY
app.post('/api/descriptions', function (req, res) {
	let dbKey = "descriptions";
	dbService.get(dbKey, function (err, value) {
		if (!err && value !== undefined) {
			saveToDb(dbKey, value, req.body);
		} else {
			saveToDb(dbKey, [], req.body);
		}
	});
	res.send({ success: true });
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

function saveToDb(dbKey, currentState, newData) {

	currentState.push(newData);
	dbService.set(dbKey, currentState, function (err, success) {
		if (!err && success) {
			console.log(`added new ${dbKey} item`);
		}
	});
}