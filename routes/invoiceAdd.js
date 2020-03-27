const express = require('express')
const { Buyer } = require('../models/buyer')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  const currid = req.query.id;
  const data = await Buyer.query()
          .where('id',currid);
  const info = await Info.query()
    .orderBy('id','desc')
    .limit(1)

    res.render('invoiceAdd',{
      page: 'Add Invoice',
      data: data,
      info: info
    });

  

})

  module.exports = router