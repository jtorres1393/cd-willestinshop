const tableName = "buyer";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('firstName');
      table.text('lastName');
      table.text('company');
      table.text('phone');
      table.text('email');
      table.timestamps(true,true);
      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }