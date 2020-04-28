//const bcrypt = require('bcrypt');
const userItem = require('../models/userModel');
const mongoose = require('mongoose');
const UserItem = mongoose.model('UserItem', userItem);

const respond = (err, result, res) => {
    if (err) {
        return res.status(500).json({
            error: err
        });
    }
    return res.json(result);
}

const userListController = {
    getAllUser: (req, res) => {
        UserItem.find({}, (err, userItem) => {
            return respond(err, userItem, res);
        });
    },

    getOneUser: (req, res, next) => {
        UserItem.findById(req.params.id, (err, userItem) => {
            return respond(err, userItem, res);
        });
    },

    updateUser: (req, res, next) => {
        UserItem.findByIdAndUpdate(req.params.id, req.body, (err, userItem) => {
            return respond(err, userItem, res);
        });
    },

    deleteUser: (req, res, next) => {
        UserItem.findByIdAndRemove(req.params.id, (err, userItem) => {
            return respond(err, userItem, res);
        });
    },

    
    /*postSignup: async (req, res, next) => {
        try {
            const {
                name,
                email,
                password
            } = req.body;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPass = bcrypt.hashSync(password, salt);
            const registration = new UserItem({
                name,
                email,
                password: hashPass
            });

            await registration.save((err, savedUserItem) => {
                return respond(err, savedUserItem, res);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    postLogin: (req, res, next) => {
        UserItem.findOne(req.body, (err, userItem) => {
            return respond(err, userItem, res);
        });
    },*/
};


module.exports = userListController;