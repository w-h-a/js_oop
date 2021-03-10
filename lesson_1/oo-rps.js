const readline = require("readline-sync");

const createPlayer = function(moves) {
  return {
    moves: moves
  };
};

const createHuman = function(moves) {
  const player = createPlayer(moves);
  const human = {
    choose: function() {
      let choice = readline.question("Please choose 'r' for rock, 'p' for paper, or 's' for scissors.\n").toLowerCase();
      while (!this.moves.includes(choice)) {
        console.log("Whoops! Try Again");
        choice = readline.question().toLowerCase();
      }
      return choice;
    }
  };
  return Object.assign(player, human);
};

const createComp = function(moves) {
  const player = createPlayer(moves);
  const comp = {
    choose: function() {
      const draw = Math.floor(Math.random() * this.moves.length);
      return this.moves[draw];
    }
  };
  return Object.assign(player, comp);
};

const createChoicesSubSit = function() {
  return {
    humanMove: null,
    compMove: null,
    makeChoices: function(moves) {
      this.humanMove = createHuman(moves).choose();
      this.compMove = createComp(moves).choose();
    }
  };
};

const createOutcomeSubSit = function() {
  return {
    rulesForHumanWin: { r: ["s"], p: ["r"], s: ["p"] },
    outcome: null,
    determineOutcome: function(humanMove, compMove) {
      if (humanMove === compMove) {
        this.outcome = "It's a draw!";
      } else if (this.rulesForHumanWin[humanMove].includes(compMove)) {
        this.outcome = "You win!";
      } else {
        this.outcome = "Computer wins!";
      }
    }
  };
};

const createRPSSit = function(moves) {
  return {
    choicesSubSit: createChoicesSubSit(),
    outcomeSubSit: null,
    getChoices: function() {
      this.choicesSubSit.makeChoices(moves);
    },
    getOutcomeSubSit: function() {
      this.outcomeSubSit = createOutcomeSubSit();
    },
    getOutcome: function() {
      const humanMove = this.choicesSubSit.humanMove;
      const compMove = this.choicesSubSit.compMove;
      this.outcomeSubSit.determineOutcome(humanMove, compMove);
    }
  };
};

const rpsEngine = {
  moves: { r: "rock", p: "paper", s: "scissors" },
  rpsSit: null,
  displayWelcomeMessage: function() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },
  readyToPlay: function() {
    return readline.question("Enter 'y' when you are ready to play; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  getRPSSit: function() {
    this.rpsSit = createRPSSit(Object.keys(this.moves));
  },
  displayResult: function() {
    console.log(`You chose: ${this.moves[this.rpsSit.choicesSubSit.humanMove]}.`);
    console.log(`Computer chose: ${this.moves[this.rpsSit.choicesSubSit.compMove]}.`);
    console.log(`The outcome is: ${this.rpsSit.outcomeSubSit.outcome}`);
  },
  displayGoodbyeMessage: function() {
    console.log("Thank you! Goodbye!");
  },
  play: function() {
    console.clear();
    this.displayWelcomeMessage();
    while (this.readyToPlay()) {
      console.clear();
      this.getRPSSit();
      this.rpsSit.getChoices();
      this.rpsSit.getOutcomeSubSit();
      this.rpsSit.getOutcome();
      this.displayResult();
    }
    this.displayGoodbyeMessage();
  }
};

rpsEngine.play();
