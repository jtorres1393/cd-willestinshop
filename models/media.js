const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Media extends Model {
    static get tableName () {
      return 'media'
    }
  };
  
module.exports = { Media };