const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //Campos A Popular
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
    acquisted: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }],
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }]
    //Campos A Popular
}, {
    timestamps: true,
});

// This line create the model on the database according to the above structure.
const User = mongoose.model("Users", userSchema);
module.exports = User;