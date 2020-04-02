const express = require('express')
const { Invoices } = require('../models/invoices')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  var curr = req.query.id;
  var total = 0;
  var tax = 0;
  var grand = 0;
  var shipping = 0;
  const info = await Info.query()
  .where("id", 1)
  .limit(1)
  const data = await Invoices.query()
  .where("id", curr)
  .eager('buyer')
  .limit(1)

  const cart = JSON.parse(data[0].cart);

  cart.map((e,i)=>{
    total = total+(parseInt(e.quantity)*(parseInt(e.cost)))
  })

  tax = (info[0].tax*total)/10000
  shipping = parseInt(data[0].shipping)

  grand = (total+tax+shipping)
  



    res.render('emailPrint',{
      page: `Invoice`,
      data: data[0],
      cart: cart,
      info: info[0],
      total: total,
      tax: tax,
      grand: grand
    });

  

})

  module.exports = router