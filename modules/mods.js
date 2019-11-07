require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const { Media } = require('../models/media');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var pdf = require('html-pdf');
var requestify = require('requestify');
const base = path.resolve('public')


const gcs = new Storage({
  projectId: 'willestinshop',
  keyFilename: './keyfile.json'
});

const bucket = gcs.bucket('willestinshop');

module.exports = {
    
    uploadMedia: async function (file,type,section,rootPage, rootID, res, redir){
      var newDate = new Date();
      var d = (newDate.getDate()).toString()
      var m = (newDate.getMonth()+1).toString()
      var y = (newDate.getFullYear()).toString()
      var h = (newDate.getHours()).toString()
      var min = (newDate.getMinutes()).toString()
      var sec = (newDate.getSeconds()).toString()
      var formatDate = m+d+y+h+min+sec
      const cleanName = (file.originalname).replace(/[^A-Z0-9]+/ig, "_")
      const newName = formatDate+"_"+cleanName
      const blob = bucket.file(type+"/"+newName);
      const blobStream = blob.createWriteStream({
          metadata: {
          contentType: file.mimetype
          }
      });

      
    


      blobStream.on("error", err => {
        console.log('error',err);
     });

      blobStream.on('finish', ()=> {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log({publicUrl})
        // Make the image public to the web
        blob.makePublic().then(async () => {
                let data = {};
            data.url = publicUrl;
            data.rootPage = rootPage
            data.rootID = rootID
            data.name = type+"/"+newName;
            data.type = type;
            data.section = section;

            console.log(publicUrl);

            const newImg = await Media.query()
            .insert(data);


          })




    
      });
      blobStream.end(file.buffer);
     

      

},

deleteFile: async function(modID){
  const getMedia = await Media.query()
    .where("id", modID)
  const name= getMedia[0].name;
  const blob = bucket.file(name).delete();
  const deleteMedia = await Media.query()
    .where("id", modID)
    .delete();
},

sort: async function(sort, model){
  
    let sortData = JSON.parse(sort)
    sortData.forEach( async elem => {

   
        const orderData = await model.query()
        .where('id',elem.id)
        .patch(elem)
    

    
    })
},

sendMail: function(to, from, subject, html, url){
  let msg = {
    to: to,
    from: from,
    subject: subject
  };

  requestify.get(html).then(function (response) {
    msg.html = response.body;

    if(url){

      requestify.get(url).then(function (response) {
        // Get the raw HTML response body
        var data = response.body; 
        var config = {format: 'letter',
        base: `https://www.thisandthat.coffee/`,
        timeout: 40000,
        renderDelay:3000,
      }
    
  
     pdf.create(data, config).toBuffer(function(err, buffer){
      const newData = buffer.toString('base64');
      msg.attachments= [
        {
        filename: "This and That - Receipt",
        type : 'application/pdf',
        content: newData,
        disposition : "attachment",
        }
        ];
        sgMail.send(msg);
    });
  
  
  
     });   
    }
    else{
    sgMail.send(msg);
    }
    
    
  })
},
metaChange: async function (response, page){
  String.prototype.trunc = String.prototype.trunc ||
  function(n){
      return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
  };

  let images = await Media.query().where('rootPage', 'info');
  
  var card = images[Math.floor(Math.random()*(images.length-1))];


const filePath = path.resolve(__dirname, '../client/build', 'index.html');

// read in the index.html file
fs.readFile(filePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  // replace the special strings with server generated strings
  data = data.replace(/\$OG_TITLE/g, "Wille's Tin Shop");
  data = data.replace(/\$OG_DESCRIPTION/g,"Purveyor of Fine Spirits");
  data = data.replace(/\$OG_IMAGE/g, card.url);
  response.send(data);

});
}




}