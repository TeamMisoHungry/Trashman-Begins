/*
 * Enemy entities
 */
game.EnemyEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "badGuy";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

 	this.alwaysUpdate = true;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 40;
    settings.spriteheight = settings.height = 32;
     
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
	  this.renderable.flipX(this.walkLeft);
	  this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
    }else {
      this.body.vel.x = 0;
    }
           
    // update the body movement
    this.body.update(dt);
       
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
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
    this.endY   = y + height - settings.spriteheight * 2;
    this.pos.y = y + height - settings.spriteheight * 2;
 
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
 	//console.log(this);
    if (this.alive) {
      if (this.walkUp && this.pos.y <= this.startY) {
      	this.walkUp = false;
      }else if (!this.walkUp && this.pos.y >= this.endY) {
      	this.walkUp = true;
      }
	    // make it walk
	    if(this.walkUp){
	    	if(!this.renderable.isCurrentAnimation("walkUp")){
	    		this.renderable.setCurrentAnimation("walkUp");
	    	}
	    }else{
	    	if(!this.renderable.isCurrentAnimation("walkDown")){
	    		this.renderable.setCurrentAnimation("walkDown");
	    	}
	    }
	    this.body.vel.y += (this.walkUp) ? -this.body.accel.y * me.timer.tick : this.body.accel.y * me.timer.tick;
     
    }else {
     	this.body.vel.y = 0;
    }
  
    // update the body movement
    this.body.update(dt);
     
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
  }
  
});

game.TurretEntity = me.Entity.extend({
	init: function(x, y, settings){
		settings.z = 4;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("safe", [1]);
		this.renderable.addAnimation("prep", [0, 2]);

		this.time = 0;
		this.safe = true;
		this.prep = false;
		this.fire = false;
		this.fireObject = false;
		this.renderable.setCurrentAnimation("safe");
	},
	
	update: function(dt){
		this.time++;
		
		if(this.time % 150 === 0 && this.safe){
			this.fireObject = false;
			this.safe = false;
			this.prep = true;
		}else if(this.time % 150 === 0 && this.prep){
			this.prep = false;
			this.fire = true;
		}else if(this.time % 175 === 0 && this.fire){
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
			}
		}
	},	
	
	onCollision: function(){
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
	}
});