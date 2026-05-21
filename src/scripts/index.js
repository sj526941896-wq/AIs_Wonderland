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

      // Increment view count on expand
      if (expanded) {
        const id = entry.dataset.id;
        const viewsEl = entry.querySelector('.entry-views');
        if (id && viewsEl) {
          const views = parseInt(localStorage.getItem(`views_${id}`) || '0', 10);
          if (views === 0) {
            localStorage.setItem(`views_${id}`, String(views + 1));
            const currentViews = parseInt(viewsEl.textContent.replace(/[^0-9]/g, ''), 10) || 0;
            viewsEl.textContent = `👁 ${currentViews + 1}`;
          }
        }
      }
    });
  }

  /* --- Like button --- */
  document.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.entry-like');
    if (!likeBtn) return;

    const entry = likeBtn.closest('.entry');
    if (!entry) return;
    const id = entry.dataset.id;
    if (!id) return;

    const likedKey = `liked_${id}`;
    if (localStorage.getItem(likedKey)) return; // Already liked

    localStorage.setItem(likedKey, 'true');
    const likes = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10) + 1;
    localStorage.setItem(`likes_${id}`, String(likes));
    likeBtn.textContent = `❤️ ${likes}`;
    likeBtn.classList.add('liked');
  });

  /* --- Load saved likes --- */
  entries.forEach((entry) => {
    const id = entry.dataset.id;
    const likeBtn = entry.querySelector('.entry-like');
    if (id && likeBtn) {
      const liked = localStorage.getItem(`liked_${id}`);
      const savedLikes = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10);
      const baseLikes = parseInt(likeBtn.textContent.replace(/[^0-9]/g, ''), 10) || 0;
      if (liked && savedLikes > 0) {
        likeBtn.textContent = `❤️ ${savedLikes}`;
        likeBtn.classList.add('liked');
      } else if (savedLikes > 0) {
        likeBtn.textContent = `❤️ ${savedLikes}`;
      }
    }
  });

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
    const tagLower = tag.toLowerCase();
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

      const matchTag = !tagLower || tags.split(',').some((t) => t.trim() === tagLower);

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