const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	var d = new Date();
	console.log(d + ' Request Type:', req.method + ' ' + req.path)
	next();
});
app.use(express.static(__dirname));
// app.get("/", (req, res) => {
//	// res.send('<html><h1>Hello, I am at your service!</h1></html>');
//	res.sendFile(__dirname + "/Hello.html");
//});

app.get("/", (req, res) => {
	// res.send('<html><h1>Hello, I am at your service!</h1></html>');
	res.sendFile(__dirname + "/Equation.html");
});


app.post("/Equation", (req, res) => {
	var data = [];
	const a = parseInt(req.body.a)
	const b = parseInt(req.body.b)
	const c = parseInt(req.body.c)
	const delta = Math.pow(b, 2) - 4*a*c
	const equation = a + '*X**2' + b + '*X' + c + '= 0'
	if (delta < 0) {
		var message = ' Delta < 0, No solution'
		x1 = ""
		x2 = ""
	}
	if (delta == 0) {
		var message = ' Delta = 0, 1 solution'
		x1 = (-b) / (2*a)
		x2 = (-b) / (2*a)
		console.log('x1 = x2 = ' + x1)
	}
	if (delta > 0) {
		sqrtdelta = Math.sqrt(delta)
		x1 = (-b + sqrtdelta) / (2*a)
		x2 = (-b - sqrtdelta) / (2*a)
		var message = 'Delta > 0, 2 solutions'
		console.log('x1 = ' + x1 + 'x2 = ' + x2)	
	}

	console.log(equation)
	console.log(delta)
	console.log(message)
	Equation = equation + "\n" + message
	data.push( {
		a: a,
		b: b,
		c: c,
		delta: delta,
		x1: x1,
		x2: x2,
		Equation :equation
	})
	res.send(data)

})

app.get('/about', (req, res) => {
	res.send('There is no page about us yet')
});
app.get('/Google', (req, res) => {
	res.send('<a href="https://www.google.com"> Google </a>')
});
h = '127.0.0.1'
var server = app.listen(5000, h, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server is listening at http://%s:%s', host, port);
});