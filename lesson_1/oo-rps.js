const readline = require("readline-sync");

const createPlayer = function(moves) {
  return {
    moves: moves,
    move: null
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
      this.move = choice;
    }
  };
  return Object.assign(player, human);
};

const createComp = function(moves) {
  const player = createPlayer(moves);
  const comp = {
    choose: function() {
      const draw = Math.floor(Math.random() * this.moves.length);
      this.move = this.moves[draw];
    }
  };
  return Object.assign(player, comp);
};

const createOutcomeSubSituation = function() {
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

const createRPSSituation = function(humanMove, compMove) {
  return {
    humanMove: humanMove,
    compMove: compMove,
    outcomeSubSituation: null,
    getOutcomeSubSituation: function() {
      this.outcomeSubSituation = createOutcomeSubSituation();
    },
    getOutcome: function() {
      this.outcomeSubSituation.determineOutcome(this.humanMove, this.compMove);
    }
  };
};

const rpsEngine = {
  moves: { r: "rock", p: "paper", s: "scissors" },
  human: null,
  comp: null,
  rpsSituation: null,
  displayWelcomeMessage: function() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },
  getPlayers: function() {
    this.human = createHuman(Object.keys(this.moves));
    this.comp = createComp(Object.keys(this.moves));
  },
  readyToPlay: function() {
    return readline.question("Enter 'y' when you are ready to play; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  getChoices: function() {
    this.human.choose();
    this.comp.choose();
  },
  getRPSSituation: function() {
    this.rpsSituation = createRPSSituation(this.human.move, this.comp.move);
  },
  displayResult: function() {
    console.log(`You chose: ${this.moves[this.human.move]}.`);
    console.log(`Computer chose: ${this.moves[this.comp.move]}.`);
    console.log(`The outcome is: ${this.rpsSituation.outcomeSubSituation.outcome}`);
  },
  displayGoodbyeMessage: function() {
    console.log("Thank you! Goodbye!");
  },
  play: function() {
    console.clear();
    this.displayWelcomeMessage();
    this.getPlayers();
    while (this.readyToPlay()) {
      console.clear();
      this.getChoices();
      this.getRPSSituation();
      this.rpsSituation.getOutcomeSubSituation();
      this.rpsSituation.getOutcome();
      this.displayResult();
    }
    this.displayGoodbyeMessage();
  }
};

rpsEngine.play();
