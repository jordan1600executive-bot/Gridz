let grid = Array(16).fill(null);
let score = 0;

// Vowel-heavy bag: 50% vowels, common consonants, almost no V, X, or Z
const letterBag = "AAAAAAAAAEEEEEEEEEEIIIIIIIIOOOOOOOUUUUSSSSTTTTRRRRLLLLNNNNMMHHDDB";
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY", "TITE", "TIME", "MATE", "TALE", "SALT", "LAST", "NUNS", "TEST", "TENT", "TOSS", "SOON", "MOON", "MALL", "SALE", "SEAT"];

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
}

function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;
        
        // Wipe logic: Check rows AND columns every single move
        let wiped = false;
        
        // Horizontal Rows
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
                wiped = true;
            }
        }
        
        // Vertical Columns
        for (let i = 0; i < 4; i++) {
            let col = (grid[i]||"") + (grid[i+4]||"") + (grid[i+8]||"") + (grid[i+12]||"");
            if (col.length === 4 && dictionary.includes(col)) {
                grid[i] = grid[i+4] = grid[i+8] = grid[i+12] = null;
                score += 500;
                wiped = true;
            }
        }
        
        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderGame();
    }
}
renderGame();
