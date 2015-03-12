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
		me.game.world.addChild(new game.chatbox(10, 80));
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
		me.game.world.addChild(new game.chatbox(10, 80));
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
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
		//Rescue penguins and then give them to Miku to get points.
		//game.data.talking_to_miku = true;
		//game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.BrokenTurbineEntity = me.Entity.extend({	
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		settings.image = "brokenTurbine";
		settings.name = "brokenTurbine";
	},

	onCollision: function(response, other){
		game.data.fixing_turbine = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(10, 80));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
		game.data.blade -= 1;
  		var new_turbine = me.pool.pull("FixedTurbineEntity", this.pos.x, this.pos.y, {});
 		me.game.world.removeChild(this);
 		return false;
	}
	
});

game.DeadEntity = me.Entity.extend({
  init : function(x, y, settings){
    settings.image = "badGuy2";
    settings.width = 40;
    settings.height = 32;
    this._super(me.Entity, 'init', [x, y, settings]);
    this.renderable.addAnimation("die", [18, 19, 20, 21, 22, 23]);
    this.renderable.setCurrentAnimation("die", (function () {
        me.game.world.removeChild(this);
        return false; // do not reset to first frame, remove from world when done
    }).bind(this));
    me.game.world.addChild(this, Infinity);
    this.body.setCollisionType = me.collision.types.NO_OBJECT;
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
			settings.image = me.loader.getImage('sampleChatBox');
      		settings.spritewidth = 160;
      		settings.spriteheight = 30;
      		// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      		// define the object z order
      		this.z = 10;
	},
	onClick:function (event){
 		me.game.world.removeChild(this);
 		game.data.fixing_turbine = false;
 		game.data.talking_to_miku = false;
 		game.data.talking_to_jelly = false;
 		game.data.notTalking = true;
    }
});


