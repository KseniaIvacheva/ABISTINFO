// ==================== ИНИЦИАЛИЗАЦИЯ ДАННЫХ ====================

function initData() {
    if (!localStorage.getItem('children')) {
        localStorage.setItem('children', JSON.stringify([
            { id: 'CH-001', anonymousId: 'ANON-001', fullName: 'Иванов Иван Иванович', birthDate: '2018-05-15', diagnosis: 'F84.0', notes: 'Поступил в сентябре 2023' },
            { id: 'CH-002', anonymousId: 'ANON-002', fullName: 'Петрова Анна Сергеевна', birthDate: '2019-03-22', diagnosis: 'F84.5', notes: 'Синдром Аспергера' },
            { id: 'CH-003', anonymousId: 'ANON-003', fullName: 'Сидоров Михаил Алексеевич', birthDate: '2017-11-08', diagnosis: 'F84.0', notes: 'Тяжелая форма РАС' }
        ]));
    }
    if (!localStorage.getItem('specialists')) {
        localStorage.setItem('specialists', JSON.stringify([
            { id: 1, name: 'Мария Иванова', role: 'aba_терапевт', email: 'maria@center.ru', phone: '+7-999-123-45-67' },
            { id: 2, name: 'Анна Смирнова', role: 'aba_терапевт', email: 'anna@center.ru', phone: '+7-999-123-45-68' },
            { id: 3, name: 'Елена Кузнецова', role: 'куратор_ава', email: 'elena@center.ru', phone: '+7-999-123-45-69' },
            { id: 4, name: 'Дмитрий Волков', role: 'нейропсихолог', email: 'dmitry@center.ru', phone: '+7-999-123-45-70' },
            { id: 5, name: 'Ольга Соколова', role: 'логопед', email: 'olga@center.ru', phone: '+7-999-123-45-71' },
            { id: 6, name: 'Татьяна Морозова', role: 'психолог', email: 'tatiana@center.ru', phone: '+7-999-123-45-72' },
            { id: 7, name: 'Ирина Новикова', role: 'дефектолог', email: 'irina@center.ru', phone: '+7-999-123-45-73' },
            { id: 8, name: 'Администратор', role: 'admin', email: 'admin@center.ru', phone: '+7-999-000-00-00' }
        ]));
    }
    if (!localStorage.getItem('schedule')) {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('schedule', JSON.stringify([
            { id: 1, childId: 'CH-001', specialistId: 1, date: today, time: '10:00', room: '101', goals: 'Развитие речи', status: 'scheduled', duration: 60 }
        ]));
    }
    if (!localStorage.getItem('sessions')) {
        localStorage.setItem('sessions', JSON.stringify([]));
    }
    if (!localStorage.getItem('programs')) {
        localStorage.setItem('programs', JSON.stringify([]));
    }
    if (!localStorage.getItem('medicalInfo')) {
        localStorage.setItem('medicalInfo', JSON.stringify({}));
    }
    if (!localStorage.getItem('supervisions')) {
        localStorage.setItem('supervisions', JSON.stringify([]));
    }
    if (!localStorage.getItem('intensives')) {
        localStorage.setItem('intensives', JSON.stringify([]));
    }
    if (!localStorage.getItem('files')) {
        localStorage.setItem('files', JSON.stringify([]));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([{ id: 1, senderId: 8, recipientId: null, message: 'Добро пожаловать в систему!', createdAt: new Date().toISOString(), read: false }]));
    }
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function getTodayDate() { return new Date().toISOString().split('T')[0]; }
function getCurrentUser() { const u = localStorage.getItem('currentUser'); return u ? JSON.parse(u) : null; }
function checkAuth() { if (!getCurrentUser()) { window.location.href = 'index.html'; return false; } return true; }
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'index.html'; }
function getChildById(id) { return JSON.parse(localStorage.getItem('children') || '[]').find(c => c.id === id); }
function getSpecialistById(id) { return JSON.parse(localStorage.getItem('specialists') || '[]').find(s => s.id === parseInt(id)); }
function getProgramByChildId(childId, type = 'АВА') { return JSON.parse(localStorage.getItem('programs') || '[]').find(p => p.childId === childId && p.programType === type); }
function getMethodsByChildId(childId) { return JSON.parse(localStorage.getItem('methodsTracking') || '[]').filter(m => m.childId === childId); }
function formatDate(d) { if (!d) return ''; return new Date(d).toLocaleDateString('ru-RU'); }

function addSession(s) { const sessions = JSON.parse(localStorage.getItem('sessions') || '[]'); s.id = Date.now(); sessions.push(s); localStorage.setItem('sessions', JSON.stringify(sessions)); return s; }
function addScheduleItem(i) { const s = JSON.parse(localStorage.getItem('schedule') || '[]'); i.id = Date.now(); s.push(i); localStorage.setItem('schedule', JSON.stringify(s)); return i; }
function updateScheduleItem(id, data) { const s = JSON.parse(localStorage.getItem('schedule') || '[]'); const idx = s.findIndex(x => x.id === id); if (idx !== -1) { s[idx] = { ...s[idx], ...data }; localStorage.setItem('schedule', JSON.stringify(s)); return s[idx]; } return null; }
function deleteScheduleItem(id) { let s = JSON.parse(localStorage.getItem('schedule') || '[]'); s = s.filter(x => x.id !== id); localStorage.setItem('schedule', JSON.stringify(s)); }
function addSupervision(s) { const sup = JSON.parse(localStorage.getItem('supervisions') || '[]'); s.id = Date.now(); sup.push(s); localStorage.setItem('supervisions', JSON.stringify(sup)); return s; }
function addIntensive(i) { const int = JSON.parse(localStorage.getItem('intensives') || '[]'); i.id = Date.now(); int.push(i); localStorage.setItem('intensives', JSON.stringify(int)); return i; }
function addMessage(m) { const msgs = JSON.parse(localStorage.getItem('messages') || '[]'); m.id = Date.now(); m.createdAt = new Date().toISOString(); m.read = false; msgs.push(m); localStorage.setItem('messages', JSON.stringify(msgs)); return m; }
function updateMedicalInfo(id, info) { const mi = JSON.parse(localStorage.getItem('medicalInfo') || '{}'); mi[id] = { ...mi[id], ...info }; localStorage.setItem('medicalInfo', JSON.stringify(mi)); }
function addMethodTracking(e) { const mt = JSON.parse(localStorage.getItem('methodsTracking') || '[]'); e.id = Date.now(); mt.push(e); localStorage.setItem('methodsTracking', JSON.stringify(mt)); }

// ==================== ЭКСПОРТ В EXCEL ====================

function exportToExcel(data, filename) {
    if (!data || data.length === 0) { alert('Нет данных'); return; }
    const headers = Object.keys(data[0]);
    const rows = [headers.join(',')];
    for (const row of data) {
        const vals = headers.map(h => { let v = row[h] || ''; if (typeof v === 'object') v = JSON.stringify(v); return `"${String(v).replace(/"/g, '""')}"`; });
        rows.push(vals.join(','));
    }
    const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
}

// ==================== ПЕЧАТЬ ====================

function printProgram(childId) {
    const child = getChildById(childId);
    const prog = getProgramByChildId(childId);
    if (!child) { alert('Ребенок не найден'); return; }
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Программа - ${child.fullName}</title><style>body{font-family:Arial;margin:40px}h1{color:#667eea}.program{margin:20px 0;padding:20px;background:#f9f9f9}</style></head><body><h1>📋 Коррекционная программа</h1><p><strong>ID:</strong> ${child.id}</p><p><strong>ФИО:</strong> ${child.fullName}</p><p><strong>Диагноз:</strong> ${child.diagnosis || 'Не указан'}</p><div class="program"><h2>Программа</h2><p>${prog ? prog.content : 'Программа не создана'}</p></div><div><h2>Чек-листы</h2><p>${prog ? prog.checklists : 'Нет данных'}</p></div><p style="margin-top:50px;text-align:center;">Дата печати: ${new Date().toLocaleString()}</p><button onclick="window.print()" style="position:fixed;bottom:20px;right:20px;padding:10px 20px;">🖨️ Печать</button></body></html>`);
    win.document.close();
}

// ==================== УВЕДОМЛЕНИЯ ====================

let socket = null;
function connectWebSocket() { console.log('WebSocket готов'); }
function sendWebSocketMessage(t, d) { console.log(t, d); }
function showToast(title, msg) {
    let c = document.getElementById('toast-container');
    if (!c) { c = document.createElement('div'); c.id = 'toast-container'; c.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;'; document.body.appendChild(c); }
    const t = document.createElement('div');
    t.style.cssText = 'background:#333;color:white;padding:12px 16px;margin-top:10px;border-radius:8px;cursor:pointer;';
    t.innerHTML = `<strong>${title}</strong><br>${msg}`;
    t.onclick = () => t.remove();
    c.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.remove(); }, 5000);
}
function requestNotificationPermission() { if ('Notification' in window) Notification.requestPermission(); }
function updateChatBadge() {
    const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
    const user = getCurrentUser();
    const unread = msgs.filter(m => !m.read && m.recipientId !== user?.id).length;
    const link = document.querySelector('a[href="chat.html"]');
    if (link) link.innerHTML = unread > 0 ? `💬 Чат <span style="background:red;color:white;border-radius:50%;padding:2px 6px;">${unread}</span>` : '💬 Чат';
}
function sendChatMessage(msg, recipientId = null) {
    const user = getCurrentUser();
    addMessage({ senderId: user.id, senderName: user.name, recipientId, message: msg, file: null });
    updateChatBadge();
}

// ==================== НАСТРОЙКИ СПЕЦИАЛИСТА ====================

function getSpecialistSettings(id) {
    const s = JSON.parse(localStorage.getItem('specialistSettings') || '{}');
    return s[id] || { workStartTime: '09:00', remindersEnabled: true, sessionReminderMinutes: 60, workdayReminderEnabled: true, sessionReminderEnabled: true };
}
function saveSpecialistSettings(id, settings) {
    const all = JSON.parse(localStorage.getItem('specialistSettings') || '{}');
    all[id] = { ...all[id], ...settings };
    localStorage.setItem('specialistSettings', JSON.stringify(all));
}
function checkWorkDayReminder() {
    const user = getCurrentUser();
    if (!user || !user.id) return;
    const s = getSpecialistSettings(user.id);
    if (!s.remindersEnabled || !s.workdayReminderEnabled) return;
    const now = new Date();
    const [wh, wm] = s.workStartTime.split(':').map(Number);
    const rh = wh, rm = wm - 30;
    let remind = false;
    if (rm >= 0) remind = (now.getHours() === rh && now.getMinutes() >= rm && now.getMinutes() <= rm + 5);
    else { const ph = rh - 1, pm = 60 + rm; remind = (now.getHours() === ph && now.getMinutes() >= pm && now.getMinutes() <= pm + 5); }
    const key = `workday_reminder_${user.id}_${getTodayDate()}`;
    if (remind && !localStorage.getItem(key)) {
        localStorage.setItem(key, 'sent');
        showToast('Начало рабочего дня', `⏰ Ваш рабочий день начинается в ${s.workStartTime}`);
    }
}
function checkSessionReminders() {
    const user = getCurrentUser();
    if (!user || !user.id) return;
    const s = getSpecialistSettings(user.id);
    if (!s.remindersEnabled || !s.sessionReminderEnabled) return;
    const schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
    const today = getTodayDate();
    const now = new Date();
    const todaySessions = schedule.filter(ses => ses.date === today && ses.status === 'scheduled' && ses.specialistId === user.id);
    todaySessions.forEach(ses => {
        const [h, m] = ses.time.split(':').map(Number);
        const sesTime = new Date(); sesTime.setHours(h, m, 0);
        const diff = (sesTime - now) / 60000;
        const remMin = s.sessionReminderMinutes || 60;
        if (diff <= remMin && diff > remMin - 5) {
            const key = `session_reminder_${user.id}_${ses.id}_${today}`;
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, 'sent');
                const child = getChildById(ses.childId);
                showToast('Напоминание о занятии', `🎯 Через ${remMin} мин занятие с ${child ? child.fullName : ses.childId} в ${ses.time} (каб.${ses.room})`);
            }
        }
    });
}

// ==================== СМЕНА ПАРОЛЯ ====================

function changePassword(role, oldPass, newPass) {
    const stored = localStorage.getItem(`password_${role}`);
    const defaults = { admin: 'admin123', aba_терапевт: 'aba123', куратор_ава: 'curator123', нейропсихолог: 'neuro123', логопед: 'logo123', психолог: 'aba123', дефектолог: 'aba123' };
    const current = stored || defaults[role];
    if (oldPass !== current) return { success: false, error: 'Неверный текущий пароль' };
    if (newPass.length < 4) return { success: false, error: 'Пароль должен быть не менее 4 символов' };
    localStorage.setItem(`password_${role}`, newPass);
    return { success: true };
}

function getRoleName(role) {
    const names = { admin: 'Администратор', aba_терапевт: 'АВА-терапевт', куратор_ава: 'Куратор АВА', нейропсихолог: 'Нейропсихолог', логопед: 'Логопед', психолог: 'Психолог', дефектолог: 'Дефектолог' };
    return names[role] || role;
}

// ==================== АНАЛИТИКА ====================

function getDirectorStats() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const specialists = JSON.parse(localStorage.getItem('specialists') || '[]');
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const intensives = JSON.parse(localStorage.getItem('intensives') || '[]');
    return {
        totalChildren: children.length,
        totalSpecialists: specialists.length,
        totalSessions: sessions.length,
        activeIntensives: intensives.filter(i => i.status === 'active').length,
        avgCompletion: sessions.length > 0 ? Math.round(sessions.reduce((s, a) => s + (a.completion || 0), 0) / sessions.length) : 0,
        sessionsByMonth: {},
        statsBySpecialist: {}
    };
}

// ==================== ЗАПУСК ====================

initData();
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (user && user.id) {
        connectWebSocket();
        requestNotificationPermission();
        setInterval(checkSessionReminders, 60000);
        setInterval(checkWorkDayReminder, 60000);
    }
});