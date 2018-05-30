
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function(table){
    table.increments('id').primary();
    table.string("description");
    table.date("date");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("milestones");
};
