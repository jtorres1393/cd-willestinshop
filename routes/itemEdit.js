const express = require('express')
const { ShopItems } = require('../models/shopItems')
const router = express.Router()

router.get('/', async (req, res) => {
  const cat = req.query.cat;
  const catID = req.query.catID
  const currID = req.query.id;
  const data = await ShopItems.query()
          .where('id', currID)
          .eager('[shopOptions(orderDown), media(orderDown, onlyPage) ]', {
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

    res.render('itemEdit',{
      page: 'Edit Item: ',
      cat: cat,
      data:data,
      currID: currID,
      catID: catID
    });

  

})

  module.exports = router