const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const cat = req.query.cat;
  const catID = req.query.catID;
 
    res.render('itemAdd',{
      page: 'New '+cat,
      cat: cat,
      catID:  catID
    });

  

})

  module.exports = router