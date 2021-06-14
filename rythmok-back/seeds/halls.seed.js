const mongoose = require("mongoose");
const Hall = require("../models/Halls.model");
const { DB_URL, DB_CONFIG } = require("../db");

const hallsArray = [
    {
      name: "Sala Galileo", 
      location: "Calle de Galileo, 100, 28015 Madrid", 
      image: "https://s3.eu-central-1.amazonaws.com/images.jacksonlive.es/upload/spots/4x3/1371585608422.jpg"
    },
    {
        name: "Wanda Metropolitano", 
        location: "Av. de Luis Aragonés, 4, 28022 Madrid",
        image: "https://empresas.blogthinkbig.com/wp-content/uploads/2019/10/39569725004_ec92ccc479_z.jpg"
    },
    {
        name: "Teatro Barcelo", 
        location: "C. de Barceló, 11, 28004 Madrid",
        image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/04/22/15559612086125.jpg"
    },
    {
        name: "Teatro Darymelia", 
        location: "Calle Colón, s/n, 23001 Jaén" , 
        image: "https://mundoturistico.es/wp-content/uploads/2020/09/Teatro-Darymelia-jaen-min.jpg"
    },


    
];

mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Ejecutando seed halls.seed.js");

        // Find if hall exists
        const allHalls = await Hall.find();

        //If exists then delete
        if (allHalls.length) {
            await Hall.collection.drop();
            console.log("Colección Halls eliminada con éxito");
        }
    })
    .catch((error) => {
        //If error
        console.log("Error buscando en DB:", error);
    })
    .then(async () => {
        // Hall is inserted into halls array
        await Hall.insertMany(hallsArray);
        console.log("Añadidas nuevas Halls a DB");
    })
    .catch((error) => {
        // Error entering new Hall
        console.log("Error insertando Halls", error);
    })
    .finally(() => {
        // In every case disconnect from DB
        mongoose.disconnect();
    });
