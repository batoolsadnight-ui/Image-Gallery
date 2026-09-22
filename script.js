const photos = [
  { id: 1015, category: 'nature',   tag: 'Nature',   title: 'River Through the Valley' },
  { id: 1016, category: 'urban',    tag: 'Urban',    title: 'Concrete & Shadow' },
  { id: 1018, category: 'nature',   tag: 'Nature',   title: 'Pines at Dusk' },
  { id: 1025, category: 'portrait', tag: 'Portrait', title: 'A Quiet Companion' },
  { id: 1031, category: 'abstract', tag: 'Abstract', title: 'Grain & Texture' },
  { id: 1035, category: 'nature',   tag: 'Nature',   title: 'Fog on the Hills' },
  { id: 1040, category: 'urban',    tag: 'Urban',    title: 'City After Rain' },
  { id: 1041, category: 'abstract', tag: 'Abstract', title: 'Weathered Wall' },
  { id: 1050, category: 'nature',   tag: 'Nature',   title: 'Coastline at Noon' },
  { id: 1062, category: 'portrait', tag: 'Portrait', title: 'Between Frames' },
  { id: 1074, category: 'urban',    tag: 'Urban',    title: 'Empty Platform' },
  { id: 1084, category: 'abstract', tag: 'Abstract', title: 'Lines & Light' }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTag = document.getElementById('lightbox-tag');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCount = document.getElementById('lightbox-count');

let currentIndex = 0;

function imgUrl(id, width) {
  return `https://picsum.photos/id/${id}/${width}`;
}

function renderGallery() {
  gallery.innerHTML = '';
  photos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.category = photo.category;
    item.style.animationDelay = (index * 0.05) + 's';

    // thora height variation taake masonry pyara lage
    const width = 500 + (index % 3) * 40;

    item.innerHTML = `
      <img src="${imgUrl(photo.id, width)}" alt="${photo.title}" loading="lazy">
      <div class="overlay">
        <div class="overlay-content">
          <span class="tag">${photo.tag}</span>
          <div class="title">${photo.title}</div>
        </div>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const photo = photos[currentIndex];
  lightboxImg.src = imgUrl(photo.id, 1000);
  lightboxTag.textContent = photo.tag;
  lightboxTitle.textContent = photo.title;
  lightboxCount.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + photos.length) % photos.length;
  updateLightbox();
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
});

// Category filters
document.getElementById('filters').addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;
  document.querySelectorAll('.item').forEach(item => {
    if (filter === 'all' || item.dataset.category === filter) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
});

renderGallery();
