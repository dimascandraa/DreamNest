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
          <div class="program-meta">
            <div class="program-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              ${p.duration}
            </div>
            <div class="program-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              ${p.students}
            </div>
          </div>
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
