let grid = Array(16).fill(null);
let score = 0;
let currentLetter = getRandomLetter();
// A small sample list of 4-letter words
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL"]; 

function getRandomLetter() {
    const letters = "AAAAAAAAEEEEEEEEIIIIIIOOOOOOUUUUSSSSTTTTRRRRLLLLNNNN";
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function render() {
    document.getElementById('grid').innerHTML = grid.map((v, i) => 
        `<div class="tile" onclick="place(${i})">${v || ''}</div>`).join('');
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('current-letter').innerText = currentLetter;
}

function place(index) {
    if(!grid[index]) {
        grid[index] = currentLetter;
        score += 10;
        currentLetter = getRandomLetter();
        checkWords(); // Check for words every time you place a letter
        render();
        if (!grid.includes(null)) gameOver();
    }
}

function checkWords() {
    // Check the 4 rows
    for (let i = 0; i < 4; i++) {
        let row = grid.slice(i * 4, i * 4 + 4).join('');
        if (dictionary.includes(row)) {
            // Clear the row
            for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
            score += 500; // Big bonus for words
        }
    }
}

function gameOver() {
    let name = prompt("GAME OVER! Enter your name:");
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    scores.push({ name: name || "PLAYER", score: score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(scores.slice(0, 5)));
    location.reload();
}

render();
