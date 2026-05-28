// ============================================================
// CONTROLLER — NavbarController.js
// Mengelola interaksi navbar: scroll shadow & mobile toggle
// ============================================================

const NavbarController = {
  init() {
    window.addEventListener('scroll', () => {
      document.getElementById('navbar')
        .classList.toggle('scrolled', window.scrollY > 30);
    });
  },

  toggleMobile() {
    document.getElementById('mobileNav').classList.toggle('open');
  },
};
