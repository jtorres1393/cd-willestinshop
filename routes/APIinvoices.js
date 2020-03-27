const express = require('express')
const { Invoices } = require('../models/invoices')
const router = express.Router()

router.get('/', async (req, res) => {
  const currId = req.query.id
  const data = await Invoices.query()
          .where('id',currId)
          .eager('buyer')


          

    res.json({data:data});

  

})

  module.exports = router