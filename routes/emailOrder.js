const express = require('express')
const { Orders } = require('../models/orders')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  var curr = parseInt(req.query.id);
  const info = await Info.query()
  .where("id", 1)
  .limit(1)
  const data = await Orders.query()
  .where("id", curr)
  .eager('customers')
  .limit(1)

  const cart = JSON.parse(data[0].cart);


    res.render('emailOrder',{
      page: `Order`,
      data: data[0],
      cart: cart,
      info: info[0],
    });

  

})

  module.exports = router