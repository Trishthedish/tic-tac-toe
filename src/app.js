// app.js
// grabbed this from previous code.
// no idea if I need this!;
import Game from 'app/models/game';
import GameView from 'app/views/game_view';

import $ from 'jquery';
import _ from 'underscore';

$(document).ready(function() {
  // Write your application code here
  // what should options be? if anything.
  // new Game(options)
  var game = new Game();

  var gameView = new GameView({
    el: $('#application'),
    model: game
  });
  gameView.render();



});
