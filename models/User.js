const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

// creates the User schema
const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// a custom routine that checks if two hashed passwords are identical
userSchema.methods.validatePasswords = function(password, dbpassword){
    return bcrypt.compareSync(password, dbpassword);
}

// Cast the schema to a model
const User = mongoose.model('User', userSchema);

module.exports = User;