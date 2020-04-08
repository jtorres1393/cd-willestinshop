const tableName = "orders";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('cart');
      table.text('cost');
      table.boolean('paid');
      table.boolean('shipped');
      table.integer('tax');
      table.integer('shipping');
      table.integer('rootID');
      table.timestamps(true,true);
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }