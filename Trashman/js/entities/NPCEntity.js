/*
 *	NPC Entities
 */

game.MikuEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.CollectableEntity, 'init', [x, y, settings]);
	},
	
	onCollision: function(response, other){

		//Rescue penguins and then give them to Miku to get points.
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		
	}
});