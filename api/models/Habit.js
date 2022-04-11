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

    static findByHabitId(habit_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const habitData = await db.query(`SELECT * FROM habits WHERE habit_id = $1;`, [habit_id ]);
                let habit = new Habit(habitData.rows[0])
                resolve(habit)
            } catch (error) {
                reject(`Error getting this habit`)
            }
        })
    }

    static findHabitsByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUsername = await db.query(`SELECT * FROM users WHERE username = $1;`, [ username ])
                if (checkUsername) {
                    const userHabitData = await db.query(`SELECT * FROM habits JOIN users ON habits.user_id = users.id WHERE users.username = $1;`, [ username ]);
                    let userHabits = userHabitData.rows.map(h => new Habit(h))
                    resolve(userHabits)
                } else {
                    throw new Error(`Username does not exist`)
                }
            } catch (error) {
                reject(`Error getting this users data: `, error)
            }
        })
    }

    static create({habit_name, frequency, repetitions, username}) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await db.query(`SELECT id FROM users WHERE username = $1;`, [ username ]);
                let user = userData.rows[0]
                const newHabitQuery = await db.query(`INSERT INTO habits (user_id, habit_name, frequency, repetitions) VALUES ($1, $2, $3, $4) RETURNING *;`, [ user.id, habit_name, frequency, repetitions ])
                let newHabit = new Habit(newHabitQuery.rows[0])
                resolve(newHabit)
            } catch (error) {
                reject("Error adding habit")
            }
        })
    }
}

module.exports = Habit
