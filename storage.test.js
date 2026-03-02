const { DEFAULT_WEEKLY_SCHEDULE, DEFAULT_FITNESS_PROGRAMS } = require('./data');

// Mock defaults globally as storage.js expects them in global scope in browser
global.DEFAULT_WEEKLY_SCHEDULE = DEFAULT_WEEKLY_SCHEDULE;
global.DEFAULT_FITNESS_PROGRAMS = DEFAULT_FITNESS_PROGRAMS;

const storage = require('./storage');

describe('storage.js', () => {
    beforeEach(() => {
        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('resetAllData', () => {
        it('should remove schedule and fitness data from localStorage', () => {
            storage.resetAllData();

            expect(localStorage.removeItem).toHaveBeenCalledWith(storage.STORAGE_KEYS.schedule);
            expect(localStorage.removeItem).toHaveBeenCalledWith(storage.STORAGE_KEYS.fitness);
            expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
        });
    });

    describe('getSchedule', () => {
        it('should return stored schedule if it exists', () => {
            const mockSchedule = [{ day: 'Monday', workout: 'fitness' }];
            localStorage.getItem.mockReturnValue(JSON.stringify(mockSchedule));

            const result = storage.getSchedule();

            expect(localStorage.getItem).toHaveBeenCalledWith(storage.STORAGE_KEYS.schedule);
            expect(result).toEqual(mockSchedule);
        });

        it('should return default schedule if nothing is stored', () => {
            localStorage.getItem.mockReturnValue(null);

            const result = storage.getSchedule();

            expect(result).toEqual(DEFAULT_WEEKLY_SCHEDULE);
        });

        it('should return default schedule if stored data is invalid JSON', () => {
            localStorage.getItem.mockReturnValue('invalid json');

            const result = storage.getSchedule();

            expect(result).toEqual(DEFAULT_WEEKLY_SCHEDULE);
        });
    });

    describe('saveSchedule', () => {
        it('should save schedule to localStorage', () => {
            const mockSchedule = [{ day: 'Monday', workout: 'fitness' }];

            storage.saveSchedule(mockSchedule);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                storage.STORAGE_KEYS.schedule,
                JSON.stringify(mockSchedule)
            );
        });
    });

    describe('getFitnessPrograms', () => {
        it('should return stored programs if they exist', () => {
            const mockPrograms = { 1: { title: 'Test' } };
            localStorage.getItem.mockReturnValue(JSON.stringify(mockPrograms));

            const result = storage.getFitnessPrograms();

            expect(localStorage.getItem).toHaveBeenCalledWith(storage.STORAGE_KEYS.fitness);
            expect(result).toEqual(mockPrograms);
        });

        it('should return default programs if nothing is stored', () => {
            localStorage.getItem.mockReturnValue(null);

            const result = storage.getFitnessPrograms();

            expect(result).toEqual(DEFAULT_FITNESS_PROGRAMS);
        });

        it('should return default programs if stored data is invalid JSON', () => {
            localStorage.getItem.mockReturnValue('invalid json');

            const result = storage.getFitnessPrograms();

            expect(result).toEqual(DEFAULT_FITNESS_PROGRAMS);
        });
    });

    describe('saveFitnessPrograms', () => {
        it('should save fitness programs to localStorage', () => {
            const mockPrograms = { 1: { title: 'Test' } };

            storage.saveFitnessPrograms(mockPrograms);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                storage.STORAGE_KEYS.fitness,
                JSON.stringify(mockPrograms)
            );
        });
    });

    describe('getApiKey', () => {
        it('should return stored API key', () => {
            localStorage.getItem.mockReturnValue('test-api-key');

            const result = storage.getApiKey();

            expect(localStorage.getItem).toHaveBeenCalledWith(storage.STORAGE_KEYS.apiKey);
            expect(result).toBe('test-api-key');
        });

        it('should return empty string if no API key is stored', () => {
            localStorage.getItem.mockReturnValue(null);

            const result = storage.getApiKey();

            expect(result).toBe('');
        });
    });

    describe('saveApiKey', () => {
        it('should save trimmed API key to localStorage', () => {
            storage.saveApiKey('  test-api-key  ');

            expect(localStorage.setItem).toHaveBeenCalledWith(
                storage.STORAGE_KEYS.apiKey,
                'test-api-key'
            );
        });
    });
});
