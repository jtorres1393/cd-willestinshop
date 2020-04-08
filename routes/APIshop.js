
const express = require('express')
const { ShopCategory } = require('../models/shopCategory')
const router = express.Router()

router.get('/', async (req, res) => {
  const sec = req.query.type;

  const data = await ShopCategory.query()
  .orderBy('order',"asc")
  .eager('[shopItems(orderDown, onlyActive)]', {
    onlyActive: (builder) => {
      builder.where('active', true);
      },
    orderDown: (builder) => {
    builder.orderBy('order','asc')
    }
  })

  res.json({data:data});

  


   

  

})

  module.exports = router