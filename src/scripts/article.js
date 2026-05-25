/** Article detail page: views on load, likes */
document.addEventListener('DOMContentLoaded', () => {
  const article = document.querySelector('.article-detail');
  if (!article) return;

  const id = article.dataset.id;
  if (!id) return;

  const viewsEl = article.querySelector('.entry-views');
  const likeBtn = article.querySelector('.entry-like');

  if (viewsEl) {
    const key = `views_${id}`;
    const seen = localStorage.getItem(key);
    const base = parseInt(viewsEl.textContent.replace(/[^0-9]/g, ''), 10) || 0;
    if (!seen) {
      localStorage.setItem(key, '1');
      viewsEl.textContent = `👁 ${base + 1}`;
    } else {
      const saved = parseInt(localStorage.getItem(key) || '0', 10);
      if (saved > 0) viewsEl.textContent = `👁 ${Math.max(base, saved)}`;
    }
  }

  if (likeBtn) {
    const liked = localStorage.getItem(`liked_${id}`);
    const savedLikes = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10);
    const baseLikes = parseInt(likeBtn.textContent.replace(/[^0-9]/g, ''), 10) || 0;
    if (liked && savedLikes > 0) {
      likeBtn.textContent = `❤️ ${savedLikes}`;
      likeBtn.classList.add('liked');
    } else if (savedLikes > 0) {
      likeBtn.textContent = `❤️ ${savedLikes}`;
    }

    likeBtn.addEventListener('click', () => {
      if (localStorage.getItem(`liked_${id}`)) return;
      localStorage.setItem(`liked_${id}`, 'true');
      const likes = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10) + 1;
      localStorage.setItem(`likes_${id}`, String(likes));
      likeBtn.textContent = `❤️ ${likes}`;
      likeBtn.classList.add('liked');
    });
  }
});
