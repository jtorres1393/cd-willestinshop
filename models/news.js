const Knex = require('knex')
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const connection = require('../knexfile')[environment];  
const { Model, HasManyRelation } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class News extends Model {
    static get tableName () {
      return 'news'
    }

    static get relationMappings(){
      return {
        media:{
          relation: HasManyRelation,
          modelClass: `${__dirname}/media`,
          join:{
            from:'news.id',
            to: 'media.rootID'
          }
        }


      }
    }


  };
  
module.exports = { News };