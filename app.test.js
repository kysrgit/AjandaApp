// Mock globals required by app.js during initialization
global.unlockApp = jest.fn();
global.document = {
  addEventListener: jest.fn(),
  getElementById: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
};
global.initLockScreen = jest.fn();
global.getSchedule = jest.fn();
global.getFitnessPrograms = jest.fn();
global.renderWeeklyGrid = jest.fn();
global.setupFitnessModal = jest.fn();
global.setupSettingsModal = jest.fn();
global.setupEditModal = jest.fn();
global.setupChatPanel = jest.fn();
global.updateAIButtonState = jest.fn();
global.WORKOUT_TYPES = {};

const { isTodayIndex } = require('./app.js');

describe('isTodayIndex', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return true for Monday (index 0) when today is Monday', () => {
    const monday = new Date('2023-10-02T12:00:00Z'); // Monday
    jest.setSystemTime(monday);
    expect(isTodayIndex(0)).toBe(true);
  });

  it('should return true for Sunday (index 6) when today is Sunday', () => {
    const sunday = new Date('2023-10-08T12:00:00Z'); // Sunday
    jest.setSystemTime(sunday);
    expect(isTodayIndex(6)).toBe(true);
  });

  it('should return false when index does not match today', () => {
    const monday = new Date('2023-10-02T12:00:00Z');
    jest.setSystemTime(monday);
    expect(isTodayIndex(1)).toBe(false); // Tuesday index
  });

  it('should correctly handle all days of the week', () => {
    const days = [
      { date: '2023-10-02T12:00:00Z', index: 0, name: 'Monday' },
      { date: '2023-10-03T12:00:00Z', index: 1, name: 'Tuesday' },
      { date: '2023-10-04T12:00:00Z', index: 2, name: 'Wednesday' },
      { date: '2023-10-05T12:00:00Z', index: 3, name: 'Thursday' },
      { date: '2023-10-06T12:00:00Z', index: 4, name: 'Friday' },
      { date: '2023-10-07T12:00:00Z', index: 5, name: 'Saturday' },
      { date: '2023-10-08T12:00:00Z', index: 6, name: 'Sunday' },
    ];

    days.forEach(day => {
      jest.setSystemTime(new Date(day.date));
      expect(isTodayIndex(day.index)).toBe(true);
    });
  });

  it('should accept an optional date parameter', () => {
    const monday = new Date('2023-10-02T12:00:00Z');
    const sunday = new Date('2023-10-08T12:00:00Z');
    expect(isTodayIndex(0, monday)).toBe(true);
    expect(isTodayIndex(6, sunday)).toBe(true);
  });
});
