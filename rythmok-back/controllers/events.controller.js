const mongoose = require('mongoose');
const { events } = require('../models/Events.model');
const Events = require('../models/Events.model')
const Users = require('../models/Users.model')
const Artists = require('../models/Artists.model')
const Halls = require('../models/Halls.model')


const eventsGet = async (req, res, next) => {
    const events = await Events.find().populate("attendees").populate("artists").populate("location");
    res.json(events);
}

const eventGetById = async(req, res, next) => {
    try {
        const eventName = req.params.id;
        // console.log(id)
        const event = await Events.findById(eventName).populate("attendees").populate("artists").populate("location");
        // 
        res.json(event)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const postAddFavourite = async (req, res, next) => {
    try {
        console.log(req.params)
        const idEvent = req.params.idEvent;
        
        const id = req.params.id;
        const eventFavourite = await Events.findById(idEvent);
        const updateFavourite = await Users.findByIdAndUpdate( //update//
            id, {
                $addToSet: {
                    favourites: eventFavourite
                }
            }, {
                new: true
            }
        );
        
        return res.json(eventFavourite);
    } catch (err) {
        return res.status(500).json(err)
    }
};

//PREGUNTAR A MANU

const postDeleteFavourite = async (req, res, next) => {
    try {
        const idEvent = req.params.idEvent;
        const idUser = req.params.id;
        const eventFavourite = await Events.findById(idEvent)
        // .populate("users").populate("artists").populate("halls");
        const updateFavourite = await Users.findByIdAndUpdate( //update//
            idUser, {
                $pull: {
                    favourites: eventFavourite
                }
            }, {
                new: true
            }
        );
        
        return res.json(eventFavourite);
    } catch (err) {
        return res.status(500).json(err)
    }
};

const postAddTicket = async (req, res, next) => {
    try {
        const idEvent = req.params.idEvent;
        const idUser = req.params.id;
        const ticket = await Events.findById(idEvent);
        const updateTicket = await Users.findByIdAndUpdate( //update//
            idUser, {
                $addToSet: {
                    acquisted: ticket
                }
            }, {
                new: true
            }
        );
        return res.json(ticket);   
    } catch (err) {
        return res.status(500).json(err)
    }
};

module.exports = { eventsGet, eventGetById, postAddFavourite , postDeleteFavourite, postAddTicket }
