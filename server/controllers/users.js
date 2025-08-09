const { User } = require('../models/User');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');

module.exports = {
    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (!user) throw Error;
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';

            const param = { email: value.email };
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });

            res.json({
                token: token,
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Invalid data.');
        }
    },

signup: async function (req, res, next) {
    const schema = joi.object({
        firstName: joi.string().required().min(2).max(256),
        userName: joi.string().required().min(3).max(50),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(1024).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        console.log(error.details[0].message);
        return res.status(400).json({ error: 'Invalid signup data' });
    }

    try {
        // לבדוק אם האימייל כבר קיים
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered." });
        }

        // לבדוק אם שם המשתמש כבר קיים
        const existingUsername = await User.findOne({ userName: value.userName });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already taken." });
        }

        // הצפנת סיסמה
        const hash = await bcrypt.hash(value.password, 10);

        const newUser = new User({
            firstName: value.firstName,
            userName: value.userName,
            email: value.email,
            password: hash
        });

        await newUser.save();

        res.json({
            id: newUser._id,
            firstName: newUser.firstName,
            userName: newUser.userName,
            email: newUser.email
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ error: 'Error signing up new user' });
    }
},

}