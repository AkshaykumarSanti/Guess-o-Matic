// ===============================
// Guess-O-Mania
// Day 1
// ===============================

// Select HTML Elements
const rangeText = document.getElementById("range-text");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const message = document.getElementById("message");
const difficulty = document.getElementById("difficulty");
const attemptsText = document.getElementById("attempts");
const gamesPlayedText = document.getElementById("games-played");
const gamesWonText = document.getElementById("games-won");

// ===============================
// Game Variables
// ===============================

let randomNumber;
let attempts;

let gamesPlayed = 0;
let gamesWon = 0;

// ===============================
// Start New Game
// ===============================

function initializeGame() {

    gamesPlayedText.textContent = gamesPlayed;
    gamesWonText.textContent = gamesWon;

    const maxNumber = Number(difficulty.value);
    rangeText.innerHTML = `Guess a number between <strong>1</strong> and <strong>${maxNumber}</strong>.`;

    randomNumber = null;

    attempts = 0;
    attemptsText.textContent = attempts;

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = true;
    difficulty.disabled = false;

    message.textContent = `🎯 Select a difficulty and enter a number to start playing.`;
    message.className = "info";

}

function startGame() {

    gamesPlayed++;
    gamesPlayedText.textContent = gamesPlayed;

    const maxNumber = Number(difficulty.value);
    rangeText.innerHTML = `Guess a number between <strong>1</strong> and <strong>${maxNumber}</strong>.`;

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    attempts = 0;
    attemptsText.textContent = attempts;

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = true;
    difficulty.disabled = true;

    message.textContent = `🎯 New Game Started! Guess a number between 1 and ${maxNumber}.`;
    message.className = "info";

    guessInput.focus();

}

// ===============================
// Check User Guess
// ===============================

function checkGuess() {

    const userGuess = Number(guessInput.value);
    const maxNumber = Number(difficulty.value);

    // Empty Input
    if (guessInput.value.trim() === "") {

        message.textContent = "Please enter a number.";
        message.className = "warning";

        guessButton.disabled = true;
        guessInput.focus();
        return;

    }

    // Range Validation
    if (userGuess < 1 || userGuess > maxNumber) {

        message.textContent = `Enter a number between 1 and ${maxNumber}.`;
        message.className = "error";

        guessInput.value = "";
        guessButton.disabled = true;
        guessInput.focus();
        return;

    }

    // Count Attempt
    attempts++;
    attemptsText.textContent = attempts;

    // Guess Too Low
    if (userGuess < randomNumber) {

        message.textContent = "⬆ Higher Number Please";
        message.className = "warning";

    }

    // Guess Too High
    else if (userGuess > randomNumber) {

        message.textContent = "⬇ Lower Number Please";
        message.className = "warning";

    }

    // Correct Guess
    else {

        // Update game counters
        gamesWon++;

        gamesWonText.textContent = gamesWon;

        const level =
            difficulty.value === "50"
                ? "Easy"
                : difficulty.value === "100"
                ? "Medium"
                : "Hard";

        message.innerHTML = `
        🎉 <strong>Congratulations!</strong><br><br>
        ✅ Number: <strong>${randomNumber}</strong><br>
        🎯 Attempts: <strong>${attempts}</strong><br>
        🏆 Difficulty: <strong>${level}</strong>
        `;

        message.className = "success";

        guessInput.disabled = true;
        guessButton.disabled = true;
        difficulty.disabled = false;

        return;

    }

        // Prepare for next guess
    guessInput.value = "";
    guessButton.disabled = true;
    guessInput.focus();

}

// -------------------------
// Event Listeners
// -------------------------

// Guess Button
guessButton.addEventListener("click", checkGuess);

// Press Enter
guessInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && !guessButton.disabled) {

        checkGuess();

    }

});

// Handle Input
guessInput.addEventListener("input", function () {

    // Allow only numbers
    guessInput.value = guessInput.value.replace(/[^0-9]/g, "");

    // Maximum 3 digits
    if (guessInput.value.length > 3) {

        guessInput.value = guessInput.value.slice(0, 3);

    }

    // Enable / Disable Guess Button
    if (guessInput.value.trim() === "") {

        guessButton.disabled = true;

    }
    else {

        guessButton.disabled = false;

        message.textContent = "💡 Make your guess!";
        message.className = "info";

    }

});

// Restart Game
restartButton.addEventListener("click", function () {

    startGame();

});

// Change Difficulty
difficulty.addEventListener("change", function () {

    startGame();

});

// ===============================
// Initialize Page
// ===============================

initializeGame();