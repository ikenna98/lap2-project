const { TestWatcher } = require('jest');
const habitController = require('../../../controllers/habit');
const Habit = require('../../../models/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('get all habits', () => {
        it('it returns 200 on getting all habits', async () => {
            jest.spyOn(Habit, 'all', 'get')
                .mockResolvedValue([{},{}])
            await habitController.getAllHabits(null, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith([{},{}])
        })

        it('it returns status code 500 if there is an error', async () => {
            jest.spyOn(Habit, 'all', 'get')
                .mockRejectedValue([])
            await habitController.getAllHabits(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    })

    describe('get habit by id', () => {
        it('it returns a status 200 when getting a habit by id', async () => {
            jest.spyOn(Habit, 'findByHabitId')
                .mockResolvedValue([{},{}])
            const mockRequest = {params:{habit_id: 1}}
            await habitController.getHabitById(mockRequest, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith([{},{}])
        })

        it('it returns status code 500 when it cannot get habit by id', async () => {
            jest.spyOn(Habit, 'findByHabitId')
                .mockRejectedValue([])
            const mockRequest = {params:{habit_id: 1}}
            await habitController.getHabitById(mockRequest, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    })

    
})
