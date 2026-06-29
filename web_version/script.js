// ------------------------------
// Guess-O-Mania
// Phase 3 - Game Logic
// ------------------------------

// Get HTML elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const message = document.getElementById("message");

const attemptsText = document.getElementById("attempts");
const difficulty = document.getElementById("difficulty");

// Game variables
let randomNumber;
let attempts;

// Start game
startGame();

function startGame() {

    attempts = 0;
    attemptsText.textContent = attempts;

    const maxNumber = Number(difficulty.value);

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    message.textContent = `Guess a number between 1 and ${maxNumber}.`;

    guessInput.value = "";

    guessButton.disabled = false;

    guessInput.disabled = false;

}

// Check Guess
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

    attempts++;

    attemptsText.textContent = attempts;

    if (userGuess > randomNumber) {

        message.textContent = "⬇ Lower Number Please";

    }

    else if (userGuess < randomNumber) {

        message.textContent = "⬆ Higher Number Please";

    }

    else {

        message.textContent = `🎉 Correct! You found the number in ${attempts} attempts.`;

        guessButton.disabled = true;

        guessInput.disabled = true;

    }

    guessInput.value = "";

    guessInput.focus();

}

// Events
guessButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        checkGuess();

    }

});

restartButton.addEventListener("click", startGame);

difficulty.addEventListener("change", startGame);