let grid = Array(16).fill(null);
let score = 0;
const letterBag = "AAAAAAAAAEEEEEEEEEEEEIIIIIIIIIOOOOOOOOUUUULLLLNNNNRRRRRRSSSSSSTTTTTT";
const dictionary = ["HAWK", "LOOK", "WOOD", "COOL", "POOL", "TEAM", "BALL", "SITE", "GAME", "PLAY"];

let currentLetter = "";

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

function showLeaderboard() {
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    document.getElementById('score-list').innerHTML = scores.map(s => `<div>${s.name}: ${s.score}</div>`).join('');
}

// THIS IS THE FIX: Wait until the page loads
window.onload = () => {
    currentLetter = getRandomLetter();
    render();
    showLeaderboard();
};
