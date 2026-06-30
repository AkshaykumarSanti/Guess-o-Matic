// ===============================
// Guess-O-Mania
// Part 5 - Higher / Lower Hint
// ===============================

// Select HTML Elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const message = document.getElementById("message");
const difficulty = document.getElementById("difficulty");

// Game Variable
let randomNumber;

// -------------------------
// Start New Game
// -------------------------

function startGame() {

    const maxNumber = Number(difficulty.value);

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    guessInput.value = "";

    guessInput.disabled = false;

    guessButton.disabled = false;

    message.textContent = `Guess a number between 1 and ${maxNumber}.`;

}

