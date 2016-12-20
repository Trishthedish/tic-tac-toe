// app.js
import $ from 'jquery';
import Backbone from 'Backbone';
import _ from 'underscore';


// grabbed this from previous code.
// no idea if I need this!;
import Game from 'app/models/game';
import GameView from 'app/views/game_view';



$(document).ready(function() {
  // Write your application code here
  // what should options be? if anything.
  // new Game(options)
  // interesting, why did Elle take this out on hers?
  // var game = new Game();

  var gameView = new GameView({
    // model: game,
    model: new Game(),
    el: $('#application')

  });
  gameView.render();



});
