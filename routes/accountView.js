const express = require('express')
const { Orders } = require('../models/orders')
const { Invoices } = require('../models/invoices')
const router = express.Router()

router.get('/', async (req, res) => {
  var date = req.query.date;
  var month = req.query.month;
  if(date){

    var cy = date.split('-')[0];
    var cm = date.split('-')[1];
    var cd = date.split('-')[2];

    const orders = await Orders.query()
            .where('refund', null)
            .andWhereRaw(`EXTRACT(YEAR FROM created_at::date) = ?`, [cy])
            .andWhereRaw(`EXTRACT(MONTH FROM created_at::date) = ?`, [cm])
            .andWhereRaw(`EXTRACT(DAY FROM created_at::date) = ?`, [cd])
            .orderBy('id','asc')
    const invoices = await Invoices.query()
            .where('status', 'paid')
            .andWhereRaw(`EXTRACT(YEAR FROM updated_at::date) = ?`, [cy])
            .andWhereRaw(`EXTRACT(MONTH FROM updated_at::date) = ?`, [cm])
            .andWhereRaw(`EXTRACT(DAY FROM updated_at::date) = ?`, [cd])
            .orderBy('id','asc')
  
      res.render('accountView',{
        page: 'Account',
        data: orders,
        invoices: invoices,
        date: date
      });
  }
  else if (month){
    let fullSale = []
    let fullInvoice = []
    var cy = month.split('-')[0];
    var cm = month.split('-')[1];
    var td = new Date(cy, (parseInt(month)-1), 0).getDate()
    for(var i=0;i < (td-1);i++){
      const orders = await Orders.query()
      .where('refund',null)
      .andWhereRaw(`EXTRACT(YEAR FROM created_at::date) = ?`, [cy])
      .andWhereRaw(`EXTRACT(MONTH FROM created_at::date) = ?`, [cm])
      .andWhereRaw(`EXTRACT(DAY FROM created_at::date) = ?`, [i+1])
      .orderBy('id','asc')
      if(orders.length){
        let data={}
        data.day = i+1
        data.type = "order"
        data.orders = orders
        fullSale.push(data)
      }
      const invoices = await Invoices.query()
      .where('status','paid')
      .andWhereRaw(`EXTRACT(YEAR FROM updated_at::date) = ?`, [cy])
      .andWhereRaw(`EXTRACT(MONTH FROM updated_at::date) = ?`, [cm])
      .andWhereRaw(`EXTRACT(DAY FROM updated_at::date) = ?`, [i+1])
      .orderBy('id','asc')
      if(invoices.length){
        let data={}
        data.day = i+1
        data.type = "invoice"
        data.orders = invoices
        fullSale.push(data)
      }

    }

    res.render('accountView',{
      page: 'Account',
      tDays: td,
      month: cm,
      year: cy,
      sales: fullSale,

  })
  }


  

})

  module.exports = router