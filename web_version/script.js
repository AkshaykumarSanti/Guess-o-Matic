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

// -------------------------
// Check User Guess
// -------------------------

function checkGuess() {

    const userGuess = Number(guessInput.value);

    if (guessInput.value === "") {

        message.textContent = "Please enter a number.";

        return;

    }

    if (userGuess < 1 || userGuess > Number(difficulty.value)) {

        message.textContent = `Enter a number between 1 and ${difficulty.value}.`;

        return;

    }

    if (userGuess < randomNumber) {

        message.textContent = "⬆ Higher Number Please";

    }

    else if (userGuess > randomNumber) {

        message.textContent = "⬇ Lower Number Please";

    }

    else {

        message.textContent = "🎉 Correct! You guessed the number.";

        guessInput.disabled = true;

        guessButton.disabled = true;

    }

    guessInput.value = "";

    guessInput.focus();

}

// -------------------------
// Event Listeners
// -------------------------

guessButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", startGame);

difficulty.addEventListener("change", startGame);

// Start the first game
startGame();