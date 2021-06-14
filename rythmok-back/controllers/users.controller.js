const mongoose = require('mongoose');
const Users = require('../models/Users.model');
const Events = require('../models/Events.model');

const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find().populate("acquisted").populate("friends").populate("favourites");
        res.json(users)
        console.log(json(users))
    } catch (err) {
        next(err);
        // return res.status(500).json(err);
    }
};

const userGetById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id).populate("acquisted").populate("friends").populate("favourites");
        res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const postAddFriend = async (req, res, next) => {
    try {
        const friend = req.params.idFriend;
        const id = req.params.id;

        const updateUser = await Users.findByIdAndUpdate( //update//
            id, {
                $addToSet: {
                    friends: friend
                }
            }, {
                new: true
            }
        );
        const user = await Users.findById(id);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err)
    }

};
const postDeleteFriend = async (req, res, next) => {
    try {
        const friend = req.params.idFriend;
        const id = req.parmas.id;

        const deleteUser = await Users.findByIdAndUpdate(
            id, {
                $pull: {
                    friends: friend
                }
            }, {
                new: true
            }
        );
        const user = await Users.findById(id).populate("acquisted").populate("friends").populate("favourites");
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err)
    }
};

module.exports = {
    getUsers,
    userGetById,
    postAddFriend,
    postDeleteFriend,
};