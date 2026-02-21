// ==========================================
// Güvenlik Katmanı — PIN Kilidi
// ==========================================

const LOCK_STORAGE_KEY = 'ajanda_lock_hash';

// SHA-256 hash fonksiyonu
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_ajanda_salt_2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Kayıtlı şifre var mı?
function hasStoredPassword() {
    return !!localStorage.getItem(LOCK_STORAGE_KEY);
}

// Şifre doğrulama
async function verifyPassword(password) {
    const stored = localStorage.getItem(LOCK_STORAGE_KEY);
    if (!stored) return false;
    const hash = await hashPassword(password);
    return hash === stored;
}

// Yeni şifre kaydet
async function setPassword(password) {
    const hash = await hashPassword(password);
    localStorage.setItem(LOCK_STORAGE_KEY, hash);
}

// Şifre değiştir
async function changePassword(oldPass, newPass) {
    const valid = await verifyPassword(oldPass);
    if (!valid) return false;
    await setPassword(newPass);
    return true;
}

// Kilidi kaldır (session)
let isUnlocked = false;

function unlockApp() {
    isUnlocked = true;
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('app-main').classList.remove('hidden');
}

function showLockError(msg) {
    const el = document.getElementById('lock-error');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

// İlk kurulum mu yoksa giriş mi?
function initLockScreen() {
    const lockScreen = document.getElementById('lock-screen');
    const appMain = document.getElementById('app-main');

    if (!hasStoredPassword()) {
        // İlk kez — şifre oluşturma modu
        document.getElementById('lock-title').textContent = '🔐 Şifre Oluştur';
        document.getElementById('lock-subtitle').textContent = 'Ajandanı korumak için bir şifre belirle';
        document.getElementById('lock-confirm-group').classList.remove('hidden');
        document.getElementById('lock-btn').textContent = 'Şifreyi Kaydet & Giriş Yap';
        document.getElementById('lock-btn').onclick = handleSetPassword;
    } else {
        // Giriş modu
        document.getElementById('lock-title').textContent = '🔒 Giriş Yap';
        document.getElementById('lock-subtitle').textContent = 'Ajandana erişmek için şifreni gir';
        document.getElementById('lock-confirm-group').classList.add('hidden');
        document.getElementById('lock-btn').textContent = 'Giriş Yap';
        document.getElementById('lock-btn').onclick = handleLogin;
    }

    lockScreen.classList.remove('hidden');
    appMain.classList.add('hidden');

    // Enter tuşu ile giriş
    document.getElementById('lock-password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('lock-btn').click();
    });

    document.getElementById('lock-confirm').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('lock-btn').click();
    });
}

async function handleSetPassword() {
    const pass = document.getElementById('lock-password').value;
    const confirm = document.getElementById('lock-confirm').value;

    if (pass.length < 4) {
        showLockError('Şifre en az 4 karakter olmalı');
        return;
    }

    if (pass !== confirm) {
        showLockError('Şifreler eşleşmiyor');
        return;
    }

    await setPassword(pass);
    unlockApp();
}

async function handleLogin() {
    const pass = document.getElementById('lock-password').value;

    if (!pass) {
        showLockError('Şifre boş olamaz');
        return;
    }

    const valid = await verifyPassword(pass);
    if (valid) {
        unlockApp();
    } else {
        showLockError('Yanlış şifre!');
        document.getElementById('lock-password').value = '';
        document.getElementById('lock-password').focus();
    }
}
