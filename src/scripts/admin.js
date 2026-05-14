const ADMIN_PASSWORD = 'aitennis2026';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').value = today;

  /* --- Markdown generator --- */
  document.getElementById('mdForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const title = document.getElementById('title').value;
    const tagsRaw = document.getElementById('tags').value;
    const achievement = document.getElementById('achievement').value;
    const content = document.getElementById('content').value;

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = date + '-' + title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '');
    const filename = slug + '.md';

    let md = '---\n';
    md += `title: ${title}\n`;
    md += `date: ${date}\n`;
    if (tags.length > 0) {
      md += 'tags:\n';
      tags.forEach((t) => { md += `  - ${t}\n`; });
    }
    if (achievement) {
      md += `achievement: ${achievement}\n`;
    }
    md += '---\n\n';
    md += content;

    document.getElementById('mdOutput').textContent = md;
    document.getElementById('outputSection').style.display = 'block';
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
  });

  /* --- Copy to clipboard --- */
  document.getElementById('copyBtn').addEventListener('click', async () => {
    const text = document.getElementById('mdOutput').textContent;
    try {
      await navigator.clipboard.writeText(text);
      showToast('已复制到剪贴板');
    } catch {
      /* fallback */
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('已复制到剪贴板');
    }
  });

  function showToast(msg) {
    let toast = document.querySelector('.copied-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'copied-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  /* --- Password gate --- */
  document.getElementById('passwordBtn').addEventListener('click', checkPassword);
  document.getElementById('passwordInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
});
