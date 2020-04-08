const tableName = "customer";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('firstName');
      table.text('lastName');
      table.text('phone');
      table.text('email');
      table.timestamps(true,true);
      table.text('address');
      table.text('state');
      table.text('city');
      table.text('zip');
      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
        
      ]);

    }