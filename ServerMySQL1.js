const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '10.10.211.30',
  user: 'Remote',
  password: 'Remote123,',
  database: 'HKV'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  const query = 'SELECT anro, enimi, snimi, spvm, sp FROM asiakas LIMIT 10';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      connection.end(); 
      return;
    }

    console.log('Query results:');
    console.log(results);

    console.log('Query results in JSON format:');
    const jsonResults = JSON.stringify(results);
    console.log(jsonResults);

    console.log('Query results as JavaScript object:');
    const jsObject = JSON.parse(jsonResults);
    console.log(jsObject);

    console.log('Query results as a table:');
    console.table(jsObject);

    connection.end();
  });
});
