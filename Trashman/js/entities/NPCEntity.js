/*
 *	NPC Entities
 */

/* NPC Miku appears after Ice Level Puzzle 1
 * she collects penguins after Hero saves then
 * 1 penguin = 100 pts
 */

game.JellyEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_jelly = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.MikuEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		//Rescue penguins and then give them to Miku to get points.
		game.data.talking_to_miku = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
		if (game.data.iceDone) {
			game.data.blade += 1;
		}
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.SakuraEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_sakura = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.AliceEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_alice = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.MimiEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_mimi = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.GumiEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_gumi = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.ArielEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_ariel = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.RekiEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6],200);
		this.renderable.setCurrentAnimation("idle");
	},

	onCollision: function(response, other){
		game.data.talking_to_reki = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.BrokenTurbineEntity = me.Entity.extend({	
	init: function(x, y, settings){
		settings.image = "brokenTurbine";
		settings.name = "brokenTurbine";
		x = 454;
		y = 563;
		this._super(me.Entity, 'init', [x, y, settings]);

		me.game.world.addChild(this);
	},

	onCollision: function(response, other){
		if(game.data.blade>0){
			game.data.fixing_turbine = true;
			game.data.notTalking = false;
			me.game.world.addChild(new game.chatbox(10, 80));
			this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
			game.data.blade -= 1;
	  		var new_turbine = me.pool.pull("FixedTurbineEntity", this.pos.x, this.pos.y, {});
	 		me.game.world.removeChild(this);
	 	}
 		return false;
	}
	
});

game.FixedTurbineEntity = me.Entity.extend({	
	init: function(x, y, settings){
		settings.image = "fixedTurbine";
		settings.width = 55;
      	settings.height = 110;
		this._super(me.Entity, 'init', [x, y, settings]);
		me.game.world.addChild(this, Infinity);
	},
});

game.chatbox = me.GUI_Object.extend({
	init:function (x, y){
		var settings = {};
			settings.image = me.loader.getImage('TextBox');
      		settings.spritewidth = 640;
      		settings.spriteheight = 480;
      		// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      		// define the object z order
      		this.z = 10;
	},
	onClick:function (event){
 		me.game.world.removeChild(this);
 		game.data.talking_to_broken_turbine = false;
 		game.data.talking_to_miku = false;
 		game.data.talking_to_jelly = false;
 		game.data.talking_to_sakura = false,
        game.data.talking_to_alice = false,
        game.data.talking_to_mimi = false,
        game.data.talking_to_gumi = false
        game.data.talking_to_ariel = false,
        game.data.talking_to_reki = false,
 		game.data.notTalking = true;
    }
});

