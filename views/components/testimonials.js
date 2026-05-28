// ============================================================
// VIEW — components/testimonials.js
// Render kartu-kartu testimoni
// ============================================================

const TestimonialsView = {
  renderCard(t) {
    return `
      <div class="testi-card fade-up">
        <div class="testi-stars">${'★'.repeat(t.stars)}</div>
        <p class="testi-text">"${t.text}"</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:rgba(27,58,110,0.1);font-size:22px">
            ${t.avatar}
          </div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-role">${t.role}</div>
          </div>
        </div>
      </div>
    `;
  },

  render(testimonials) {
    document.getElementById('testiGrid').innerHTML =
      testimonials.map(t => this.renderCard(t)).join('');
  },
};
