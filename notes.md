#### Wave Two:

In this wave, we will design the framework of our Backbone application. Then, using this framework we create for ourselves, we will begin by implementing the front-end of our Tic-Tac-Toe game using Backbone Views.

Scope

We will not be completing the entire implementation of the Tic-Tac-Toe game in this wave. These are the requirements for what you should complete in this wave:

Complete the design (on paper, whiteboard and/or Trello) for all components in your Backbone game implementation
Create "stub" files and folders for all of these components in your application
Design the user interface for your Tic-Tac-Toe game (on paper, whiteboard and/or Trello)
Implement the user interface for your game in your application, using templates, "regular" HTML and CSS
Implement the framework for handling the DOM Events that your front-end will interact with. Note: By "framework" here, we mean determine what those DOM Events are and creating function "stubs" that will handle the actions that correspond with these events in the next wave.
Note: Don't start on the JS object to Model conversion until Wave three!

Testing Requirements

No additional requirements for this wave

< /hr>

#### Wave Three:

In this wave we will be taking the code we wrote in Wave One for the Tic-Tac-Toe game using plain JavaScript and converting this into Backbone Models. We will integrate these models with the rest of the Backbone application we created in Wave Two.

Converting to Backbone Model

More details forthcoming

Wave Four:

In this wave you'll connect the Backbone web application you created in the previous wave to an existing Rails API that has standard RESTful CRUD routes.

Read the documentation for the Tic-Tac-Toe API



if (scoreX == 15) {

  $(".xWins").removeClass('xWins').addClass("showXwin");
  // return this.get("board");
  // return("X wins!");
} else if (scoreO == 15) {
  $(".oWins").removeClass('oWins').addClass("showOwin");
  // return this.get("board");
