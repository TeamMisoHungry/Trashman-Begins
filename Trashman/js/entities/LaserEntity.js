game.LaserEntity = me.Entity.extend({
	init: function(x, y, settings){
		settings.image = "fire";
		settings.width = 75;
		settings.height = 11;
		settings.name = "laser";
		settings.collisionMask = 4;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("fire", [0]);
		this.time = 0;
		this.body.setCollisionType = me.collision.types.ENEMY_OBJECT;
		this.updateBounds();
	},
	
	update: function(dt){
		this.time++;	
		this.renderable.setCurrentAnimation("fire");
		if(this.time % 175 == 0){
			me.game.world.removeChild(this);
		}
		//console.log(this);
		me.collision.check(this);
		//console.log(me.collision.check(this));
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



