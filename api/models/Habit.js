const db = require('../dbConfig');

class Habit {
    constructor(data) {
        this.habit_id = data.habit_id
        this.user_id = data.user_id
        this.habit_name = data.habit_name
        this.current_streak = 0
        this.frequency = data.frequency
        this.repetitions = data.repetitions
        this.date = data.date
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                let habitData = await db.query(`SELECT * FROM habits;`);
                let allHabits = habitData.rows.map(h => new Habit(h));
                resolve(allHabits)
            } catch (error) {
                reject(`Error retrieving all habits`)
            }
        })
    }
}

module.exports = Habit
