const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  
    res.render('newsAdd',{
      page: 'News'
    });
})


module.exports = router