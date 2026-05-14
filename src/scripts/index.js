document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('timeline');
  const entries = timeline ? Array.from(timeline.querySelectorAll('.entry')) : [];

  /* --- Expand / Collapse --- */
  if (timeline) {
    timeline.addEventListener('click', (e) => {
      const header = e.target.closest('.entry-header');
      if (!header) return;
      const entry = header.closest('.entry');
      if (!entry) return;
      const expanded = entry.classList.toggle('expanded');
      const toggle = entry.querySelector('.entry-toggle');
      if (toggle) toggle.textContent = expanded ? '收起' : '展开';
    });
  }

  /* --- Search --- */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => filter(searchInput.value));
  }

  /* --- Tag filter --- */
  const filterTags = document.getElementById('filterTags');
  if (filterTags) {
    filterTags.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-tag')) return;
      filterTags.querySelectorAll('.filter-tag').forEach((el) => el.classList.remove('active'));
      e.target.classList.add('active');
      filter(searchInput ? searchInput.value : '');
    });
  }

  function filter(term) {
    const activeTag = filterTags ? filterTags.querySelector('.filter-tag.active') : null;
    const tag = activeTag ? activeTag.dataset.tag : '';
    const q = term ? term.toLowerCase() : '';
    let visibleCount = 0;

    entries.forEach((entry) => {
      const title = (entry.dataset.title || '').toLowerCase();
      const tags = (entry.dataset.tags || '').toLowerCase();
      const text = entry.textContent.toLowerCase();

      const matchSearch =
        !q ||
        title.includes(q) ||
        tags.includes(q) ||
        text.includes(q);

      const matchTag = !tag || tags.split(',').some((t) => t.trim() === tag);

      if (matchSearch && matchTag) {
        entry.style.display = '';
        visibleCount++;
      } else {
        entry.style.display = 'none';
      }
    });

    let empty = document.querySelector('.empty-search');
    if (!empty) {
      empty = document.createElement('div');
      empty.className = 'empty-search';
      empty.innerHTML = '<div class="empty-icon">🔍</div><p>没有匹配的记录</p>';
      if (timeline) timeline.after(empty);
    }
    empty.classList.toggle('visible', visibleCount === 0 && entries.length > 0);
  }
});
