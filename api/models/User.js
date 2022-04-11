const db = require('../dbConfig');

class User {
    constructor(data) {
        this.id = data.id
        this.first_name = data.first_name
        this.surname = data.surname
        this.username = data.username
        this.password = data.password
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const allUserData = await db.query(`SELECT * FROM users;`);
                let allUsers = allUserData.rows.map(u => new User(u));
                resolve(allUsers)
            } catch (error) {
                reject(`Cannot retrieve all users!`)
            }
        })
    }
}

module.exports = User
