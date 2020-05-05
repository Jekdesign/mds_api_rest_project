const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            let result = {};
            let status = 200;
            const {
                email,
                password
            } = await req.body;

            const userFind = await UserItem.findOne({
                email: email
            }, (err, userItem) => {
                let isPasswordMatch = bcrypt.compare(password, userItem.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({
                        message: "Your password is not corrected!"
                    })
                } else {
                    const payload = {
                        author: userItem._id,
                        name: userItem.name,
                        email: userItem.email
                    };
                    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1h',
                        algorithm: 'HS256'
                    });
                    //console.log('TOKEN', token);
                    result.token = token;
                    result.status = status;
                    result.result = userItem;
                }
                return res.status(status).send(result);
                //return respond(err, userItem, res);
            });

            return userFind;

        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = authListController;