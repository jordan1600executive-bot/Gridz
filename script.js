let board = {}; 
let score = 0;
let dictionary = [];
const letterBag = "AAAAAAAAAEEEEEEEEEEEIIIIIIIIOOOOOOOUUUUSSSSTTTTRRRRLLLLNNNNMMBCDFGHPWYVKJXQZ";

async function initGame() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const text = await response.text();
    dictionary = text.split('\n').filter(word => word.length === 4).map(w => w.toUpperCase().trim());
    renderBoard();
}

function getSmartLetter() {
    let word = dictionary[Math.floor(Math.random() * dictionary.length)];
    return word ? word.charAt(Math.floor(Math.random() * 4)) : 'A';
}

let currentLetter = getSmartLetter();

function placeLetter(x, y) {
    if (!board[`${x},${y}`]) {
        board[`${x},${y}`] = currentLetter;
        score += 10;
        
        // Instant check for 4-letter words
        const directions = [
            [[0,0], [1,0], [2,0], [3,0]], [[-1,0], [0,0], [1,0], [2,0]],
            [[-2,0], [-1,0], [0,0], [1,0]], [[-3,0], [-2,0], [-1,0], [0,0]],
            [[0,0], [0,1], [0,2], [0,3]], [[0,-1], [0,0], [0,1], [0,2]],
            [[0,-2], [0,-1], [0,0], [0,1]], [[0,-3], [0,-2], [0,-1], [0,0]]
        ];

        for (let path of directions) {
            let word = path.map(p => board[`${x + p[0]},${y + p[1]}`] || "").join("");
            if (word.length === 4 && dictionary.includes(word)) {
                for (let p of path) delete board[`${x + p[0]},${y + p[1]}`];
                score += 500;
                break;
            }
        }
        
        currentLetter = getSmartLetter();
        renderBoard();
    }
}

function renderBoard() {
    const gameDiv = document.getElementById('grid');
    gameDiv.innerHTML = "";
    // Draw 10x10 area
    for (let y = -2; y < 8; y++) {
        for (let x = -2; x < 8; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.innerText = board[`${x},${y}`] || '';
            tile.onclick = () => placeLetter(x, y);
            gameDiv.appendChild(tile);
        }
    }
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('current-letter').innerText = currentLetter;
}

initGame();
