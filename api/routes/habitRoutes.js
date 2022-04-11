const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');

router.get('/', habitController.getAllHabits);

module.exports = router
