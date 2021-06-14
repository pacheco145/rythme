const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
    {
       date: {type: Date, required: true},
       name: {type: String, required: true},
       location: {type: mongoose.Types.ObjectId, ref: 'Halls'},
       artists: [{type: mongoose.Types.ObjectId, ref: 'Artists'}],       
       attendees: [{type: mongoose.Types.ObjectId, ref: 'Users'}],       
       styles: [{type: String}],
       prize: {type: Number}       
    },
    {
        timestamps: true,
    }
);

// This line create the model on the database according to the above structure.
const Hall = mongoose.model("Events", hallSchema);
module.exports = Hall;