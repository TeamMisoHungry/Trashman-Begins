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
		this.laserFire = false;
	},
	
	update: function(dt){
		this.time++;
		if(!this.laserFire){	
			this.renderable.setCurrentAnimation("fire");
			this.laserFire = true;
		}
		
		if(this.time % 175 == 0){
			me.game.world.removeChild(this);
		}
		
		return (this._super(me.Entity, 'update', [dt]));
	},
	
	onCollision: function(response, other){
		this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
	}
});