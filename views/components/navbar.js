// ============================================================
// VIEW — components/navbar.js
// Render HTML navbar & mobile nav + scroll handler
// ============================================================

const NavbarView = {
  render() {
    return `
      <nav id="navbar">
        <a href="#hero" class="nav-logo">
          <div class="nav-logo-text">
            <span>Dream</span><span>Nest</span>
          </div>
        </a>
        <ul class="nav-links">
          <li><a href="#about">Tentang</a></li>
          <li><a href="#programs">Program</a></li>
          <li><a href="#gallery">Galeri</a></li>
          <li><a href="#testimonials">Testimoni</a></li>
          <li><a href="#team">Tim</a></li>
          <li><a href="#contact">Kontak</a></li>
        </ul>
        <a href="#contact" class="nav-cta">Daftar Sekarang</a>
        <div class="nav-hamburger" onclick="NavbarController.toggleMobile()">
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div class="mobile-nav" id="mobileNav">
        <a href="#about"         onclick="NavbarController.toggleMobile()">Tentang Kami</a>
        <a href="#programs"      onclick="NavbarController.toggleMobile()">Program</a>
        <a href="#gallery"       onclick="NavbarController.toggleMobile()">Galeri</a>
        <a href="#testimonials"  onclick="NavbarController.toggleMobile()">Testimoni</a>
        <a href="#team"          onclick="NavbarController.toggleMobile()">Tim Pengajar</a>
        <a href="#contact"       onclick="NavbarController.toggleMobile()">Kontak</a>
        <a href="#contact" class="nav-cta" onclick="NavbarController.toggleMobile()">Daftar Sekarang</a>
      </div>
    `;
  },

  mount(container) {
    container.insertAdjacentHTML('afterbegin', this.render());
  },
};
