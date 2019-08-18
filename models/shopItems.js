const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class ShopItems extends Model {
    static get tableName () {
      return 'shopItems'
    }

    static get relationMappings(){
      return {
        shopOptions:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/shopOptions`,
          join:{
            from:'shopItems.id',
            to: 'shopOptions.rootID'
          }
        },
        media:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/media`,
          join:{
            from:'shopItems.id',
            to: 'media.rootID'
          }
        }


      }
    }


  };
  
module.exports = { ShopItems };