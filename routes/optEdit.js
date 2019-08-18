const express = require('express')
const { ShopOptions } = require('../models/shopOptions')
const { ShopItems } = require('../models/shopItems')
const router = express.Router()

router.get('/', async (req, res) => {
  const curr = req.query.id
  const cat = req.query.cat
  const itemID = req.query.itemID
  const getItem = await ShopItems.query()
              .where("id", itemID)
              .limit(1)
  const data = await ShopOptions.query()
    .where("id", curr)
    res.render('optEdit',{
      page: 'Edit Option',
      data: data,
      cat: cat,
      itemName: getItem[0].title,
      itemID: itemID
    });
})


module.exports = router