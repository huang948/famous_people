const pg = require("pg");
const settings = require("./settings"); 

var arg = process.argv[2];

const client = new pg.Client({
	user     : settings.user,
	password : settings.password,
	database : settings.database,
	host     : settings.hostname,
	port     : settings.port,
	ssl      : settings.ssl
});

client.connect((err) => {
	if (err) {
		return console.error("Connection Error", err);
	}

	console.log("Searching ...");
	client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name=$1::text OR last_name=$1::text", [arg], (err, result) => {
	if (err) {
		return console.error("error running query", err);
	}
	console.log(`Found ${result.rows.length} person(s) by the name ${arg}`);
	for (var i=0; i<result.rows.length; i++) {
		console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate}`);
	}
	client.end();
	});
});
