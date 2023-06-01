const http = require('http');
var qs = require('querystring');
var mf = require('./MyFunctions');
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "10.10.211.25",
	user: "Remote",
	password: "Remote123,",
	database: "BigData"
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});
const hostname = 'localhost';
const port = 8500;
var sql = ""
var QueryResult = ""
var ColNames = "";
var line = "";
var array = Array();
function reqListener(req, res) {
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		sql = ""
		QueryResult = ""
		res.write(mf.CreateBuildQuery(sql));
		return res.end();
	}
	if (url === '/Query' && method === 'POST') {
		var body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		req.on('end', () => {
			body = Buffer.concat(body).toString();
			var post = qs.parse(body);
			sql = post.Sql;
			//console.log(sql)
			con.query(sql, function(err, result, fields) {
				if (err) {
					let message = 'jotain ongelmia sql lauseessa'
					message = sql + '\n' + message
					res.write(mf.CreateBuildQuery(message));
					return res.end();
				}
				if (result.length == 0) {
					let message = 'No data'
					message = sql + '\n' + message
					res.write(mf.CreateBuilQuery(message));
					return res.end();
				}
				else {
					var rows = JSON.parse(JSON.stringify(result))
					res.write(mf.CreateBuildQuery(sql));
					res.write(mf.CreateTable(rows));
					return res.end();
				}	
			})
		})	
	}
}
const server = http.createServer(reqListener)
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
