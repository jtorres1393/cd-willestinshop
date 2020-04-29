//glue
require('dotenv').config();
const express = require('express');
const path = require('path');
const Multer = require('multer');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const mods = require('./modules/mods')
var config = require('./env.json')[process.env.NODE_ENV || 'development']


//models
const { Media } = require('./models/media');
const { Users } = require('./models/users');
const { Info } = require('./models/info');
const { ShopCategory } = require('./models/shopCategory');
const { ShopItems } = require('./models/shopItems');
const { ShopOptions } = require('./models/shopOptions');
const { News } = require('./models/news');
const { RSVP } = require('./models/rsvp');
const { Location } = require('./models/location');
const { Vendor } = require('./models/vendor');
const { Buyer } = require('./models/buyer');
const { Invoices } = require('./models/invoices');
const { Customer } = require('./models/customer');
const { Orders } = require('./models/orders');
const { Mail } = require('./models/mail');


//backend routes
const register= require('./routes/register');
const usersDash = require('./routes/usersDash')
const infoDash = require('./routes/infoDash')
const shopDash = require('./routes/shopDash')
const catEdit = require('./routes/catEdit')
const itemAdd = require('./routes/itemAdd')
const itemEdit = require('./routes/itemEdit')
const optEdit = require('./routes/optEdit')
const newsAdd = require('./routes/newsAdd')
const newsDash = require('./routes/newsDash')
const newsEdit = require('./routes/newsEdit')
const rsvpDash = require('./routes/rsvpDash')
const emailMail = require('./routes/emailMail')
const emailRSVP = require('./routes/emailRSVP')
const emailInvoice = require('./routes/emailInvoice')
const emailPrint = require('./routes/emailPrint')
const emailPaid = require('./routes/emailPaid')
const emailOrder = require('./routes/emailOrder')
const emailOrderAdmin = require('./routes/emailOrderAdmin')
const vendorDash = require('./routes/vendorDash')
const vendorAdd = require('./routes/vendorAdd')
const vendorEdit = require('./routes/vendorEdit')
const locAdd = require('./routes/locAdd')
const locEdit = require('./routes/locEdit')
const buyerView = require('./routes/buyerView')
const invoiceDash = require('./routes/invoiceDash')
const invoiceAdd = require('./routes/invoiceAdd')
const invoiceView = require('./routes/invoiceView')
const invoicesOpen = require('./routes/invoicesOpen')
const orderDash = require('./routes/orderDash')
const orderView = require('./routes/orderView')
const archiveDash = require('./routes/archiveDash')
const mailDash = require('./routes/mailDash')
const mailAdd = require('./routes/mailAdd')
const mailEdit = require('./routes/mailEdit')


//frontend
const APIinfo= require('./routes/APIinfo')
const APIrsvp= require('./routes/APIrsvp')
const APIvendors= require('./routes/APIvendor')
const APIinvoices= require('./routes/APIinvoices')
const APIloc= require('./routes/APIloc')
const APIshop= require('./routes/APIshop')
const APIshopCat= require('./routes/APIshopCat')
const APIshopPro= require('./routes/APIshopPro')
const APIProduct= require('./routes/APIProduct')

//login
//login
const passport = require('passport');
const cookieParser = require('cookie-parser')
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const converge = require('node-converge');


//appstart
const port = process.env.PORT || 5000
const app = express();

var conf = {
  username: 'adminwed598',
  pin: 'J8UJE3E335KXSFVDF2JUBHLD66LSIJKQ5EYU18PUN2F5RJXLH61NTN4QFFCXMZU8',
  merchant:  '2136638',
  environment: 'Production'
};

var Converge = new converge(conf);
  //multer
  const m = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 150 * 1024 * 1024 // no larger than 5mb
    }
  })

//middle
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



//AUTHENTICATION CARD
app.get(['/','/news','/spirits', '/info', '/rsvp','/shop', '/vendors', '/vendors/*', '/invoice', '/invoice/*','/shop','/shop/*'], async function(request, response) {
  var page = "default"
    mods.metaChange(response,page);
});



//authentication
app.use(flash());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat',
                resave: true,
                saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());


//AUTHENTICATION SYSTEM
//////////////////////////////////////////
//register
app.use('/admin/register', register)
app.post('/admin/register', async function(req,res){
  let tempUser = {};
  tempUser.id = uuidv4();
  tempUser.password = (req.body.password)
  tempUser.email = (req.body.email).toLowerCase();
  tempUser.firstName = (req.body.firstName).toLowerCase().replace(/ /g,'').replace(/\./g,'');
  tempUser.lastName = (req.body.lastName).toLowerCase().replace(/ /g,'').replace(/\./g,'');
  tempUser.role = 0;

  try{
      var checkUsers = await Users.query()
      .where('email', tempUser.email);

      if(checkUsers.length > 0){
          req.flash('danger','user already exists')
          res.render('register',{
              page: 'Register',
              messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
            });  
      }
      else if(tempUser.password !==  req.body.passConfirm){
        req.flash('danger',`password doesn't match`)
        res.render('register',{
            page: 'Register',
            messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
          });  
      }
      else{
          const newUser = await Users.query()
              .insert(tempUser);

              res.redirect('/admin/login')
      }
  }
  catch(e){throw(e)}

});

//login
//login
app.use('/admin/login', function(req, res){
  if (req.isAuthenticated() && (req.user[0].role > 0)) {
      res.redirect('/admin/shop/orders');
  }
  else if(req.isAuthenticated() && (req.user[0].role === 0)){
    console.log(req.user.role)
    res.render('login',{
      page: 'login',
      messages: {danger:"account not activated"}
    });
  }
  else{
    console.log('not logged')
      if(req.user){
        console.log(req.user[0].role)
      }
      res.render('login',{
          page: 'login',
          messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
        });
  }

});
app.post('/admin/logins', passport.authenticate('local', { successRedirect: '/admin/shop/orders', failureRedirect: '/admin/login',failureFlash: true }))


//passport Local
passport.use('local',
    new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
    },
   function (req,username, password, done) {
      Users
        .query()
        .where('email', username.toLowerCase())
        .first()
        .then(async function (person) {
            if(!person){
              console.log("no person")
                req.flash('danger', "invalid email");
                return done(null, false)
            }
            else{
              const passwordValid = await person.verifyPassword(password);
                if (!passwordValid){
                  console.log()
                req.flash('danger', "invalid Password");
                return done();
                }
                else{
                  console.log('pass ok')
                return done(null, [{email: person.email, firstName: person.firstName, role: person.role}]);
                }
          
          
          }
        }).catch(function (err) {
            done(err)
        })
    }
  ))
  passport.serializeUser(function(user, done) {
    done(null, user);
    console.log(user)
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get('/admin/logout', function(req, res){
 
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    req.flash('success', 'Bye.');
    res.redirect('/admin/login');
    });


//admin page
app.use('/admin/users', isAdmin, usersDash)
app.use ('/admin/user-edit?:id', isAdmin, async function(req,res){
  const curr = req.query.id
  let data={};
  data.role= 1;
  const updata = await Users.query()
    .where("id",curr)
    .patch(data);
  
  res.redirect('/admin/users')
})
app.use ('/admin/user-admin?:id', isAdmin, async function(req,res){
const curr = req.query.id
let data={};
data.role= 2;
const updata = await Users.query()
  .where("id",curr)
  .patch(data);

res.redirect('/admin/users')
})
app.use ('/admin/user-delete?:id', isAdmin, async function(req,res){
const curr = req.query.id
const updata = await Users.query()
  .where("id",curr)
  .delete();

res.redirect('/admin/users')
})

//utilities
app.use('/admin/media-delete?:id', isLogged, async function(req,res){
  const id = req.query.id;
  const sec = req.query.section;
  mods.deleteFile(id)


  if(req.query.pro){
    res.redirect('/admin/project-edit?id='+(req.query.pro)+"&artist="+(req.query.artist))
  }
  else if(req.query.item){
    res.redirect('/admin/shop-edit?id='+(req.query.item)+"&cat="+(req.query.cat))
  }
  else if(req.query.news){
    res.redirect('/admin/news-edit?id='+(req.query.news))
  }
  else if(req.query.sec){
    res.redirect(`/admin/${req.query.sec}?id=${req.query.secID}`)
  }
  else{
  res.redirect('/admin/'+sec)}
})



//Shop////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/admin/shop', isLogged, shopDash)
app.post('/admin/shop', isLogged, async function(req,res){
  let data = {}
  let newTax = {}
  if(req.body.newCat){
    data.title = (req.body.newCat).toLowerCase();
    data.slug= (req.body.newCat).toLowerCase().replace(/ /g,'-').replace(/\./g,'')
    const checkCat = await ShopCategory.query()
      .where("title", data.title);

    if(!checkCat.length){
      const upData = await ShopCategory.query()
        .insert(data);
    }


  }

  if(req.body.tax){
    newTax.tax = req.body.tax*100
    const upInfo = await Info.query()
      .where('id',1)
      .patch(newTax)
  }

  if(req.body.sort1){
    mods.sort(req.body.sort1, ShopCategory)
  }

  res.redirect('/admin/shop')

})



//Delete Shop
app.use('/admin/shop-delete?:id', isLogged, async function(req,res){
  if(req.query.catremove){
    const delCat = await ShopCategory.query()
                .where('slug', req.query.catremove)
                .delete();
                res.redirect('/admin/shop')
  }

  if(req.query.itemremove){
    const currID = req.query.itemremove;
    const cat = req.query.cat
    const delCat = await ShopItems.query()
                .where('id', currID)
                .delete()

                const media = await Media.query()
                .where("rootID", currID)
                .where("rootPage", "items");
          
                media.forEach((e)=>{
                  mods.deleteFile(e.id)
                })
                
                res.redirect('/admin/shop/category?cat='+cat)
  }
  




})




//admin categories
app.use('/admin/shop/category?:id', isLogged, catEdit)
app.post('/admin/shop/category?:id', isLogged, async function(req,res){

  if(req.body.sort1){
    mods.sort(req.body.sort1, ShopItems)
  }

  res.redirect('/admin/shop/category?cat='+req.query.cat)

})

//item
app.use('/admin/shop-add?:id', isLogged, itemAdd)
app.post('/admin/shop-add?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  var rootID = req.query.catID
  var cat = req.query.cat
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = (req.body.about);
  data.details = req.body.details;
  data.bg = req.body.bg;
  data.notice = req.body.notice;
  data.type = req.body.type;
  data.active = req.body.active;
  data.subTitle = req.body.subTitle;
  data.rootID = rootID;
  if(req.body.alcvol){
  data.alcvol = req.body.alcvol*100;
  }
  if(req.body.proof){
  data.proof = req.body.proof;
  }
 

  const upData = await ShopItems.query()
                .insert(data)
  
  const getID = await ShopItems.query()
        .orderBy("id", "desc")
        .limit(1);         
  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","product" ,"items",getID[0].id);
    })
  }

  res.redirect('/admin/shop/category?cat='+cat)

})




//item edit
app.use('/admin/shop-edit?:id', isLogged, itemEdit)
app.post('/admin/shop-edit?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  var rootID = req.query.id
  var cat = req.query.cat
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = (req.body.about);
  data.bg = req.body.bg;
  data.details = req.body.details;
  data.notice = req.body.notice;
  data.subTitle = req.body.subTitle;
  data.type = req.body.type;
  data.active = (req.body.active);
  if(req.body.alcvol){
    data.alcvol = req.body.alcvol*100;
    }
  if(req.body.proof){
    data.proof = req.body.proof;
    }

  const upData = await ShopItems.query()
                .where('id', rootID)
                .patch(data)

  if(req.body.sort1){
    mods.sort(req.body.sort1, Media)
  }

  if(req.body.sort2){
    mods.sort(req.body.sort2, ShopOptions)
  }

  if(req.body.newOpt && req.body.newStock){
      let itemInfo = {}
      itemInfo.title = req.body.newOpt.toLowerCase()
      itemInfo.stock = req.body.newStock;
      itemInfo.cost  = req.body.newCost*100;
      itemInfo.rootID = rootID
      const upItem = await ShopOptions.query()
                .insert(itemInfo)
  }
          
  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","product" ,"items", rootID);
    })
  }

  res.redirect('/admin/shop-edit?id='+rootID+"&cat="+cat)

})

app.use('/admin/shop/orders', orderDash)
app.use('/admin/shop/archive', archiveDash)
app.use('/admin/shop/order-view?:id', isLogged, orderView)
app.use('/admin/shop/order-ship?:id', async function(req,res){
    var currID = req.query.id;
    let data={}
    data.shipped = true;

    const updata = await Orders.query()
      .where('id', currID)
      .patch(data)
    
      res.redirect("/admin/shop/orders")

})



//optionDelete
app.use('/admin/shopOption-delete?:id', isLogged, async function(req,res){
  const curr = req.query.id;
  const cat = req.query.cat;
  const item = req.query.item;

  const deleteData = await ShopOptions.query()
    .where('id', curr)
    .delete()

  res.redirect(`/admin/shop-edit?id=${item}&cat=${cat}`)
})
//option edit
app.use('/admin/shopOption-edit?:id', isLogged, optEdit)
app.post('/admin/shopOption-edit?:id', isLogged, async function(req,res){
    let data = {};
    const itemID = req.query.itemID
    const cat = req.query.cat;
    const curr = req.query.id;
    data.title = req.body.title;
    data.stock = req.body.stock;
    data.cost = req.body.cost*100
    if(req.body.limit){
      data.limit = req.body.limit;
    }

    const upData = await ShopOptions.query()
              .where('id', curr)
              .patch(data)
    res.redirect(`/admin/shop-edit?id=${itemID}&cat=${cat}`)
})


//info
app.use("/admin/info", isLogged, infoDash);
app.post("/admin/info", m.fields([{name:'imgLanding',maxCount: 1},{name:'imgStudio', maxCount: 5}]), async function(req,res){
    let data = {}
    data.phone = req.body.phone;
    data.email = req.body.email;
    data.instagram = req.body.instagram;
    data.address = req.body.address;
    data.city = req.body.city;
    data.state = req.body.state;
    data.zip = req.body.zip;
    data.about = req.body.about;

    if(req.files.imgLanding){
      const currLanding = await Media.query()
                  .where('rootPage', 'info' )
                  .where('section', 'landing')
                  .limit(1)
      if(currLanding[0]){
      mods.deleteFile(currLanding[0].name)
      const deleteCurr = await Media.query()
                  .where('id', currLanding[0].id)
                  .delete();       
      }
      mods.uploadMedia(req.files.imgLanding[0],"videos","landing","info",1);
    }
  
    if(req.files.imgStudio){
      (req.files.imgStudio).forEach((e)=>{
        mods.uploadMedia(e,"images","studio" ,"info",1);
      })
    }

    if(req.body.sort1){
      mods.sort(req.body.sort1, Media)
    }
    

    const upData = await Info.query()
      .where("id", 1)
      .patch(data)

 


    res.redirect('/admin/info')
})



app.use('/admin/news-add', isLogged, newsAdd)
app.post('/admin/news-add',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = req.body.about;
  data.subTitle = req.body.subTitle;
  data.date = req.body.date;
  data.tags = req.body.tags;
  data.rsvpOpt = req.body.rsvpOpt;

  const upData = await News.query()
                .insert(data)
  
  const getID = await News.query()
        .orderBy("id", "desc")
        .limit(1);         
  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","articles" ,"news",getID[0].id);
    })
  }

  res.redirect('/admin/news')

})

app.use('/admin/news', isLogged, newsDash)
app.post('/admin/news', isLogged, async function(req,res){
  if(req.body.sort1){
    mods.sort(req.body.sort1, News)
  }
  res.redirect('/admin/news')
})
app.use('/admin/news-edit?:id', isLogged, newsEdit)
app.post('/admin/news-edit?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  const currID = req.query.id;
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = req.body.about;
  data.subTitle = req.body.subTitle;
  data.date = req.body.date;
  data.tags = req.body.tags;
  data.rsvpOpt = req.body.rsvpOpt;


  const upData = await News.query()
                .where('id', currID)
                .patch(data)
         
  if(req.body.sort1){
    mods.sort(req.body.sort1, Media)
  }

  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","articles" ,"news",currID);
    })
  }

  res.redirect('/admin/news-edit?id='+currID)

})

app.use('/admin/news-delete?:id', isLogged, async function(req,res){
 
 if(req.query.id){
    const currID = req.query.id;
    const delData = await News.query()
                .where('id', currID)
                .delete()

                const media = await Media.query()
                .where("rootID", currID)
                .where("rootPage", "news");
          
                media.forEach((e)=>{
                  mods.deleteFile(e.id)
                })
                
                res.redirect('/admin/news')
  }
})

app.use('/admin/rsvp', isLogged, rsvpDash)
app.use('/admin/rsvp-check?:id', isLogged, async function(req,res){
  const curr = req.query.id;
  const rsvp = req.query.rsvp;
  let data ={};
  data.check = true;
  
  
  const upData = await RSVP.query()
    .where('id', curr)
    .patch(data);

    res.redirect(`/admin/rsvp?id=${rsvp}`)
})

// EMAIL SYSTEM
app.use('/admin/mail', isLogged, mailDash)
app.post('/admin/mail', isLogged, async function(req,res){
  if(req.body.sort1){
    mods.sort(req.body.sort1, mail)
  }
  res.redirect('/admin/mail')
})

app.use('/admin/mail-add', isLogged, mailAdd)
app.post('/admin/mail-add',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = req.body.about;
  data.subTitle = req.body.subTitle;

  const upData = await Mail.query()
                .insert(data)
  
  const getID = await Mail.query()
        .orderBy("id", "desc")
        .limit(1);         
  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","header" ,"mail",getID[0].id);
    })
  }

  res.redirect(`/admin/mail-edit?id=${getID[0].id}`)

})

app.use('/admin/mail-edit?:id', isLogged, mailEdit)
app.post('/admin/mail-edit?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  const currID = req.query.id;
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = req.body.about;
  data.subTitle = req.body.subTitle;


  const upData = await Mail.query()
                .where('id', currID)
                .patch(data)
         
  if(req.body.sort1){
    mods.sort(req.body.sort1, Media)
  }

  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","header" ,"mail",currID);
    })
  }

  res.redirect('/admin/mail-edit?id='+currID)

})

app.use('/admin/mail-delete?:id', isLogged, async function(req,res){
 
  if(req.query.id){
     const currID = req.query.id;
     const delData = await Mail.query()
                 .where('id', currID)
                 .delete()
 
                 const media = await Media.query()
                 .where("rootID", currID)
                 .where("rootPage", "mail");
           
                 media.forEach((e)=>{
                   mods.deleteFile(e.id)
                 })
                 
                 res.redirect('/admin/mail')
   }
 })

app.use(`/admin/send-mass?:id`, isLogged, async function(req,res){
  const currID = req.query.id;
  let data = {}
  let list= []
  data.sent = true
  
  const currMail = await Mail.query()
    .where('id', currID)

  const getData = await Customer.query();
      getData.forEach((user,i)=>{
        list.push(user.email)
      })
    

  
  const getInfo = await Info.query()
    .where('id', 1)
    .limit(1)


    const infoEmail = getInfo[0].email;
  
    mods.sendMass(list, infoEmail, currMail[0].title,`${config.url}/admin/email-mail?id=${currID}`)
    const upData = await Mail.query()
    .where('id',currID)
    .patch(data)
    
    res.redirect(`/admin/mail`)
})




// EMAIL CALLS
app.use('/admin/rsvp-email?:id', emailRSVP)
app.use('/admin/email-mail?:id', emailMail)
app.use('/admin/email-invoice?:id', emailInvoice)
app.use('/admin/email-print?:id', emailPrint)
app.use('/admin/email-paid?:id', emailPaid)
app.use('/admin/email-order?:id', emailOrder)
app.use('/admin/email-admin?:id', emailOrderAdmin)


//locations
app.use('/admin/vendors', isLogged, vendorDash)
app.post('/admin/vendors', isLogged, async function(req,res){
  if(req.body.sort1){
    mods.sort(req.body.sort1, Vendor)
  }

  if(req.body.sort2){
    mods.sort(req.body.sort2, Vendor)
  }

  res.redirect('/admin/vendors')
})

app.use('/admin/vendor-add',isLogged, vendorAdd)
app.post('/admin/vendor-add', m.fields([{name:'imgItems', maxCount:10}]), async function(req,res){
  let data={}
  data.name = req.body.name;
  data.web = req.body.web;
  data.type = req.body.type;
  data.slug = (req.body.name).replace(/[^A-Z0-9]+/ig, "_");
  data.slug = (data.slug).toLowerCase();

  const upData = await Vendor.query()
    .insert(data);
  
  if(req.files.imgStudio){
    const newPost = await Vendor.query()
      .orderBy('id','desc')
      .limit(1)
    (req.files.imgStudio).forEach((e)=>{
      mods.uploadMedia(e,"images","thumb" ,"vendor",newPost[0].id);
    })
    res.redirect(`/admin/vendor-edit?id=${newPost[0].id}`)
  }

})

app.use( `/admin/vendor-edit?:id`, isLogged, vendorEdit)
app.post(`/admin/vendor-edit?:id`, m.fields([{name:"imgStudio", maxCount: 10}]), async function(req,res){
      let data = {};
      let loc = {}
      var currID = req.query.id;
      data.name=req.body.name;
      data.web = req.body.web;
      data.type=req.body.type;
      data.slug = (req.body.name).replace(/[^A-Z0-9]+/ig, "_");
      data.slug = (data.slug).toLowerCase();


      const upData = await Vendor.query()
        .where("id", currID)
        .patch(data);

      
        if(req.body.sort1){
          mods.sort(req.body.sort1, Media)
        }
        if(req.body.sort2){
          mods.sort(req.body.sort2, Location)
        }

      
        if(req.files.imgStudio){
          (req.files.imgStudio).forEach((e)=>{
            mods.uploadMedia(e,"images","thumb" ,"vendor",currID);
          })
          res.redirect(`/admin/vendor-edit?id=${currID}`)
        }

        if(req.body.address && req.body.city){
          loc.address = req.body.address;
          loc.city = req.body.city;
          loc.state = req.body.state;
          loc.zip = req.body.zip;
          loc.lat = req.body.lat;
          loc.long = req.body.long;
          loc.map = req.body.map;
          loc.phone = req.body.phone;
          loc.rootID = currID;

          const upLoc = await Location.query()
            .insert(loc)
        }
      

app.use(`/admin/vendor-delete?:id`, isLogged, async function(req,res){
    const currID =req.query.id;
    const dataDelete = await Vendor.query()
          .where('id',currID)
          .delete()

    res.redirect(`/admin/vendors`)
})



})
app.use('/admin/location-delete?:id', isLogged, async function(req,res){
 
  if(req.query.id){
     const currID = req.query.id;
     const secID = req.query.secID;
     const delData = await Location.query()
                 .where('id', currID)
                 .delete()
 
                 const media = await Media.query()
                 .where("rootID", currID)
                 .where("rootPage", "location");
           
                 media.forEach((e)=>{
                   mods.deleteFile(e.id)
                 })
                 
                 res.redirect(`/admin/vendor-edit?id=${secID}`)
   }
 })


app.use('/admin/location-edit?:id', isLogged, locEdit)
app.post('/admin/location-edit?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  const currID= req.query.id
  let data = {}
  data.address = req.body.address;
  data.city = req.body.city;
  data.state = req.body.state;
  data.zip = req.body.zip;
  data.lat = req.body.lat;
  data.long = req.body.long;
  data.map = req.body.map;
  data.yelp = req.body.yelp;
  data.phone = req.body.phone;

  const upData = await Location.query()
                .where("id", currID)
                .patch(data)
          
  if(req.files.imgItems){
    (req.files.imgItems).forEach((e)=>{
      mods.uploadMedia(e,"images","header" ,"location",currID);
    })
  }

  if(req.body.sort1){
    mods.sort(req.body.sort1, Media)
  }

  res.redirect(`/admin/location-edit?id=${currID}`)

})


///buyer
app.use(`/admin/invoices`, isLogged, invoiceDash)
app.post(`/admin/invoices`, isLogged, async function(req,res){
  let data={};
  data.firstName = req.body.firstName;
  data.lastName = req.body.lastName;
  data.company = req.body.company;
  data.phone = req.body.phone;
  data.email = req.body.email;
  data.address = req.body.address;
  data.city = req.body.city;
  data.state = req.body.state;
  data.zip = req.body.zip;

  if(req.body.firstName || req.body.company){
    const upData = await Buyer.query()
      .insert(data)
    const getLast = await Buyer.query()
      .orderBy('id', 'desc')
      .limit(1)
    res.redirect(`/admin/buyer-view?id=${getLast[0].id}`)
    
  }
  else{
    res.redirect('/admin/invoices')
  }
})

app.use(`/admin/buyer-view?:id`, isLogged, buyerView)
app.post(`/admin/buyer-view?:id`, isLogged, async function(req,res){
        let data = {}
        const currID = req.query.id;
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.company = req.body.company;
        data.phone = req.body.phone;
        data.email = req.body.email;
        data.address = req.body.address;
        data.city = req.body.city;
        data.state = req.body.state;
        data.zip = req.body.zip;

        const upData = await Buyer.query()
                .where('id',currID)
                .patch(data)
        res.redirect(`/admin/buyer-view?id=${currID}`)
})
app.use(`/admin/buyer-delete?:id`, isLogged, async function(req,res){
  const currID = req.query.id;
    const deleteData = await Buyer.query()
      .where('id', currID)
      .delete();

    res.redirect(`/admin/invoices`)
})

app.use(`/admin/invoice-add?:id`, isLogged, invoiceAdd)
app.post(`/admin/invoice-add?:id`, isLogged, async function(req,res){
    let data={}
    data.cart = req.body.cart;
    data.cost = req.body.cost
    data.shipping = parseInt(req.body.shipping)*100
    data.status = "draft";
    data.rootID = req.query.id
    data.tax = req.body.tax*100;

    const upData = await Invoices.query()
      .insert(data)
    
    const currID = await Invoices.query()
          .orderBy('id','desc')
          .limit(1)
    res.redirect(`/admin/invoice-view?id=${currID[0].id}`)
    
})

app.use(`/admin/invoice-view?:id`, isLogged, invoiceView)
app.post(`/admin/invoice-view?:id`, isLogged, async function(req,res){
     let data = {};
     const currID = req.query.id
     data.cart = req.body.cart;
     data.cost = req.body.cost
     data.shipping = parseInt(req.body.shipping)*100
     data.tax = req.body.tax*100;

     const upData = await Invoices.query()
      .where('id', currID)
      .patch(data)
      res.redirect(`/admin/invoice-view?id=${currID}`)

})

app.use(`/admin/invoice-delete?:id`, isLogged, async function(req,res){
      const currID = req.query.id;
      const rootID = req.query.rootID;
        const deleteData = await Invoices.query()
          .where('id', currID)
          .delete();

        res.redirect(`/admin/buyer-view?id=${rootID}`)
})
app.use(`/admin/invoice-email?:id`, isLogged, async function(req,res){
  const currID = req.query.id;
  let data = {}
  data.status = "sent"
  const getData = await Invoices.query()
    .where('id',currID)
    .eager(`buyer`)

  const upData = await Invoices.query()
    .where('id',currID)
    .patch(data)
  const getInfo = await Info.query()
    .where('id', 1)
    .limit(1)

    const currEmail = getData[0].buyer[0].email;
    const infoEmail = getInfo[0].email;
  
    mods.sendMail(currEmail, infoEmail, `Wille's Tin Shop: Invoice Ready`,`${config.url}/admin/email-invoice?id=${currID}`)
    
    res.redirect(`/admin/invoice-view?id=${currID}`)
})
app.use(`/admin/invoice-ship?:id`, isLogged, async function(req,res){
  const currID = req.query.id;
    let data={};
    data.shipped=true
    const upData = await Invoices.query()
      .where('id',currID)
      .patch(data)
    res.redirect(`/admin/invoice-view?id=${currID}`)
})
app.use(`/admin/invoice-paid?:id`, isLogged, async function(req,res){
  const currID = req.query.id;
    let data={};
    data.status="paid"
    const upData = await Invoices.query()
      .where('id',currID)
      .patch(data)
    res.redirect(`/admin/invoice-view?id=${currID}`)
})

app.use(`/admin/invoices-open`, isLogged, invoicesOpen)
app.post(`/api/pay-invoice`, async (req,res)=>{
  var currID = parseInt(req.body.bill.id)
  let billing = {}
  billing.firstName = req.body.bill.firstName
  billing.lastName = req.body.bill.lastName
  billing.address = req.body.bill.address
  billing.city = req.body.bill.city
  billing.state = req.body.bill.state
  billing.zip = req.body.bill.zip
  billing.cart = req.body.bill.cart
  billing.email = req.body.bill.email
  billing.grand = parseInt(req.body.bill.grand)


  var grand = (billing.grand/100).toFixed(2)
  var reEmail = billing.email

  console.log(grand, reEmail)

  var cardForeignId, transactionForeignId;
  var data = {
    cardNumber: (req.body.card.num).replace(/\s/g,''),
    exp: `${req.body.card.date}`,
    cvv: (req.body.card.cvv).replace(/\s/g,''),
    firstName: req.body.bill.firstName,
    lastName: req.body.bill.lastName,
    address: req.body.bill.address,
    zipcode: (req.body.bill.zip).replace(/\s/g,'')
  }
console.log(data)
 
Converge.Card.Create(data).then(function(cardData){
      cardForeignId = cardData.foreignId

      if(!cardForeignId){
        console.log(`token failed`)
        res.sendStatus(412).end()
      }
      else{
      Converge.Card.Sale(
        {
            foreignKey: cardForeignId,
            amount: grand
        }).then(function(saleData){
          console.log(saleData.foreignId)
          let inData = {}
          inData.billing = JSON.stringify(billing);
          inData.status = "paid";
          inData.cost = parseInt(req.body.bill.grand);
          console.log(currID)
          updateInvoice(currID, inData);
          sendPaid(currID, reEmail);
          // console.log(inData, currID)
          res.sendStatus(200).end()
        })
      }
  })

})


// Pay Order
app.post(`/api/pay-order`, async (req,res)=>{
  let buyer = {}
  let order = {}
  let outStock = false;
  buyer.firstName = req.body.order.firstName
  buyer.lastName = req.body.order.lastName
  buyer.address = req.body.order.address
  buyer.city = req.body.order.city
  buyer.state = req.body.order.state
  buyer.zip = req.body.order.zip
  buyer.email = (req.body.order.email).toLowerCase();
  order.cart = req.body.order.cart
  order.cost = parseInt(req.body.order.total)
  order.tax = parseInt(req.body.order.tax)
  order.shipping = parseInt(req.body.order.shipping)


  var grand = ((order.cost+order.tax+order.shipping)/100).toFixed(2)
  var reEmail = buyer.email
  console.log(buyer,order,grand)
  var cardForeignId, transactionForeignId;
  var data = {
    cardNumber: (req.body.card.num).replace(/\s/g,''),
    exp: `${req.body.card.date}`,
    cvv: (req.body.card.cvv).replace(/\s/g,''),
    firstName: req.body.order.firstName,
    lastName: req.body.order.lastName,
    address: req.body.order.address,
    zipcode: (req.body.order.zip).replace(/\s/g,'')
  }

  order.cart.forEach(async (item,i)=>{
    var currIn = parseInt(item.quantity)
    var currOp = item.item.shopOptions[item.option].id
    var getStock = await ShopOptions.query()
      .where('id',currOp)
      .limit(1)
  
    if(currIn > parseInt(getStock[0].stock)){
      outStock = true
    }
  })
  
  if(!outStock){
  Converge.Card.Create(data).then(function(cardData){
        cardForeignId = cardData.foreignId

        if(!cardForeignId){
          console.log(`token failed`)
          res.sendStatus(412).end()
        }
        else{
        Converge.Card.Sale(
          {
              foreignKey: cardForeignId,
              amount: grand
          }).then(async function(saleData){
            console.log(saleData)
            if(!saleData.foreignId){
              res.sendStatus(412).end()
            }
            else{
            order.cart.forEach(async (item,i)=>{
              let newStock ={}
              var currIn = parseInt(item.quantity)
              var currOp = item.item.shopOptions[item.option].id
              var getStock = await ShopOptions.query()
                .where('id',currOp)
                .limit(1)
              var currStock = parseInt(getStock[0].stock)
              newStock.stock = currStock - currIn
              var getStock = await ShopOptions.query()
                .where('id',currOp)
                .patch(newStock)
              
            })
            
            order.cart = JSON.stringify(order.cart)
            const checkCust = await Customer.query()
              .where('email', buyer.email)
            
            if(checkCust.length){
              const upCust = await Customer.query()
                .where('id', checkCust[0].id)
                .patch(buyer)
              order.rootID = checkCust[0].id
              order.paid = true;
            }
            else{
              const upCust = await Customer.query()
                .insert(buyer)
              const getCust = await Customer.query()
                .orderBy('id','desc')
                .limit(1)
              order.rootID = getCust[0].id
            }

            const upOrder = await Orders.query()
              .insert(order)
            const getId = await Orders.query()
              .orderBy('id','desc')
          

            sendOrder(getId[0].id, reEmail);
            // console.log(inData, currID)
            res.sendStatus(200).end()
            }
          })
        }
    })
  }
  else{res.sendStatus(404).end()}
})




///functions
//mod
function isLogged(req, res, next) {
  if (req.isAuthenticated() && req.user[0].role > 0)
      return next();
  res.redirect('/admin/login');
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user[0].role === 2 )
      return next();
  res.redirect('/admin/login');
}

async function updateInvoice (id, data){
  const upData = await Invoices.query()
  .where('id', id)
  .patch(data);
}

async function sendPaid(id, email){
  const getInfo = await Info.query()
  .where('id',1);

  var sendEmail = getInfo[0].email;
  mods.sendMail(email, sendEmail, `Wille's Tin Shop: Payment Complete`,`${config.url}/admin/email-paid?id=${id}`)
  mods.sendMail([sendEmail,'mmolina@roxanneslounge.com'], sendEmail, `Wille's Tin Shop: New Payment`,`${config.url}/admin/email-paid?id=${id}`)

}

async function sendOrder(id, email){
  const getInfo = await Info.query()
  .where('id',1);

  var sendEmail = getInfo[0].email;
  mods.sendMail(email, sendEmail, `Wille's Tin Shop: Payment Complete`,`${config.url}/admin/email-order?id=${id}`)
  mods.sendMail([sendEmail,'mmolina@roxanneslounge.com'], sendEmail, `Wille's Tin Shop: New Order`,`${config.url}/admin/email-admin?id=${id}`)

}







//////////////////////////////////
//API
app.use('/api/info', APIinfo);
app.use('/api/rsvp', APIrsvp);
app.use('/api/vendors', APIvendors);
app.use('/api/invoices', APIinvoices);
app.use('/api/loc', APIloc);
app.use('/api/shopCat', APIshopCat);
app.use('/api/shopPro', APIshopPro);
app.use('/api/shop', APIshop);
app.use('/api/product', APIProduct);

app.use('/api/rsvp-submit', async function(req,res){
  let data = {};
  let fullBody= "";
  data.firstName = req.body.rsvp.firstName;
  data.lastName = req.body.rsvp.lastName;
  data.phone = req.body.rsvp.phone;
  data.email = req.body.rsvp.email;
  data.guests = req.body.rsvp.guests;
  data.rootID = req.query.id;
  

  try{
  let upData = await RSVP.query()
    .insert(data)
  
  let getNew = await RSVP.query()
    .orderBy('id',"desc")
    .limit(1);
  let getInfo = await Info.query().orderBy("id", "desc").limit(1);
  let getEvent = await News.query().where("id",data.rootID).limit(1);

  mods.sendMail(data.email, getInfo[0].email, `Wille's Tin Shop: RSVP Confirmation`,`${config.url}/admin/rsvp-email?id=${getEvent[0].id}&rsvp=${getNew[0].id}`)
  res.status(200).end();

  } catch (err) {
    console.log(err)
    res.status(500).end();
  }

})

app.listen(port,() => console.log(`server started on port ${port}`));


app.use(express.static(path.join(__dirname, 'client/build')));


  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })