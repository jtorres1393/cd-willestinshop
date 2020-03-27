const express = require('express')
const { Buyer } = require('../models/buyer')
const router = express.Router()

router.get('/', async (req, res) => {
  const id = req.query.id;
  const data = await Buyer.query()
          .where('id',id)
          .eager('[invoices(orderDate)]', {
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

    res.render('buyerView',{
      page: 'Buyer Profile',
      data: data
    });

  

})

  module.exports = router