import $ from 'jquery';
import Backbone from 'Backbone';
import _ from 'underscore';

import Game from 'app/models/game';

// no idea if this is something I need:
// import BoardView from 'app/views/board_view';
import BoardView from 'app/views/board_view';

const GameView = Backbone.View.extend({
  initialize: function(options) {
    console.log("hello!!!");
    console.log("options >>", options);
    // Compile a template to be shared between the individual players?
    this.playerTemplate = _.template($('#tmpl-player-card').html());

    //keep track of the <ul> element
    this.listElement = this.$('#player-cards');
    // keep track of data being put into form by user.

    this.input = {
      nameX: this.$('.new-player input[nameX="nameX"]'),
      nameO: this.$('.new-player input[name="nameO"]'),
    };

  }, // end of initialize

  render: function(){
    console.log('in gameview, rendering game!');
    this.listElement.empty();

  },

  events: {
    'click .btn-save' : 'addPlayer',

    'click .btn-cancel' : 'clearInput',

    'click .btn' : 'sayHello'
  },

  sayHello: function() {
    console.log('Hellooooooooooo Friend!');
  },

  addPlayer: function(event){
    event.preventDefault();

    // Create a new model from the form data
    var player = new Player(this.getInput());

    // Create a view around the task and add it to our list
    var gameView = new GameView({
      model: player,
      template: this.playerTemplate
  });
  // missing info here.
  // this.push(gameView);
  this.model.add(player);
  this.clearInput();

},

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
