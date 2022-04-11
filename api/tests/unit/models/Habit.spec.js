const Habit = require('../../../models/Habit');
const User = require('../../../models/User');
const pg = require('pg');
jest.mock('pg');
jest.mock('../../../models/User');

const db = require('../../../dbConfig');

const userOne = {
    id: 1,
    first_name: 'futureproof',
    surname: 'mitnick',
    username: 'fpmitnick',
    password: 'password'
};

const habits = [
    {
        habit_id: 1,
        user_id: 1,
        habit_name: 'test habit name',
        frequency: 'daily',
        repetitions: 1,
        date: 'date'

    }
]

describe('Habit model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('get all', () => {
        it('it resolves with all habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValue({ rows: [{},{},{},{}]});
            const allHabits = await Habit.all;
            expect(allHabits).toHaveLength(4);
        })

        it('the error message is correct', async () => {
            return Habit.all.catch(error => {
                expect(error).toBe('Error retrieving all habits')
            })
        })
    })


    describe('findByHabitId', () => {
        it('it resolves with the correct habit on successful db query', async () => {
            jest.spyOn(db, 'query').mockResolvedValue({rows: habits});
            let test = new Habit(habits[0]);
            const data = await Habit.findByHabitId(test.habit_id);
            expect(data).toEqual({
                "habit_id": 1,
                "user_id": 1,
                "habit_name": 'test habit name',
                "current_streak": 0,
                "frequency": 'daily',
                "repetitions": 1,
                "date": 'date'
            })
        })

        it('the error message is correct on unsuccessful db query', async () => {
            return Habit.findByHabitId('10').catch(error => {
                expect(error).toBe('Error getting this habit')
            })
        })
    })


    describe('findHabitsByUsername', () => {
        it('it retrieves all habits for a user on successful db query', async () => {
            jest.spyOn(db, 'query').mockResolvedValue({rows: habits})
            let test = new User(userOne)
            const result = await Habit.findHabitsByUsername(test.username);
            expect(result).toHaveLength(1)
            expect(result[0]).toEqual({
                "habit_id": 1,
                "user_id": 1,
                "current_streak": 0,
                "habit_name": 'test habit name',
                "frequency": 'daily',
                "repetitions": 1,
                "date": 'date'
            })
        })

        it('the error message is correct on unsuccessful db query', async () => {
            return Habit.findHabitsByUsername('fake').catch(error => {
                expect(error).toBe(`Error getting this users data: `, error)
            })
        })
    })
})



