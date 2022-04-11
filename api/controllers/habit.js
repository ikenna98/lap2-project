const Habit = require('../models/Habit');

async function getAllHabits(req, res) {
    try {
        const allHabits = await Habit.all
        res.status(200).json(allHabits)
    } catch (error) {
        res.status(500).send({error})
    }
}

module.exports = { getAllHabits }
