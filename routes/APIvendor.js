const express = require('express')
const { Vendor } = require('../models/vendor')
const router = express.Router()

router.get('/', async (req, res) => {
    const currType = req.query.type
  const stores = await Vendor.query()
          .where('type', currType)
          .orderBy('name','asc')
          .eager('[location(orderDown), media(orderDown, onlyPage) ]', {
            onlyPage: (builder) => {
              builder.where('rootPage', 'vendor');
              },
            orderDown: (builder) => {
            builder.orderBy('order','asc')
            },
            limit: (builder) => {
            builder.limit(1)
            }
          })

  
    res.json({data:stores});

  

})

  module.exports = router