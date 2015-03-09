/*
 * Things that are collectable
 */

game.GarbageEntity = me.CollectableEntity.extend({	
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.score += 150;
		game.item.garbage += 1;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}
});

game.PenguinEntity = me.CollectableEntity.extend({
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.penguin += 1;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}

});
