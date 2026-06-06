let grid = Array(16).fill(null);
let score = 0;
let dictionary = []; // This will hold all 4-letter words
const letterBag = "AAAAAAAAAEEEEEEEEEEEEIIIIIIIIIOOOOOOUUUULLLLNNNNRRRRRRSSSSSSTTTTTT";
let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

// Fetch a real dictionary of 4-letter words
async function loadDictionary() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const text = await response.text();
    dictionary = text.split('\n').filter(word => word.length === 4).map(w => w.toUpperCase());
    console.log("Dictionary Loaded! Words count: " + dictionary.length);
}

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

async function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;

        // Check Horizontal
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
            }
        }
        // Check Vertical
        for (let i = 0; i < 4; i++) {
            let col = (grid[i] || "") + (grid[i+4] || "") + (grid[i+8] || "") + (grid[i+12] || "");
            if (col.length === 4 && dictionary.includes(col)) {
                grid[i] = grid[i+4] = grid[i+8] = grid[i+12] = null;
                score += 500;
            }
        }

        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderGame();
    }
}

// Start game
loadDictionary().then(() => renderGame());
