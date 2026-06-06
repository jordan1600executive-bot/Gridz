// A map to store letters at {x,y} coordinates
let board = {}; 
let score = 0;
const letterBag = "AAAAAAAAAEEEEEEEEEEEIIIIIIIIOOOOOOOUUUUSSSSTTTTRRRRLLLLNNNNMMBCDFGHPWYVKJXQZ";
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY", "TITE", "TIME", "MATE", "TALE", "SALT", "LAST", "NUNS", "TEST", "TENT", "TOSS"];

let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

function placeLetter(x, y) {
    let key = `${x},${y}`;
    if (!board[key]) {
        board[key] = currentLetter;
        score += 10;
        
        // After placing, check for any 4-letter words passing through this point
        checkWordAt(x, y);
        
        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderBoard();
    }
}

function checkWordAt(x, y) {
    // This checks all 4 directions for a word starting or ending here
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    // ... Logic to check neighbors and see if they form a dictionary word
}

function renderBoard() {
    // Instead of a fixed grid, this draws tiles based on coordinates
    // We allow user to click any empty spot next to an existing tile
}
