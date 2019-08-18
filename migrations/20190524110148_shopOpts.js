const tableName = "shopOptions";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.integer('order');
      table.text('title');
      table.integer('stock');
      table.integer('rootID');
    
    

      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }