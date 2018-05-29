const settings = require("./settings");
const arg = process.argv[2];

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

knex.select('*').from('famous_people')
.then(function (people) {
  people.forEach(function(value) {
    if (value.first_name === arg || value.last_name === arg) {
      console.log(value);
    }
  })
}).catch(function (err) {
  console.log(err);
}).finally(function () {
  knex.destroy();
});
