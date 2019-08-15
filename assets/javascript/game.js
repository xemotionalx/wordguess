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

//DOM interaction
var winsText = document.getElementById("wins-text");
var currentWordText = document.getElementById("currentword-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");

// Declare variables to initialize
var wins = 0;
var currentWord = [];
var guessesLeft = 10;
var lettersGuessed = [];

// Objects that store info for each possible word
var pikachu = {
answer: "pikachu",
pokePic: "pokemon-0",
spelling: ["p", "i", "k", "a", "c", "h", "u"]
};

var squirtle = {
    answer: "squirtle",
    pokePic: "pokemon-1",
    spelling: ["s", "q", "u", "i", "r", "t", "l", "e"]

};

//Computer picks random word from array
var pokemon = [pikachu, squirtle];
var word = pokemon[Math.floor(Math.random() * pokemon.length)];

// CURRENT WORD section: generate underscores based on length of word.spelling
for (i = 0; i < word.spelling.length; i++) {
    currentWord.push("_");
}

function updateWord() {
    currentWordText.textContent = currentWord.join(" ");
};

console.log(word);

document.onkeyup = function playGame() {

    var userGuess = event.key;

    //check if userGuess matches any of the letters in the array
    var checkGuess = word.spelling.includes(userGuess);

    //check if the arrays of currentWord & word.spelling match (completed word)

    if (checkGuess === true && guessesLeft > 0) {
        var x = word.spelling.indexOf(userGuess);

        winsText.textContent = wins;
        currentWord[x] = userGuess;
        updateWord();

    } else if (checkGuess === false && guessesLeft > 0) {
        guessesLeft--
    } else if (guessesLeft === 0) {
        init();
    }

    // when key is pressed, check to see if it matches anything in array
    // IF the key is a match  
    // the letter shows up on the screen 
    // replacing _ _ _

    winsText.textContent = "Wins:" + wins;
    guessesLeftText.textContent = guessesLeft;

};
