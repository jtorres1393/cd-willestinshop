const tableName = "rsvp";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('firstName');
      table.text('lastName')
      table.text('email');
      table.text('phone');
      table.integer('guests');
      table.integer('rootID');
      table.timestamps(true,true);
      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }