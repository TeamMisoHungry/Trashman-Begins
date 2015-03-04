game.EnemyEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "evilPokemon";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

 
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 16;
    settings.spriteheight = settings.height = 16;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
  
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.spritewidth * 5;
    this.pos.x  = x + width - settings.spritewidth * 5;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking & jumping speed
    this.body.setVelocity(3, 3);
    
    this.renderable.addAnimation("walkRight", [0]);
	this.renderable.addAnimation("walkLeft", [3]);   
	     
  },
 
  // manage the enemy movement
  update: function(dt) {
 
    if(this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
      	this.walkLeft = false;
      }else if (!this.walkLeft && this.pos.x >= this.endX) {
      	this.walkLeft = true;
    }
	  // make it walk
	  if(this.walkLeft){
		this.renderable.setCurrentAnimation("walkLeft");
	  }else{
	   	this.renderable.setCurrentAnimation("walkRight");
	  }	
	  this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
     
    }else {
      this.body.vel.x = 0;
    }
           
    // update the body movement
    this.body.update(dt);
     
    // handle collisions against other shapes
    me.collision.check(this);
       
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	if(me.collision.types.PLAYER_OBJECT){
  		this.renderable.flicker(750);  		
  		
  	}
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one
      if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
        this.renderable.flicker(750);
      }
      return false;
    }
    // Make all other objects solid
    return true;
  }
});
