let grid = Array(16).fill(null);
let score = 0;
// Balanced letter bag
const letterBag = "AAAAAAAAEEEEEEEEIIIIIIIIIOOOOOOOOOUUUULLLLNNNNRRRRRRSSSSSSSTTTTTTT";
// Expanded dictionary
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY", "TITE", "TIME", "MATE", "TALE", "SALT", "LAST"];

let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

function renderGame() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = "";
    grid.forEach((v, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = v || '';
        tile.onclick = () => placeLetter(i);
        gridDiv.appendChild(tile);
    });
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('current-letter').innerText = currentLetter;
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    document.getElementById('score-list').innerHTML = scores.map(s => `<div>${s.name}: ${s.score}</div>`).join('');
}

function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;
        
        let rowCleared = false;
        // Check rows
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
                rowCleared = true;
            }
        }
        
        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderGame();

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

renderGame();
