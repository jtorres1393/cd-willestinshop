const tableName = "media";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('url');
      table.text('rootPage');
      table.integer('rootID');
      table.text('name');
      table.text('type');
      table.text('section')
      table.integer('order')
    
    

      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }