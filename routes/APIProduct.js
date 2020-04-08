
const express = require('express')
const { ShopItems } = require('../models/shopItems')
const router = express.Router()

router.get('/', async (req, res) => {
  var currID = (req.query.id).toLowerCase();
  currID = currID.replace(/-/g, ' ')

  const data = await ShopItems.query()
  .where('title', currID)
  .limit(1)
  .eager('[shopOptions(orderDown), media(onlyItem, orderDown)]', {
    onlyActive: (builder) => {
      builder.where('active', 'true');
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

  res.json({data:data});

  


   

  

})

  module.exports = router