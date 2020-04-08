const express = require('express')
const { Orders } = require('../models/orders')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Orders.query()
          .where('shipped', true)
          .orderBy('id','desc')
          .eager('customers')

    res.render('archiveDash',{
      page: 'Invoices ',
      data: data
    });

  

})

  module.exports = router