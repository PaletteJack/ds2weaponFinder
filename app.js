require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Weapon = require('./models/models.js');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let equipableWeps = [];

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.DB_URL);
}

app.route('/')
  .get(function(req,res) {
    equipableWeps.length = 0;
    res.render('main')
  })
  .post(function(req,res) {
    const str = parseInt(req.body.strength);
    const dex = parseInt(req.body.dexterity);
    const int = parseInt(req.body.intelligence);
    const fth = parseInt(req.body.faith);

    Weapon.find((err, foundWeapons) => {
      if (!err) {
        foundWeapons.forEach( function (weapon){
          let st1 = parseInt(weapon.statReq.strength.replace('-','0'));
          let de1 = parseInt(weapon.statReq.dexterity.replace('-','0'));
          let in1 = parseInt(weapon.statReq.intelligence.replace('-','0'));
          let ft1 = parseInt(weapon.statReq.faith.replace('-','0'));

          if (str >= st1 && dex >= de1 && int >= in1 && fth >= ft1) {
            equipableWeps.push(weapon);
          }
        });
      }
    });
    setTimeout(function () {
      res.redirect('/result');
    }, 250);
  })

app.route('/result')
  .get(function (req,res) {
    res.render('result', {equipableWeps: equipableWeps});
  })

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
