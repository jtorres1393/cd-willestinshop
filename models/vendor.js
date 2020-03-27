const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Vendor extends Model {
    static get tableName () {
      return 'vendor'
    }

    static get relationMappings(){
      return {
        media:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/media`,
          join:{
            from:'vendor.id',
            to: 'media.rootID'
          }
        },
        location:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/location`,
          join:{
            from:'vendor.id',
            to: 'location.rootID'
          }
        }


      }
    }


  };
  
module.exports = { Vendor };