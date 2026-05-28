// ============================================================
// CONTROLLER — GalleryController.js
// Mengelola filter galeri & lightbox
// ============================================================

const GalleryController = {
  init() {
    GalleryView.render(AppState.galleryImages);
  },

  filter(category, btnEl) {
    // Update active button
    document.querySelectorAll('.filter-btn')
      .forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    // Update state & re-render
    AppState.currentGalleryFilter = category;
    const filtered = category === 'all' ?
      AppState.galleryImages :
      AppState.galleryImages.filter(i => i.category === category);

    GalleryView.render(filtered);
  },

  openLightbox(idx) {
    const item = AppState.visibleGallery[idx];
    if (!item || !item.src) return;
    AppState.lightboxIndex = idx;
    GalleryView.renderLightbox(item.src);
  },

  closeLightbox() {
    GalleryView.closeLightbox();
  },

  navigateLightbox(direction) {
    const total = AppState.visibleGallery.length;
    AppState.lightboxIndex = (AppState.lightboxIndex + direction + total) % total;
    const item = AppState.visibleGallery[AppState.lightboxIndex];
    if (item && item.src) {
      document.getElementById('lightboxImg').src = item.src;
    }
  },
};
