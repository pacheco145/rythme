const mongoose = require('mongoose');
const Halls = require('../models/Halls.model');

const hallsGet = async(req, res)=>{ // esto es solo para todas las salas//
    try{
        const halls = await Halls.find()
        res.json(halls);
    }catch (err){
        return res.status(500).json(err);
    }
};
const hallsGetById = async(req, res)=>{ // esto es solo para sala por su id//
    try{
        const id = req.params.id
        const hall = await Halls.findById(id);
        res.json(hall)
    }catch(err){
        return res.status(500).json(err);
    }
}
/*
const hallsGetByName = async(req, res)=>{ //esto para las salas por su nombre //
    try{
        const hallName = req.params.name
        const hall = await Halls.find({name: hallName});
        res.json(hall)
    }catch(err){
        return res.status(500).json(err);
    }
}
*/
module.exports = { hallsGet, hallsGetById };
