const tableName = "mail";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('title');
      table.text('subTitle');
      table.boolean('sent');
      table.text('about');
      table.timestamps(true,true);
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }

