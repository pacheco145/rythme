// Mongoose is a set of tools to communicate between Mongo and Express
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// String with th URL of database
const DB_URL = process.env.DB_URL;

// Config 
const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// All connections to DB are asynchronous
const connect = () => {

    // moongose function which returns a promise.
    mongoose.connect(DB_URL, DB_CONFIG)
        .then((res) => {
            // if connection to DB is correct then display this message
            const { name, host } = res.connection;
    
            console.log(`Succesful connection ${name}  ${host}`);
        })
        .catch(error => {
            console.log('DB connection error', error);
        });
};

module.exports = { DB_URL, DB_CONFIG, connect };