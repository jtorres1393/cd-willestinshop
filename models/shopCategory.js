const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class ShopCategory extends Model {
    static get tableName () {
      return 'shopCategory'
    }

    static get relationMappings(){
      return {
        shopItems:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/shopItems`,
          join:{
            from:'shopCategory.id',
            to: 'shopItems.rootID'
          }
        }


      }
    }


  };
  
module.exports = { ShopCategory };