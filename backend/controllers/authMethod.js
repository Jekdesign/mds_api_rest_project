const bcrypt = require('bcrypt');
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

const authListController = {
    postSignup: async (req, res, next) => {
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

    postLogin: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = await req.body;

            const userFind = await UserItem.findOne({email:email}, (err, userItem) => {
                return respond(err, userItem, res);
            });

            const isPasswordMatch = await bcrypt.compare(password, userFind.password);

            if (!isPasswordMatch) {
                return res.status(404).json({
                    message: "Your password is not corrected!"
                })
            }

        } catch (err) {
            res.status(500).send(err);
        }
    },
};

module.exports = authListController;