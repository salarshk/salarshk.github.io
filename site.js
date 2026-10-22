const publications = [...document.querySelectorAll('.publication')];
const archivePublications = [...document.querySelectorAll('#publication-archive .publication')];
const filters = [...document.querySelectorAll('.filter-button')];
const count = document.querySelector('#publication-count');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    archivePublications.forEach((publication) => {
      const matches = filter === 'all' || publication.dataset.topics.split(' ').includes(filter);
      publication.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
  });
});

publications.forEach((publication) => {
  const actions = publication.querySelector('.publication-actions');
  const title = publication.querySelector('h3').textContent.trim();
  const authors = publication.querySelector('.authors').textContent.replace(/\s+/g, ' ').trim();
  const venue = publication.querySelector('.venue').textContent.replace(/\s+/g, ' ').trim();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-citation';
  button.textContent = 'Copy citation';
  button.setAttribute('aria-label', `Copy citation for ${title}`);
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(`${authors}. “${title}.” ${venue}.`);
      button.textContent = 'Copied ✓';
      window.setTimeout(() => { button.textContent = 'Copy citation'; }, 1800);
    } catch {
      button.textContent = 'Copy unavailable';
    }
  });
  actions.insertBefore(button, actions.querySelector('details'));
});
