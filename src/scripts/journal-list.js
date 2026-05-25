/** Journal index: search and tag filter on summary cards */
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('journalList');
  const cards = list ? Array.from(list.querySelectorAll('.journal-card')) : [];
  const searchInput = document.getElementById('searchInput');
  const filterTags = document.getElementById('filterTags');
  const emptySearch = document.getElementById('emptySearch');

  if (searchInput) {
    searchInput.addEventListener('input', () => filter(searchInput.value));
  }

  if (filterTags) {
    filterTags.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-tag');
      if (!btn) return;
      filterTags.querySelectorAll('.filter-tag').forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
      filter(searchInput ? searchInput.value : '');
    });
  }

  function filter(term) {
    const activeTag = filterTags ? filterTags.querySelector('.filter-tag.active') : null;
    const tag = activeTag ? activeTag.dataset.tag : '';
    const tagLower = tag.toLowerCase();
    const q = term ? term.toLowerCase() : '';
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const excerpt = (card.dataset.excerpt || '').toLowerCase();
      const text = `${title} ${tags} ${excerpt}`;

      const matchSearch = !q || text.includes(q);
      const matchTag = !tagLower || tags.split(',').some((t) => t.trim() === tagLower);

      if (matchSearch && matchTag) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptySearch) {
      emptySearch.classList.toggle('visible', visibleCount === 0 && cards.length > 0);
    }
  }
});
