const express = require('express')
const { Mail } = require('../models/mail')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  var curr = req.query.id;
  const info = await Info.query()
  .where("id", 1)
  .limit(1)
  const data = await Mail.query()
  .where("id", curr)
  .limit(1)
  .eager('[media(onlyPage, orderDown)]', {
    onlyPage: (builder) => {
      builder.where('rootPage', 'mail');
      },
      orderDown: (builder) => {
      builder.orderBy('order','asc')
      }})



    res.render('emailMail',{
      page: `RSVP Confirmation`,
      data: data[0],
      info: info[0]
    });

  

})

  module.exports = router