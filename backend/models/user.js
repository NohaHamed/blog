const mongoose = require("mongoose");
// need to npm install mongoose-unique-validator
// const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    //unique is not a validator. It only optimizes mongoose things. un need to install mongoose-unique-validator
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//add validator as plugin:
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
