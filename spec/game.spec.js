// game.spec.js
// had to change to get to work now that I have a model.
import Game from "app/models/game";

// Every function in your application should have at least two tests
// All tests should pass

// the global Jasmine function describe
// 2 params: string, function. string = name or title for spec suite. usually what is being tested.

describe('Game', function() {
  var testGame; // stand for created test object
  // this creates a new Game object before each 'it' test.
  beforeEach(function(){
    testGame = new Game();
  });
// added this based on scrabble-js-to-backbone.
// test isn't working as expected.
//  Error: 'expect' was used when there was no current spec, this could be because an asynchronous test timed out
  // describe('Constructor', function(){
  //   // does it need to be testGame
  //   expect(testGame).toBeFunction();
  // });

  it('Constructor initializes attributes', function(){
    expect(testGame.get("board")).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]]);

  });


  /// testing instance variables
  describe('instance variables', function() {

    it('Should create a new game object', function() {
      expect(testGame instanceof Game).toEqual(true);
    });

    it('board should be created.', function() {
      expect(testGame.get("board")).toEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]]);
      });

      it('The board length of each array row should not exceed 3.', function() {
        for(var i = 0; i < testGame.get("board").length; i++) {
          expect(testGame.get("board")[i].length).toBe(3);
        }
      });

      it('Player 1 and 2 should have names, Frida and Harry (respectively)', function() {
        expect(testGame.get("playerX")).toEqual("Frida");
        expect(testGame.get("playerO")).toEqual("Harry");
      });

      // testing to make sure nextTurn counter is is one.
      it('test if nextTurn is working apropriatlely', function() {
        expect(testGame.get("nextTurn")).toEqual(1);
      });

      it('should be initialized with pending status', function() {
        expect(testGame.get("status")).toEqual("pending");
      });

      // learned that if I initialized it as hard code. no need to use get.
      it('should be initialized with pointValues for magic square', function() {
        expect(testGame.pointValues).toEqual([
          [8,1,6],
          [3,5,7],
          [4,9,2]]);
      });

    });

  ///  testing helloworld function
  describe('test helloworld, just for funsies', function() {
    //
    it('should display hello world', function() {
      expect(testGame.helloWorld()).toEqual("hello world");
    });

    it('should return an instance of a string', function () {
      // console.log("this is the type of helloworld", typeof(testGame.helloWorld()));
      expect(typeof(testGame.helloWorld())).toEqual("string");
    });
  }); // end of helloworld describe

  describe('incrementTurn', function() {
    it('should increment nextTurn by 1 when it is called', function() {
      expect(testGame.get("nextTurn")).toBe(1);
      testGame.incrementTurn();
      expect(testGame.get("nextTurn")).toBe(2);
    });

    it('should be allowed to be up to 10', function() {
      expect(testGame.get("nextTurn")).toBe(1);
      for (var i = 0; i < 9; i++) {
        // expect(testGame.nextTurn).toBe(i + 1)
        testGame.incrementTurn();
        expect(testGame.get("nextTurn")).toBe(i + 2); // i starts at zero, and we're testing that nextTurn, which starts at 1, has been incremented to 2 (etc)
      }
    });

    it('should never be greater than 10', function() {
      expect(testGame.get("nextTurn")).toBe(1);
      for (var i = 0; i < 15; i++) {
        testGame.incrementTurn();
      }
      expect(testGame.get("nextTurn")).toBe(10);
    });
  });
  // testing isOccupied()
  describe('checkOccupied', function() {

    it('Function can detect if spot is not currently occupied. (AKA false means its not occupied.)', function() {
      expect(testGame.checkOccupied(0,0)).toEqual(false);
    });

    it('Function can detect if spot is currently occupied. (it it is, function return true)', function() {
      // testGame.set("board[0][0]", "X");
      testGame.play(0,0); // place X @[0][0]
      expect(testGame.checkOccupied(0,0)).toEqual(true);
    });
    // error is now created.
    it('Function will respond with error message when user attempts to make move outside of board. As in [3][3] (does not exist', function() {
    expect(
      function(){testGame.checkOccupied(3,3);}
      ).toThrow(TypeError());

    });
  });

  describe('play', function() {

    it('When a player tries to play a spot that is not free, should get message to try again.', function() {
      // testGame.board[0][0] = "O";
      testGame.play(0,0); // playX at (0,0)
      testGame.play(0,1); // playO at (0,1)
      // now I'll try to play X in O's spot. Should get error message.
      expect(testGame.play(0,1)).toEqual("Already been used, please pick another spot.");
    });

    it('When a player plays a non-occupied spot. It will then hold that players symbol.', function() {

      testGame.play(0,0); // play X
      expect(testGame.get("board")[0][0]).toEqual("X");

      testGame.play(0,1);
      // what was here previously,
      // expect(testGame.board[0][1]).toEqual("O");
      expect(testGame.get("board")[0][1]).toEqual("O");

    });

    it('Ensure nextTurn is properly incrementing when we call play it should incrementTurn()', function() {
      testGame.play(0,0); // x is at (0,0)
      expect(testGame.get("nextTurn")).toEqual(2);
      testGame.play(0,1); // play O at (0,1)
      expect(testGame.get("nextTurn")).toEqual(3);

    });
    it('Test that board reflects correct arrangment when X and O play spots [0][0], [0][1] respectively', function() {

      testGame.play(0,0);
      testGame.play(0,1);
      expect(testGame.get("board")).toEqual(
      [
        [ 'X', 'O', '' ],
        [ '', '', '' ],
        [ '', '', '' ]
      ]
      );
    });

    it('if playerX has won before the board if filled, it will return "x wins!" ', function() {
      // player X
      testGame.play(0,0);
      // player O
      testGame.play(0,1);
      // player X
      testGame.play(1,1);
      // player O
      testGame.play(0,2);
                // player X
      expect(testGame.play(2,2)).toEqual("X wins!");
    });

    it('if playerO has won before the board if filled, it will return "O wins!" ', function() {
      // player X
      testGame.play(0,1);
      // player O
      testGame.play(0,0);

      // player X
      testGame.play(1,2);

      // player O
      testGame.play(1,0);

      // player X
      testGame.play(2,2);
                //playerO
      expect(testGame.play(2,0)).toEqual("O wins!");
    });
    it('If someone has already won, other player cannot continue to make moves. (in this case O, cannot continue because X wins.s)', function() {
      // player X
      testGame.play(0,0);
      testGame.play(1,0);
      testGame.play(0,1);
      testGame.play(1,2);
      testGame.play(0,2);

      expect(testGame.play(2,1)).toEqual("Game is over, just let it go!");
    });

  }); // end of play testing

  describe('findWinner', function() {
    ///////////// X testing winner
    it('should find that X is winner if X has 3 in a row vertically', function () {
      // this is X,X,X on the vertical on the left.
      // console.log("this is the board before we change it"
        // [
        //   [ 'X', '', '' ],
        //   [ 'X', '', '' ],
        //   [ 'X', '', '' ]
        // ]
      var b = testGame.get("board");
      b[0][0] = "X";
      b[1][0] = "X";
      b[2][0] = "X";
      testGame.set("board", b);
      // shows what the board is after all of this
      // console.log("board >>",testGame.get("board"));
      expect(testGame.findWinner()).toEqual("X wins!");
    });

    it('should find that X is winner if X has 3 in a row horizontally', function() {

      // this is the X, X, X horizontal on the top row
      // console.log("this is the board before we change it", testGame.board)
      // [
      //   [ 'X', 'X', 'X' ],
      //   [ '', '', '' ],
      //   [ '', '', '' ]
      // ]
      // Step 1: get board
      var b = testGame.get("board");
      // Step 2: change board
      b[0][0] = "X";
      b[0][1] = "X";
      b[0][2] = "X";
      // Step 3: set "board"
      testGame.set("bord", b);
      // console.log("this is the board", testGame.get("board"));
      expect(testGame.findWinner()).toEqual("X wins!");
    });

    it('should find that X is winner if X has 3 in a row diagonally', function () {
      // [
      //   [ 'X', '', '' ],
      //   [ '', 'X', '' ],
      //   [ '', '', 'X' ]
      // ]
      var b = testGame.get("board");
      b[0][0] = "X";
      b[1][1] = "X";
      b[2][2] = "X";
      testGame.set("board", b);
      // console.log("board >", testGame.get("board"));
      expect(testGame.findWinner()).toEqual("X wins!");
    });

    it('should find that O is winner if O has 3 in a row vertically', function () {
      // [
      //   [ 'O', 'O', 'O'],
      //   [ '', '', '' ],
      //   [ '', '', '' ]
      // ]
      // this is O,O,O on the vertical in the middle
      // console.log("this is the board before we change it", testGame.board)
      var b = testGame.get("board");
      b[0][0] = "O";
      b[1][1] = "O";
      b[2][2] = "O";
      testGame.set("board", b);
      // console.log("this is the board", testGame.board)
      expect(testGame.findWinner()).toEqual("O wins!");
    });

    it('should find that O is winner if O has 3 in a row horizontally', function() {
      // [
      //   [ 'O', '', ''],
      //   [ 'O', '', '' ],
      //   [ 'O', '', '' ]
      // ]
      var b = testGame.get("board");
      b[2][0] = "O";
      b[2][1] = "O";
      b[2][2] = "O";
      testGame.set("board", b);
      // console.log("this is the board after",testGame.get("board"));
      expect(testGame.findWinner()).toEqual("O wins!");
    });

    it('should find that O is winner if O has 3 in a row diagonally', function () {
      // [
      //   [ 'X', '', '' ],
      //   [ '', 'X', '' ],
      //   [ '', '', 'X' ]
      // ]
      var b = testGame.get("board");
      b[0][2] = "O";
      b[1][1] = "O";
      b[2][0] = "O";
      testGame.set("board", b);
      expect(testGame.findWinner()).toEqual("O wins!");
    });
    ////////////// game is over, but there's no winner

    it('should be able to tell when the game is over but there\'s a tie', function () {
      testGame.play(0,1); // x top middle
      // console.log(">>>>>",testGame.get("board"));
      testGame.play(0,0); // o top left
      testGame.play(0,2); // x top right

      testGame.play(1,1); // o middle middle
      testGame.play(1,0); // x middle left
      testGame.play(1,2); // o middle right

      testGame.play(2,0); // x bottom left
      testGame.play(2,1); // o bottom middle
      testGame.play(2,2); // x bottom right
      console.log("after: ",testGame.get("board"));
    //[
    //   [ 'O', 'X', 'X' ],
    //   [ 'X', 'O', 'O' ],
    //   [ 'X', 'O', 'X' ]
    // ]
      expect(testGame.findWinner()).toEqual("tie");
      // this test won't pass if we don't check for the winner after each turn is played.
      expect(testGame.get("status")).toEqual("tie");
    });
    //////////// game is not yet over, and no one is a winner
    it('should be able to state status is still pending when there is no winner or tie yet', function () {

      testGame.set("board", [["O", "X", "X"],
                        ["", "", ""],
                        ["", "O", "X"]]);
      expect(testGame.findWinner()).toEqual("pending");
      // this test won't pass if we don't check for the winner after each turn is played.
      expect(testGame.get("status")).toEqual("pending");
    });

  }); // end of findwinner

















});// end of Game describe
