/*
 *	NPC Entities
 */

/* NPC Miku appears after Ice Level Puzzle 1
 * she collects penguins after Hero saves then
 * 1 penguin = 100 pts
 */
game.MikuEntity = me.Entity.extend({	

	init: function(x, y, settings){
    	//settings.image = "Miku";
    	//settings.spritewidth = settings.width = 320;
    	//settings.spriteheight = settings.height = 32;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0]);
	},

	update: function(dt) {
		this.renderable.setCurrentAnimation("idle");
	},
	
	onCollision: function(response, other){

		//Rescue penguins and then give them to Miku to get points.
<<<<<<< HEAD
		
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	},
});
=======
		me.game.world.addChild(new game.chatbox(180, 250));
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		
	}
});

game.chatbox = me.GUI_Object.extend({
	init:function (x, y){
		var settings = {};
			settings.image = me.loader.getImage('creditScreen');
      		settings.spritewidth = 75;
      		settings.spriteheight = 20;
      		// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      		// define the object z order
      		this.z = Infinity;
	},
	onClick:function (event){
 		me.game.world.removeChild(this);
    }
});
>>>>>>> d8ad707d7e1fc629df932638439b1e9ebd8ecc8f