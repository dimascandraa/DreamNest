// ============================================================
// VIEW — components/programs.js
// Render kartu-kartu program bimbel
// ============================================================

const ProgramsView = {
  renderCard(p) {
    return `
      <div class="program-card fade-up">
        <div class="program-card-img" style="background:${p.color}22">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">
            ${p.emoji}
          </div>
          <div class="program-card-badge" style="background:${p.color}">${p.badge}</div>
        </div>
        <div class="program-card-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="program-card-footer">
            <div class="program-price">${p.price}<br><small>${p.period}</small></div>
            <a href="#contact" class="btn-sm" onclick="ContactController.prepareRegistration('${p.title.replace(/'/g, "\\'")}')">Daftar</a>
          </div>
        </div>
      </div>
    `;
  },

  render(programs) {
    document.getElementById('programsGrid').innerHTML =
      programs.map(p => this.renderCard(p)).join('');
  },
};
