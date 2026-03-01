// ==========================================
// Haftalık Program & Fitness Veritabanı
// ==========================================

const WORKOUT_TYPES = {
  fitness: { label: 'Fitness', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', icon: '🏋️' },
  swimming: { label: 'Yüzme', color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', icon: '🏊' },
  running: { label: 'Koşu', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', icon: '🏃' },
  rest: { label: 'Dinlenme', color: '#94a3b8', bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.3)', icon: '😴' }
};

const DEFAULT_WEEKLY_SCHEDULE = [
  {
    day: 'Pazartesi',
    shortDay: 'Pzt',
    workout: 'rest',
    fitnessDay: null,
    classes: [
      { name: '[ME 206] Strength of Materials-II', time: '09:10 - 12:00', location: 'Derslik: AZ005', instructor: 'Doç. Dr. Umut Çalışkan', note: 'İlk 4 hafta (23 Şub - 20 Mar): 10:00 - 12:00' },
      { name: '[MM 212] Takım Tezgahları', time: '13:10 - 16:00', location: 'Derslik: AZ005', instructor: 'Dr. Öğr. Üyesi Şaban Murat Ünlü' }
    ],
    workoutTime: null
  },
  {
    day: 'Salı',
    shortDay: 'Sal',
    workout: 'fitness',
    fitnessDay: 1,
    classes: [
      { name: '[MM 210] Malzeme-II', time: '09:10 - 12:00', location: 'Derslik: AZ006', instructor: 'Doç. Dr. Şengül Danışman' },
      { name: '[MM 204] Kinetik', time: '13:10 - 16:00', location: 'Derslik: AZ005', instructor: 'Prof. Dr. Zeynep Gül Apalak' }
    ],
    workoutTime: '17:00 - 18:30'
  },
  {
    day: 'Çarşamba',
    shortDay: 'Çar',
    workout: 'running',
    fitnessDay: null,
    classes: [
      { name: '[MM 214] Olasılık ve İstatistik', time: '13:10 - 15:00', location: 'Derslik: AZ006', instructor: 'Prof. Dr. Sebahattin Ünalan' }
    ],
    workoutTime: '17:00 - 18:00'
  },
  {
    day: 'Perşembe',
    shortDay: 'Per',
    workout: 'fitness',
    fitnessDay: 2,
    classes: [
      { name: '[MM 202] Müh. Matematiği-II', time: '09:10 - 12:00', location: 'Derslik: AZ001', instructor: 'Prof. Dr. Recep Ekici' },
      { name: '[MM 208] Termodinamik-I', time: '13:10 - 16:00', location: 'Derslik: AZ005', instructor: 'Prof. Dr. Veysel Özceyhan' }
    ],
    workoutTime: '17:00 - 18:30'
  },
  {
    day: 'Cuma',
    shortDay: 'Cum',
    workout: 'swimming',
    fitnessDay: null,
    classes: [],
    workoutTime: '10:00 - 11:00'
  },
  {
    day: 'Cumartesi',
    shortDay: 'Cmt',
    workout: 'fitness',
    fitnessDay: 3,
    classes: [],
    workoutTime: '10:00 - 11:30'
  },
  {
    day: 'Pazar',
    shortDay: 'Paz',
    workout: 'swimming',
    fitnessDay: null,
    classes: [],
    workoutTime: '10:00 - 11:00'
  }
];

const DEFAULT_FITNESS_PROGRAMS = {
  1: {
    title: 'Güç ve Temel Hareketler',
    subtitle: '1. Gün',
    exercises: [
      {
        name: 'Goblet Squat',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Quadriceps, Glutes',
        alternative: { name: 'Leg Press', muscleGroup: 'Quadriceps, Glutes' }
      },
      {
        name: 'Dumbbell Bench Press',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Göğüs, Triceps',
        alternative: { name: 'Push-up (Şınav)', muscleGroup: 'Göğüs, Triceps' }
      },
      {
        name: 'Seated Cable Row',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Sırt, Biceps',
        alternative: { name: 'Barbell Row', muscleGroup: 'Sırt, Biceps' }
      },
      {
        name: 'Dumbbell Lateral Raise',
        sets: 3,
        reps: '12-15',
        muscleGroup: 'Omuz (Yan Delt)',
        alternative: { name: 'Cable Lateral Raise', muscleGroup: 'Omuz (Yan Delt)' }
      },
      {
        name: 'Plank',
        sets: 3,
        reps: '45-60 sn',
        muscleGroup: 'Core / Karın',
        alternative: { name: 'Dead Bug', muscleGroup: 'Core / Karın' }
      }
    ]
  },
  2: {
    title: 'Arka Zincir ve İtme Odaklı',
    subtitle: '2. Gün',
    exercises: [
      {
        name: 'Romanian Deadlift (RDL)',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Hamstring, Glutes',
        alternative: { name: 'Hamstring Curl', muscleGroup: 'Hamstring' }
      },
      {
        name: 'Overhead Dumbbell Press',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Omuz, Triceps',
        alternative: { name: 'Arnold Press', muscleGroup: 'Omuz, Triceps' }
      },
      {
        name: 'Lat Pulldown',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Sırt (Lat)',
        alternative: { name: 'Pull-up (Barfiks)', muscleGroup: 'Sırt (Lat)' }
      },
      {
        name: 'Leg Extension',
        sets: 3,
        reps: '12-15',
        muscleGroup: 'Quadriceps',
        alternative: { name: 'Sissy Squat', muscleGroup: 'Quadriceps' }
      },
      {
        name: 'Bicep Curl & Triceps Pushdown (Süperset)',
        sets: 3,
        reps: '12-15',
        muscleGroup: 'Kol (Biceps + Triceps)',
        alternative: { name: 'Hammer Curl & Skullcrusher', muscleGroup: 'Kol (Biceps + Triceps)' }
      }
    ]
  },
  3: {
    title: 'Hacim ve Denge',
    subtitle: '3. Gün',
    exercises: [
      {
        name: 'Walking Lunge',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Quadriceps, Glutes',
        alternative: { name: 'Bulgarian Split Squat', muscleGroup: 'Quadriceps, Glutes' }
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Üst Göğüs, Triceps',
        alternative: { name: 'Incline Machine Press', muscleGroup: 'Üst Göğüs, Triceps' }
      },
      {
        name: 'Face Pull',
        sets: 3,
        reps: '12-15',
        muscleGroup: 'Arka Omuz, Trapez',
        alternative: { name: 'Reverse Pec Deck', muscleGroup: 'Arka Omuz' }
      },
      {
        name: 'Dumbbell Row',
        sets: 3,
        reps: '10-12',
        muscleGroup: 'Sırt, Biceps',
        alternative: { name: 'T-Bar Row', muscleGroup: 'Sırt, Biceps' }
      },
      {
        name: 'Cable Crunch',
        sets: 3,
        reps: '15-20',
        muscleGroup: 'Core / Karın',
        alternative: { name: 'Hanging Leg Raise', muscleGroup: 'Core / Karın' }
      }
    ]
  }
};

// ==========================================
// Egzersiz Resim Eşleştirmeleri
// ==========================================
const EXERCISE_IMAGE_MAPPING = [
  { keywords: ['göğüs', 'arka kol'], image: 'assets/images/chest_workout.png' },
  { keywords: ['sırt', 'ön kol'], image: 'assets/images/back_workout.png' },
  { keywords: ['omuz'], image: 'assets/images/shoulders_workout.png' },
  { keywords: ['karın', 'core'], image: 'assets/images/core_workout.png' },
  { keywords: ['bacak', 'kalça'], image: 'assets/images/legs_workout.png' }
];

const DEFAULT_EXERCISE_IMAGE = 'assets/images/chest_workout.png';
