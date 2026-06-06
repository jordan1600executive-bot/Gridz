let grid = Array(16).fill(null);
let score = 0;

// Scrabble-weighted letter distribution
const letterBag = "AAAAAAAAAABBBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIJKLLLLMMNNNNNNOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
// Optimized 4-letter dictionary
const dictionary = ["ABLE", "ALLY", "ALSO", "AREA", "AUTO", "BACK", "BALL", "BAND", "BANK", "BASE", "BEAR", "BEAT", "BELL", "BEST", "BILL", "BODY", "BOOK", "BOTH", "CALL", "CARD", "CARE", "CASE", "CITY", "CLUB", "COAL", "COLD", "COME", "COOK", "COOL", "COST", "DASH", "DATA", "DEAL", "DEEP", "DOOR", "DOWN", "DRAW", "DRUM", "DUST", "EACH", "EAST", "EASY", "EDGE", "ELSE", "EVEN", "EVER", "FACE", "FACT", "FAIR", "FALL", "FAST", "FEEL", "FILL", "FIND", "FIRE", "FISH", "FIVE", "FLAT", "FLOW", "FOOD", "FOOT", "FORM", "FOUR", "FREE", "FROM", "FULL", "GAME", "GAVE", "GIRL", "GIVE", "GLAD", "GOLD", "GOOD", "GRAY", "GREW", "HALF", "HALL", "HAND", "HARD", "HAVE", "HEAD", "HEAR", "HEAT", "HELD", "HELP", "HERE", "HIGH", "HILL", "HOLD", "HOME", "HOPE", "HOUR", "HOUSE", "IDEA", "INTO", "IRON", "ITEM", "JOIN", "JUMP", "JUST", "KEEP", "KIND", "KING", "KNEE", "KNEW", "KNOW", "LACK", "LADY", "LAND", "LAST", "LATE", "LEAD", "LEFT", "LESS", "LIFE", "LIKE", "LINE", "LIST", "LIVE", "LONG", "LOOK", "LOST", "LOVE", "MADE", "MAIN", "MAKE", "MANY", "MARK", "MEET", "MIND", "MINE", "MISS", "MORE", "MOST", "MOVE", "MUCH", "MUST", "NAME", "NEAR", "NEED", "NEXT", "NICE", "NIGHT", "NINE", "NONE", "NOON", "NOTE", "NOUN", "NUNS", "ONCE", "ONLY", "ONTO", "OPEN", "OVER", "PAGE", "PAID", "PART", "PASS", "PAST", "PLAN", "PLAY", "POOL", "PORT", "POST", "PULL", "PUSH", "PUTS", "RACE", "RAIN", "RATE", "READ", "REAL", "REST", "RIDE", "RING", "RISE", "ROAD", "ROCK", "ROLE", "ROLL", "ROOF", "ROOT", "RULE", "SAFE", "SAID", "SALE", "SALT", "SAME", "SAVE", "SEAT", "SEED", "SEEK", "SEEM", "SEND", "SENT", "SHIP", "SHOP", "SIDE", "SITE", "SIZE", "SLOW", "SNOW", "SOFT", "SOME", "SONG", "SOON", "SORT", "SOUL", "STAR", "STAY", "STEP", "STOP", "SUCH", "SURE", "TAKE", "TALE", "TALK", "TALL", "TEAM", "TELL", "TENT", "TERM", "TEST", "THAN", "THAT", "THEM", "THEN", "THEY", "THIS", "THUS", "TICK", "TIME", "TINY", "TITE", "TOOL", "TOPP", "TOUR", "TOWN", "TREE", "TRIP", "TRUE", "TUNE", "TURN", "TYPE", "UNIT", "UPON", "USED", "USER", "VERY", "VIEW", "WAIT", "WALK", "WALL", "WANT", "WARM", "WASH", "WAVE", "WAYS", "WEEK", "WELL", "WENT", "WERE", "WEST", "WHAT", "WHEN", "WHOM", "WIDE", "WIFE", "WILD", "WILL", "WIND", "WINE", "WING", "WIRE", "WISE", "WISH", "WITH", "WOOD", "WORD", "WORK", "YARD", "YEAR", "YOUR", "ZERO", "ZONE"];

let currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));

function renderGame() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = "";
    grid.forEach((v, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = v || '';
        tile.onclick = () => placeLetter(i);
        gridDiv.appendChild(tile);
    });
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('current-letter').innerText = currentLetter;
}

function placeLetter(index) {
    if (grid[index] === null) {
        grid[index] = currentLetter;
        score += 10;
        
        let wiped = false;
        // Check Rows (Horizontal)
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).join('');
            if (row.length === 4 && dictionary.includes(row)) {
                for (let j = 0; j < 4; j++) grid[i * 4 + j] = null;
                score += 500;
                wiped = true;
            }
        }
        // Check Columns (Vertical)
        for (let i = 0; i < 4; i++) {
            let col = (grid[i]||"") + (grid[i+4]||"") + (grid[i+8]||"") + (grid[i+12]||"");
            if (col.length === 4 && dictionary.includes(col)) {
                grid[i] = grid[i+4] = grid[i+8] = grid[i+12] = null;
                score += 500;
                wiped = true;
            }
        }
        
        currentLetter = letterBag.charAt(Math.floor(Math.random() * letterBag.length));
        renderGame();

        if (!grid.includes(null)) {
            alert("GAME OVER! Score: " + score);
            location.reload();
        }
    }
}
renderGame();
