const readline = require('readline-sync');

let sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8, sq9;

const tttHub = {
  displayWelcome: function() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
  },
  readyToPlay: function() {
    return readline.question("Enter 'y' when you are ready to play; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  joinWith: function(arr, delim = ', ', conn = 'or') {
    if (arr.length < 2) return arr.join('');
    if (arr.length === 2) return `${arr[0]} ${conn} ${arr[1]}`;
    let initialStr = arr.slice(0, arr.length - 1).join(delim);
    return `${initialStr}${delim}${conn} ${arr[arr.length - 1]}`;
  },
  getHumanMove: function() {
    const stringToDig = {
      first: '1', second: '2', third: '3', fourth: '4', fifth: '5',
      sixth: '6', seventh: '7', eighth: '8', ninth: '9'
    };
    const digToString = {
      1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth',
      6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth'
    };
    const options = Object.keys(this).filter(function(key) {
      return this[key].state === ' ';
    }, this);
    const mapped = options.map(ele => stringToDig[ele]);
    let humanChoice = readline.question(`Choose a square: ${tttHub.joinWith(mapped)}:\n`);
    while (!mapped.includes(humanChoice)) {
      console.log("Whoops!");
      humanChoice = readline.question();
    }
    this[digToString[humanChoice]].state = 'X';
  },
  getRandomIdxFromInterval: function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  },
  getCompMove: function() {
    const options = Object.keys(this).filter(function(key) {
      return this[key].state === ' ';
    }, this);
    let draw = tttHub.getRandomIdxFromInterval(0, options.length - 1);
    let compChoice = options[draw];
    this[compChoice].state = 'O';
  },
  displayResults: function() {
    console.log(`The result is...: ${this.winner}`);
  },
  displayGoodbye: function() {
    console.log("Thank you! Goodbye!");
  }
};

const winLinesHub = {
  doIHaveAWin: function() {
    const possibilities = Object.keys(this);
    for (let idx = 0; idx < possibilities.length; idx += 1) {
      if (this[possibilities[idx]].first.state === 'X' && this[possibilities[idx]].second.state === 'X' && this[possibilities[idx]].third.state === 'X') {
        this.winner = "You Win!";
        return true;
      }
      if (this[possibilities[idx]].first.state === 'O' && this[possibilities[idx]].second.state === 'O' && this[possibilities[idx]].third.state === 'O') {
        this.winner = "Computer Wins!";
        return true;
      }
    }
    return false;
  },
  init: function() {
    this.first = { first: sq1, second: sq2, third: sq3 };
    this.second = { first: sq4, second: sq5, third: sq6 };
    this.third = { first: sq7, second: sq8, third: sq9 };
    this.fourth = { first: sq1, second: sq4, third: sq7 };
    this.fifth = { first: sq2, second: sq5, third: sq8 };
    this.sixth = { first: sq3, second: sq6, third: sq9 };
    this.seventh = { first: sq1, second: sq5, third: sq9 };
    this.eighth = { first: sq3, second: sq5, third: sq7 };
    Object.defineProperty(this, "winner", {
      value: "Draw!",
      writable: true,
      configurable: true,
      enumerable: false
    });
    return this;
  }
};

const boardHub = {
  displayMyself: function() {
    console.clear();
    console.log("You are 'X'. Computer is 'O'.");
    console.log('');
    console.log('     |     |');
    console.log(`  ${this.first.state}  |  ${this.second.state}  |  ${this.third.state}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.fourth.state}  |  ${this.fifth.state}  |  ${this.sixth.state}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.seventh.state}  |  ${this.eighth.state}  |  ${this.ninth.state}`);
    console.log('     |     |');
    console.log('');
  },
  amIFull: function() {
    return Object.keys(this).filter(function(key) {
      return this[key].state === ' ';
    }, this).length === 0;
  },
  init: function() {
    this.first = sq1;
    this.second = sq2;
    this.third = sq3;
    this.fourth = sq4;
    this.fifth = sq5;
    this.sixth = sq6;
    this.seventh = sq7;
    this.eighth = sq8;
    this.ninth = sq9;
    return this;
  }
};

const tttEngine = Object.create(tttHub);

tttEngine.initializeSquares = function() {
  sq1 = { state: ' ' };
  sq2 = { state: ' ' };
  sq3 = { state: ' ' };
  sq4 = { state: ' ' };
  sq5 = { state: ' ' };
  sq6 = { state: ' ' };
  sq7 = { state: ' ' };
  sq8 = { state: ' ' };
  sq9 = { state: ' ' };
};

tttEngine.play = function() {
  this.displayWelcome();
  while (this.readyToPlay()) {
    this.initializeSquares();
    let winLines = Object.create(winLinesHub).init();
    let board = Object.create(boardHub).init();
    let currentPlayer = "human";
    while (!winLines.doIHaveAWin() && !board.amIFull()) {
      board.displayMyself();
      if (currentPlayer === "human") {
        this.getHumanMove.call(board);
        currentPlayer = "computer";
      } else {
        this.getCompMove.call(board);
        currentPlayer = "human";
      }
    }
    board.displayMyself();
    this.displayResults.call(winLines);
  }
  this.displayGoodbye();
};

tttEngine.play();
