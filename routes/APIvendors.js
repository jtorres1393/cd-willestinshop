const express = require('express')
const { Vendor } = require('../models/vendor')
const router = express.Router()

router.get('/', async (req, res) => {
  const stores = await Vendor.query()
          .where('type', 'store')
          .orderBy('order','asc')
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

  const bars = await Vendor.query()
        .where('type', 'bar')
        .orderBy('order','asc')
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
    res.json({stores:stores, bars:bars})
  

})

  module.exports = router