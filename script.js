let grid = Array(16).fill(null);
let score = 0;
let currentLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

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
        currentLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        render();
        if (!grid.includes(null)) gameOver();
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

render();
showLeaderboard();
