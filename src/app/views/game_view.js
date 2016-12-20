import Backbone from 'Backbone';
import _ from 'underscore';
import $ from 'jquery';

import Game from 'app/models/game';

// no idea if this is something I need:
// import BoardView from 'app/views/board_view';
import BoardView from 'app/views/board_view';

const GameView = Backbone.View.extend({
  initialize: function(options) {
    console.log("hello!!!");
    console.log("options >>", options);
  }

});

export default GameView;
