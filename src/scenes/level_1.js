// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Level1', function() { 
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('2D, Canvas, PlayerCharacter').at(5, 5)
    .bind("KeyDown", function(e) {
        if (e.keyCode === Crafty.keys.SPACE) {
          console.log("Blast");
          console.log(this._rotation);
          Crafty.audio.play("Blaster");
          //create a bullet entity
          Crafty.e("2D, DOM, Color, bullet")
            .attr({
              x: this._x, 
              y: this._y, 
              w: 2, 
              h: 5, 
              rotation: this._rotation, 
              xspeed: 20 * Math.sin(this._rotation / 57.3), 
              yspeed: 20 * Math.cos(this._rotation / 57.3)
            })
            .color("rgb(255, 0, 0)")
            .bind("EnterFrame", function() {
              this.x += this.xspeed;
              this.y -= this.yspeed;
              
              //destroy if it goes out of bounds
              if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
                this.destroy();
              }
            });
        }
    }).bind("KeyUp", function(e) {
        //on key up, set the move booleans to false
        if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
          this.move.right = false;
        } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
          this.move.left = false;
        } else if(e.keyCode === Crafty.keys.UP_ARROW) {
          this.move.up = false;
        }
    })
  ;
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile
        Crafty.e('Bush').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }

  // Generate up to five villages on the map in random locations
  var max_villages = 5;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.02) {
        if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
          Crafty.e('Village').at(x, y);
        }
      }
    }
  }

  // Show the victory screen once all villages are visisted
  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Level2');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});