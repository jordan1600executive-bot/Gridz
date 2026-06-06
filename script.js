let grid = Array(16).fill(null);
let score = 0;
// Weighted letters (More vowels)
const letterBag = "AAAAAAAAAEEEEEEEEEEEEIIIIIIIIIOOOOOOUUUULLLLNNNNRRRRRRSSSSSSTTTTTT";
// Add more 4-letter words here as needed
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY"];

let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

// Function to refresh the screen
function renderGame() {
    // Draw Grid
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = "";
    grid.forEach((v, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = v || '';
        tile.onclick = () => placeLetter(i);
        gridDiv.appendChild(tile);
    });

    // Update Score
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('current-letter').innerText = currentLetter;

    // Update Leaderboard
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    document.getElementById('score-list').innerHTML = scores.map(s => `<div>${s.name}: ${s.score}</div>`).join('');
}

function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;

        // Check for words and clear rows
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
            }
        }

        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderGame();

        // Game Over Check
        if (!grid.includes(null)) {
            let name = prompt("GAME OVER! Enter your name:");
            let scores = JSON.parse(localStorage.getItem('highScores')) || [];
            scores.push({ name: name || "PLAYER", score: score });
            scores.sort((a, b) => b.score - a.score);
            localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 5)));
            location.reload();
        }
    }
}

// Initial draw
renderGame();
