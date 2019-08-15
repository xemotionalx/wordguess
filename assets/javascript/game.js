/**** WORD GUESS / HANGMAN GAME 
    // score resets to 0
    // guesses reset to 10
    // letters guessed is blank
    // original picture is up
    // text says "who's that pokemon?!" or it's blank
    // the computer generates a random word 
            // from a variable that is an array
            // each variable in the array is an object
        // *FOR* the length of that word, _ _ _ appears


// when user hits a key, the game starts:
// each time the user enters a key:
    // IF the key is a match but not all have been guessed: 
        // the letter shows up on the screen 
        // replacing _ _ _
    // ELSE IF the key is not a match, and there are more than 0 guesses
        // guesses go down 1
        // letters go in 'letters guessed'
    // ELSE IF the key has already been guessed (is in correct or used):
        // Nothing happens
    // ELSE IF key is a match and all letters are guessed:
        // picture changes (matches the pokemon)
        // sound plays (matches the pokemon)
        // guesses left reset
    // ELSE if guesses get to 0:
        //  Game ends & resets
***/

// theme music starts playing
window.onload = function() {
    document.getElementById("theme-mp3").play();
}

//DOM interaction
var winsText = document.getElementById("wins-text");
var currentWordText = document.getElementById("currentword-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");
var answerText = document.getElementById("answer-text");
var pokePic = document.getElementById("poke-pic");


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

// reset or initialize game
reset();

function updateWord() {
    currentWordText.textContent = currentWord.join(" ");
};

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
        guessesLeftText.textContent = "GAME OVER";
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
    console.log(word);

    // CURRENT WORD section: generate underscores based on length of word.spelling
    for (i = 0; i < word.spelling.length; i++) {
        currentWord.push("_");
    }

};