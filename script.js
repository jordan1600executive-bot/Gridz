let board = {}; 
let score = 0;
let dictionary = [];

// This map creates your exact snake shape (1 = box, 0 = empty)
const layout = [
    [1,1,1,1,1,1], // 6 wide top
    [0,0,1,1,1,1], // Staggered snake
    [0,0,1,1,1,1],
    [0,0,1,1,1,1],
    [1,1,1,0,0,0]  // 3 box base
];

async function initGame() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const text = await response.text();
    dictionary = text.split('\n').filter(w => w.length === 4).map(w => w.toUpperCase().trim());
    renderBoard();
}

function renderBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    layout.forEach((row, y) => {
        row.forEach((isTile, x) => {
            const tile = document.createElement('div');
            tile.className = isTile ? 'tile' : 'empty';
            if(isTile) {
                tile.innerText = board[`${x},${y}`] || '';
                tile.onclick = () => placeLetter(x, y);
            }
            grid.appendChild(tile);
        });
    });
}

function placeLetter(x, y) {
    if (!board[`${x},${y}`]) {
        let word = dictionary[Math.floor(Math.random() * dictionary.length)];
        board[`${x},${y}`] = word[0]; // Logic for next letter
        score += 10;
        document.getElementById('score').innerText = `Score: ${score}`;
        renderBoard();
        // Add word-checking logic here
    }
}

initGame();
