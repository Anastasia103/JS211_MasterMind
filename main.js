'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let solutionArray = solution.split("")
  let guessArray= guess.split("")
  let correctLetters= 0
  let unmatchedSlots = ['big', 'big', 'big', 'big']
  let correctLetterLocations=0
  let spentLetter=[]
  
 for (const [index,letters] of guessArray.entries()) {
   if(guessArray[index] === solutionArray[index]){
     correctLetterLocations += 1
     spentLetter.push(letters)
   }
   else { 
         unmatchedSlots.splice(index, 1, letters)
   }
 }
for (const letters of unmatchedSlots){
  if (solutionArray.includes(letters) && Boolean(spentLetter.includes(letters)) === false){
    correctLetters += 1
    spentLetter.push(letters) 
  }
}
console.log(`${correctLetterLocations}-${correctLetters}`)}
  

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if( guess === solution) {
    console.log("You guessed it!")
    board = []
  }
  else {
    generateHint(guess)
    board.push(guess)
  }

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}