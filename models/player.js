const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  username: {
    type: String,
    required: [true, 'name field is required'],
  },
  password: {
    type: String,
    required: [true, 'name field is required'],
  },
});

// methods ======================
// generating a hash
playerSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
playerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create collections
const player_coll = mongoose.model('player', playerSchema);
module.exports = player_coll;
