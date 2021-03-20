let readline = require("readline-sync"); // first line in ttt.js

class Board {
  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
}

class TTTGame {
  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      // this.board.display(); -- Delete this line
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }
}
