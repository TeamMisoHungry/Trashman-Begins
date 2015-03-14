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
		this.body.collisionType = me.collision.types.NPC_OBJECT;
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
		this.body.collisionType = me.collision.types.NPC_OBJECT;
	},

	onCollision: function(response, other){
		//Rescue penguins and then give them to Miku to get points.
		game.data.talking_to_miku = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		var numPeng = game.data.penguin;
		game.data.penguin = 0;
		game.data.score +=  100 * numPeng;
		if (me.game.currentLevel.name == "antarlevelend") {
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
		this.body.collisionType = me.collision.types.NPC_OBJECT;
	},

	onCollision: function(response, other){
		game.data.talking_to_sakura = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		game.data.blade += 1;
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.AliceEntity = me.Entity.extend({
	
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4],200);
		this.renderable.setCurrentAnimation("idle");
		this.body.collisionType = me.collision.types.NPC_OBJECT;
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
		this.body.collisionType = me.collision.types.NPC_OBJECT;
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
		this.body.collisionType = me.collision.types.NPC_OBJECT;
	},
	update: function(dt) {
		this.time++;
		this.body.update(dt);
		me.collision.check(this);
		return (this._super(me.Entity, 'update', [dt]));
	},
	onCollision: function(response, other){
		if(response.b.body.collisionType == me.collision.types.PLAYER_OBJECT){
			if(me.game.currentLevel.name == "turbinemap"){
				game.data.talking_to_gumi_noexit = true;
			}
			else if(me.game.currentLevel.name == "desert"){
				game.data.talking_to_gumi = true;
			}
		
			game.data.notTalking = false;
			me.game.world.addChild(new game.chatbox(0, 0));
			this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
		
			return false;
		}
		return false;
	}
});

game.ArielEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],200);
		this.renderable.setCurrentAnimation("idle");
		this.body.collisionType = me.collision.types.NPC_OBJECT;
	},

	onCollision: function(response, other){
		game.data.talking_to_ariel = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		game.data.blade += 1;
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);
	}
});

game.RekiEntity = me.Entity.extend({	

	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3, 4, 5, 6],200);
		this.renderable.setCurrentAnimation("idle");
		this.body.collisionType = me.collision.types.NPC_OBJECT;
	},

	onCollision: function(response, other){
		if(me.game.currentLevel.name == "citypuzzleend"){
			if(game.data.hp<=100 && game.data.hp>=80){
				game.data.score += 500;
			}
			else if(game.data.hp<80 && game.data.hp>=30){
				game.data.score += 250;
			}
			else if(game.data.hp<30){
				game.data.score += 100;
			}
		}
		game.data.talking_to_reki = true;
		game.data.notTalking = false;
		me.game.world.addChild(new game.chatbox(0, 0));
		this.body.setCollisionMask(me.collision.types.NPC_OBJECT);		
		return false;
	}
});

game.BrokenTurbineEntity = me.Entity.extend({
  init: function(x, y, settings) {
    settings.image = "brokenTurbine";
    settings.name = "brokenTurbine";
    var width = settings.width;
    var height = settings.height;
    settings.spritewidth = settings.width = 55;
    settings.spriteheight = settings.height = 110;
    this._super(me.Entity, 'init', [x, y, settings]);
  },
  onCollision : function (response, other) {
		if(game.data.blade > 0){
			game.data.fixing_turbine = true;
			game.data.notTalking = false;
			me.game.world.addChild(new game.chatbox(0, 0));
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
		if(game.data.talking_to_miku){
			settings.image = me.loader.getImage('Mikutalk');
		}
		else if(game.data.talking_to_sakura){
			settings.image = me.loader.getImage('Sakuratalk');
		}
		else if(game.data.talking_to_alice){
			settings.image = me.loader.getImage('Alicetalk');
		}
		else if(game.data.talking_to_mimi){
			settings.image = me.loader.getImage('Mimitalk');
		}
		else if(game.data.talking_to_gumi){
			settings.image = me.loader.getImage('Gumitalk');
		}
		else if(game.data.talking_to_ariel){
			settings.image = me.loader.getImage('Arieltalk');
		}
		else if(game.data.talking_to_reki){
			settings.image = me.loader.getImage('Rekitalk');
		}
		else{
			settings.image = me.loader.getImage('TextBox');
		}
      		settings.spritewidth = 640;
      		settings.spriteheight = 480;
      		// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      		// define the object z order
      		this.z = 10;
	},
	onClick:function (event){
		if(game.data.talking_to_alice){
			game.data.talking_to_alice = false;
			game.data.talking_to_alice2 = true;
		}
	},
	update: function(dt) {
		if(me.input.isKeyPressed('talk')){
	 		me.game.world.removeChild(this);
	 		if(game.data.talking_to_gumi_enter){
	 			me.levelDirector.loadLevel("turbinemap");
	 		}
	 		game.data.talking_to_broken_turbine = false;
	 		game.data.talking_to_miku = false;
	 		game.data.talking_to_jelly = false;
	 		game.data.talking_to_sakura = false;
	        game.data.talking_to_alice = false;
	        game.data.talking_to_mimi = false;
	        game.data.talking_to_gumi = false;
	        game.data.talking_to_ariel = false;
	        game.data.talking_to_reki = false;
	 		game.data.notTalking = true;
			game.data.talking_to_alice2 = false;
	    }
	}
});

