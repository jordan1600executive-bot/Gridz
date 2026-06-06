let grid = Array(16).fill(null);
let score = 0;
let currentLetter = getRandomLetter();

// Weighted function: Gives more vowels and common letters
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
        render();
        if (!grid.includes(null)) gameOver();
    }
}

function gameOver() {
    let name = prompt("GAME OVER! Enter your name for the leaderboard:");
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
