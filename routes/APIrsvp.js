const express = require('express')
const { News } = require('../models/news')
const router = express.Router()

router.get('/', async (req, res) => {
  
    const data = await News.query()
      .where("rsvpOpt", true)
      .orderBy("id", "desc")
      .limit(1)
    
  
      res.json({data:data});

  

})

  module.exports = router