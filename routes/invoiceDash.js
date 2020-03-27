const express = require('express')
const { Buyer } = require('../models/buyer')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Buyer.query()
          .orderBy('lastName','desc')
          .eager('invoices(orderDate, onlyActive)', {
            onlyActive: (builder) => {
              builder.whereNot('status', 'paid');
              },
            orderDate: (builder) => {
            builder.orderBy('created_at','desc')
            },
            limit: (builder) => {
            builder.limit(1)
            }
          })

    res.render('invoiceDash',{
      page: 'Invoices ',
      data: data
    });

  

})

  module.exports = router