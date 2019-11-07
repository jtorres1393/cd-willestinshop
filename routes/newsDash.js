const express = require('express')
const { News } = require('../models/news')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await News.query()
    .orderBy('order', "asc")
    res.render('newsDash',{
      page: 'News',
      data: data
    });
})


module.exports = router