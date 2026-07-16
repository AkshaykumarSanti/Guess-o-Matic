// ===============================
// Guess-O-Mania
// Part 13 - Add Timer Display
// ===============================

// Select HTML Elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const message = document.getElementById("message");
const difficulty = document.getElementById("difficulty");
const attemptsText = document.getElementById("attempts");
const timerText = document.getElementById("timer");

// Game Variables
let randomNumber;
let attempts;

let timer = 0;
let timerInterval;

// -------------------------
// Start New Game
// -------------------------

function startGame() {

    const maxNumber = Number(difficulty.value);

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    attempts = 0;
    attemptsText.textContent = attempts;

    // Reset Timer Display
    // Reset Timer
    timer = 0;
    timerText.textContent = timer;

    // Clear previous timer
    clearInterval(timerInterval);

    // Start timer
    timerInterval = setInterval(function () {

        timer++;
        timerText.textContent = timer;

    }, 1000);

    guessInput.value = "";

    guessInput.disabled = false;
    guessButton.disabled = true;

    message.textContent = `🎯 New Game Started! Guess a number between 1 and ${maxNumber}.`;

    guessInput.focus();

}

// -------------------------
// Check User Guess
// -------------------------

function checkGuess() {

    const userGuess = Number(guessInput.value);
    const maxNumber = Number(difficulty.value);

    if (guessInput.value === "") {

        message.textContent = "Please enter a number.";
        guessButton.disabled = true;
        guessInput.focus();
        return;

    }

    if (userGuess < 1 || userGuess > maxNumber) {

        message.textContent = `Enter a number between 1 and ${maxNumber}.`;
        guessInput.value = "";
        guessButton.disabled = true;
        guessInput.focus();
        return;

    }

    attempts++;
    attemptsText.textContent = attempts;

    if (userGuess < randomNumber) {

        message.textContent = "⬆ Higher Number Please";

    }
    else if (userGuess > randomNumber) {

        message.textContent = "⬇ Lower Number Please";

    }
    else {

        message.textContent = `🎉 Congratulations! You guessed the number in ${attempts} attempts.`;

        guessInput.disabled = true;
        guessButton.disabled = true;

        return;

    }

    guessInput.value = "";
    guessButton.disabled = true;
    guessInput.focus();

}

// -------------------------
// Event Listeners
// -------------------------

guessButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        checkGuess();

    }

});

// Handle Input Changes
guessInput.addEventListener("input", function(){

    // Allow only numbers
    guessInput.value = guessInput.value.replace(/[^0-9]/g, "");

    // Limit input length
    if(guessInput.value.length > 3){

        guessInput.value = guessInput.value.slice(0,3);

    }

    // Enable / Disable Guess Button
    if(guessInput.value.trim() === ""){

        guessButton.disabled = true;

    }
    else{

        guessButton.disabled = false;

        message.textContent = "Make your guess!";

    }

});

restartButton.addEventListener("click", startGame);

difficulty.addEventListener("change", startGame);

// Start Game
startGame();