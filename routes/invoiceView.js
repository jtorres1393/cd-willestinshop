const express = require('express')
const { Invoices } = require('../models/invoices')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  const currId = req.query.id
  const data = await Invoices.query()
          .where('id',currId)
          .eager('buyer')
  const info = await Info.query()
          .orderBy('id','desc')
          .limit(1)

          

    res.render('invoiceView',{
      page: 'Invoices ',
      data: data,
      info:info
    });

  

})

  module.exports = router