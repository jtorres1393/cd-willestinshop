const tableName = "info";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('phone');
      table.text('email');
      table.text('instagram');
      table.text('address');
      table.text('city');
      table.text('about');
      table.integer('tax');
      table.text('state');
      table.text('zip');

    
    

      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }