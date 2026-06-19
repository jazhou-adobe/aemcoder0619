export default async function decorate(block) {
  const rows = [...block.children];
  const slides = [];

  // Extract slide data from rows (each row = one slide with image cell + text cell)
  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const textCell = cells[1];
    const img = imgCell ? imgCell.querySelector('img') : null;
    const text = textCell ? textCell.textContent.trim() : '';
    if (img) {
      slides.push({ img, text });
    }
  });

  // Clear block and rebuild
  block.textContent = '';

  // Create slides track
  const track = document.createElement('div');
  track.className = 'slides-track';

  slides.forEach((slide, i) => {
    const slideEl = document.createElement('div');
    slideEl.className = `slide${i === 0 ? ' active' : ''}`;

    // Image
    const picture = document.createElement('picture');
    const img = slide.img.cloneNode(true);
    picture.appendChild(img);
    slideEl.appendChild(picture);

    // Caption overlay
    if (slide.text) {
      const caption = document.createElement('div');
      caption.className = 'slide-caption';
      caption.textContent = slide.text;
      slideEl.appendChild(caption);
    }

    track.appendChild(slideEl);
  });

  block.appendChild(track);

  // Create dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'slider-dots';

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) dot.className = 'active';
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  block.appendChild(dotsContainer);

  // Slider logic
  let currentSlide = 0;
  let autoplayTimer;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    // Update active slide
    track.querySelectorAll('.slide').forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });

    // Update dots
    dotsContainer.querySelectorAll('button').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    resetAutoplay();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  // Start autoplay
  resetAutoplay();
}
