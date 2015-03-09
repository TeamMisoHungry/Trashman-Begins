game.SignEntity = me.Entity.extend({
	init: function(x, y, settings){
		settings.image = "sign";
		settings.width = 16;
		settings.height = 16;
		settings.name = "sign";
		this._super(me.Entity, 'init', [x, y, settings]);
		this.time = 0;
		this.body.setCollisionType = me.collision.types.NPC_OBJECT;
		this.updateBounds();
		this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
		me.game.world.addChild(this, Infinity);
	},
	
	update: function(dt){
	},
	
	onCollision: function(response, other){
		//let the player object pass through
		me.state.pause(true);
		//return false;
	}
});