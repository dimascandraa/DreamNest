// ============================================================
// app.js — Bootstrap
// Entry point utama: mount semua View & inisialisasi Controller
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Mount Navbar ke DOM ──
  NavbarView.mount(document.body);

  // ── 2. Render semua View ──
  ProgramsView.render(programs);
  GalleryController.init();
  TestimonialsView.render(testimonials);
  TeamView.render(teamMembers);

  // ── 3. Inisialisasi Controllers ──
  NavbarController.init();
  AdminController.init();
  AdminView.updateContactNumber(AppState.waNumber);
  if (typeof ContactController !== 'undefined') {
    ContactController.updateWhatsAppLink();
  }

  // ── 4. Jalankan animasi & counter (setelah DOM settled) ──
  setTimeout(() => {
    AnimationController.init();
    StatsController.init();
  }, 100);

  // ── 5. Keyboard shortcuts ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      GalleryController.closeLightbox();
      AdminController.close();
    }
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowRight') GalleryController.navigateLightbox(1);
      if (e.key === 'ArrowLeft') GalleryController.navigateLightbox(-1);
    }
  });

});
