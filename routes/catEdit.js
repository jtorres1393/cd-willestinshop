
const express = require('express')
const { ShopCategory } = require('../models/shopCategory')
const router = express.Router()

router.get('/', async (req, res) => {
  const curr = req.query.cat
  const data = await ShopCategory.query()
    .where('slug', curr )
    .limit(1)
    .eager('[shopItems(orderDown).[shopOptions(orderDown), media(orderDown, onlyPage) ]]', {
      onlyPage: (builder) => {
        builder.where('rootPage', 'items');
        },
      orderDown: (builder) => {
      builder.orderBy('order','asc')
      },
      limit: (builder) => {
      builder.limit(1)
      }
    })



    res.render('catEdit',{
      page: data[0].title,
      data: data,
      cat: curr
    });

  

})

  module.exports = router