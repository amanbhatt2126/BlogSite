const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please provide a Username "], unique: true },
    password: { type: String, required: [true, "Please provide a Password "] }
});

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const response = await bcrypt.hash(this.password, salt);
        this.password = response;
    }
    catch (e) {
        console.log(e);
    }

    next();

})

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;