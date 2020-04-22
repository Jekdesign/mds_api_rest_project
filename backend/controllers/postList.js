const postItem = require('../models/postItem');
const mongoose = require('mongoose');
const PostItem = mongoose.model('PostItem', postItem);

function respond(err, result, res) {
    if (err) {
        return res.status(500).json({error: err});
    }
    return res.json(result);
}
  
const postListController = {
getAll: (req, res) => {
    PostItem.find({}, (err, postItem) => {
        return respond(err, postItem, res);
    });
},
create: (req, res) => {
    const newPostItem = new PostItem(req.body);
    newPostItem.save((err, savedPostItem) => {
        return respond(err, savedPostItem, res);
    });
},
get: (req, res) => {
    PostItem.findById(req.params.id, (err, postItem) => {
        return respond(err, postItem, res);
    });
},
update: (req, res) => {
    PostItem.findByIdAndUpdate(req.params.id, req.body, (err, postItem) => {
        return respond(err, postItem, res);
    });
},
delete: (req, res) => {
    PostItem.findByIdAndRemove(req.params.id, (err, postItem) => {
        return respond(err, postItem, res);
    });
}
};


module.exports = postListController;