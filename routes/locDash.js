const express = require('express')
const { Location } = require('../models/location')
const router = express.Router()

router.get('/', async (req, res) => {
  const stores = await Location.query()
          .where('type', 'store')
          .orderBy('order','asc')

  const bars = await Location.query()
          .where('type', 'bar')
          .orderBy('order','asc')
    res.render('locDash',{
      page: 'Locations ',
      stores: stores,
      bars:bars
    });

  

})

  module.exports = router