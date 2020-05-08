const express = require('express')
const { Orders } = require('../models/orders')
const router = express.Router()

router.get('/', async (req, res) => {

    res.render('accountDash',{
      page: 'Accounting'
    });

  

})

  module.exports = router