// Admin Results Management System
// Hardcoded password - share only with authorized admin
const ADMIN_PASSWORD = "SHMU2026admin!";

// Modal elements
const loginModal = document.getElementById('loginModal');
const adminModal = document.getElementById('adminModal');
const adminBtn = document.getElementById('adminBtn');
const closeButtons = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Check if already logged in
let isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

// Sport configurations
const sportConfigs = {
    'futbal': {
        name: 'Futbal',
        type: 'team',
        pointsForWin: 3,
        pointsForDraw: 1,
        pointsForLoss: 0,
        scoreFormat: 'goals'
    },
    'volejbal': {
        name: 'Volejbal',
        type: 'team',
        pointsForWin: 2,
        pointsForLoss: 0,
        scoreFormat: 'sets'
    },
    'stolny-tenis': {
        name: 'Stolný tenis',
        type: 'individual',
        scoreFormat: 'sets'
    },
    'bedminton': {
        name: 'Bedminton',
        type: 'individual',
        scoreFormat: 'sets'
    },
    'beh': {
        name: 'Beh',
        type: 'individual',
        scoreFormat: 'time'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load from JSON file first (for public display)
    loadDataFromJSON().then(() => {
        updateAllStandings();
    });
    
    if (isLoggedIn) {
        adminBtn.innerHTML = '<i class="fas fa-unlock"></i> Admin Panel';
    }
});

// Load data from JSON file on page load (non-admin)
async function loadDataFromJSON() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        if (response.ok) {
            const data = await response.json();
            // Only load if localStorage is empty (not admin editing)
            const hasLocalData = localStorage.getItem('sportsTeams') || localStorage.getItem('sportsMatches');
            if (!hasLocalData) {
                localStorage.setItem('sportsTeams', JSON.stringify(data.teams || []));
                localStorage.setItem('sportsMatches', JSON.stringify(data.matches || []));
            }
        }
    } catch (error) {
        console.log('data.json not found or error loading, using localStorage');
    }
}

// Admin button click
adminBtn.addEventListener('click', function() {
    if (isLoggedIn) {
        adminModal.style.display = 'block';
        loadTeamsTab();
    } else {
        loginModal.style.display = 'block';
    }
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        loginModal.style.display = 'none';
        adminModal.style.display = 'block';
        adminBtn.innerHTML = '<i class="fas fa-unlock"></i> Admin Panel';
        loginError.textContent = '';
        document.getElementById('password').value = '';
        loadTeamsTab();
    } else {
        loginError.textContent = 'Nesprávne heslo!';
        setTimeout(() => {
            loginError.textContent = '';
        }, 3000);
    }
});

// Close modals
closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        adminModal.style.display = 'none';
        document.getElementById('password').value = '';
        loginError.textContent = '';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.getElementById('password').value = '';
        loginError.textContent = '';
    }
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
    }
});

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        if (tabName === 'teams') {
            loadTeamsTab();
        } else if (tabName === 'matches') {
            loadMatchesTab();
        } else if (tabName === 'manage') {
            loadManageTab();
        }
    });
});

// Helper functions
function getTeams() {
    return JSON.parse(localStorage.getItem('sportsTeams') || '[]');
}

function getMatches() {
    return JSON.parse(localStorage.getItem('sportsMatches') || '[]');
}

function saveMatch(matchData) {
    const matches = getMatches();
    matches.push(matchData);
    localStorage.setItem('sportsMatches', JSON.stringify(matches));
}

// Teams management
function loadTeamsTab() {
    const teams = getTeams();
    const container = document.getElementById('teamsContainer');
    
    if (teams.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Zatiaľ neboli pridané žiadne tímy.</p>';
    } else {
        container.innerHTML = `
            <div class="teams-list">
                ${teams.map((team, idx) => `
                    <div class="team-card">
                        <div class="team-header">
                            <h4>${team.name}</h4>
                            <span class="team-org">${team.organization}</span>
                        </div>
                        <div class="team-members">
                            <strong>Členovia:</strong> ${team.members.join(', ')}
                        </div>
                        <button class="btn-danger btn-small" onclick="deleteTeam(${idx})">
                            <i class="fas fa-trash"></i> Vymazať
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function deleteTeam(index) {
    if (!confirm('Naozaj chcete vymazať tento tím?')) return;
    
    const teams = getTeams();
    teams.splice(index, 1);
    localStorage.setItem('sportsTeams', JSON.stringify(teams));
    saveToServer();
    
    loadTeamsTab();
    updateTeamSelects();
    alert('Tím bol vymazaný!');
}

// Add team form
document.getElementById('addTeamForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value.trim();
    const teamOrg = document.getElementById('teamOrg').value;
    const teamMembers = document.getElementById('teamMembers').value
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0);
    
    if (!teamName || !teamOrg || teamMembers.length === 0) {
        alert('Vyplňte všetky povinné polia!');
        return;
    }
    
    const teams = getTeams();
    teams.push({
        name: teamName,
        organization: teamOrg,
        members: teamMembers
    });
    
    localStorage.setItem('sportsTeams', JSON.stringify(teams));
    saveToServer();
    
    this.reset();
    loadTeamsTab();
    updateTeamSelects();
    alert('Tím bol úspešne pridaný!');
});

// Update team select dropdowns
function updateTeamSelects() {
    const teams = getTeams();
    const team1Select = document.getElementById('team1Select');
    const team2Select = document.getElementById('team2Select');
    
    if (!team1Select || !team2Select) return;
    
    const options = teams.map(team => 
        `<option value="${team.name}">${team.name} (${team.organization})</option>`
    ).join('');
    
    team1Select.innerHTML = '<option value="">Vyberte tím...</option>' + options;
    team2Select.innerHTML = '<option value="">Vyberte tím...</option>' + options;
}

// Sport select change handler
document.getElementById('matchSport')?.addEventListener('change', function() {
    const sport = this.value;
    const config = sportConfigs[sport];
    
    const teamMatchDiv = document.getElementById('teamMatchInputs');
    const individualDiv = document.getElementById('individualInputs');
    
    if (config && config.type === 'team') {
        teamMatchDiv.style.display = 'block';
        individualDiv.style.display = 'none';
        updateTeamSelects();
    } else if (config && config.type === 'individual') {
        teamMatchDiv.style.display = 'none';
        individualDiv.style.display = 'block';
    }
});

// Match form submission
document.getElementById('matchForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const sport = document.getElementById('matchSport').value;
    const config = sportConfigs[sport];
    
    if (!sport) {
        alert('Vyberte šport!');
        return;
    }
    
    let matchData = {
        sport: sport,
        date: document.getElementById('matchDate').value,
        timestamp: Date.now()
    };
    
    if (config.type === 'team') {
        const team1 = document.getElementById('team1Select').value;
        const team2 = document.getElementById('team2Select').value;
        const score1 = parseInt(document.getElementById('score1').value);
        const score2 = parseInt(document.getElementById('score2').value);
        
        if (!team1 || !team2 || isNaN(score1) || isNaN(score2)) {
            alert('Vyplňte všetky povinné polia!');
            return;
        }
        
        if (team1 === team2) {
            alert('Nemôžete vybrať ten istý tím dvakrát!');
            return;
        }
        
        matchData.team1 = team1;
        matchData.team2 = team2;
        matchData.score1 = score1;
        matchData.score2 = score2;
        matchData.details = document.getElementById('matchDetails').value.trim();
    } else {
        const participant = document.getElementById('participantName').value.trim();
        const organization = document.getElementById('participantOrg').value;
        const result = document.getElementById('individualResult').value.trim();
        
        if (!participant || !organization || !result) {
            alert('Vyplňte všetky povinné polia!');
            return;
        }
        
        matchData.participant = participant;
        matchData.organization = organization;
        matchData.result = result;
    }
    
    saveMatch(matchData);
    saveToServer();
    
    this.reset();
    updateAllStandings();
    loadMatchesTab();
    alert('Zápas bol úspešne pridaný!');
});

// Load all matches and update displays
function loadAllMatches() {
    updateAllStandings();
}

// Calculate standings for team sports
function calculateTeamStandings(sport) {
    const matches = getMatches().filter(m => m.sport === sport);
    const config = sportConfigs[sport];
    const standings = {};
    
    matches.forEach(match => {
        if (!standings[match.team1]) {
            standings[match.team1] = {
                team: match.team1,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDiff: 0,
                points: 0
            };
        }
        if (!standings[match.team2]) {
            standings[match.team2] = {
                team: match.team2,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDiff: 0,
                points: 0
            };
        }
        
        standings[match.team1].played++;
        standings[match.team2].played++;
        standings[match.team1].goalsFor += match.score1;
        standings[match.team1].goalsAgainst += match.score2;
        standings[match.team2].goalsFor += match.score2;
        standings[match.team2].goalsAgainst += match.score1;
        
        if (match.score1 > match.score2) {
            standings[match.team1].won++;
            standings[match.team1].points += config.pointsForWin;
            standings[match.team2].lost++;
            standings[match.team2].points += config.pointsForLoss;
        } else if (match.score1 < match.score2) {
            standings[match.team2].won++;
            standings[match.team2].points += config.pointsForWin;
            standings[match.team1].lost++;
            standings[match.team1].points += config.pointsForLoss;
        } else {
            standings[match.team1].drawn++;
            standings[match.team2].drawn++;
            if (config.pointsForDraw !== undefined) {
                standings[match.team1].points += config.pointsForDraw;
                standings[match.team2].points += config.pointsForDraw;
            }
        }
        
        standings[match.team1].goalDiff = standings[match.team1].goalsFor - standings[match.team1].goalsAgainst;
        standings[match.team2].goalDiff = standings[match.team2].goalsFor - standings[match.team2].goalsAgainst;
    });
    
    const standingsArray = Object.values(standings);
    standingsArray.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        return b.goalsFor - a.goalsFor;
    });
    
    return standingsArray;
}

// Calculate results for individual sports
function calculateIndividualResults(sport) {
    const matches = getMatches().filter(m => m.sport === sport);
    
    return matches.map(match => ({
        participant: match.participant,
        organization: match.organization,
        result: match.result,
        date: match.date
    })).sort((a, b) => {
        if (sportConfigs[sport].scoreFormat === 'time') {
            return a.result.localeCompare(b.result);
        }
        return 0;
    });
}

// Display team standings
function displayTeamStandings(sport, standings) {
    const tbody = document.getElementById(`${sport}-results`);
    if (!tbody) return;
    
    if (standings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 1.5rem; color: var(--text-light);">
                    <em>Výsledky sa očakávajú</em>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = standings.map((team, idx) => {
        let medalIcon = '';
        if (idx === 0) medalIcon = '<i class="fas fa-medal" style="color: #FFD700;"></i> ';
        else if (idx === 1) medalIcon = '<i class="fas fa-medal" style="color: #C0C0C0;"></i> ';
        else if (idx === 2) medalIcon = '<i class="fas fa-medal" style="color: #CD7F32;"></i> ';
        
        return `
            <tr>
                <td>${medalIcon}${idx + 1}</td>
                <td><strong>${team.team}</strong></td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.goalsFor}:${team.goalsAgainst}</td>
                <td>${team.goalDiff > 0 ? '+' : ''}${team.goalDiff}</td>
                <td><strong>${team.points}</strong></td>
            </tr>
        `;
    }).join('');
}

// Display individual results
function displayIndividualResults(sport, results) {
    const tbody = document.getElementById(`${sport}-results`);
    if (!tbody) return;
    
    if (results.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 1.5rem; color: var(--text-light);">
                    <em>Výsledky sa očakávajú</em>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = results.map((result, idx) => {
        let medalIcon = '';
        if (idx === 0) medalIcon = '<i class="fas fa-medal" style="color: #FFD700;"></i> ';
        else if (idx === 1) medalIcon = '<i class="fas fa-medal" style="color: #C0C0C0;"></i> ';
        else if (idx === 2) medalIcon = '<i class="fas fa-medal" style="color: #CD7F32;"></i> ';
        
        return `
            <tr>
                <td>${medalIcon}${idx + 1}. miesto</td>
                <td><strong>${result.participant}</strong></td>
                <td>${result.organization}</td>
                <td>${result.result}</td>
            </tr>
        `;
    }).join('');
}

// Update all standings
function updateAllStandings() {
    Object.keys(sportConfigs).forEach(sport => {
        const config = sportConfigs[sport];
        
        if (config.type === 'team') {
            const standings = calculateTeamStandings(sport);
            displayTeamStandings(sport, standings);
        } else {
            const results = calculateIndividualResults(sport);
            displayIndividualResults(sport, results);
        }
    });
    
    updateOverallStandings();
}

// Update overall standings
function updateOverallStandings() {
    const standings = {};
    const teams = getTeams();
    
    teams.forEach(team => {
        standings[team.organization] = standings[team.organization] || { gold: 0, silver: 0, bronze: 0, total: 0 };
    });
    
    Object.keys(sportConfigs).forEach(sport => {
        const config = sportConfigs[sport];
        
        if (config.type === 'team') {
            const sportStandings = calculateTeamStandings(sport);
            
            sportStandings.forEach((teamResult, idx) => {
                const team = teams.find(t => t.name === teamResult.team);
                if (!team) return;
                
                const org = team.organization;
                if (!standings[org]) {
                    standings[org] = { gold: 0, silver: 0, bronze: 0, total: 0 };
                }
                
                if (idx === 0) {
                    standings[org].gold++;
                    standings[org].total += 3;
                } else if (idx === 1) {
                    standings[org].silver++;
                    standings[org].total += 2;
                } else if (idx === 2) {
                    standings[org].bronze++;
                    standings[org].total += 1;
                }
            });
        } else {
            const results = calculateIndividualResults(sport);
            
            results.forEach((result, idx) => {
                const org = result.organization;
                if (!standings[org]) {
                    standings[org] = { gold: 0, silver: 0, bronze: 0, total: 0 };
                }
                
                if (idx === 0) {
                    standings[org].gold++;
                    standings[org].total += 3;
                } else if (idx === 1) {
                    standings[org].silver++;
                    standings[org].total += 2;
                } else if (idx === 2) {
                    standings[org].bronze++;
                    standings[org].total += 1;
                }
            });
        }
    });
    
    const standingsArray = Object.entries(standings).map(([org, medals]) => ({
        organization: org,
        ...medals
    }));
    
    standingsArray.sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (b.gold !== a.gold) return b.gold - a.gold;
        if (b.silver !== a.silver) return b.silver - a.silver;
        return b.bronze - a.bronze;
    });
    
    const tbody = document.getElementById('overallStandingsBody');
    
    if (standingsArray.length === 0 || standingsArray.every(s => s.total === 0)) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    <strong>Výsledky sa očakávajú</strong><br>
                    <em>Na hrách sa zúčastnia početné tímy zo SHMÚ aj ČHMÚ</em>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = standingsArray.filter(s => s.total > 0).map((team, index) => `
        <tr>
            <td><strong>${index + 1}</strong></td>
            <td><strong>${team.organization}</strong></td>
            <td><span class="medal-count gold">${team.gold}</span></td>
            <td><span class="medal-count silver">${team.silver}</span></td>
            <td><span class="medal-count bronze">${team.bronze}</span></td>
            <td><strong>${team.total}</strong></td>
        </tr>
    `).join('');
}

// Load matches tab
function loadMatchesTab() {
    const container = document.getElementById('matchesContainer');
    const matches = getMatches();
    
    if (matches.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Zatiaľ neboli pridané žiadne zápasy.</p>';
        return;
    }
    
    const groupedMatches = {};
    matches.forEach((match, idx) => {
        if (!groupedMatches[match.sport]) {
            groupedMatches[match.sport] = [];
        }
        groupedMatches[match.sport].push({ ...match, idx });
    });
    
    container.innerHTML = Object.entries(groupedMatches).map(([sport, sportMatches]) => {
        const config = sportConfigs[sport];
        return `
            <div class="manage-sport-section">
                <h4>${config.name}</h4>
                <div class="matches-list">
                    ${sportMatches.map(match => {
                        if (config.type === 'team') {
                            return `
                                <div class="match-card">
                                    <div class="match-teams">
                                        <strong>${match.team1}</strong> ${match.score1} : ${match.score2} <strong>${match.team2}</strong>
                                    </div>
                                    <div class="match-details">
                                        ${match.date ? `Dátum: ${match.date}` : ''}
                                        ${match.details ? `<br>${match.details}` : ''}
                                    </div>
                                    <button class="btn-danger btn-small" onclick="deleteMatch(${match.idx})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="match-card">
                                    <div class="match-teams">
                                        <strong>${match.participant}</strong> (${match.organization})
                                    </div>
                                    <div class="match-details">
                                        Výsledok: <strong>${match.result}</strong>
                                        ${match.date ? `<br>Dátum: ${match.date}` : ''}
                                    </div>
                                    <button class="btn-danger btn-small" onclick="deleteMatch(${match.idx})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function deleteMatch(index) {
    if (!confirm('Naozaj chcete vymazať tento zápas?')) return;
    
    const matches = getMatches();
    matches.splice(index, 1);
    localStorage.setItem('sportsMatches', JSON.stringify(matches));
    saveToServer();
    
    updateAllStandings();
    loadMatchesTab();
    alert('Zápas bol vymazaný!');
}

// Load manage tab
function loadManageTab() {
    const container = document.getElementById('manageContainer');
    const teams = getTeams();
    const matches = getMatches();
    const lastUpdated = localStorage.getItem('lastUpdated');
    
    container.innerHTML = `
        <div class="manage-stats">
            <div class="stat-card">
                <h3>${teams.length}</h3>
                <p>Registrovaných tímov</p>
            </div>
            <div class="stat-card">
                <h3>${matches.length}</h3>
                <p>Zaznamenaných zápasov</p>
            </div>
        </div>
        
        <div class="data-management">
            <h3><i class="fas fa-database"></i> Správa dát</h3>
            <p><i class="fas fa-check-circle" style="color: var(--success-color);"></i> Zmeny sa ukladajú automaticky</p>
            <p>Posledná aktualizácia: ${lastUpdated ? new Date(lastUpdated).toLocaleString('sk-SK') : 'Nikdy'}</p>
            
            <div class="button-group">
                <button class="btn-primary" onclick="loadFromJSON()">
                    <i class="fas fa-sync"></i> Obnoviť z data.json
                </button>
                <button class="btn-secondary" onclick="publishToJSON()">
                    <i class="fas fa-download"></i> Stiahnuť zálohu
                </button>
            </div>
            
            <div class="info-box">
                <strong><i class="fas fa-info-circle"></i> Automatické ukladanie:</strong>
                <p>Všetky zmeny sa automaticky ukladajú na server do súboru <code>data.json</code>. Návštevníci vidia zmeny okamžite.</p>
                <p><strong>Poznámka:</strong> Uistite sa, že súbor <code>save-data.php</code> je nahraný na serveri a má práva na zápis do <code>data.json</code>.</p>
            </div>
        </div>
        
        <div class="danger-zone">
            <h3>Nebezpečná zóna</h3>
            <p>Tieto akcie sú nezvratné!</p>
            <button class="btn-danger" onclick="clearAllData()">
                <i class="fas fa-exclamation-triangle"></i> Vymazať všetky dáta
            </button>
        </div>
    `;
}

function clearAllData() {
    if (!confirm('VAROVANIE: Týmto vymažete všetky tímy, zápasy a výsledky. Táto akcia je nezvratná! Pokračovať?')) return;
    if (!confirm('Ste si naozaj istí? Všetky dáta budú stratené!')) return;
    
    localStorage.removeItem('sportsTeams');
    localStorage.removeItem('sportsMatches');
    localStorage.removeItem('lastUpdated');
    
    updateAllStandings();
    loadTeamsTab();
    loadMatchesTab();
    loadManageTab();
    
    alert('Všetky dáta boli vymazané!');
}

// Load data from JSON file
function loadFromJSON() {
    fetch('data.json?t=' + Date.now())
        .then(response => {
            if (!response.ok) throw new Error('Súbor data.json nebol nájdený');
            return response.json();
        })
        .then(data => {
            localStorage.setItem('sportsTeams', JSON.stringify(data.teams || []));
            localStorage.setItem('sportsMatches', JSON.stringify(data.matches || []));
            localStorage.setItem('lastUpdated', data.lastUpdated || Date.now());
            
            updateAllStandings();
            loadTeamsTab();
            loadMatchesTab();
            loadManageTab();
            updateTeamSelects();
            
            alert('Dáta boli úspešne načítané z data.json!');
        })
        .catch(error => {
            alert('Chyba pri načítavaní: ' + error.message);
            console.error('Error loading data.json:', error);
        });
}

// Save data to server automatically
function saveToServer() {
    const data = {
        teams: getTeams(),
        matches: getMatches(),
        lastUpdated: Date.now()
    };
    
    fetch('save-data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            localStorage.setItem('lastUpdated', result.timestamp);
            console.log('Data automatically saved to server');
        } else {
            console.error('Save failed:', result.error);
        }
    })
    .catch(error => {
        console.error('Error saving to server:', error);
        // Silently fail - data is still in localStorage
    });
}

// Manual publish function (backup/download)
function publishToJSON() {
    const data = {
        teams: getTeams(),
        matches: getMatches(),
        lastUpdated: Date.now()
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Záložný súbor data.json bol stiahnutý!');
}

// Logout functionality
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        sessionStorage.removeItem('adminLoggedIn');
        isLoggedIn = false;
        adminBtn.innerHTML = '<i class="fas fa-lock"></i> Admin';
        adminModal.style.display = 'none';
        alert('Odhlásenie úspešné');
    }
});
