const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];
const Password = require('objection-password')();  
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Users extends Password(Model) {
    static get tableName () {
      return 'users'
    }
  };
  
module.exports = { Users };