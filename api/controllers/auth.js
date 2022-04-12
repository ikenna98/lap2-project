const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try{
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.register({...req.body, password: hashed })
        res.status(201).json({msg: `User created successfully`})
    } catch (error) {
        res.status(500).json({ err: `Username already exists.`})
    }
}

async function login(req, res) {
    try {
        const user = await User.findByUsername(req.body.username)
        // if (!user) {
        //     throw new Error('No user with this username')
        // }
        const authed = await bcrypt.compare(req.body.password, user.password);
        if (!!authed) {
            const payload = {username: user.username}
            jwt.sign(payload, 'secret-pass', {expiresIn: 60}, sendToken)
            res.status(200).json({ username: user.username })
        } else {
            throw new Error('User cannot be authenticated')
        }
    } catch (error) {
        res.status(401).json({ error: `User cannot be authenticated` })
    }
}

module.exports = { register, login }
