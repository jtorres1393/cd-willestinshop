const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  
    res.render('mailAdd',{
      page: 'New Email'
    });
})


module.exports = router