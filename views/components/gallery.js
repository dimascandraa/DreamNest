// ============================================================
// VIEW — components/gallery.js
// Render grid galeri foto + lightbox
// ============================================================

const GalleryView = {
  renderItem(item, idx) {
    const imgHtml = item.src ?
      `<img src="${item.src}" alt="${item.caption}" loading="lazy">` :
      `<div class="gallery-placeholder">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                style="width:40px;height:40px;opacity:.3">
             <rect x="3" y="3" width="18" height="18" rx="2"/>
             <circle cx="8.5" cy="8.5" r="1.5"/>
             <path d="m21 15-5-5L5 21"/>
           </svg>
           <span style="font-size:13px;font-weight:600;opacity:.5">${item.caption}</span>
         </div>`;

    return `
      <div class="gallery-item" onclick="GalleryController.openLightbox(${idx})" data-cat="${item.category}">
        ${imgHtml}
        <div class="gallery-overlay">
          <div class="gallery-overlay-text">${item.caption}</div>
        </div>
      </div>
    `;
  },

  render(items) {
    AppState.visibleGallery = items;
    document.getElementById('galleryGrid').innerHTML =
      items.map((item, idx) => this.renderItem(item, idx)).join('');
  },

  renderLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');
  },

  closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
  },
};
