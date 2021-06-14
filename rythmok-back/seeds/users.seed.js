const mongoose = require("mongoose");
const User = require("../models/Users.model");
const { DB_URL, DB_CONFIG } = require("../db");

const usersArray = [
    {
        username: "admin",
        email: "admin@cartoteca.com",
        password: "Admin1234",
        role: "admin",
        maps: [],
        layers: [],
        sources: [],
    },
    {
        username: "publisher",
        email: "publisher@cartoteca.com",
        password: "Publisher1234",
        role: "publisher",
        maps: ["608dcd22be34ee38cc68bf8e", "608dcd22be34ee38cc68bf8d", "608dcd22be34ee38cc68bf8c"],
        layers: ["608dbead8596d70ac0dbef97", "608dbead8596d70ac0dbef94"],
        sources: [],
    },
    {
        username: "viewer",
        email: "viewer@cartoteca.com",
        password: "Viewer1234",
        role: "viewer",
        maps: ["608dcd22be34ee38cc68bf8d"],
        layers: ["608dbead8596d70ac0dbef93", "608dbead8596d70ac0dbef95"],
        sources: [],
    },
];

mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Ejecutando seed Users.js");

        // Find if user exists
        const allUsers = await User.find();

        //If exists then delete
        if (allUsers.length) {
            await User.collection.drop();
            console.log("Colección Users eliminada con éxito");
        }
    })
    .catch((error) => {
        //If error
        console.log("Error buscando en DB:", error);
    })
    .then(async () => {
        // User is inserted into Users array
        await User.insertMany(usersArray);
        console.log("Añadidas nuevas Users a DB");
    })
    .catch((error) => {
        // Error entering new users
        console.log("Error insertando Users", error);
    })
    .finally(() => {
        // In every case disconnect from DB
        mongoose.disconnect();
    });
