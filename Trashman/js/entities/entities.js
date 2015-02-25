/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({
    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
    	this._super(me.Entity, 'init', [x, y , settings]);
		
		//setting deafauly horizontal & vertical speed
		this.body.setVelocity(3, 3);
		
		//setting display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//ensure the player is updated even when outside of viewport
		this.alwaysUpdate = true;
		
		//define a basic walking animation(using all frames)
		this.renderable.addAnimation("walkRight", [12, 13, 14, 15]);
		this.renderable.addAnimation("walkLeft", [8, 9, 10, 11]);
		this.renderable.addAnimation("walkUp", [0, 1, 2, 3]);
		this.renderable.addAnimation("walkDown", [4, 5, 6, 7]);
		//define standing(not moving), using the first frame
		this.renderable.addAnimation("standDown", [4]);
		this.renderable.addAnimation("standUp", [0]);
		this.renderable.addAnimation("standLeft", [8]);
		this.renderable.addAnimation("standRight", [12]);
				
		this.health = 100;
		this.left1 = false;
 		this.right1 = false;
 		this.up = false;
 		this.down = true;
    },

    /**
     * update the entity
     */
    update : function (dt) {
 		
 		if(me.input.isKeyPressed('pause') && !me.state.isPaused()){
 			me.state.pause(true);
 			var resume_loop = setInterval(function check_resume(){
 				if(me.input.isKeyPressed('unpause')){
 					clearInterval(resume_loop);
 					me.state.pause(false);
 					me.state.resume(true);
 				}
 			}, 100);
 		}
 		
		//adding movement based on up, down, left, right arrows
		if(me.input.isKeyPressed('left')){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkLeft")){
				this.renderable.setCurrentAnimation("walkLeft");
				this.left1 = true;
				this.right1 = this.up = this.down = false;
			}
		}else if(me.input.isKeyPressed('right')){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkRight")){
				this.renderable.setCurrentAnimation("walkRight");
				this.right1 = true;
				this.up = this.down = this.left1 = false;
			}
		}else if(me.input.isKeyPressed('up')){
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkUp")){
				this.renderable.setCurrentAnimation("walkUp");
				this.up = true;
				this.right1 = this.left1 = this.down = false;
			}
		}else if(me.input.isKeyPressed('down')){
			this.body.vel.y += this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkDown")){
				this.renderable.setCurrentAnimation("walkDown");
				this.down = true;
				this.up = this.left1 = this.right1 = false;
			}
		}else{
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			//change to the standing animation
			if(this.up){
				this.renderable.setCurrentAnimation("standUp");
			}else if(this.left1){
				 this.renderable.setCurrentAnimation("standLeft");
			}else if(this.right1){ 
				this.renderable.setCurrentAnimation("standRight");
			}else if(this.down){
				this.renderable.setCurrentAnimation("standDown");
			}
		}

        // apply physics to the body (this moves the entity)
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
  	switch (response.b.body.collisionType) {
	    case me.collision.types.WORLD_SHAPE:
	    	if (other.type === "platform") {
	        	if (this.body.falling && !me.input.isKeyPressed('down') && (response.overlapV.y > 0) && (~~this.body.vel.y >= ~~response.overlapV.y)) {
	          		// Disable collision on the x axis
	          		response.overlapV.x = 0;
	          		// Respond to the platform (it is solid)
	          		return true;
	        	}
	        // Do not respond to the platform (pass through)
	        	return false;
	      	}
	      	break;
 
	    case me.collision.types.ENEMY_OBJECT:
			//flicker in case we touched an enemy
	    	this.renderable.flicker(750);
	        this.health -= 10;
	      	return false;
	      	break;
	 
	    default:
	    	// Do not respond to other objects (e.g. coins)
	      	return false;
	  }
 
  // Make the object solid
  return true;
}
});

/*
 * Enemy entities
 */
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
 
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
      this.walkLeft = false;
    } else if (!this.walkLeft && this.pos.x >= this.endX) {
      this.walkLeft = true;
    }
    
    // make it walk
    if(this.walkLeft){
    	this.renderable.setCurrentAnimation("walkLeft");
    }else{
    	this.renderable.setCurrentAnimation("walkRight");
    }
	
    this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
     
    } else {
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
  		//me.game.world.removeChild(this);
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

game.GarbageEntity = me.CollectableEntity.extend({	
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.score += 150;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}
});







