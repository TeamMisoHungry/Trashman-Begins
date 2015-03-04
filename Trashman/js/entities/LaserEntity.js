game.LaserEntity = game.EnemyEntity.extend({
	init: function(x, y, settings){
		settings.image = "fire";
		settings.width = 75;
		settings.height = 11;
		settings.name = "laser";
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("fire", [0]);
		this.time = 0;
		this.body.setCollisionType = me.collision.types.ENEMY_OBJECT;
		this.updateBounds();
		this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
		me.game.world.addChild(this, 5);
	},
	
	update: function(dt){
		this.time++;
		if(!this.renderable.isCurrentAnimation("fire")){	
			this.renderable.setCurrentAnimation("fire");
		}
		
		if(this.time % 175 == 0){
			me.game.world.removeChild(this);
		}
		
		me.collision.check(this);
		//console.log(me.collision.check(this));
		return (this._super(me.Entity, 'update', [dt]));
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