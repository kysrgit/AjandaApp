// ==========================================
// Veri Katmanı — localStorage Yönetimi
// ==========================================

const STORAGE_KEYS = {
    schedule: 'ajanda_weekly_schedule',
    fitness: 'ajanda_fitness_programs',
    apiKey: 'ajanda_gemini_api_key'
};

// ---------- Helpers ----------
function getFromStorage(key, defaultVal) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try { return JSON.parse(stored); }
        catch { /* fallthrough */ }
    }
    return JSON.parse(JSON.stringify(defaultVal));
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Schedule ----------
function getSchedule() {
    return getFromStorage(STORAGE_KEYS.schedule, DEFAULT_WEEKLY_SCHEDULE);
}

function saveSchedule(schedule) {
    saveToStorage(STORAGE_KEYS.schedule, schedule);
}

// ---------- Fitness Programs ----------
function getFitnessPrograms() {
    return getFromStorage(STORAGE_KEYS.fitness, DEFAULT_FITNESS_PROGRAMS);
}

function saveFitnessPrograms(programs) {
    saveToStorage(STORAGE_KEYS.fitness, programs);
}

// ---------- API Key ----------
function getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.apiKey) || '';
}

function saveApiKey(key) {
    localStorage.setItem(STORAGE_KEYS.apiKey, key.trim());
}

// ---------- Reset ----------
function resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.schedule);
    localStorage.removeItem(STORAGE_KEYS.fitness);
}
