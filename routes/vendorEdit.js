const express = require('express')
const { Vendor } = require('../models/vendor')
const router = express.Router()

router.get('/', async (req, res) => {
  const curr = req.query.id;
  const data = await Vendor.query()
          .where('id', curr)
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

  
    res.render('vendorEdit',{
      page: 'Edit Vendors: ',
      data: data
    });

  

})

  module.exports = router