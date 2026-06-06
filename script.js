let grid = Array(16).fill(null);
let score = 0;
// We use a weighted string to make vowels much more common
const letterBag = "AAAAAAAAAEEEEEEEEEEEEIIIIIIIIIOOOOOOOOUUUULLLLNNNNRRRRRRSSSSSSTTTTTT";
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY"];

let currentLetter = getRandomLetter();

function getRandomLetter() {
    return letterBag.charAt(Math.floor(Math.random() * letterBag.length));
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
        checkWords(); 
        currentLetter = getRandomLetter();
        render();
        if (!grid.includes(null)) gameOver();
    }
}

function checkWords() {
    for (let i = 0; i < 4; i++) {
        let row = grid.slice(i * 4, i * 4 + 4).join('');
        if (row.length === 4 && dictionary.includes(row)) {
            for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
            score += 500;
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
