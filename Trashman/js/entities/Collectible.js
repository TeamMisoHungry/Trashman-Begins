/*
 * Things that are collectable
 */

//Appear in most maps
game.GarbageEntity = me.CollectableEntity.extend({	
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	    if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
	},
	
	onCollision: function(response, other){
		game.data.score += 150;
		game.item.garbage += 1;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}
});

//Collectible in Ice Puzzle Map
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

game.BladeEntity = me.CollectableEntity.extend({
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.blade += 1;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}

});
/*
game.PotionEntity = me. CollectableEntity.extend({
	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.hp += 25;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		me.game.world.removeChild(this);
	}
});
*/