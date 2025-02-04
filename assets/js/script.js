document.addEventListener("DOMContentLoaded", loadPlayers);

document.getElementById("playerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value.trim();
    let score = parseInt(document.getElementById("score").value);
    let level = parseInt(document.getElementById("level").value);

    if (!name || isNaN(score) || isNaN(level)) return;

    let players = JSON.parse(localStorage.getItem("players")) || [];
    
    players.push({ name, score, level });

    players.sort((a, b) => 
        a.name.localeCompare(b.name) || b.level - a.level || b.score - a.score
    );

    localStorage.setItem("players", JSON.stringify(players));

    loadPlayers();
    document.getElementById("playerForm").reset();
});

function loadPlayers() {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let tableBody = document.getElementById("playerList");
    tableBody.innerHTML = "";

    players.forEach(player => {
        let row = `<tr>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.level}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Event listener for dropdown
document.getElementById("sortOptions").addEventListener("change", function() {
    let selectedOption = this.value;
    sortPlayers(selectedOption);
});

function sortPlayers(criteria) {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    players.sort((a, b) => {
        if (criteria === "name") {
            return a.name.localeCompare(b.name);
        } else if (criteria === "score") {
            return b.score - a.score;
        } else if (criteria === "level") {
            return b.level - a.level;
        }
    });

    localStorage.setItem("players", JSON.stringify(players));
    loadPlayers();
}
