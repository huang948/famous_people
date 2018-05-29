const settings = require("./settings");
const args = process.argv.slice(2);

// client is the data storage type ('pg' or 'postgresql')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    ssl: settings.ssl
  }
});

knex("famous_people").insert({
  first_name: args[0],
  last_name: args[1],
  birthdate: args[2]
}).then(() => {
  knex.destroy();
});