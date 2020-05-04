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
    }
};


module.exports = userListController;
