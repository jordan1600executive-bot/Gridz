function place(index) {
    if(!grid[index]) {
        grid[index] = currentLetter;
        score += 10;
        
        // 1. Check for words BEFORE we finalize the turn
        checkWords(); 
        
        // 2. Only after checking/clearing, get a new letter
        currentLetter = getRandomLetter();
        
        // 3. Render the updated board
        render();
        
        if (!grid.includes(null)) gameOver();
    }
}

function checkWords() {
    for (let i = 0; i < 4; i++) {
        let row = grid.slice(i * 4, i * 4 + 4).join('');
        // Check if the row is full and in our list
        if (row.length === 4 && dictionary.includes(row)) {
            for (let j = 0; j < 4; j++) {
                grid[i * 4 + j] = null;
            }
            score += 500;
        }
    }
}
