/**** WORD GUESS / HANGMAN GAME
 //When Button is clicked... 
    // score resets to 0
    // guesses reset to 10
    // letters guessed is blank
    // original picture is up
    // text says "who's that pokemon?!"
    //theme music starts playing
    // the computer generates a random word 
            // from a variable that is an array
            // each variable in the array is an object
        // *FOR* the length of that word, _ _ _ appears


// Once the game begins...
// each time the user enters a key:
    // IF the key is a match but not all have been guessed: 
        // the letter shows up on the screen 
        // replacing _ _ _
    // ELSE IF the key is not a match, and there are more than 0 guesses
        // guesses go down 1
        // letters go in 'letters guessed'
    // ELSE IF the key has already been guessed (is in correct or used):
        // Nothing happens
    // ELSE IF all letters have been guessed, & word is a match:
        // picture changes (matches the pokemon)
        // sound plays (matches the pokemon)
        // guesses left reset
    // ELSE if guesses get to 0:
        //  Game ends & resets
***/

// DOM interaction variables
var winsText = document.getElementById("wins-text");
var currentWordText = document.getElementById("currentword-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");
var answerText = document.getElementById("answer-text");
var pokePic = document.getElementById("poke-pic");
var themeOn = document.getElementById("theme-mp3");
var whosThat = document.getElementById("whos-that");
var nextWordBtn = document.getElementById("next-word");

// Declare variables to initialize
var currentWord, guessesLeft, lettersGuessed
var wins = 0;

// Objects that store info for each possible word
var pikachu = {
    answer: "pikachu",
    spelling: ["p", "i", "k", "a", "c", "h", "u"]
};

var squirtle = {
    answer: "squirtle",
    spelling: ["s", "q", "u", "i", "r", "t", "l", "e"]
};

var clefairy = {
    answer: "clefairy",
    spelling: ["c", "l", "e", "f", "a", "i", "r", "y"]
};

var togepi = {
    answer: "togepi",
    spelling: ["t", "o", "g", "e", "p", "i"]
};

var horsea = {
    answer: "horsea",
    spelling: ["h", "o", "r", "s", "e", "a"]
};

//Computer picks random word from array
var pokemon = [pikachu, squirtle, clefairy, togepi, horsea];
var word = pokemon[Math.floor(Math.random() * pokemon.length)];

// This function updates dom to place underscores
function updateWord() {
    currentWordText.textContent = currentWord.join(" ");
};

//function to play theme song 
function playTheme() {
    themeOn.play();
};

// Buttons to toggle the music on/off
document.getElementById("pause-music-btn").onclick = function pauseMusic() {
    whosThat.play();
    themeOn.pause();
};

document.getElementById("play-music-btn").onclick = function playMusic() {
    themeOn.play();
};

// START GAME when button is pressed

document.getElementById("start-btn").onclick = function startGame() {

    playTheme();

    reset();
};

//Game playing function as keys are pressed

document.onkeyup = function playGame() {

    // sound is selected based on chosen word
    var soundOn = document.getElementById(word.answer + "-mp3");

    //this function stores the command to play audio based on selected pokemon
    function playSound() {
        soundOn.play();
    };

    var userGuess = event.key;

    //check if userGuess matches any of the letters in the array
    var checkGuess = word.spelling.includes(userGuess);
    var checkLettersGuessed = lettersGuessed.includes(userGuess);

    //check if the arrays of currentWord & word.spelling match (completed word)

    if (JSON.stringify(word.spelling) === JSON.stringify(currentWord)) {
        playSound();
        wins++
        pokePic.src = 'assets/images/pokemon-' + pokemon.indexOf(word) + '.png';
        answerText.textContent = "It's " + word.answer + "!!";
        nextWordBtn.style.display = "block";
        reset();
        updateWord();
    } else if (checkGuess === true && guessesLeft >= 1) {
        //find matching index
        var x = word.spelling.indexOf(userGuess);

        //update the currentWord array with userGuess
        currentWord[x] = userGuess;
        updateWord();
    } else if (checkGuess === false && guessesLeft > 1 && checkLettersGuessed === false) {
        guessesLeft--
        //wrong letter is added to lettersGuessed array
        lettersGuessed.push(userGuess);

    } else if (guessesLeft <= 1) {
        guessesLeftText.textContent = "GAME OVER :(";
        return;
    }

    winsText.textContent = "Wins: " + wins;
    guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
    lettersGuessedText.textContent = lettersGuessed;

};

function reset() {
    // Declare variables to initialize
    currentWord = [];
    guessesLeft = 10;
    lettersGuessed = [];
    word = pokemon[Math.floor(Math.random() * pokemon.length)];

    // CURRENT WORD section: generate underscores based on length of word.spelling
    for (i = 0; i < word.spelling.length; i++) {
        currentWord.push("_");
    }

    updateWord();
};

// Reset word when "Next Word" is pressed
nextWordBtn.onclick = function nextWord() {
    nextWordBtn.style.display = "none";
    pokePic.src = 'assets/images/pokeball.png';
    answerText.textContent = "Who's that pokemon?!";
    whosThat.play();
};