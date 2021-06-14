const mongoose = require("mongoose");
const Event = require("../models/Events.model");
const { DB_URL, DB_CONFIG } = require("../db");

const eventsArray = [
    {
        date: "2021-05-23",
        name: "Dua Lipa Live",
        location: "60a2b2b030bab84990154ef6",
        artists: ["60a2b00aa8c79c1a7ce74562"],       
        attendees: ["60a293af94406f0be0771b17", "60a2939694406f0be0771b15"],       
        styles: ["pop", "R&B"],
        prize: 50       
     },
     {
        date: "2021-06-23",
        name: "Madrid Metal Fest",
        location: "60a2b2b030bab84990154ef6",
        artists: ["60a2b00aa8c79c1a7ce74564", "60a2b00aa8c79c1a7ce74565"],       
        attendees: ["60a2939694406f0be0771b15", "60a293c094406f0be0771b18", "60a293ee94406f0be0771b1a"],       
        styles: ["metal", "drum&bass"],
        prize: 80      
     },
     {
        date: "2021-07-12",
        name: "Noche de monologos",
        location: "60a2b2b030bab84990154ef5",
        artists: ["60a2b00aa8c79c1a7ce74566"],       
        attendees: ["60a2939694406f0be0771b15", "60a293c094406f0be0771b18", "60a293ee94406f0be0771b1a", "60a293a494406f0be0771b16", "60a293df94406f0be0771b19"],       
        styles: ["monologo", "humor"],
        prize: 15      
     },
     {
        date: "2021-08-15",
        name: "Coldplay World Tour 2021",
        location: "60a2b2b030bab84990154ef8",
        artists: ["60a2b00aa8c79c1a7ce74563"],       
        attendees: ["60a293af94406f0be0771b17"],       
        styles: ["pop", "rock"],
        prize: 40      
     },
];

mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Ejecutando seed events.seed.js");

        // Find if event exists
        const allEvents = await Event.find();

        //If exists then delete
        if (allEvents.length) {
            await Event.collection.drop();
            console.log("Colección Events eliminada con éxito");
        }
    })
    .catch((error) => {
        //If error
        console.log("Error buscando en DB:", error);
    })
    .then(async () => {
        // event is inserted into events array
        await Event.insertMany(eventsArray);
        console.log("Añadidas nuevas Event a DB");
    })
    .catch((error) => {
        // Error entering new event
        console.log("Error insertando Events", error);
    })
    .finally(() => {
        // In every case disconnect from DB
        mongoose.disconnect();
    });
