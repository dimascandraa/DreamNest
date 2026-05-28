// ============================================================
// CONTROLLER — AdminController.js
// Mengelola semua aksi admin: login, upload, pengaturan
// ============================================================

const AdminController = {
  init() {
    // Bind file input change
    document.getElementById('fileInput')
      .addEventListener('change', (e) => this._handleFileUpload(e));

    // Close panel on outside click
    document.getElementById('adminPanel')
      .addEventListener('click', (e) => {
        if (e.target === document.getElementById('adminPanel')) {
          AdminView.closePanel();
        }
      });
    // Bind team select change to update preview
    const teamSel = document.getElementById('teamSelect');
    if (teamSel) teamSel.addEventListener('change', () => AdminView.renderTeamPreview(+teamSel.value));
  },

  open() {
    AdminView.openPanel();
  },
  close() {
    // discard pending changes when closing
    AppState.pendingAdmin.heroSrc = null;
    AppState.pendingAdmin.galleryItems = [];
    AppState.pendingAdmin.teamPhotos = {};
    // re-render views to reflect saved state
    AdminView.renderHeroPreview();
    AdminView.renderGalleryPreviews(AppState.galleryImages);
    AdminView.renderTeamPreview(document.getElementById('teamSelect') ? +document.getElementById('teamSelect').value : 0);
    AdminView.closePanel();
  },

  // ── Login ──
  checkPassword() {
    const pass = document.getElementById('adminPass').value;
    if (pass === AppState.ADMIN_PASSWORD) {
      AppState.adminLoggedIn = true;
      AdminView.showContent();
    } else {
      AdminView.shakePasswordInput();
    }
  },

  // ── Upload trigger ──
  triggerUpload(target) {
    AppState.uploadTarget = target;
    const fi = document.getElementById('fileInput');
    fi.multiple = (target === 'gallery');
    fi.click();
  },

  // ── Handle file input ──
  _handleFileUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => this._applyUpload(ev.target.result);
      reader.readAsDataURL(file);
    });
    e.target.value = ''; // reset input
  },

  _applyUpload(src) {
    const target = AppState.uploadTarget;

    if (target === 'hero') {
      AppState.pendingAdmin.heroSrc = src;
      AdminView.renderHeroPreview();
      AdminView.showToast('✅ Hero banner siap disimpan!');

    } else if (target === 'gallery') {
      const cat = document.getElementById('galleryCategory').value;
      const cap = document.getElementById('galleryCaption').value || 'Foto Kegiatan';
      const newItem = {
        id: Date.now() + Math.random(),
        category: cat,
        caption: cap,
        src,
      };
      AppState.pendingAdmin.galleryItems.unshift(newItem);
      AdminView.renderGalleryPreviews(AppState.pendingAdmin.galleryItems);
      AdminView.showToast('✅ Foto galeri siap disimpan!');

    } else if (target === 'team') {
      const idx = +document.getElementById('teamSelect').value;
      AppState.pendingAdmin.teamPhotos[idx] = src;
      AdminView.renderTeamPreview(idx);
      AdminView.showToast('✅ Foto pengajar siap disimpan!');
    }
  },

  // ── Hapus preview/gabungan handler ──
  deletePreviewItem(id) {
    // try remove from pending gallery first
    const idx = AppState.pendingAdmin.galleryItems.findIndex(i => i.id === id);
    if (idx !== -1) {
      AppState.pendingAdmin.galleryItems.splice(idx, 1);
      AdminView.renderGalleryPreviews(AppState.pendingAdmin.galleryItems);
      AdminView.showToast('🗑️ Preview foto dihapus');
      return;
    }
    // fallback to deleting saved gallery item
    this.deleteGalleryItem(id);
  },

  deletePendingTeamPhoto(index) {
    if (AppState.pendingAdmin.teamPhotos[index]) {
      delete AppState.pendingAdmin.teamPhotos[index];
      AdminView.renderTeamPreview(index);
      AdminView.showToast('🗑️ Foto pengajar (preview) dihapus');
    } else if (AppState.teamPhotos[index]) {
      // if no pending, remove saved
      delete AppState.teamPhotos[index];
      TeamView.render(teamMembers);
      AnimationController.observeAll();
      AdminView.showToast('🗑️ Foto pengajar dihapus');
    }
  },

  clearPendingHero() {
    if (AppState.pendingAdmin.heroSrc) {
      AppState.pendingAdmin.heroSrc = null;
      AdminView.renderHeroPreview();
      AdminView.showToast('🗑️ Preview hero dibersihkan');
    }
  },

  // ── Hapus item galeri ──
  deleteGalleryItem(id) {
    AppState.galleryImages = AppState.galleryImages.filter(i => i.id !== id);
    GalleryController.filter(AppState.currentGalleryFilter,
      document.querySelector('.filter-btn.active'));
    AdminView.renderGalleryPreviews(AppState.galleryImages);
    AdminView.showToast('🗑️ Foto dihapus');
  },

  // ── Request modal flows ──
  requestDeletePreviewItem(id) {
    this._pendingDelete = {
      action: 'previewGallery',
      id
    };
    AdminView.showConfirm('Hapus foto preview? Tindakan ini akan menghapus preview atau foto tersimpan.');
  },

  requestDeletePendingTeamPhoto(index) {
    this._pendingDelete = {
      action: 'team',
      index
    };
    AdminView.showConfirm('Hapus foto pengajar?');
  },

  requestClearPendingHero() {
    this._pendingDelete = {
      action: 'clearHero'
    };
    AdminView.showConfirm('Hapus preview hero?');
  },

  cancelPendingDelete() {
    this._pendingDelete = null;
    AdminView.hideConfirm();
  },

  confirmPendingDelete() {
    if (!this._pendingDelete) return AdminView.hideConfirm();
    const pd = this._pendingDelete;
    if (pd.action === 'previewGallery') {
      this.deletePreviewItem(pd.id);
    } else if (pd.action === 'team') {
      this.deletePendingTeamPhoto(pd.index);
    } else if (pd.action === 'clearHero') {
      this.clearPendingHero();
    }
    this._pendingDelete = null;
    AdminView.hideConfirm();
  },

  // ── Simpan pengaturan ──
  saveSettings() {
    // create snapshot for undo (previous saved state)
    AppState.lastSavedSnapshot = {
      stats: {
        ...AppState.stats
      },
      heroBannerSrc: AppState.heroBannerSrc,
      galleryImages: [...AppState.galleryImages],
      teamPhotos: {
        ...AppState.teamPhotos
      },
      waNumber: AppState.waNumber,
    };

    AppState.stats.students = +document.getElementById('statStudentsInput').value;
    AppState.stats.teachers = +document.getElementById('statTeachersInput').value;
    AppState.stats.success = +document.getElementById('statSuccessInput').value;
    AppState.waNumber = document.getElementById('waNumber').value.trim();

    if (AppState.pendingAdmin.heroSrc) {
      AppState.heroBannerSrc = AppState.pendingAdmin.heroSrc;
      AdminView.updateHeroBanner(AppState.heroBannerSrc);
      AppState.pendingAdmin.heroSrc = null;
    }

    if (AppState.pendingAdmin.galleryItems.length) {
      AppState.galleryImages.unshift(...AppState.pendingAdmin.galleryItems);
      AppState.pendingAdmin.galleryItems = [];
      GalleryController.filter(AppState.currentGalleryFilter,
        document.querySelector('.filter-btn.active'));
      AdminView.renderGalleryPreviews(AppState.galleryImages);
    }

    if (Object.keys(AppState.pendingAdmin.teamPhotos).length) {
      AppState.teamPhotos = {
        ...AppState.teamPhotos,
        ...AppState.pendingAdmin.teamPhotos
      };
      AppState.pendingAdmin.teamPhotos = {};
      TeamView.render(teamMembers);
      AnimationController.observeAll();
    }

    StatsController.updateDisplay();
    AdminView.updateContactNumber(AppState.waNumber);
    AdminView.showUndoToast('✅ Pengaturan disimpan.', 'Batalkan');
  },

  // ── Undo last save ──
  undoLastSave() {
    const snap = AppState.lastSavedSnapshot;
    if (!snap) {
      AdminView.showToast('Tidak ada perubahan untuk dibatalkan.');
      return;
    }
    AppState.stats = {
      ...snap.stats
    };
    AppState.heroBannerSrc = snap.heroBannerSrc;
    AppState.galleryImages = [...snap.galleryImages];
    AppState.teamPhotos = {
      ...snap.teamPhotos
    };
    AppState.waNumber = snap.waNumber;

    // update UI
    StatsController.updateDisplay();
    if (AppState.heroBannerSrc) AdminView.updateHeroBanner(AppState.heroBannerSrc);
    GalleryController.filter(AppState.currentGalleryFilter,
      document.querySelector('.filter-btn.active'));
    TeamView.render(teamMembers);
    AnimationController.observeAll();
    AdminView.updateContactNumber(AppState.waNumber);

    AppState.lastSavedSnapshot = null;
    AdminView.showToast('↩️ Perubahan terakhir dibatalkan.');
  },
};
