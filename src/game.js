// game.js
// step 1 import backbone
import Backbone from 'Backbone';


// constructor function
const Game = Backbone.Model.extend({

  initialize: function(options){
    this.set("board",[
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    // this is where I could make a blank array, to hold user input names.
    this.set("playerX", "Frida");
    this.set("playerO", "Harry");
    this.set("nextTurn", 1);
    this.set("status", "pending");
    this.set("pointValues", [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2]
    ]);
  }, // end of initialize.

// testing puproses
  helloWorld: function() {
    return "hello world";
  },

  incrementTurn: function() {
    if (this.nextTurn <= 9) {
      this.nextTurn += 1;
    }
  },

  checkOccupied: function(row, column) {
    // essentially checks if the spot can exist at all.
    if (row > 2 || column > 2 || row < 0 || column < 0) {
      throw new TypeError();
    }
    if (this.board[row][column] !== "" ) {
      // its occupied,
      return true;
    } else {
      // as in, it isn't occupied.
      return false;
    }

  },

  play: function(row, column) {

    if (this.checkOccupied(row, column) === true) {

      return "Already been useed, please pick another spot.";

      // allows us to keep ppl from playing after game is over!
    } else if (this.status !== "pending") {

      return "Game is over, just let it go!";

    } else {
      if (this.nextTurn % 2 === 0) {
        // if its even play O
        this.board[row][column] = "O";

      } else {
        //else play X
        this.board[row][column] = "X";
      }
      // increment turn everytime
      this.incrementTurn();
      // see if we have winner.
      this.findWinner();
    }
    // console.log("board:", this.board);
    if (this.status == "pending") {
      return this.board;
    } else {
      return this.status;
    }

  },
  findWinner: function() {
    // check vertical
    if (this.vertical() != "pending") {
      return this.vertical();
    }
    // check horizontal
    else if (this.horizontal() != "pending") {
      return this.horizontal();
    }
    // check diagonal
    else if (this.diagonal() != "pending") {
      console.log("diagonal");
      return this.diagonal();
    }
    // check if the game is complete && tied
    else if (this.status == "pending" && this.nextTurn == 10) {
      this.status = "tie";
      return this.status;
    } else {
      return this.status;
    }
  },

  vertical: function () {
    var scoreX = 0;
    var scoreO = 0;
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if (this.board[col][row] == "X") {
          scoreX += this.pointValues[col][row];
          // console.log("element is X", scoreX)
        } else if (this.board[col][row] == "O") {
          scoreO += this.pointValues[col][row];
          // console.log("element is O", scoreO)
        }
      }
      var winner = this.checkScore(scoreX,scoreO);
      // console.log(this.checkScore(scoreX, scoreO))
      if (winner) {
        this.status = winner;
      } else {
        //reset scores
        scoreX = 0;
        scoreO = 0;
      }
    }
    return this.status;
  },

  horizontal: function () {
    var scoreX = 0;
    var scoreO = 0;
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if (this.board[row][col] == "X") {
          scoreX += this.pointValues[row][col];
          // console.log("element is X")
        } else if (this.board[row][col] == "O") {
          scoreO += this.pointValues[row][col];
          // console.log("element is O")
        }
      }
    }
    var winner = this.checkScore(scoreX,scoreO);
    // console.log(this.checkScore(scoreX, scoreO))
    if (winner) {
      this.status = winner;
    } else {
      //reset scores
      scoreX = 0;
      scoreO = 0;
    }
    return this.status;
  },

  diagonal: function() {
    var scoreX = 0;
    var scoreO = 0;
    // checking for DIAGONAL Part 1
    // top right --> bottom left. AKA the hard one!
    for(var row = 0; row < 3; row++) {
      var col = 2-row;
      if (this.board[row][col] == "X") {
        scoreX += this.pointValues[row][col];
      } else if (this.board[row][col] == "O") {
        scoreO += this.pointValues[row][col];
      }
    }
    // checking diagonal Winner.
    var winner = this.checkScore(scoreX,scoreO);
    // console.log(this.checkScore(scoreX, scoreO))
    if (winner) {
      this.status = winner;
      return this.status;
    } else {
      //reset scores
      scoreX = 0;
      scoreO = 0;
    }
    /// checking for DIAGONAL PART II
    scoreX = 0; // do we need this?
    scoreO = 0;
      // top left ---> bottom right
    for(var i = 0; i < 3; i++) {
      if(this.board[i][i] == "X") {
        scoreX += this.pointValues[i][i];
      } else if (this.board[i][i] == "O") {
        scoreO += this.pointValues[i][i];
      }
    }
    // checking diagonal Winner.
    winner = this.checkScore(scoreX,scoreO);
    // console.log(this.checkScore(scoreX, scoreO))
    if (winner) {
      this.status = winner;
      return this.status;
    } else {
      //reset scores
      scoreX = 0;
      scoreO = 0;
    }
    return this.status;

  },

  checkScore: function(scoreX, scoreO) {
    if (scoreX == 15) {
      return("X wins!");
    } else if (scoreO == 15) {
      return("O wins!");
    }
  }

}); // end of const Game

// npm run repl
// var Game = require('game').default;
// var game = new Game();

export default Game;
