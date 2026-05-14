export const STORAGE_KEY = 'ai_learning_journey';
export const PROFILE_KEY = 'ai_learning_profile';

export function loadProfile() {
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored
    ? JSON.parse(stored)
    : { name: '我的 AI 学习之旅', bio: '记录成长的每一步，从基础到实践，持续探索人工智能的奥秘' };
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadEntries() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
