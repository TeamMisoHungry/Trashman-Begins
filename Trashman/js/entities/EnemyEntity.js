/*
 * Enemy entities
 */
game.EnemyEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "badGuy";
    settings.name = "badGuy";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

  this.alwaysUpdate = true;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 40;
    settings.spriteheight = settings.height = 32;
     
 
    this._super(me.Entity, 'init', [x, y, settings]);
  
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.spritewidth;
    this.pos.x  = x + width - settings.spritewidth;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking speed
    this.body.setVelocity(1.5, 1.5); 
       
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
    me.collision.check(this);
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {    
  	//collision with trash
  	if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
  		var shot = me.pool.pull("DeadEntity", this.pos.x, this.pos.y, {});
  		me.game.world.removeChild(other);
  		var trash = me.pool.pull("GarbageEntity", other.pos.x, other.pos.y, {image: "garbage", width: 10, height: 10});
  		me.game.world.addChild(trash);
 		me.game.world.removeChild(this);
      	game.data.score += 100;
  	}
  	return false;
  }  
});

game.EnemyEntity2 = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "badGuy2";
    settings.name = "badGuy2";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

  
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 40;
    settings.spriteheight = settings.height = 32;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
  
    // set start/end position based on the initial area size
    y = this.pos.y;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight;
    this.pos.y = y + height - settings.spriteheight;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkUp = false;
 
    // walking & jumping speed
    this.body.setVelocity(1.5, 1.5);
    
    this.renderable.addAnimation("walkDown", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  this.renderable.addAnimation("walkUp", [9, 10, 11, 12, 13, 14, 15, 16, 17]);     
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
    me.collision.check(this);     
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	//collision with trash
  	if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
  		var shot = me.pool.pull("DeadEntity", this.pos.x, this.pos.y, {});
  		me.game.world.removeChild(other);
  		var trash = me.pool.pull("GarbageEntity", other.pos.x, other.pos.y, {image: "garbage", width: 10, height: 10});
  		me.game.world.addChild(trash);
 		me.game.world.removeChild(this);
      	game.data.score += 100;
  	}
  	return false;
  }
});

game.DeadEntity = me.Entity.extend({
  init : function(x, y, settings){
    settings.image = "badGuy2";
    settings.width = 40;
    settings.height = 32;
    this._super(me.Entity, 'init', [x, y, settings]);
    this.renderable.addAnimation("die", [18, 19, 20, 21, 22, 23]);
    this.renderable.setCurrentAnimation("die", (function () {
        me.game.world.removeChild(this);
        return false; // do not reset to first frame, remove from world when done
    }).bind(this));
    me.game.world.addChild(this, Infinity);
    this.body.setCollisionType = me.collision.types.NO_OBJECT;
  }
  
});


/*************************** ICE LEVEL ENEMIES **************************/

game.IceEnemyEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "badRobot";
    settings.name = "badRobot";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

    this.alwaysUpdate = true;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 40;
    settings.spriteheight = settings.height = 32;
    
 
    this._super(me.Entity, 'init', [x, y, settings]);
  
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.spritewidth;
    this.pos.x  = x + width - settings.spritewidth;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking speed
    this.body.setVelocity(1.5, 1.5); 
       
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
    me.collision.check(this);
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	//collision with trash
  	if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
  		var shot = me.pool.pull("DeadEntity", this.pos.x, this.pos.y, {});
  		me.game.world.removeChild(other);
  		var trash = me.pool.pull("GarbageEntity", other.pos.x, other.pos.y, {image: "garbage", width: 10, height: 10});
  		me.game.world.addChild(trash);
 		me.game.world.removeChild(this);
      	game.data.score += 100;
  	}
  	return false;
  }
  
});

game.IceEnemyEntity2 = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "badRobot2";
    settings.name = "badRobot2";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

  
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 40;
    settings.spriteheight = settings.height = 32;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
  
    // set start/end position based on the initial area size
    y = this.pos.y;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight;
    this.pos.y = y + height - settings.spriteheight;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkUp = false;
 
    // walking & jumping speed
    this.body.setVelocity(1.5, 1.5);
    
    this.renderable.addAnimation("walkDown", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  this.renderable.addAnimation("walkUp", [9, 10, 11, 12, 13, 14, 15, 16, 17]);     
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
    me.collision.check(this);     
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  	//collision with trash
  	if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
  		var shot = me.pool.pull("DeadEntity", this.pos.x, this.pos.y, {});
  		me.game.world.removeChild(other);
  		var trash = me.pool.pull("GarbageEntity", other.pos.x, other.pos.y, {image: "garbage", width: 10, height: 10});
  		me.game.world.addChild(trash);
 		me.game.world.removeChild(this);
      	game.data.score += 100;
  	}
  	return false;
  }
});

/*******************************TURRET**********************************/

game.TurretEntity = me.Entity.extend({
  init: function(x, y, settings){
    settings.z = 4;
    this._super(me.Entity, 'init', [x, y, settings]);
    this.renderable.addAnimation("safe", [1]);
    this.renderable.addAnimation("prep", [0, 2]);
    this.body.collisionType = me.collision.types.NO_OBJECT;
    this.time = 0;
    this.safe = true;
    this.prep = false;
    this.fire = false;
    this.fireObject = false;
    this.renderable.setCurrentAnimation("safe");
    this.prep2 = false;
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
    }else if(this.time % 150 === 0 && this.fire){
      this.fire = false;
      this.safe = true;
    }
    
    if(this.safe){
      this.renderable.setCurrentAnimation("safe");
    }else if(this.prep && !this.prep2){
      this.renderable.setCurrentAnimation("prep");
      this.prep2 = true;
    }else if(this.fire){
      if(!this.fireObject){
        this.renderable.setCurrentAnimation("safe");
        this.fireObject = true;
        this.prep2 = false;
        var myLaser = new game.LaserEntity(this.pos.x + 10, this.pos.y + 3, {});
      }
    }
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x === 0 || this.body.vel.y === 0);
  },  
  
  onCollision: function(){
    return true;
  }
});

game.TurretEntity2 = me.Entity.extend({
	init: function(x, y, settings){
		settings.z = 4;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("safe", [1]);
		this.renderable.addAnimation("prep", [0, 2]);
		this.body.collisionType = me.collision.types.NO_OBJECT;
		this.time = 0;
		this.safe = true;
		this.prep = false;
		this.prep2 = false;
		this.fire = false;
		this.fireObject = false;
		this.renderable.setCurrentAnimation("safe");
		this.renderable.flipX(true);
	},
	
	update: function(dt){
		this.time++;
		
		if(this.time % 100 === 0 && this.safe){
			this.fireObject = false;
			this.safe = false;
			this.prep = true;
		}else if(this.time % 100 === 0 && this.prep){
			this.prep = false;
			this.fire = true;
		}else if(this.time % 100 === 0 && this.fire){
			this.fire = false;
			this.safe = true;
		}
		
		if(this.safe){
			this.renderable.setCurrentAnimation("safe");
		}else if(this.prep && !this.prep2){
			this.renderable.setCurrentAnimation("prep");
			this.prep2 = true;
		}else if(this.fire){
			if(!this.fireObject){
				this.renderable.setCurrentAnimation("safe");
				this.fireObject = true;
				this.prep2 = false;
				var myLaser = new game.LaserEntity2(this.pos.x, this.pos.y + 3, {});
			}
		}
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x === 0 || this.body.vel.y === 0);
	},	
	
	onCollision: function(){
		return true;
	}
});