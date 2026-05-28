// ============================================================
// VIEW — components/admin.js
// Render panel admin & preview galeri admin
// ============================================================

const AdminView = {
  openPanel() {
    document.getElementById('adminPanel').classList.add('open');
  },

  closePanel() {
    document.getElementById('adminPanel').classList.remove('open');
  },

  showLogin() {
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
  },

  showContent() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    // render current previews (pending or saved)
    this.renderHeroPreview();
    const galleryItems = (AppState.pendingAdmin.galleryItems && AppState.pendingAdmin.galleryItems.length) ?
      AppState.pendingAdmin.galleryItems :
      AppState.galleryImages;
    this.renderGalleryPreviews(galleryItems);
    const teamSel = document.getElementById('teamSelect');
    const idx = teamSel ? +teamSel.value : 0;
    this.renderTeamPreview(idx);
  },

  shakePasswordInput() {
    const input = document.getElementById('adminPass');
    input.style.borderColor = 'red';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 1500);
  },

  showToast(msg) {
    const toast = document.getElementById('adminToast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  },

  showUndoToast(msg, undoLabel = 'Undo') {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.innerHTML = `${msg} <button class="admin-undo-btn" style="margin-left:8px;padding:4px 8px;border-radius:6px;border:0;background:#fff;cursor:pointer;">${undoLabel}</button>`;
    const btn = toast.querySelector('.admin-undo-btn');
    if (btn) btn.addEventListener('click', () => AdminController.undoLastSave());
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      // restore simple text content after hide
      toast.textContent = '';
    }, 6000);
  },

  showConfirm(message) {
    const modal = document.getElementById('adminConfirmModal');
    const msgEl = document.getElementById('adminConfirmMsg');
    if (!modal || !msgEl) return;
    msgEl.textContent = message || 'Apakah Anda yakin?';
    modal.style.display = 'flex';
  },

  hideConfirm() {
    const modal = document.getElementById('adminConfirmModal');
    if (!modal) return;
    modal.style.display = 'none';
  },

  updateContactNumber(number) {
    const formattedNumber = number.startsWith('62') ? '+62 ' + number.slice(2).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : number;
    const waLink = document.getElementById('whatsappCtaBtn');
    const contactText = document.getElementById('contactWhatsApp');
    if (waLink) waLink.href = `https://wa.me/${number}`;
    if (contactText) contactText.textContent = formattedNumber;
  },

  renderGalleryPreviews(items) {
    const userUploaded = items.filter(i => i.src);
    document.getElementById('adminGalleryPreviews').innerHTML =
      userUploaded.slice(0, 6).map(item => `
        <div class="admin-preview-item">
          <img src="${item.src}" alt="">
          <div style="display:flex;align-items:center;gap:8px">
            <button class="admin-preview-del" onclick="AdminController.requestDeletePreviewItem(${item.id})">×</button>
            ${ (AppState.pendingAdmin.galleryItems.find(pi => pi.id === item.id)) ? '<span class="pending-badge">Pending</span>' : '' }
          </div>
        </div>
      `).join('');
  },

  renderHeroPreview() {
    const container = document.getElementById('adminHeroPreview');
    const src = AppState.pendingAdmin.heroSrc || AppState.heroBannerSrc;
    if (!container) return;
    if (src) {
      container.innerHTML = `
        <div class="admin-hero-preview-inner">
          <img src="${src}" style="width:100%;max-width:360px;border-radius:12px;object-fit:cover;">
          <div style="margin-top:6px">
            <button class="admin-preview-del" onclick="AdminController.requestClearPendingHero()">Hapus</button>
            ${AppState.pendingAdmin.heroSrc ? '<span class="pending-badge">Pending</span>' : ''}
          </div>
        </div>
      `;
    } else {
      container.innerHTML = '';
    }
  },

  renderTeamPreview(index = 0) {
    const container = document.getElementById('adminTeamPreview');
    if (!container) return;
    const pending = AppState.pendingAdmin.teamPhotos[index];
    const saved = AppState.teamPhotos[index];
    const src = pending || saved;
    if (src) {
      const isPending = !!pending;
      container.innerHTML = `
        <div class="admin-team-preview-inner">
          <img src="${src}" style="width:120px;height:120px;border-radius:12px;object-fit:cover;">
          <div style="margin-top:6px">
            <button class="admin-preview-del" onclick="AdminController.requestDeletePendingTeamPhoto(${index})">Hapus</button>
            ${pending ? '<span class="pending-badge">Pending</span>' : ''}
          </div>
        </div>
      `;
    } else {
      container.innerHTML = '';
    }
  },

  updateHeroBanner(src) {
    const heroImg = document.getElementById('heroMainImg');
    heroImg.style.background = 'transparent';
    heroImg.innerHTML = `
      <img src="${src}" alt="Hero"
           style="width:100%;height:100%;object-fit:cover;border-radius:24px;">
    `;
  },
};
