function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;
        
        // 1. RUN WIPE LOGIC
        // Check Rows
        for (let i = 0; i < 4; i++) {
            let rowStart = i * 4;
            let row = grid.slice(rowStart, rowStart + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[rowStart + j] = null;
                score += 500;
            }
        }
        // Check Columns
        for (let i = 0; i < 4; i++) {
            let col = (grid[i] || "") + (grid[i+4] || "") + (grid[i+8] || "") + (grid[i+12] || "");
            if (col.length === 4 && dictionary.includes(col)) {
                grid[i] = grid[i+4] = grid[i+8] = grid[i+12] = null;
                score += 500;
            }
        }
        
        // 2. GET NEW LETTER
        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        
        // 3. FORCE RE-RENDER (This updates the screen)
        renderGame();
    }
}
