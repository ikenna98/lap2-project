const Habit = require('../models/Habit');

async function getAllHabits(req, res) {
    try {
        const allHabits = await Habit.all
        res.status(200).json(allHabits)
    } catch (error) {
        res.status(500).send({error})
    }
}

async function getHabitById(req, res) {
    try {
        console.log(req.params)
        const habitData = await Habit.findByHabitId(req.params.habit_id)
        res.status(200).json(habitData)
    } catch (error) {
        res.status(500).send({error})
    }
}

async function getHabitsByUsername(req, res) {
    try {
        const habitsData = await Habit.findHabitsByUsername(req.params.username)
        if (!habitsData[0]) {
            res.status(404).json({msg: `User does not exist`})
        } else {
            res.status(200).json(habitsData)
        }
    } catch (error) {
        res.status(500).send({error})
    }
}

async function addHabit(req, res) {
    try {
        console.log(req.body)
        const {username} = req.params
        const newHabit = await Habit.create({...req.body, username})
        res.status(201).json(newHabit)
    } catch (error) {
        res.status(500).send({error})
    }
}

module.exports = { getAllHabits, getHabitById, getHabitsByUsername, addHabit }
