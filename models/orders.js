const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Orders extends Model {
    static get tableName () {
      return 'orders'
    }

    static get relationMappings(){
      return {
        customers:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/customer`,
          join:{
            from:'orders.rootID',
            to: 'customer.id'
          }
        }


      }
    }
    

    

  };
  
module.exports = { Orders };