/*
 *	NPC Entities
 */

game.MikuEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){
		game.data.score += 300;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		
	}
});