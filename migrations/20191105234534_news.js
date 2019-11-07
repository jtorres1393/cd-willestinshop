const tableName = "news";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.text('title');
      table.text('body')
      table.text('subTitle');
      table.text('date');
      table.text('tags');
      table.timestamps(true,true);
      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }