const express = require('express')
const { Users } = require('../models/users')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await Users.query()
    .orderBy('role', "asc")
    res.render('usersDash',{
      page: 'manage users',
      data: data
    });

  

})

  module.exports = router