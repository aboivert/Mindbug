let scores = {
    1: 3,
    2: 3
};

function updateDisplay(player) {
    const scoreElement = document.getElementById(`score${player}`);
    const score = scores[player];
    
    // Valeur spéciale pour 0 (Crâne dessiné en SVG)
    // Valeur spéciale pour 0 (Crâne stylisé selon image)
    if (score === 0) {
        scoreElement.innerHTML = `
            <svg class="skull-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <!-- Forme générale du crâne -->
                <path d="M50,5 C30,5 18,18 18,38 C18,52 23,58 28,63 L30,88 C30,95 38,98 50,98 C62,98 70,95 70,88 L72,63 C77,58 82,52 82,38 C82,18 70,5 50,5 Z" fill="none" stroke="currentColor" stroke-width="3" />
                <!-- Yeux noirs profonds -->
                <circle cx="36" cy="45" r="10" fill="currentColor" />
                <circle cx="64" cy="45" r="10" fill="currentColor" />
                <!-- Nez -->
                <path d="M46,65 L50,55 L54,65" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M50,55 V65" stroke="currentColor" stroke-width="2" />
                <!-- Dents et mâchoire -->
                <rect x="34" y="73" width="32" height="15" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
                <line x1="42" y1="73" x2="42" y2="88" stroke="currentColor" stroke-width="2" />
                <line x1="50" y1="73" x2="50" y2="88" stroke="currentColor" stroke-width="2" />
                <line x1="58" y1="73" x2="58" y2="88" stroke="currentColor" stroke-width="2" />
                <line x1="34" y1="80" x2="66" y2="80" stroke="currentColor" stroke-width="2" />
            </svg>
        `;
        scoreElement.classList.add('skull');
    } else {
        scoreElement.textContent = score;
        scoreElement.classList.remove('skull');
    }

    // Animation de "pop"
    scoreElement.classList.remove('animate-pop');
    void scoreElement.offsetWidth; // Trigger reflow
    scoreElement.classList.add('animate-pop');
}

function changeScore(player, delta) {
    const newScore = scores[player] + delta;
    
    // Contraintes 0 - 7
    if (newScore >= 0 && newScore <= 7) {
        scores[player] = newScore;
        updateDisplay(player);
        
        // Vibration légère sur mobile
        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    }
}

function resetScores() {
    scores[1] = 3;
    scores[2] = 3;
    updateDisplay(1);
    updateDisplay(2);
    
    if (window.navigator.vibrate) {
        window.navigator.vibrate([50, 50, 50]);
    }
}

// Initialisation
window.onload = () => {
    updateDisplay(1);
    updateDisplay(2);
};
