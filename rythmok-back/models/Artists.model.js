const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
       name: {type: String, required: true},
       bio: {type: String},       
       styles: [{type: String}],
       image: {type: String} 
    },
    {
        timestamps: true,
    }
);



// This line create the model on the database according to the above structure.
const Artist = mongoose.model("Artists", artistSchema);
module.exports = Artist;