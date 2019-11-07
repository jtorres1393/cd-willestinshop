
const express = require('express')
const { Info } = require('../models/info')
const { News } = require('../models/news')
const router = express.Router()

router.get('/', async (req, res) => {
  const news = await News.query()
    .orderBy('order', "asc")
    .limit(1)
    .eager('[media(onlyPage, orderDown)]', {
      onlyPage: (builder) => {
        builder.where('rootPage', 'news');
        },
        orderDown: (builder) => {
        builder.orderBy('order','asc')
        }})
  const data = await Info.query()
    .limit(1)
    .eager('[media(onlyPage, orderDown)]', {
      onlyPage: (builder) => {
        builder.where('rootPage', 'info');
        },
      onlyType: (builder) => {
      builder.where('studio', 'thumb');
      },
      orderDown: (builder) => {
      builder.orderBy('order','asc')
      },
      limit: (builder) => {
      builder.limit(1)
      }
    })

    res.json({data:data, news:news})
  

})

  module.exports = router