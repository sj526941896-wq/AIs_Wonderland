import { loadEntries, escapeHtml, formatDate } from './storage.js';

function renderEntries(searchTerm = '') {
  const entries = loadEntries();
  const timeline = document.getElementById('timeline');
  const filterTagsContainer = document.getElementById('filterTags');

  let filtered = entries;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.content.toLowerCase().includes(term) ||
        (e.achievement || '').toLowerCase().includes(term) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(term))
    );
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    timeline.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>还没有学习记录</p>
        <p>期待与你分享第一篇内容</p>
      </div>
    `;
    filterTagsContainer.innerHTML = '';
    return;
  }

  timeline.innerHTML = filtered
    .map(
      (entry) => `
    <article class="entry">
      <div class="entry-date">${formatDate(entry.date)}</div>
      <h2 class="entry-title">${escapeHtml(entry.title)}</h2>
      ${
        entry.content
          ? `<p class="entry-content">${escapeHtml(entry.content)}</p>`
          : ''
      }
      ${
        entry.tags.length
          ? `<div class="entry-tags">${entry.tags
              .map((t) => `<span class="entry-tag">${escapeHtml(t)}</span>`)
              .join('')}</div>`
          : ''
      }
      ${
        entry.achievement
          ? `
        <div class="entry-achievement">
          <div class="entry-achievement-label">✨ 成果与收获</div>
          <div class="entry-achievement-content">${escapeHtml(entry.achievement)}</div>
        </div>
      `
          : ''
      }
    </article>
  `
    )
    .join('');

  const allTags = [...new Set(entries.flatMap((e) => e.tags))];
  filterTagsContainer.innerHTML = `
    <button class="filter-tag active" data-tag="">全部</button>
    ${allTags
      .map(
        (tag) =>
          `<button class="filter-tag" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
      )
      .join('')}
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderEntries();

  document.getElementById('searchInput').addEventListener('input', (e) => {
    renderEntries(e.target.value);
  });

  document.getElementById('filterTags').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tag')) {
      document.querySelectorAll('.filter-tag').forEach((el) => el.classList.remove('active'));
      e.target.classList.add('active');
      renderEntries(document.getElementById('searchInput').value);
    }
  });
});
