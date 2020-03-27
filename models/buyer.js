const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Buyer extends Model {
    static get tableName () {
      return 'buyer'
    }

    static get relationMappings(){
      return {
        invoices:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/invoices`,
          join:{
            from:'buyer.id',
            to: 'invoice.rootID'
          }
        }


      }
    }

    

  };
  
module.exports = { Buyer };