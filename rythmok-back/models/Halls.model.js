const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
    {
       name: {type: String, required: true},
       location: {type: String, required: true},     
       image:{type: String}
    },
    {
        timestamps: true,
    }
);

// This line create the model on the database according to the above structure.
const Hall = mongoose.model("Halls", hallSchema);
module.exports = Hall;