// DOM interaction variables
var winsText = document.getElementById("wins-text");
var currentWordText = document.getElementById("currentword-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");
var answerText = document.getElementById("answer-text");
var pokePic = document.getElementById("poke-pic");
var themeOn = document.getElementById("theme-mp3");
var whosThat = document.getElementById("whos-that");
var badEnd = document.getElementById("bad-end");
var start = document.getElementById("start-btn");
var bgCircle = document.getElementById("bg-circle");

// Declare variables to initialize
var currentWord, wins

var wordguess = {
answer: [],
guessesLeft: 10,
lettersGuessed: [],
pokemon: ["pikachu", "squirtle"],
spelling: [
    ["p", "i", "k", "a", "c", "h", "u"]
    ["s", "q", "u", "i", "r", "t", "l", "e"]
],
word: this.pokemon[Math.floor(Math.random() * this.pokemon.length)],
}

console.log(wordguess.word);