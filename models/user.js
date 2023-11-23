const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
}

module.exports.isUserInDatabase = async (username) => {
  const user = await User.findOne({username});
  return !!(user);
}

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(newUser, callback);
    })
  })
  newUser.save(callback)
}
