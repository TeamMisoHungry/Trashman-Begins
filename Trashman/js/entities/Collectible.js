/*
 * Things that are collectable
 */

//Appear in most maps
game.GarbageEntity = me.CollectableEntity.extend({	
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.score += 50;
		game.item.garbage += 1;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}
});

//Collectable in Ice Puzzle Map
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
