const userItem = require('../models/userItem');
const mongoose = require('mongoose');
const UserItem = mongoose.model('UserItem', userItem);


function respond(err, result, res) {
    if (err) {
        return res.status(500).json({error: err});
    }
    return res.json(result);
}
  
const userListController = {
getAll: (req, res) => {
    UserItem.find({}, (err, userItem) => {
        return respond(err, userItem, res);
    });
},
create: (req, res) => {
    const newUserItem = new UserItem(req.body);
    newUserItem.save((err, savedPostItem) => {
        return respond(err, savedPostItem, res);
    });
},
get: (req, res) => {
    UserItem.findById(req.params.id, (err, userItem) => {
        return respond(err, userItem, res);
    });
},
update: (req, res) => {
    UserItem.findByIdAndUpdate(req.params.id, req.body, (err, userItem) => {
        return respond(err, userItem, res);
    });
},
delete: (req, res) => {
    UserItem.findByIdAndRemove(req.params.id, (err, userItem) => {
        return respond(err, userItem, res);
    });
}
};


module.exports = userListController;