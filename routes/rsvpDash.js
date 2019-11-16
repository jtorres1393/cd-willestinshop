const express = require('express')
const { RSVP } = require('../models/rsvp')
const { News } = require('../models/news')
const router = express.Router()

router.get('/', async (req, res) => {
  const curr = req.query.id
  if(curr){
   

  let sort = 0;
  let data = [];
  const cSort = req.query.sort
  

  if(cSort){
    sort = 1;
    data = await RSVP.query()
    .where('rootID', curr)
    .orderBy('lastName', "asc")
  }
  else{
  data = await RSVP.query()
    .where('rootID', curr)
    .orderBy('id', "asc")
  }
    res.render('rsvpDash',{
      page: 'RSVP List',
      data: data,
      sort: sort,
      rootID: curr

    });

  }
  else{
    const nextEvent = await News.query()
      .where("rsvpOpt", true)
      .orderBy("id", "desc")
      .limit(1)
    let latest = 0;
    if(nextEvent){
      latest = nextEvent[0].id
    }
    let sort = 0;
    let data = [];
    const cSort = req.query.sort
    
  
    if(cSort){
      sort = 1;
      data = await RSVP.query()
      .where('rootID', latest)
      .orderBy('lastName', "asc")
    }
    else{
    data = await RSVP.query()
      .where('rootID', latest)
      .orderBy('id', "asc")
    }
      res.render('rsvpDash',{
        page: 'RSVP List',
        data: data,
        sort: sort,
        rootID: latest
  
      });
  
    }

  

})

  module.exports = router