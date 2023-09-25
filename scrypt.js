let activePlayer = 1;
let currentScore = 0;
let globalScores = [0, 0];
let gamePlaying = true;

// Fonction pour initialiser le jeu
function init() {
    activePlayer = 1;
    currentScore = 0;
    globalScores = [0, 0];
    gamePlaying = true;

    document.getElementById('globalScore1').textContent = '0';
    document.getElementById('globalScore2').textContent = '0';
    document.getElementById('roundScore1').textContent = '0';
    document.getElementById('roundScore2').textContent = '0';

    document.getElementById('rollDice').addEventListener('click', rollDice);
    document.getElementById('hold').addEventListener('click', hold);
    document.getElementById('newGame').addEventListener('click', init);
}

function rollDice() {
    if (gamePlaying) {
        // Générer un nombre aléatoire entre 1 et 6
        const dice = Math.floor(Math.random() * 6) + 1;

        // Masquer toutes les images des dés
        for (let i = 1; i <= 6; i++) {
            document.querySelector(`#dice-${i}`).style.display = 'none';
        }

        // Afficher l'image du dé correspondante
        document.querySelector(`#dice-${dice}`).style.display = '';

        // Mettre à jour le score courant si le résultat n'est pas 1
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#roundScore${activePlayer}`).textContent = currentScore;
        } else {
            // Passer au joueur suivant
            switchPlayer();
        }
    }
}

function hold() {
    if (gamePlaying) {
        // Ajouter le score actuel au score global
        globalScores[activePlayer - 1] += currentScore;

        // Mettre à jour visuellement le score global
        document.querySelector(`#globalScore${activePlayer}`).textContent = globalScores[activePlayer - 1];

        // Vérifier si le joueur a gagné
        if (globalScores[activePlayer - 1] >= 100) {
            document.querySelector(`#globalScore${activePlayer}`).textContent = 'GAGNANT !';
            gamePlaying = false;
        } else {
            // Passer au joueur suivant
            switchPlayer();
        }
    }
}

function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#roundScore${activePlayer}`).textContent = '0';

    if (activePlayer === 1) {
        activePlayer = 2;
    } else {
        activePlayer = 1;
    }
}

// Initialiser le jeu au chargement de la page
init();