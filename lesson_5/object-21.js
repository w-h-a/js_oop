const readline = require("readline-sync");

let participants;

let deck;

const dealerLimit = 17;

const initalBucks = 5;

const enoughBucks = 10;

const notEnoughBucks = 0;

const twentyOneHub = {
  displayWelcome: function() {
    console.clear();
    console.log("Welcome to Twenty-One!");
  },
  readyToPlay: function() {
    return readline.question("Enter 'y' when you are ready to play; otherwise enter any key or press enter to exit.\n").toLowerCase() === "y";
  },
  readyToContinue: function() {
    return readline.question("When you are ready, enter any key or hit enter to continue.\n");
  },
  displayGoodbye: function() {
    console.log("Thank you! Goodbye!");
  },
  shuffle: function() {
    for (let idx = deck.cards.length - 1; idx > 0; idx -= 1) {
      let jdx = Math.floor(Math.random() * (idx + 1));
      [deck.cards[idx], deck.cards[jdx]] = [deck.cards[jdx], deck.cards[idx]];
    }
  },
  deal: function(toWhom) {
    if (toWhom === "player") {
      this.playerCards.push(deck.cards.pop());
    } else {
      this.dealerCards.push(deck.cards.pop());
    }
  },
  doInitialDeal: function() {
    let dealTo = "player";
    while (this.playerCards.length < 2 || this.dealerCards.length < 2) {
      twentyOneHub.deal.call(participants, dealTo);
      dealTo = dealTo === "player" ? "dealer" : "player";
    }
  },
  getNoBustsOutcome: function() {
    const playerTotal = participants.getTotal("player");
    const dealerTotal = participants.getTotal("dealer");
    if (playerTotal === dealerTotal) this.outcome = "draw";
    if (playerTotal > dealerTotal) this.outcome = "player";
    if (playerTotal < dealerTotal) this.outcome = "dealer";
  },
  printPartialGameSituation: function() {
    console.clear();
    console.log('==============');
    console.log(`Dealer has: ${this.dealerCards[0]}`);
    console.log(`Dealer has: unknown`);
    console.log('==============');
    this.playerCards.forEach(function(ele) {
      console.log(`You have: ${ele}`);
    });
    console.log(`Your total is ${this.getTotal("player")}`);
    console.log('==============');
  },
  printCompleteGameSituation: function() {
    console.clear();
    console.log('==============');
    this.dealerCards.forEach(function(ele) {
      console.log(`Dealer has: ${ele}`);
    });
    console.log(`Dealer's total is ${this.getTotal("dealer")}`);
    console.log('==============');
    this.playerCards.forEach(function(ele) {
      console.log(`You have: ${ele}`);
    });
    console.log(`Your total is ${this.getTotal("player")}`);
    console.log('==============');
  },
  printBustedOutcome: function(who) {
    this.printCompleteGameSituation.call(participants);
    if (who === "player") {
      console.log("You busted. Dealer wins.");
    } else {
      console.log("Dealer busted. You win!");
    }
  },
  printNoBustsOutcome: function() {
    if (this.outcome === "draw") console.log("The game is a draw.");
    if (this.outcome === "player") console.log("You win!");
    if (this.outcome === "dealer") console.log("Dealer wins");
  },
  printNoMoneyOutcome: function() {

  },
  printEnoughMoneyOutcome: function() {

  }
};

const participantsHub = {
  init: function() {
    this.playerCards = null;
    this.dealerCards = null;
    this.money = 5;
    return this;
  },
  getTotal: function(who) {
    const values = this.getCardValues(who);
    const acesElevenSum = this.getAcesElevenSum(values);
    return this.correctForAcesSum(values, acesElevenSum);
  },
  getCardValues: function(who) {
    if (who === "player") {
      return this.playerCards.map(function(card) {
        return card[1];
      });
    } else {
      return this.dealerCards.map(function(card) {
        return card[1];
      });
    }
  },
  getAcesElevenSum: function(values) {
    return values.reduce(function(acc, ele) {
      if (ele === 'A') {
        acc += 11;
      } else if (['J', 'Q', 'K'].includes(ele)) {
        acc += 10;
      } else {
        acc += Number(ele);
      }
      return acc;
    }, 0);
  },
  correctForAcesSum: function(values, sum) {
    values.filter(function(ele) {
      return ele === 'A';
    }).forEach(function() {
      if (sum > 21) sum -= 10;
    });
    return sum;
  },
  getPlayerTurn: function() {
    let answer;
    while (answer !== 'stay' && answer !== 's' && this.getTotal('player') < 21) {
      answer = readline.question("hit or stay?\n").toLowerCase();
      while (!['hit', 'stay', 'h', 's'].includes(answer)) {
        console.log("You may only and exclusively choose either (h)it or (s)tay.");
        answer = readline.question().toLowerCase();
      }
      if (answer === 'hit' || answer === 'h') twentyOneHub.deal.call(participants, "player");
      twentyOneHub.printPartialGameSituation.call(participants);
    }
  },
  getDealerTurn: function() {
    while (this.getTotal("dealer") < dealerLimit) {
      twentyOneHub.deal.call(participants, "dealer");
    }
    const someAce = this.dealerCards.some(function(card) {
      return card[1] === 'A';
    });
    if (this.getTotal("dealer") === dealerLimit && someAce) {
      twentyOneHub.deal.call(participants, "dealer");
    }
  },
  busts: function(who) {
    return who === "player" ? this.getTotal("player") > 21 : this.getTotal("dealer") > 21;
  }
};

const deckHub = {
  init: function() {
    this.cards = [
      ['♥', '2'], ['♥', '3'], ['♥', '4'], ['♥', '5'], ['♥', '6'], ['♥', '7'], ['♥', '8'],
      ['♥', '9'], ['♥', '10'], ['♥', 'J'], ['♥', 'Q'], ['♥', 'K'], ['♥', 'A'],
      ['♦', '2'], ['♦', '3'], ['♦', '4'], ['♦', '5'], ['♦', '6'], ['♦', '7'], ['♦', '8'],
      ['♦', '9'], ['♦', '10'], ['♦', 'J'], ['♦', 'Q'], ['♦', 'K'], ['♦', 'A'],
      ['♣', '2'], ['♣', '3'], ['♣', '4'], ['♣', '5'], ['♣', '6'], ['♣', '7'], ['♣', '8'],
      ['♣', '9'], ['♣', '10'], ['♣', 'J'], ['♣', 'Q'], ['♣', 'K'], ['♣', 'A'],
      ['♠', '2'], ['♠', '3'], ['♠', '4'], ['♠', '5'], ['♠', '6'], ['♠', '7'], ['♠', '8'],
      ['♠', '9'], ['♠', '10'], ['♠', 'J'], ['♠', 'Q'], ['♠', 'K'], ['♠', 'A'],
    ];
    return this;
  }
};

const twentyOneEngine = Object.create(twentyOneHub);

twentyOneEngine.outcome = null;

twentyOneEngine.initializeParticipants = function() {
  participants = Object.create(participantsHub).init();
};

twentyOneEngine.initializeHands = function() {
  this.playerCards = [];
  this.dealerCards = [];
};

twentyOneEngine.initializeDeck = function() {
  deck = Object.create(deckHub).init();
  this.shuffle();
  this.doInitialDeal.call(participants);
};

twentyOneEngine.play = function() {
  this.displayWelcome();
  this.initializeParticipants();
  while (this.readyToPlay()) {
    this.initializeHands.call(participants);
    this.initializeDeck();
    this.printPartialGameSituation.call(participants);
    this.readyToContinue();
    participants.getPlayerTurn();
    if (participants.busts("player")) {
      this.printBustedOutcome("player");
      continue;
    }
    participants.getDealerTurn();
    if (participants.busts("dealer")) {
      this.printBustedOutcome("dealer");
      continue;
    }
    this.getNoBustsOutcome();
    this.printCompleteGameSituation.call(participants);
    this.printNoBustsOutcome();
  }
  this.displayGoodbye();
};

twentyOneEngine.play();
