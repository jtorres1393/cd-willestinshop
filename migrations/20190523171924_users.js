const tableName = "users";
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
      table.uuid('id').notNullable().primary();
      table.text('firstName').notNullable();
      table.text('lastName').notNullable();
      table.text('email').notNullable();
      table.text('password').notNullable();
      table.integer('role').notNullable()
    

      
      
    });
  };
  
  exports.down = function(knex, Promise) {
      return Promise.all([
        knex.schema.dropTable(tableName)
      
      ]);

    }