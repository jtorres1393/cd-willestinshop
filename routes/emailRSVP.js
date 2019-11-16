const express = require('express')
const { News} = require('../models/news')
const { RSVP } = require('../models/rsvp')
const { Info } = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
  var curr = req.query.id;
  var rsvpID = req.query.rsvp
  const info = await Info.query()
  .where("id", 1)
  .limit(1)
  const data = await News.query()
  .where("id", curr)
  .limit(1)
  .eager('[media(onlyPage, orderDown)]', {
    onlyPage: (builder) => {
      builder.where('rootPage', 'news');
      },
      orderDown: (builder) => {
      builder.orderBy('order','asc')
      }})
  const rsvp = await RSVP.query()
    .where('id', rsvpID)
    .limit(1)


    res.render('emailRSVP',{
      page: `RSVP Confirmation`,
      data: data[0],
      rsvp: rsvp,
      info: info[0]
    });

  

})

  module.exports = router