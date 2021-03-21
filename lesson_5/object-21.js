const readline = require('readline-sync');

let participants;

const participantsHub = {
  init: function() {
    this.humanBusts = false;
    this.dealerBusts = false;
    this.humanScore = null;
    this.dealerScore = null;
    this.money = 5;
  },
  getHumanTurn: function() {

  },
  getDealerTurn: function() {

  },
  busts: function(who) {

  }
}

const twentyOneHub = {
  displayWelcome: function() {
    console.clear();
    console.log("Welcome to Twenty-One!");
  },
  readyToPlay: function() {
    return readline.question("Enter 'y' when you are ready to play; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  playAgain: function() {
    return realine.question("Enter 'y' if you'd like another go; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  readyToContinue: function() {
    return readline.question("When you are ready, enter any key or hit enter to continue.\n");
  },
  displayGoodbye: function() {
    console.log("Thank you! Goodbye!");
  },
  giveMoney: function() {

  },
  shuffle: function() {

  },
  doInitialDeal: function() {

  },
  displayPartialGameSituation: function() {

  },
  displayCompleteGameSituation: function() {

  },
  printBustedOutcome: function() {

  },
  printNoBustsOutcome: function() {

  }
}

const twentyOneEngine = Object.create(twentyOneHub);

twentyOneEngine.initializeGame = function() {

};

twentyOneEngine.play = function() {
  this.displayWelcome();
  while (this.readyToPlay()) {
    this.initializeGame();
    this.printPartialGameSituation();
    this.readyToContinue();
    participants.getHumanTurn();
    if (participants.busts("player")) {
      this.printBustedOutcome("player");
      if (this.playAgain()) continue;
      break;
    }
    participants.getDealerTurn();
    if (participants.busts("dealer")) {
      this.printBustedOutcome("dealer");
      if (this.playAgain()) continue;
      break;
    }
    participants.updateTotals();
    this.printCompleteGameSituation();
    this.printNoBustsOutcome.call(participants);
  }
  this.displayGoodbye();
};


twentyOneEngine.play();
