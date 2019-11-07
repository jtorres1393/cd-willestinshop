//glue
require('dotenv').config();
const express = require('express');
const path = require('path');
const Multer = require('multer');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
const mods = require('./modules/mods')


//models
const { Media } = require('./models/media');
const { Users } = require('./models/users');
const { Info } = require('./models/info');
const { ShopCategory } = require('./models/shopCategory');
const { ShopItems } = require('./models/shopItems');
const { ShopOptions } = require('./models/shopOptions');
const { News } = require('./models/news');


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

//frontend
const APIinfo= require('./routes/APIinfo')
const APIshopCat= require('./routes/APIshopCat')

//login
//login
const passport = require('passport');
const cookieParser = require('cookie-parser')
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

//appstart
const port = process.env.PORT || 5000
const app = express();

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
      res.redirect('/admin/users');
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
app.post('/admin/logins', passport.authenticate('local', { successRedirect: '/admin/users', failureRedirect: '/admin/login',failureFlash: true }))


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

app.post('/admin/shop-add?:id',m.fields([{name:"imgItems", maxCount: 10}]) ,async function(req,res){
  var rootID = req.query.catID
  var cat = req.query.cat
  let data = {}
  data.title = (req.body.title).toLowerCase();
  data.about = (req.body.about);
  data.details = req.body.details;
  data.proof = req.body.proof;
  data.type = req.body.type;
  data.active = req.body.active;
  data.alcvol = req.body.alcvol*100;
  data.subTitle = req.body.subTitle;
  data.rootID = rootID;
  data.shipping = (req.body.shipping)*100;
  data.price = (req.body.price)*100;

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
  data.details = req.body.details;
  data.subTitle = req.body.subTitle;
  data.type = req.body.type;
  data.shipping = (req.body.shipping)*100;
  data.price = (req.body.price)*100;
  data.proof = req.body.proof;
  data.alcvol = req.body.alcvol*100;
  data.active = req.body.active;

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

//////////////////////////////////
//API
app.use('/api/info', APIinfo);
app.use('/api/shopCat', APIshopCat);

app.listen(port,() => console.log(`server started on port ${port}`));


app.use(express.static(path.join(__dirname, 'client/build')));


  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })