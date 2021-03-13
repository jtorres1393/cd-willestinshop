// Update with your config settings.
const pg = require('pg');
pg.defaults.ssl = {
  rejectUnauthorized: false,
}
module.exports = {
    development:{
    client: 'pg',
    connection: 'postgres://localhost:5432/willes',
    pool: {
        afterCreate: function (conn, done) {
          // in this example we use pg driver's connection API
          conn.query('SET TIMEZONE="America/Los_Angeles";', function (err) {
            done(err, conn);
          });
        }
      }
    },
    test:{
     client: 'pg',
     connection: 'postgres://localhost:5432/willes',
     useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        pool: {
            afterCreate: function (conn, done) {
              // in this example we use pg driver's connection API
              conn.query('SET TIMEZONE="America/Los_Angeles";', function (err) {
                done(err, conn);
              });
            }
          }

    }
}
