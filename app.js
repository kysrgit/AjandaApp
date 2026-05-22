// ==========================================
// Ana Uygulama Mantığı
// ==========================================

// Aktif veri referansları (localStorage'dan yüklenir)
let WEEKLY_SCHEDULE = [];
let FITNESS_PROGRAMS = {};

// Orijinal unlock fonksiyonunu genişlet
const _originalUnlock = unlockApp;
unlockApp = function () {
  _originalUnlock();
  initApp();
};

function initApp() {
  // Veriyi yükle
  WEEKLY_SCHEDULE = getSchedule();
  FITNESS_PROGRAMS = getFitnessPrograms();

  renderWeeklyGrid();
  setupFitnessModal();
  setupSettingsModal();
  setupEditModal();
  setupChatPanel();
  updateAIButtonState();
}

document.addEventListener('DOMContentLoaded', () => {
  initLockScreen();
});

// ==========================================
// Haftalık Grid
// ==========================================
function renderWeeklyGrid() {
  const grid = document.getElementById('weekly-grid');
  grid.innerHTML = '';

  WEEKLY_SCHEDULE.forEach((dayData, index) => {
    const wt = WORKOUT_TYPES[dayData.workout] || WORKOUT_TYPES.rest;
    const isToday = isTodayIndex(index);

    const card = document.createElement('div');
    card.className = `day-card ${isToday ? 'today' : ''}`;
    card.style.setProperty('--accent', wt.color);
    card.style.setProperty('--accent-bg', wt.bg);
    card.style.setProperty('--accent-border', wt.border);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'day-edit-btn';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Düzenle';
    editBtn.setAttribute('aria-label', 'Gün Düzenle');
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditModal(index);
    });
    card.appendChild(editBtn);

    // Day header
    const header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = `
      <span class="day-name">${dayData.day}</span>
      ${isToday ? '<span class="today-badge">Bugün</span>' : ''}
    `;
    card.appendChild(header);

    // Class blocks
    if (dayData.classes && dayData.classes.length > 0) {
      const classSection = document.createElement('div');
      classSection.className = 'class-section';
      dayData.classes.forEach(cls => {
        const block = document.createElement('div');
        block.className = 'class-block';
        const noteHtml = cls.note ? `<span class="class-note" title="${cls.note}">⚠️</span>` : '';
        const locHtml = cls.location ? `<span class="class-loc">${cls.location}</span>` : '';
        block.innerHTML = `
          <span class="class-icon">📚</span>
          <div class="class-info">
            <span class="class-name" title="${cls.name}">${cls.name}</span>
            <span class="class-time">${cls.time} ${noteHtml}</span>
            ${locHtml}
          </div>
        `;
        classSection.appendChild(block);
      });
      card.appendChild(classSection);
    } else if (dayData.workout !== 'rest') {
      const freeLabel = document.createElement('div');
      freeLabel.className = 'free-day-label';
      freeLabel.textContent = 'Ders yok';
      card.appendChild(freeLabel);
    }

    // Workout badge
    const workoutBadge = document.createElement('div');
    workoutBadge.className = `workout-badge ${dayData.workout}`;
    const clickable = dayData.workout === 'fitness';

    workoutBadge.innerHTML = `
      <span class="workout-icon">${wt.icon}</span>
      <div class="workout-info">
        <span class="workout-label">${wt.label}</span>
        ${dayData.workoutTime ? `<span class="workout-time">${dayData.workoutTime}</span>` : ''}
        ${dayData.fitnessDay ? `<span class="workout-day-num">${dayData.fitnessDay}. Gün Programı</span>` : ''}
      </div>
      ${clickable ? '<span class="workout-arrow">→</span>' : ''}
    `;

    if (clickable) {
      workoutBadge.classList.add('clickable');
      workoutBadge.addEventListener('click', () => openFitnessModal(dayData.fitnessDay));
    }

    card.appendChild(workoutBadge);
    grid.appendChild(card);
  });
}

function isTodayIndex(index) {
  const jsDay = new Date().getDay();
  const mondayFirst = jsDay === 0 ? 6 : jsDay - 1;
  return mondayFirst === index;
}

function refreshApp() {
  WEEKLY_SCHEDULE = getSchedule();
  FITNESS_PROGRAMS = getFitnessPrograms();
  renderWeeklyGrid();
}

// ==========================================
// Fitness Modal
// ==========================================
function setupFitnessModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeFitnessModal(); });
  closeBtn.addEventListener('click', closeFitnessModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });
}

function openFitnessModal(dayNum) {
  const program = FITNESS_PROGRAMS[dayNum];
  if (!program) return;
  document.getElementById('modal-title').textContent = program.title;
  document.getElementById('modal-subtitle').textContent = `${program.subtitle} — Fitness Programı`;
  const container = document.getElementById('exercises-container');
  container.innerHTML = '';
  program.exercises.forEach((ex, i) => container.appendChild(createExerciseCard(ex, i)));
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFitnessModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function getExerciseImage(group) {
  const g = group.toLowerCase();
  if (g.includes('göğüs') || g.includes('arka kol')) return 'assets/images/chest_workout.png';
  if (g.includes('sırt') || g.includes('ön kol')) return 'assets/images/back_workout.png';
  if (g.includes('omuz')) return 'assets/images/shoulders_workout.png';
  if (g.includes('karın') || g.includes('core')) return 'assets/images/core_workout.png';
  if (g.includes('bacak') || g.includes('kalça')) return 'assets/images/legs_workout.png';
  return 'assets/images/chest_workout.png'; // default
}

function createExerciseCard(exercise, index) {
  const card = document.createElement('div');
  const mainImg = getExerciseImage(exercise.muscleGroup);
  const altImg = getExerciseImage(exercise.alternative.muscleGroup);

  card.className = 'exercise-card';
  card.style.animationDelay = `${index * 0.07}s`;
  card.innerHTML = `
    <div class="exercise-main">
      <div class="exercise-image-wrapper">
        <img src="${mainImg}" alt="${exercise.name}" class="exercise-img" />
      </div>
      <div class="exercise-details">
        <h3 class="exercise-name">${exercise.name}</h3>
        <div class="exercise-meta">
          <span class="meta-chip sets-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            ${exercise.sets} Set × ${exercise.reps}
          </span>
          <span class="meta-chip muscle-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            ${exercise.muscleGroup}
          </span>
        </div>
      </div>
    </div>
    <button class="alt-toggle" onclick="toggleAlternative(this)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>
      Alternatif Egzersiz
    </button>
    <div class="alternative-section">
      <div class="alt-inner">
        <div class="alt-image-wrapper">
           <img src="${altImg}" alt="${exercise.alternative.name}" class="exercise-img small" />
        </div>
        <div class="alt-details">
          <h4 class="alt-name">${exercise.alternative.name}</h4>
          <span class="meta-chip muscle-chip small">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            ${exercise.alternative.muscleGroup}
          </span>
        </div>
      </div>
    </div>
  `;
  return card;
}

function toggleAlternative(btn) {
  const card = btn.closest('.exercise-card');
  const section = card.querySelector('.alternative-section');
  const isOpen = section.classList.contains('open');
  document.querySelectorAll('.alternative-section.open').forEach(s => {
    s.classList.remove('open');
    s.closest('.exercise-card').querySelector('.alt-toggle').classList.remove('active');
  });
  if (!isOpen) {
    section.classList.add('open');
    btn.classList.add('active');
  }
}

// ==========================================
// Ayarlar Modalı (API Key)
// ==========================================
function setupSettingsModal() {
  const overlay = document.getElementById('settings-overlay');
  const closeBtn = document.getElementById('settings-close');
  const saveBtn = document.getElementById('settings-save');
  const resetBtn = document.getElementById('settings-reset');
  const openBtn = document.getElementById('settings-btn');

  openBtn.addEventListener('click', openSettingsModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSettingsModal(); });
  closeBtn.addEventListener('click', closeSettingsModal);

  saveBtn.addEventListener('click', () => {
    const key = document.getElementById('api-key-input').value.trim();
    saveApiKey(key);
    updateAIButtonState();
    closeSettingsModal();
    showToast(key ? 'API anahtarı kaydedildi ✓' : 'API anahtarı silindi');
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Tüm veriler sıfırlansın mı? Bu işlem ders programı ve antrenman verilerinizi varsayılana döndürür.')) {
      resetAllData();
      refreshApp();
      closeSettingsModal();
      showToast('Veriler varsayılana sıfırlandı ✓');
    }
  });

  // Şifre değiştirme
  document.getElementById('change-pass-btn').addEventListener('click', async () => {
    const oldPass = document.getElementById('change-old-pass').value;
    const newPass = document.getElementById('change-new-pass').value;
    if (!oldPass || !newPass) {
      showToast('Her iki alanı da doldurun');
      return;
    }
    if (newPass.length < 4) {
      showToast('Yeni şifre en az 4 karakter olmalı');
      return;
    }
    const success = await changePassword(oldPass, newPass);
    if (success) {
      document.getElementById('change-old-pass').value = '';
      document.getElementById('change-new-pass').value = '';
      showToast('Şifre değiştirildi ✓');
    } else {
      showToast('Mevcut şifre yanlış!');
    }
  });
}

function openSettingsModal() {
  document.getElementById('api-key-input').value = getApiKey();
  document.getElementById('settings-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSettingsModal() {
  document.getElementById('settings-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// Manuel Düzenleme Modalı
// ==========================================
let editingDayIndex = null;

function setupEditModal() {
  const overlay = document.getElementById('edit-overlay');
  const closeBtn = document.getElementById('edit-close');
  const saveBtn = document.getElementById('edit-save');
  const addClassBtn = document.getElementById('add-class-btn');

  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeEditModal(); });
  closeBtn.addEventListener('click', closeEditModal);

  saveBtn.addEventListener('click', saveEditChanges);
  addClassBtn.addEventListener('click', addClassRow);
}

function openEditModal(dayIndex) {
  editingDayIndex = dayIndex;
  const day = WEEKLY_SCHEDULE[dayIndex];

  document.getElementById('edit-day-title').textContent = `${day.day} — Düzenle`;

  // Workout type
  document.getElementById('edit-workout-type').value = day.workout;

  // Workout time
  document.getElementById('edit-workout-time').value = day.workoutTime || '';

  // Fitness day (only for fitness workouts)
  const fitnessDayGroup = document.getElementById('fitness-day-group');
  const fitnessDayInput = document.getElementById('edit-fitness-day');
  if (day.workout === 'fitness') {
    fitnessDayGroup.style.display = 'block';
    fitnessDayInput.value = day.fitnessDay || 1;
  } else {
    fitnessDayGroup.style.display = 'none';
  }

  // Toggle fitness day visibility on workout type change
  document.getElementById('edit-workout-type').onchange = function () {
    fitnessDayGroup.style.display = this.value === 'fitness' ? 'block' : 'none';
  };

  // Classes
  const container = document.getElementById('edit-classes-list');
  container.innerHTML = '';
  if (day.classes) {
    day.classes.forEach(cls => addClassRow(null, cls.name, cls.time));
  }

  document.getElementById('edit-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  document.getElementById('edit-overlay').classList.remove('active');
  document.body.style.overflow = '';
  editingDayIndex = null;
}

function addClassRow(e, name = '', time = '') {
  const container = document.getElementById('edit-classes-list');
  const row = document.createElement('div');
  row.className = 'edit-class-row';
  row.innerHTML = `
    <input type="text" class="edit-input class-name-input" placeholder="Ders adı" value="${name}" />
    <input type="text" class="edit-input class-time-input" placeholder="09:00 - 11:00" value="${time}" />
    <button class="remove-class-btn" title="Sil" aria-label="Dersi Sil">✕</button>
  `;
  row.querySelector('.remove-class-btn').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

function saveEditChanges() {
  if (editingDayIndex === null) return;
  const day = WEEKLY_SCHEDULE[editingDayIndex];

  day.workout = document.getElementById('edit-workout-type').value;
  day.workoutTime = document.getElementById('edit-workout-time').value.trim() || null;

  if (day.workout === 'fitness') {
    day.fitnessDay = parseInt(document.getElementById('edit-fitness-day').value) || 1;
  } else {
    day.fitnessDay = null;
  }

  // Collect classes
  const rows = document.querySelectorAll('#edit-classes-list .edit-class-row');
  day.classes = [];
  rows.forEach(row => {
    const name = row.querySelector('.class-name-input').value.trim();
    const time = row.querySelector('.class-time-input').value.trim();
    if (name) {
      day.classes.push({ name, time });
    }
  });

  saveSchedule(WEEKLY_SCHEDULE);
  renderWeeklyGrid();
  closeEditModal();
  showToast(`${day.day} güncellendi ✓`);
}

// ==========================================
// AI Chat Paneli
// ==========================================
let chatMessages = [];

function setupChatPanel() {
  const fab = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');

  fab.addEventListener('click', () => {
    panel.classList.toggle('active');
    fab.classList.toggle('active');
    if (panel.classList.contains('active')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
    fab.classList.remove('active');
  });

  sendBtn.addEventListener('click', handleChatSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  });
}

function updateAIButtonState() {
  const fab = document.getElementById('chat-fab');
  const hasKey = !!getApiKey();
  fab.classList.toggle('disabled', !hasKey);
  fab.title = hasKey ? 'AI Asistan' : 'Önce Ayarlardan API Key girin';
}

async function handleChatSend() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  if (!getApiKey()) {
    addChatBubble('Lütfen önce ⚙️ Ayarlar\'dan Gemini API anahtarınızı girin.', 'ai');
    return;
  }

  input.value = '';
  addChatBubble(message, 'user');

  // Show typing indicator
  const typingId = addChatBubble('Düşünüyorum...', 'ai typing');

  try {
    const result = await sendToGemini(message, WEEKLY_SCHEDULE, FITNESS_PROGRAMS);

    // Remove typing indicator
    removeChatBubble(typingId);

    // Apply schedule changes
    if (result.schedule) {
      WEEKLY_SCHEDULE = result.schedule;
      saveSchedule(WEEKLY_SCHEDULE);
    }

    // Apply fitness program changes
    if (result.fitnessPrograms) {
      FITNESS_PROGRAMS = result.fitnessPrograms;
      saveFitnessPrograms(FITNESS_PROGRAMS);
    }

    // Re-render if any changes
    if (result.schedule || result.fitnessPrograms) {
      renderWeeklyGrid();
    }

    addChatBubble(result.message, 'ai');

  } catch (error) {
    removeChatBubble(typingId);
    addChatBubble(`⚠️ ${error.message}`, 'ai error');
  }
}

let bubbleCounter = 0;

function addChatBubble(text, type) {
  const container = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  const id = `bubble-${++bubbleCounter}`;
  bubble.id = id;
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeChatBubble(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ==========================================
// Toast Bildirimi
// ==========================================
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==========================================
// Tüm modalları kapat
// ==========================================
function closeAllModals() {
  closeFitnessModal();
  closeSettingsModal();
  closeEditModal();
}
