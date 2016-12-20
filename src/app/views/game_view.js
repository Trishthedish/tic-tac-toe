// game_view.js
import $ from 'jquery';
import Backbone from 'Backbone';
import _ from 'underscore';

import Game from 'app/models/game';

// no idea if this is something I need:
// import BoardView from 'app/views/board_view';
import BoardView from 'app/views/board_view';

// import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function(options) {
    //
    // console.log("g_view >> options ", options);
    // console.log("options >>", options);
    // Compile a template to be shared between the individual players?
    this.spotTemplate = _.template($('#square-template').html());

    // // //keep track of the <ul> element
    // this.listElement = this.$('#');
    // // keep track of data being put into form by user.
  console.log("gamveiew >>>", this.model);
    this.listenTo(this.model, "change", this.render);
        // console.log(">>> BREADCRUMBS: 0.5 init GameView");
    // this.input = {
    //   nameX: this.$('.new-player input[nameX="nameX"]'),
    //   nameO: this.$('.new-player input[name="nameO"]'),
    // };
    this.render();
  }, // end of initialize

  render: function() {
    this.delegateEvents();
    return this;
  },
  // render: function(){
  //   console.log('in gameview, rendering game!');
  //   this.listElement.empty();
  //
  // },

  events: {
    // 'click .btn-save' : 'addPlayer',
    'click .gameboard td' : 'makeMove',
    'click': 'sayHello',
    'click .new-session' : 'newSession',
    'click .btn-cancel' : 'clearInput'
    // 'click .btn' : 'sayHello',
  },

  sayHello: function(event) {
    event.preventDefault();
    console.log('Hellooooooooooo Friend!');
  },

  makeMove: function(event) {
    event.preventDefault();
    // this.trigger('select', this);
    // console.log("call>",this.model.play(event.target.id[0], event.target.id[1]));


    var state = this.model.play(event.target.id[0], event.target.id[1]);

    var row = event.target.id[0];
    var col = event.target.id[1];

    $("#" + event.target.id).text(state[row][col]);


    this.displayMove(state);
    console.log("event __>", event.target.id);

    // console.log("event target id >>", (event.target.id).attr('id'));

    // id 1 == row col (0,0)
  },

  displayMove: function(data) {
    console.log("Yyyyyyyyyyy", data);

  },


    // this.listElement = $(event.target);
// no idea what this is doing.
  // var symbol = this.model.attributes.symbol;
  //
  //  this.listElement.html(symbol);
  //  this.model.play($(event.target).attr('id'));


//   addPlayer: function(event){
//     event.preventDefault();
//
//     // Create a new model from the form data
//     var player = new Player(this.getInput());
//
//     // Create a view around the task and add it to our list
//     var gameView = new GameView({
//       model: player,
//       template: this.playerTemplate
//   });
//   // missing info here.
//   // this.push(gameView);
//   this.model.add(player);
//   this.clearInput();
//
// },

// newSession: function(event) {
//   console.log("I tried to make a new session");
//
// },

  getInput: function(event) {
  console.log("getting input from the form");
  var players = {
    nameX: this.input.nameX.val(),
    nameO: this.input.nameO.val()
  };
  console.log("players -->", players); // working now. Though returns undefined when no info used. Will I need validation?

  return players;
},

clearInput: function(event) {
  console.log("clear Input called!");
  this.input.nameO.val('');
  this.input.nameX.val('');
}


}); // end of GameView

export default GameView;
