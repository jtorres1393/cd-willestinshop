const express = require('express')
const { Mail } = require('../models/mail')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Mail.query()
    .orderBy('id', "desc")
    res.render('mailDash',{
      page: 'New Email',
      data: data
    });
})


module.exports = router