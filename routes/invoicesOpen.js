const express = require('express')
const { Invoices } = require('../models/invoices')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Invoices.query()
          .whereNot('status','paid')
          .eager('buyer')

          

    res.render('invoicesOpen',{
      page: 'Open Invoices ',
      data: data
    });

  

})

  module.exports = router