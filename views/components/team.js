// ============================================================
// VIEW — components/team.js
// Render kartu-kartu tim pengajar
// ============================================================

const TeamView = {
  renderCard(member, index) {
    const photoHtml = AppState.teamPhotos[index] ?
      `<img src="${AppState.teamPhotos[index]}" alt="${member.name}">` :
      member.emoji;

    return `
      <div class="team-card fade-up">
        <div class="team-photo"
             style="background:rgba(27,58,110,0.06);display:flex;align-items:center;
                    justify-content:center;font-size:80px"
             id="teamPhoto${index}">
          ${photoHtml}
        </div>
        <div class="team-body">
          <div class="team-name">${member.name}</div>
          <div class="team-role">${member.role}</div>
          <div class="team-bio">${member.bio}</div>
        </div>
      </div>
    `;
  },

  render(teamMembers) {
    document.getElementById('teamGrid').innerHTML =
      teamMembers.map((m, i) => this.renderCard(m, i)).join('');
  },
};
