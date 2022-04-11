const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');

router.get('/', habitController.getAllHabits);

// do we need a route for this?
router.get('/:habit_id', habitController.getHabitById);

// will need a verify token function here, if we take out top one and change this one '/:username
router.get('/users/:username', habitController.getHabitsByUsername);

router.post('/users/:username', habitController.addHabit);

module.exports = router
