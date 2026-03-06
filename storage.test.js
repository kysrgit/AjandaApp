const {
  DEFAULT_WEEKLY_SCHEDULE,
  DEFAULT_FITNESS_PROGRAMS
} = require('./data');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

global.localStorage = localStorageMock;
global.DEFAULT_WEEKLY_SCHEDULE = DEFAULT_WEEKLY_SCHEDULE;
global.DEFAULT_FITNESS_PROGRAMS = DEFAULT_FITNESS_PROGRAMS;

const { resetAllData, STORAGE_KEYS } = require('./storage');

describe('storage.js - resetAllData', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should remove schedule and fitness data from localStorage', () => {
    // Setup: set some data first
    localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify({ test: 'data' }));
    localStorage.setItem(STORAGE_KEYS.fitness, JSON.stringify({ test: 'fitness' }));
    localStorage.setItem(STORAGE_KEYS.apiKey, 'test-api-key');

    // Action
    resetAllData();

    // Verification
    expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.schedule);
    expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.fitness);

    // Check if they are actually removed from the mock store
    expect(localStorage.getItem(STORAGE_KEYS.schedule)).toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.fitness)).toBeNull();

    // API key should NOT be removed
    expect(localStorage.getItem(STORAGE_KEYS.apiKey)).toBe('test-api-key');
    expect(localStorage.removeItem).not.toHaveBeenCalledWith(STORAGE_KEYS.apiKey);
  });

  test('should work even if keys do not exist', () => {
    // Action
    resetAllData();

    // Verification
    expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.schedule);
    expect(localStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.fitness);
  });
});
