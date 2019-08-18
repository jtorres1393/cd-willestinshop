const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class ShopOptions extends Model {
    static get tableName () {
      return 'shopOptions'
    }


  };
  
module.exports = { ShopOptions };