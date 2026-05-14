import { loadEntries, saveEntries, generateId, escapeHtml, formatDate, loadProfile, saveProfile } from './storage.js';

const ADMIN_PASSWORD = 'aitennis2026';
let currentTags = [];

function renderEntries() {
  const list = document.getElementById('entryList');
  const entries = loadEntries();

  if (entries.length === 0) {
    list.innerHTML = '<div class="empty-state">还没有记录，添加你的第一条学习记录吧！</div>';
    return;
  }

  entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  list.innerHTML = entries
    .map(
      (entry) => `
    <div class="entry-item">
      <div class="entry-info">
        <div class="entry-info-date">${formatDate(entry.date)}</div>
        <div class="entry-info-title">${escapeHtml(entry.title)}</div>
        ${
          entry.tags.length
            ? `<div class="entry-info-tags">${entry.tags
                .map((t) => `<span class="entry-info-tag">${escapeHtml(t)}</span>`)
                .join('')}</div>`
            : ''
        }
      </div>
      <div class="entry-actions">
        <button class="btn btn-sm btn-danger" data-entry-id="${entry.id}">删除</button>
      </div>
    </div>
  `
    )
    .join('');
}

function addTag(tag) {
  tag = tag.trim();
  if (tag && !currentTags.includes(tag)) {
    currentTags.push(tag);
    renderTagsInput();
  }
}

function removeTag(tag) {
  currentTags = currentTags.filter((t) => t !== tag);
  renderTagsInput();
}

function renderTagsInput() {
  const container = document.getElementById('tagsContainer');
  container.innerHTML =
    currentTags
      .map(
        (tag) => `
    <span class="tag">
      ${escapeHtml(tag)}
      <span class="tag-remove" data-tag="${escapeHtml(tag)}">&times;</span>
    </span>
  `
      )
      .join('') + '<input type="text" id="tagInput" placeholder="添加标签...">';
  document.getElementById('tagInput').focus();
}

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById('passwordOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
  } else {
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordInput').value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderEntries();

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').value = today;

  /* --- Profile form --- */
  const profile = loadProfile();
  document.getElementById('profileNameInput').value = profile.name;
  document.getElementById('profileBioInput').value = profile.bio;

  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveProfile({
      name: document.getElementById('profileNameInput').value,
      bio: document.getElementById('profileBioInput').value,
    });
    alert('简介已保存');
  });

  /* --- Form submit --- */
  document.getElementById('entryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const entry = {
      id: generateId(),
      date: document.getElementById('date').value,
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      tags: [...currentTags],
      achievement: document.getElementById('achievement').value,
    };

    const entries = loadEntries();
    entries.push(entry);
    saveEntries(entries);

    e.target.reset();
    currentTags = [];
    renderTagsInput();
    renderEntries();
    document.getElementById('date').value = today;
  });

  /* --- Tag input --- */
  document.getElementById('tagsContainer').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(e.target.value);
      e.target.value = '';
    }
  });

  /* --- Tag remove (delegated) --- */
  document.getElementById('tagsContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('tag-remove')) {
      removeTag(e.target.dataset.tag);
    }
  });

  /* --- Entry delete (delegated) --- */
  document.getElementById('entryList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-entry-id]');
    if (btn && confirm('确定要删除这条记录吗？')) {
      const entries = loadEntries();
      saveEntries(entries.filter((entry) => entry.id !== btn.dataset.entryId));
      renderEntries();
    }
  });

  /* --- Password gate --- */
  document.getElementById('passwordBtn').addEventListener('click', checkPassword);
  document.getElementById('passwordInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
});
