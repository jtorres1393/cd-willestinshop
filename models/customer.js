const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Customer extends Model {
    static get tableName () {
      return 'customer'
    }

    static get relationMappings(){
      return {
        orders:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/orders`,
          join:{
            from:'customer.id',
            to: 'orders.rootID'
          }
        }


      }
    }

    

  };
  
module.exports = { Customer };