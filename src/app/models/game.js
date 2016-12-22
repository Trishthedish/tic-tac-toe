// game.js
// step 1 import Backbone
import $ from 'jquery';

import Backbone from 'Backbone';

const Game = Backbone.Model.extend({

  initialize: function(options){
    this.set("board",[
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    // this is where I could make a blank array, to hold user input names.
    // this.set("playerX", "Frida");
    // this.set("playerO", "Harry");
    this.set("nextTurn", 1);
    this.set("status", "pending");
// magic square point value to each spot on this.board. ie, this.board[0][0] has the point value of this.pointValues[0][0]
    // this.pointValues = [
    //   [8, 1, 6],
    //   [3, 5, 7],
    //   [4, 9, 2]
    // ];
  }, // end of initialize.

// testing puproses
  helloWorld: function() {
    return "hello world";
  },

  incrementTurn: function() {
    if (this.get("nextTurn") <= 9) {
      this.set("nextTurn", this.get("nextTurn")+ 1);  // how can I set this?
    }
  },

  checkOccupied: function(row, column) {
    // essentially checks if the spot can exist at all.
    if (row > 2 || column > 2 || row < 0 || column < 0) {
      throw new TypeError();
    }
    // console.log("board>>",this.get("board")[row][column]);

    if (this.get("board")[row][column] !== "" ) {
      // its occupied,
      return true;
    } else {
      // as in, it isn't occupied.
      return false;
    }

  },

  play: function(row, column) {
    // if the spot is occupied (true), cant make that move.
    if (this.checkOccupied(row, column) === true) {
      alert("Already been used, please pick another spot.");
      // allows us to keep ppl from playing after game is over!
    } else if (this.get("status") !== "pending") {
      alert("Game is over, just let it go!");
    } else {
      if (this.get("nextTurn") % 2 === 0) {
        // if its even play O
        this.get("board")[row][column] = "O";

      } else {
        //else play X 👣
        this.get("board")[row][column] = "X";
      }
      // increment turn everytime
      this.incrementTurn();
      // see if we have winner.
      this.findWinner();
    }
    // console.log("get("board"):", this.get("board"));
    if (this.get("status") == "pending") {
      var data = {
        board: this.get("board"),
        message: this.get("status")
      };
      return data;
    } else {
      // does staus need to change as well?
      var data = {
        board: this.get("board"),
        message: this.get("status")
      };
      return data;
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
    else if (this.get("status") == "pending" && this.get("nextTurn") == 10) {

      return this.get("status");
    } else {
      return this.get("status");
    }
  },
  checkVertical: function() {

    let board = this.get("board");
      // vertical column 0
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    return this.board[2][0];
    }
    // vertical column 1
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    return board[2][1];
  }



  vertical: function () {
    let board = this.get("board");
    // vertical column 0
    if (board == "X") {
      checkVertical();
    }

    if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {



      console.log('this board: ', board);
      this.set("status", "winner");
      this.typeWinner();
      return this.board[2][0];
    }
    // vertical column 1
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
      this.set("status", "winner");
      var typeWinner = board[2][1];
      this.typeWinner();
      return board[2][1];
    }
    // vertical column 2
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
      this.set("status", "winner");
      var typeWinner = board[2][2];
      this.typeWinner();
      return board[2][2];
    }
  },

  horizontal: function () {
  let board = this.get("board");
  // horizonatal row 0
  if (board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
    this.set("status", "winner");
    this.typeWinner();
    return board[0][2];
  }
  // horizonatal row 1
  if (board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
    var typeWinner = board[2][2];
    this.set("status", "winner");
    this.typeWinner();
    return board[1][2];
  }
  // horizonatal row 2
  if (board[2][0] == board[2][1] && board[2][2] == board[2][2]) {
    this.set("status", "winner");
    var typeWinner = board[2][2];
    this.typeWinner();
    return board[2][2];
    }
  },

  diagonal: function() {

    let board = this.get("board");

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      this.set("status", "winner");
      var typeWinner = board[2][2];
      this.typeWinner();
      return board[2][2];
    }
    if (board[0][2]== board[1][1] && board[1][1] == board[2][0]) {
      this.set("status", "winner");
      var typeWinner = board[2][0];
      this.typeWinner();
      return board[2][0];

      }
    },

  typeWinner: function() {
    if (this.typeWinner == "X") {
      return "X Wins!";
    } else if (this.typeWinner == "O") {
      return "O Wins!";
    }
  },


    // checkScore()
    // if (this.get("board")[row][column] == "X") {
    //   console.log("X wins!");
    //   return "X Wins!";
    // } else (this.get("board")[row][column] == "O") {
    //   console.log("O Wins!");
    //   return "O Wins!";
    // }

    // }

    // if (winner) {
    //   this.set("status", winner);
    //   return this.get("status");
    // } else {
    //   //reset scores
    //   scoreX = 0;
    //   scoreO = 0;
    //

  // checkScore: function() {
  //   if () {
  //
  // //     // could call function that dipslays won.
  //     // alert("X wins!");
  //     console.log("X wins!");
  //     return "X wins!";
  //     // return("X wins!");
  //   } else if (scoreO == 15) {
  //     // alert("O Wins!");
  //     console.log('O wins');
  //     return "O wins!";
  //   }
  // }

}); // end of const Game

// npm run repl
// var Game = require('game').default;
// var game = new Game();

export default Game;
