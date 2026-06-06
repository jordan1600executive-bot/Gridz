let grid = Array(16).fill(null);
let score = 0;
// Heavily weighted for vowels (A, E, I, O) so you can always form words
const letterBag = "AAAAAAAAAEEEEEEEEEEEIIIIIIIIOOOOOOOUUUUSSSSTTTTRRRRLLLLNNNNMM";
// A solid list of common 4-letter words
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY", "TITE", "TIME", "MATE", "TALE", "SALT", "LAST", "NUNS", "TEST", "TENT", "TOSS", "SOON", "MOON", "MALL", "SALE", "SEAT", "NINE", "NONE", "NOTE", "BENT", "BEST", "BEAT", "BOAT", "BATH"];

let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;
        
        // INSTANT WIPE LOGIC
        // This checks everything before the screen even has time to blink
        let cleared = false;
        
        // 1. Check Rows
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
                cleared = true;
            }
        }
        
        // 2. Check Columns
        for (let i = 0; i < 4; i++) {
            let col = (grid[i] || "") + (grid[i+4] || "") + (grid[i+8] || "") + (grid[i+12] || "");
            if (col.length === 4 && dictionary.includes(col)) {
                grid[i] = grid[i+4] = grid[i+8] = grid[i+12] = null;
                score += 500;
                cleared = true;
            }
        }

        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        
        // Force the screen to update immediately
        updateUI();
    }
}

function updateUI() {
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

// Initial Run
updateUI();
