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
		
		//reset time limit
		game.time.limit = 300;
		//setting display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//ensure the player is updated even when outside of viewport
		this.alwaysUpdate = true;
		
		//define a basic walking animation(using all frames)
		this.renderable.addAnimation("walkRight", [12, 13, 14, 15]);
		this.renderable.addAnimation("walkLeft", [8, 9, 10, 11]);
		this.renderable.addAnimation("walkUp", [16, 17, 18, 19]);
		this.renderable.addAnimation("walkDown", [4, 5, 6, 7]);
		//define standing(not moving), using the first frame
		this.renderable.addAnimation("standDown", [4]);
		this.renderable.addAnimation("standUp", [16]);
		this.renderable.addAnimation("standLeft", [8]);
		this.renderable.addAnimation("standRight", [12]);
		//set hittin animations
		this.renderable.addAnimation("hitRight", [2]);
		this.renderable.addAnimation("hitLeft", [0]);
		this.renderable.addAnimation("hitUp", [3]);
		this.renderable.addAnimation("hitDown", [1]);

		this.time = 0;
		this.health = 100;
		this.left1 = false;
 		this.right1 = false;
 		this.up = false;
 		this.down = true;
 		this.hitting = false;
 		this.bladesCollected = 0;

    },

    /**
     * update the entity
     */
    update : function (dt) {
    	this.time++;
    
    	if(this.time % 50 === 0){
			game.time.limit--;
			game.time.overallTime++;
		}
		if(game.time.limit == 0){
			me.state.change(me.state.GAME_END);
		}
		if(this.bladesCollected >= 4){
			me.state.change(me.state.GAME_END);
		}
 		//pause button, hit P to pause, ESC to unpause
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
 		
 		if(me.input.isKeyPressed('quit')){
 			me.state.change(me.state.GAME_END);
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
			this.setStandingAnimation();
			if(me.input.isKeyPressed('punch')){
				this.setHittingAnimation();			
			}else{
				this.hitting = false;
			}
		}
		
		if(me.input.isKeyPressed('punch')){
			this.setHittingAnimation();
		}else{
			this.hitting = false;
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
				if(me.input.isKeyPressed('punch')){
					me.game.world.removeChild(other);
					game.data.score += 50;
				}
				else{
		    		this.renderable.flicker(750);
		        	game.data.hp -= 1;
		       	}
		      	return false;
		      	break;
		 
		    default:
		    	// Do not respond to other objects (e.g. coins)
		      	return false;
		  }

 	  // Make the object solid
  	  return true;
	},
	
	setStandingAnimation: function(){
		if(this.up){
			this.renderable.setCurrentAnimation("standUp");
		}else if(this.left1){
			 this.renderable.setCurrentAnimation("standLeft");
		}else if(this.right1){ 
			this.renderable.setCurrentAnimation("standRight");
		}else if(this.down){
			this.renderable.setCurrentAnimation("standDown");
		}
	},
	
	setHittingAnimation: function(){
		if(this.up){
			this.renderable.setCurrentAnimation("hitUp");
		}else if(this.left1){
			 this.renderable.setCurrentAnimation("hitLeft");
		}else if(this.right1){ 
			this.renderable.setCurrentAnimation("hitRight");
		}else if(this.down){
			this.renderable.setCurrentAnimation("hitDown");
		}
		this.hitting = true;
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

game.EnemyEntity2 = me.Entity.extend({
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
    y = this.pos.y;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight * 5;
    this.pos.y = y + height - settings.spriteheight * 5;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkUp = false;
 
    // walking & jumping speed
    this.body.setVelocity(3, 3);
    
    this.renderable.addAnimation("walkDown", [1]);
	this.renderable.addAnimation("walkUp", [2]);   
	     
  },
 
  // manage the enemy movement
  update: function(dt) {
 
    if (this.alive) {
      if (this.walkUp && this.pos.y <= this.startY) {
      	this.walkUp = false;
      }else if (!this.walkUp && this.pos.y >= this.endY) {
      	this.walkUp = true;
      }
	    // make it walk
	    if(this.walkUp){
	    	this.renderable.setCurrentAnimation("walkUp");
	    }else{
	    	this.renderable.setCurrentAnimation("walkDown");
	    }
	    this.body.vel.y += (this.walkUp) ? -this.body.accel.y * me.timer.tick : this.body.accel.y * me.timer.tick;
     
    }else {
     	this.body.vel.y = 0;
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

game.LaserEntity = me.Entity.extend({
	init: function(x, y, settings){
		settings.image = "fire";
		settings.width = 75;
		settings.height = 11;
		settings.name = "laser";
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("fire", [0]);
		this.time = 0;
		this.body.setCollisionType = me.collision.types.ENEMY_OBJECT;
	},
	
	update: function(dt){
		this.time++;	
		this.renderable.setCurrentAnimation("fire");
		if(this.time % 175 == 0){
			me.game.world.removeChild(this);
		}
		
		me.collision.check(this);
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},
	
	onCollision: function(response, other){
	  	if(me.collision.types.PLAYER_OBJECT){
	  		this.renderable.flicker(750);  		
	  	}
	    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
	      if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
	        this.renderable.flicker(750);
	      }
	      return false;
	    }
	    // Make all other objects solid
	    return true;
	}
});

game.TurretEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("safe", [1]);
		this.renderable.addAnimation("prep", [0, 2]);

		this.time = 0;
		this.safe = true;
		this.prep = false;
		this.fire = false;
		this.fireObject = false;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		this.renderable.setCurrentAnimation("safe");
	},
	
	update: function(dt){
		this.time++;
		
		if(this.time % 250 === 0 && this.safe){
			this.fireObject = false;
			this.safe = false;
			this.prep = true;
		}else if(this.time % 150 === 0 && this.prep){
			this.prep = false;
			this.fire = true;
		}else if(this.time % 250 === 0 && this.fire){
			this.fire = false;
			this.safe = true;
		}
		
		if(this.safe){
			this.renderable.setCurrentAnimation("safe");
		}else if(this.prep){
			this.renderable.setCurrentAnimation("prep");
		}else if(this.fire){
			if(!this.fireObject){
				this.fireObject = true;
				var myLaser = new game.LaserEntity(this.pos.x + 10, this.pos.y + 3, {});
				me.game.world.addChild(myLaser, 100);
			}
		}
	},	
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

game.TurbineEntity = me.CollectableEntity.extend({
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
		other.bladesCollected++;
	}
});

