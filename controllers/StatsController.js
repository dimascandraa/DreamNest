// ============================================================
// CONTROLLER — StatsController.js
// Mengelola animasi counter statistik hero
// ============================================================

const StatsController = {
  init() {
    // Trigger counter saat section hero terlihat
    const heroObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.animateAll();
        heroObs.disconnect();
      }
    }, {
      threshold: 0.3
    });

    heroObs.observe(document.getElementById('hero'));
  },

  animateCounter(el, target, suffix = '') {
    let current = 0;
    const inc = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      el.innerHTML = Math.round(current) + '<span>' + suffix + '</span>';
      if (current >= target) clearInterval(timer);
    }, 20);
  },

  animateAll() {
    this.animateCounter(
      document.getElementById('statStudents'), AppState.stats.students, '+'
    );
    this.animateCounter(
      document.getElementById('statTeachers'), AppState.stats.teachers, '+'
    );
    this.animateCounter(
      document.getElementById('statSuccess'), AppState.stats.success, '%'
    );
  },

  updateDisplay() {
    document.getElementById('statStudents').innerHTML =
      AppState.stats.students + '<span>+</span>';
    document.getElementById('statTeachers').innerHTML =
      AppState.stats.teachers + '<span>+</span>';
    document.getElementById('statSuccess').innerHTML =
      AppState.stats.success + '<span>%</span>';
  },
};


// ============================================================
// CONTROLLER — AnimationController.js
// Mengelola scroll-triggered fade-up animations
// ============================================================

const AnimationController = {
  _observer: null,

  init() {
    this._observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, {
      threshold: 0.1
    });

    this.observeAll();
  },

  observeAll() {
    document.querySelectorAll('.fade-up').forEach(el => {
      this._observer.observe(el);
    });
  },
};


// ============================================================
// CONTROLLER — ContactController.js
// Mengelola form kontak
// ============================================================

const ContactController = {
  prepareRegistration(program) {
    const message = `Halo DreamNest Learning, saya ingin mendaftar program ${program}. Mohon info detail pendaftaran, jadwal kelas, dan biaya.`;
    const messageField = document.getElementById('contactMessage');
    const programSelect = document.getElementById('contactLevel');
    if (messageField) {
      messageField.value = message;
    }
    if (programSelect) {
      const option = Array.from(programSelect.options).find(opt => opt.textContent.includes(program.split(' ')[0]));
      if (option) programSelect.value = option.value;
    }
    this.updateWhatsAppLink();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  submitForm() {
    AdminView.showToast('📨 Pesan terkirim! Kami akan segera menghubungi Anda.');
  },

  updateWhatsAppLink() {
    const btn = document.getElementById('contactWhatsAppBtn');
    const messageField = document.getElementById('contactMessage');
    const msg = messageField ? messageField.value.trim() : '';
    const phone = AppState.waNumber || '6288994658865';
    if (btn) {
      btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg || 'Halo DreamNest Learning, saya ingin informasi pendaftaran.')}`;
    }
  },
};

const TestimonialController = {
  toggleForm() {
    const form = document.getElementById('testimonialForm');
    if (!form) return;
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) {
      document.getElementById('testimonialName').focus();
    }
  },

  submitTestimonial() {
    const name = document.getElementById('testimonialName').value.trim();
    const role = document.getElementById('testimonialRole').value.trim();
    const text = document.getElementById('testimonialText').value.trim();
    const stars = parseInt(document.getElementById('testimonialStars').value, 10) || 5;

    if (!name || !role || !text) {
      AdminView.showToast('Lengkapi semua kolom testimoni terlebih dahulu.');
      return;
    }

    const initials = name.split(' ').filter(Boolean).map(part => part[0]).slice(0, 2).join('').toUpperCase();
    testimonials.unshift({
      stars,
      text,
      name,
      role,
      avatar: initials || '⭐',
    });

    TestimonialsView.render(testimonials);
    document.getElementById('testimonialName').value = '';
    document.getElementById('testimonialRole').value = '';
    document.getElementById('testimonialText').value = '';
    document.getElementById('testimonialStars').value = '5';

    AdminView.showToast('✅ Testimoni Anda telah ditambahkan.');
  },
};
