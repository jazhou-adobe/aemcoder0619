const IMAGE_MAP = {
  '2025apcs': '/images/2025apcs-group.jpg',
  'previous-summits': '/images/2023apcs-brisbane-pavilion.jpg',
};

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  block.textContent = '';

  links.forEach((origLink) => {
    const href = origLink.getAttribute('href') || origLink.href;
    const text = origLink.textContent.trim();

    const tile = document.createElement('a');
    tile.href = href;
    tile.className = 'summit-tile';

    const imgKey = Object.keys(IMAGE_MAP).find((k) => href.includes(k));
    if (imgKey) {
      const img = document.createElement('img');
      img.src = IMAGE_MAP[imgKey];
      img.alt = text;
      img.loading = 'lazy';
      tile.appendChild(img);
    }

    const label = document.createElement('span');
    label.className = 'summit-tile-label';
    label.textContent = text;
    tile.appendChild(label);

    block.appendChild(tile);
  });
}
