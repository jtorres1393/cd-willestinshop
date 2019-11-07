const express = require('express')
const { News } = require('../models/news')
const router = express.Router()

router.get('/', async (req, res) => {
  const currID = req.query.id;
  const data = await News.query()
          .where('id', currID)
          .eager('[media(orderDown, onlyPage) ]', {
            onlyPage: (builder) => {
              builder.where('rootPage', 'news');
              },
            orderDown: (builder) => {
            builder.orderBy('order','asc')
            },
            limit: (builder) => {
            builder.limit(1)
            }
          })

    res.render('newsEdit',{
      page: 'Edit Article: ',
      data:data
    });

  

})

  module.exports = router