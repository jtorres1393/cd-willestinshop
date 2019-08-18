const express = require('express')
const { ShopCategory } = require('../models/shopCategory')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  const info = await Info.query()
  const data = await ShopCategory.query()
    .orderBy('order', "asc")
    res.render('shopDash',{
      page: 'Shop',
      data: data,
      info: info
    });
})


module.exports = router