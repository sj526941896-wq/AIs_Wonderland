document.addEventListener('DOMContentLoaded', () => {
  const logList = document.getElementById('logList');
  const logEntries = logList ? Array.from(logList.querySelectorAll('.log-entry')) : [];

  /* --- Expand / Collapse --- */
  if (logList) {
    logList.addEventListener('click', (e) => {
      const header = e.target.closest('.log-header');
      if (!header) return;
      const entry = header.closest('.log-entry');
      if (!entry) return;
      const expanded = entry.classList.toggle('expanded');
      const toggle = entry.querySelector('.log-toggle');
      if (toggle) toggle.textContent = expanded ? '收起' : '展开';
    });
  }

  /* --- Search --- */
  const searchInput = document.getElementById('logSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => filter());
  }

  /* --- Filter buttons --- */
  const filterBar = document.getElementById('logFilters');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-btn')) return;
      const group = e.target.closest('.filter-group');
      if (!group) return;
      group.querySelectorAll('.filter-btn').forEach((el) => el.classList.remove('active'));
      e.target.classList.add('active');
      filter();
    });
  }

  function filter() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const statusGroup = filterBar ? filterBar.querySelector('.filter-group:first-child') : null;
    const activeStatusBtn = statusGroup ? statusGroup.querySelector('.filter-btn.active') : null;
    const statusFilter = activeStatusBtn ? activeStatusBtn.dataset.value : '';

    const tagGroup = filterBar ? filterBar.querySelectorAll('.filter-group')[1] : null;
    const activeTagBtn = tagGroup ? tagGroup.querySelector('.filter-btn.active') : null;
    const tagFilter = activeTagBtn ? activeTagBtn.dataset.value : '';

    let visibleCount = 0;

    logEntries.forEach((entry) => {
      const title = (entry.dataset.title || '').toLowerCase();
      const tags = (entry.dataset.tags || '').toLowerCase();
      const status = entry.dataset.status || '';
      const text = entry.textContent.toLowerCase();

      const matchSearch =
        !q ||
        title.includes(q) ||
        tags.includes(q) ||
        text.includes(q);

      const matchStatus = !statusFilter || status === statusFilter;
      const matchTag = !tagFilter || tags.split(',').some((t) => t.trim() === tagFilter);

      if (matchSearch && matchStatus && matchTag) {
        entry.style.display = '';
        visibleCount++;
      } else {
        entry.style.display = 'none';
      }
    });

    const emptyEl = document.getElementById('logEmptySearch');
    if (emptyEl) {
      emptyEl.classList.toggle('visible', visibleCount === 0 && logEntries.length > 0);
    }
  }
});