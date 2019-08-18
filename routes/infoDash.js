
const express = require('express')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
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

    res.render('infoDash',{
      page: 'info',
      data: data
    });

  

})

  module.exports = router