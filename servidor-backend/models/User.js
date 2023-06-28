const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  CPF: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;