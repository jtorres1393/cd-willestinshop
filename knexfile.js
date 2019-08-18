// Update with your config settings.
const pg = require('pg');

module.exports = {
    development:{
    client: 'pg',
    connection: 'postgres://localhost:5432/willes',
    useNullAsDefault: true
    },
    test:{
     client: 'pg',
     connection: 'postgres://localhost:5432/willes',
     useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        useNullAsDefault: true

    }
}
