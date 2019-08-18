const tableName = "shopItems";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.integer('order');
      table.text('title');
      table.text('subTitle');
      table.text('about');
      table.integer('shipping');
      table.integer('price');
      table.integer('rootID');
      table.text('details');

    
    

      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }