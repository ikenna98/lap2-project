const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        if (!user) {
            throw new Error('No user with this username')
        }
        const authed = await bcrypt.compare(req.body.password, user.password);
        console.log(authed)
        if (!!authed) {
            res.status(200).json({ user: user.username })
        } else {
            throw new Error('User cannot be authenticated')
        }
    } catch (error) {
        res.status(401).json({ error })
    }
}

module.exports = { register, login }
