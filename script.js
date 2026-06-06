let board = {}; 
let score = 0;
let dictionary = [];

// Load the full English dictionary
async function initGame() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const text = await response.text();
    dictionary = text.split('\n').filter(word => word.length === 4).map(w => w.toUpperCase().trim());
    renderBoard();
}

// "Smart" letter: picks a letter from a real word so you aren't stuck
function getSmartLetter() {
    let word = dictionary[Math.floor(Math.random() * dictionary.length)];
    return word ? word.charAt(Math.floor(Math.random() * 4)) : 'A';
}

let currentLetter = getSmartLetter();

function placeLetter(x, y) {
    if (!board[`${x},${y}`]) {
        board[`${x},${y}`] = currentLetter;
        score += 10;
        
        // INSTANT WIPE LOGIC
        const dirs = [[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[0,3]]];
        for (let path of dirs) {
            let word = path.map(p => board[`${x + p[0]},${y + p[1]}`] || "").join("");
            if (dictionary.includes(word)) {
                path.forEach(p => delete board[`${x + p[0]},${y + p[1]}`]);
                score += 500;
            }
        }
        
        currentLetter = getSmartLetter();
        renderBoard();
    }
}

function renderBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    // This loops through the coordinates to draw your "Snake/Base" layout
    for (let y = -2; y < 8; y++) {
        for (let x = -2; x < 8; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.innerText = board[`${x},${y}`] || '';
            tile.onclick = () => placeLetter(x, y);
            grid.appendChild(tile);
        }
    }
    document.getElementById('score-board').innerText = `Score: ${score}`;
}

initGame();
