const tableName = "location";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('name');
      table.text('address')
      table.text('city');
      table.text('state');
      table.text('zip');
      table.text('type');
      table.text('web');
      table.text('phone');
      table.text('map');
      table.float('lat');
      table.float('long');
      table.timestamps(true,true);
      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }