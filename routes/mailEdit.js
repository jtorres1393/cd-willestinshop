const express = require('express')
const { Mail } = require('../models/mail')
const router = express.Router()

router.get('/', async (req, res) => {
  const currID = req.query.id;
  const data = await Mail.query()
          .where('id', currID)
          .eager('[media(orderDown, onlyPage) ]', {
            onlyPage: (builder) => {
              builder.where('rootPage', 'mail');
              },
            orderDown: (builder) => {
            builder.orderBy('order','asc')
            },
            limit: (builder) => {
            builder.limit(1)
            }
          })

    res.render('mailEdit',{
      page: 'Edit Mail: ',
      data:data
    });

  

})

  module.exports = router