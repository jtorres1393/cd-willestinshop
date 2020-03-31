const express = require('express')
const { Vendor } = require('../models/vendor')
const router = express.Router()

router.get('/', async (req, res) => {
  const currID = req.query.id;
  var currLoc = (req.query.loc)
  console.log(currID, currLoc)

  const data = await Vendor.query()
          .where('slug', currID)
          .eager('[location(orderDown).[media(onlyLoc), vendor.media(onlyPage, orderDown)], media(orderDown, onlyPage) ]', {
            onlyPage: (builder) => {
              builder.where('rootPage', 'vendor');
              },
            orderDown: (builder) => {
            builder.orderBy('order','asc')
            },
            limit: (builder) => {
            builder.limit(1)
            },
            onlyLoc: (builder) => {
              builder.where('rootPage', 'location');
              }
          })

    const loc = data[0].location[currLoc-1]
    
 
    res.json({data:loc})
  

})

  module.exports = router