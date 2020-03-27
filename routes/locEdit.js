const express = require('express')
const router = express.Router()
const { Location } = require('../models/location')

router.get('/', async (req, res) => {
  const currID = req.query.id;
  const data = await Location.query()
          .where('id', currID)
          .eager('[media(orderDown, onlyPage) ]', {
            onlyPage: (builder) => {
              builder.where('rootPage', 'location');
              },
            orderDown: (builder) => {
            builder.orderBy('order','asc')
            },
            limit: (builder) => {
            builder.limit(1)
            }
          })

    res.render('locEdit',{
      page: 'Location Edit',
      data: data
    });
})


module.exports = router