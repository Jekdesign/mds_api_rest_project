const articleItem = require('../models/articleItem');
const mongoose = require('mongoose');
const ArticleItem = mongoose.model('PostItem', articleItem);

const respond = (err, result, res) => {
    if (err) {
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const postListController = {
getAllArticle: (req, res) => {
    ArticleItem.find({}, (err, articleItem) => {
        return respond(err, articleItem, res);
    });
},
createArticle: (req, res) => {
    const newArticleItem = new PostItem(req.body);
    newArticleItem.save((err, savedPostItem) => {
        return respond(err, savedPostItem, res);
    });
},
getOneArticle: (req, res) => {
    ArticleItem.findById(req.params.id, (err, articleItem) => {
        return respond(err, articleItem, res);
    });
},
updateArticle: (req, res) => {
    ArticleItem.findByIdAndUpdate(req.params.id, req.body, (err, articleItem) => {
        return respond(err, articleItem, res);
    });
},
deleteArticle: (req, res) => {
    ArticleItem.findByIdAndRemove(req.params.id, (err, articleItem) => {
        return respond(err, articleItem, res);
    });
}
};


module.exports = postListController;
