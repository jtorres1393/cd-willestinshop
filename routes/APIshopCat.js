
const express = require('express')
const { ShopCategory } = require('../models/shopCategory')
const router = express.Router()

router.get('/', async (req, res) => {
  const cat = (req.query.category).toLowerCase();

  const data = await ShopCategory.query()
  .where('slug', cat)
  .limit(1)
  .eager('[shopItems(orderDown).media(onlyItem, orderDown)]', {
    onlyPage: (builder) => {
      builder.where('rootPage', 'artist');
      },
    onlyItem: (builder) => {
        builder.where('rootPage', 'items');
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

  res.json({data:data[0].shopItems});

  


   

  

})

  module.exports = router