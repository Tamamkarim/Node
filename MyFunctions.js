var mysql = require('mysql');
var html =`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
<h1>Hello from Server</h1>
<p>It is nice to code in JS & Node</p>
</body>
</html>
`
exports.html = html
exports.myDateTime = function () {
	return Date();
};
//var Kunta = ''
//var Asukas = ''

function Form (Kunta) {
	var f = `<!DOCTYPE html>
	<html> 
	<style> table th, td {border: 1px solid black;} </style>
	<head><meta charset="UTF-8"></head>
	<body>
	<table>
	<form action="/Query" method="POST">
	<tr>
	<td>Kunta:</td> <td><input type="text" name="Kunta" value=${Kunta}></td>
	<td><button type="submit">Send</button></td>
	</tr>
	</form>
	</table></body>
	</html>`
	return (f)
}
exports.Form = Form

function Result (Kunta, Asukas) {
	var r = 
	`<!DOCTYPE html>
	<html>
	<style> table th, td {border: 1px solid black;} </style>
	<head><meta charset="UTF-8"></head>
	<body>
	<table>
	<form action="/Query" method="POST">
	<tr>
	<td>Kunta:</td> <td><input type="text" name="Kunta" value=${Kunta}></td>
	<td><button type="submit">Send</button></td>
	</tr>
	</form>
	</table></body>
	<br>
	<table>
	<tr>
	<th>Kunta</th> <th>Asukas</th>
	</tr>
	<tr>
	<td>${Kunta}</td> <td>${Asukas}</td>
	</tr>
	</table>
	</html>`
	return (r)
}	
exports.Result = Result

function CreateHTML(s,t) {
	var html =
	`<html> <body>
	<form action=/Query method=POST>
	<textarea id=Sql name=Sql rows=5 cols=80>${s}</textarea>
	<br>
	<textarea id=Result name=Result rows=15 cols=80>${t}</textarea>
	<br>
	<button type=submit>Run Query</button>
	</form></body></html>`
	return html
}
exports.CreateHTML = CreateHTML

function CreateHTMLNew(s) {
	var html =
	`<html> <body>
	<form action=/Query method=POST>
	<button type=submit>Run Query</button>
	<br>
	<textarea id=Sql name=Sql rows=5 cols=80>${s}</textarea>
	</form></body></html>`
	return html
}
exports.CreateHTMLNew = CreateHTMLNew

function CreateTable(r) {
	var table
	var style =
`<style>
#table {border-collapse: collapse;width: 100%;}
#th, #td {text-align: left;padding: 8px;border: 1px solid #dddddd;}
#tr:nth-child(even){background-color: #D6EEEE;}
</style>`
	var tab = '\t'
	var eol = '\n'
	var firstpart = `<html>${eol}<table id="table">`
	var lastpart = `${eol}</table>${eol}</html>`
	var trs = `${eol}<tr id="tr">${eol}${tab}`
	var tre = `${eol}</tr>`
	var ths = '<th id="th">'
	var the = '</th>'
	var tds = '<td id="td">'
	var tde = '</td>'
	var header = ""
	var Keys = Object.keys(r[0]);
	var kl = Keys.length 
	var Rows = Object.values(r);
	var rl = Rows.length
	header = header + trs
	for (i = 0; i < kl; i++) {
		header = header + ths + Keys[i] + the
	}
	header = header + tre
	var rows = ""
	for (i = 0; i < rl; i++) {
		rows = rows + trs;
		for (j = 0; j < kl; j++) {
			rows = rows + tds + Rows[i][Keys[j]] + tde
		}
		rows = rows + tre;
	}
	table =`${firstpart}${style}${header}${rows}${lastpart}`
	return table
}
exports.CreateTable = CreateTable


function CreateBuildQuery(q) {
	var html =
	`<html><head><script>
function CreateSQL() {
	let TauluV = document.forms["Query"]["Taulu"].value;
	let EnimiV = document.forms["Query"]["Enimi"].value;
	let EnimiN = document.forms["Query"]["Enimi"].name;
	let SnimiV = document.forms["Query"]["Snimi"].value;
	let SnimiN = document.forms["Query"]["Snimi"].name;
	let PituusV = document.forms["Query"]["Pituus"].value;
	let PituusN = document.forms["Query"]["Pituus"].name;
	let PainoV = document.forms["Query"]["Paino"].value;
	let PainoN = document.forms["Query"]["Paino"].name;
	let SpV = document.forms["Query"]["Sp"].value;
	let SpN = document.getElementById("Sp").name
	if (SpV != "") {
		SpV   = ' = ' + "'" + SpV + "'"
	}
	let FieldsV = [EnimiV, SnimiV, PituusV, PainoV, SpV]
	let FieldsN = [EnimiN, SnimiN, PituusN, PainoN, SpN]
	let fl = FieldsV.length
	for (let i = 0; i < fl; i++) {
		if (FieldsV[i] != "") {
			FieldsV[i] = " " + FieldsN[i] + " " + FieldsV[i]
		}
	}
	let SelectFrom = 'select * from ' + TauluV
	let Where = ""
	for (let i = 0; i < fl; i++) {
		Where = Where + FieldsV[i]
	}	
	if (Where != "") {
		Where = "\\nwhere" + Where
	}
	let sql = SelectFrom + Where
	document.getElementById("Sql").innerHTML = sql

}
</script></head>
<form name="Query" action="/Query" method="POST">
<table>
<tr>
	<td>
		<label for="Taulu">Taulu</label>
		<input type="text" id="Taulu" name="Taulu" value="Henkilo">
	</td>
	<td>
		<label for="Enimi">Enimi</label>
		<input type="text" id="Enimi" name="Enimi" value="">
	</td>
	<td>
		<label for="Snimi">Snimi</label>
		<input type="text" id="Snimi" name="Snimi" value="">
	</td>
	<td>
		<label for="Pituus">Pituus</label>
		<input type="text" id="Pituus" name="Pituus" value="">
	</td>
	<td>
		<label for="Paino">Paino</label>
		<input type="text" id="Paino" name="Paino" value="">
	</td>
</tr>
<tr>
	<td>
		<label>Sp</label>
		<label for="Nainen">Nainen</label>
		<input type="radio" id = "Sp" name="Sp" value="N"> 
		<label for="Mies">Mies</label>
		<input type="radio" id = "Sp" name="Sp" value="M"> 
	</td>
</tr>
<tr>
	<td>
		<input type="button" onclick="CreateSQL()" value="CreateSQL">
		<input type="submit" value="SendSQL">
		<input type="reset" value="Reset">
	</td>
</tr>
</table>
	<textarea id=Sql name=Sql rows=5 cols=120>${q}</textarea>
</form></html>`
return html
}
exports.CreateBuildQuery = CreateBuildQuery
