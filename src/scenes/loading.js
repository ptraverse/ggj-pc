// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Load our sprite map image
  Crafty.load(['assets/goatSpriteSheet.png', 'assets/TrumpSpriteSheet3.png', 'assets/16x16_forest_1.gif', 'assets/hunter.png', 'assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'], function(){
    // Once the images are loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(16, 'assets/16x16_forest_1.gif', {
      spr_tree:    [0, 0],
      spr_bush:    [1, 0],
      spr_village: [0, 1]
    });

    //  animation sprite map
     Crafty.sprite(16, 'assets/hunter.png', {
       spr_hunter:  [0, 2],
     }, 0, 2);

    Crafty.sprite(100, 160, 'assets/TrumpSpriteSheet3.png', {
      spr_player:  [0, 0]
    });

    Crafty.sprite(45, 'assets/goatSpriteSheet.png', {
      spr_goat: [0,0]
    });

    // Define our sounds for later use
    //Crafty.audio.add({
    //  knock: ['assets/door_knock_3x.mp3']
    //});

    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
      .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
      .text('Loading...');

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Level2');
  })
});
