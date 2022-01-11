const mongodb = require('mongodb');
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  strength: {},
  dexterity: {},
  intelligence: {},
  faith: {}
}, {_id: false});
const scalingSchema = new mongoose.Schema({
  strength: String,
  dexterity: String,
  intelligence: String,
  faith: String
}, {_id: false});

const weaponSchema = new mongoose.Schema({
  type: String,
  title: String,
  link: String,
  statReq: statSchema,
  statScal: scalingSchema,
  flavorText: String
});

const Weapon = mongoose.model('Weapon', weaponSchema);
module.exports = Weapon;
