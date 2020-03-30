const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Location extends Model {
    static get tableName () {
      return 'location'
    }

    static get relationMappings(){
      return {
        media:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/media`,
          join:{
            from:'location.id',
            to: 'media.rootID'
          }
        },
        vendor:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/vendor`,
          join:{
            from:'location.rootID',
            to: 'vendor.id'
          }
        }


      }
    }


  };
  
module.exports = { Location };