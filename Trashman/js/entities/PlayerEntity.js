/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({
    /**
     * constructor
     */
    init:function (x, y, settings) {
    	console.log(game.time.overallTime);
        // call the constructor
    	this._super(me.Entity, 'init', [x, y , settings]);

		//setting deafauly horizontal & vertical speed

		this.body.setVelocity(2.5, 2.5);
		
		//setting display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//ensure the player is updated even when outside of viewport
		this.alwaysUpdate = true;
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		
		//define a basic walking animation(using all frames)
		this.renderable.addAnimation("walkRight", [12, 13, 14, 15]);
		this.renderable.addAnimation("walkLeft", [8, 9, 10, 11]);
		this.renderable.addAnimation("walkUp", [16, 17, 18, 19]);
		this.renderable.addAnimation("walkDown", [4, 5, 6, 7]);
		//define standing(not moving), using the first frame
		this.renderable.addAnimation("standDown", [4]);
		this.renderable.addAnimation("standUp", [16]);
		this.renderable.addAnimation("standLeft", [8]);
		this.renderable.addAnimation("standRight", [12]);
		this.isPaused = true;

		this.time = 0;
		this.left1 = false;
 		this.right1 = false;
 		this.up = false;
 		this.down = true; 	
 		
 		if(me.levelDirector.getCurrentLevelId() == "headquarterc"){
 			me.input.unbindKey(me.input.KEY.W);
 			me.input.unbindKey(me.input.KEY.A);
 			me.input.unbindKey(me.input.KEY.S);
 			me.input.unbindKey(me.input.KEY.D);
 			var change = me.timer.setInterval(function(){
 				me.timer.clearInterval(change);
 				me.state.change(me.state.GAMEOVER);
 			}, 2000);
 		}


 		/*** MUSIC ***/
 		
 		var track = me.audio.getCurrentTrack();
 		var name = me.game.currentLevel.name;
 		console.log(name);
 		if(name == "headquarter" || name == "headquartera" || name == "headquarterb" || name == "headquarterc"||name == "tocity1" || name == "todesert1" || name == "todesert2"
 				|| name == "toantar1"){
 			if(track == "hq") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("hq", true);
 		}
 		else if(name == "tocity2" || name == "tocity3" ){
 			if(track == "tocity") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("tocity", true);
 		}
 		else if(name == "city" || name == "citypuzzle1" || name == "citypuzzle2" || name == "citypuzzle3" || name == "citypuzzlebegin" || name == "citypuzzleend"){
 			if(track == "city") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("city", true);
 		}
 		else if(name == "antarctica" || name == "toantar2"  || name == "toantar2b"  || name == "antarlevelbegin"  || name == "antarlevelend"){
 			if(track == "ice") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("ice", true);
 		}
 		else if (name == "antarlevel1" || name == "antarlevel2" || name == "antarlevel3"|| name == "antarlevel2a" || name == "antarlevel3a"){
 			if(track == "icelevel") return;
			me.audio.stopTrack();
 			me.audio.playTrack("icelevel", true);
 		}
 		else if(name == "todesert3" || name == "desert" || name == "turbinemap" || name == "todesert3b" || name == "desertb"){
 			if(track == "desert") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("desert", true);
 		}
 		
    },

    /**
     * update the entity
     */
    update : function (dt) {
    	
    	//time limits
    	this.time++;
    
    	if(this.time % 50 === 0){
			game.time.overallTime++;
		}
		//************CHECK FOR KEY INPUT ****************/

 		//pause button, hit P to pause and show option buttons
 		if(me.input.isKeyPressed('pause') && !me.state.isPaused()){
 			me.state.pause(true);
 			me.game.world.addChild(new game.continueButton(75, 212));
 		}
		
		//throwing
		if(me.input.isKeyPressed('throw') && game.data.notTalking){
			if(game.item.garbage >= 1){
				var shot = me.pool.pull("BulletEntity", this.pos.x+5, this.pos.y+5, {
					image: 'garbageThrow', 
					spritewidth: 10, 
					spriteheight:10, 
					width:10, 
					height:10
				}, [this.up, this.down, this.left1, this.right1]);
				me.game.world.addChild(shot, this.z);
				game.item.garbage--;
				game.data.score -= 150;
				me.audio.play("hit");
			}
		}

		/************ BELOW are for ice puzzle levels *********/
		//console.log(me.game.currentLevel.name);
		//console.log(iceDone);
		//check to see if complete quests
		if (me.levelDirector.getCurrentLevelId() == "antarlevelend") {
			game.data.iceDone = true;
		}

 		//set score of penguin to 0 if failed antarlvl2
 		if (me.game.currentLevel.name == "antarlevelBegin"
 		|| me.game.currentLevel.name == "antarlevel2a" 
 		|| me.game.currentLevel.name == "antarlevel3a"){
 			game.data.penguin = 0;
 		}

		//ice level movements/sprites changes
		if(me.game.currentLevel.name == "antarlevel1" 
		|| me.game.currentLevel.name == "antarlevel2"
		|| me.game.currentLevel.name == "antarlevel3" ){
			//|| me.game.currentLevel.name == "antarlevel2"
			
			this.body.setVelocity(2, 2);
			this.body.vel.y += this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			this.down = true;
			if(!this.renderable.isCurrentAnimation('walkDown')){
				this.renderable.setCurrentAnimation("walkDown");
			}
			
			if(me.input.isKeyPressed('left')){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			if(!this.renderable.isCurrentAnimation('walkLeft')){
				this.renderable.setCurrentAnimation("walkLeft");
				this.left1 = true;
				this.right1 = false;
				}
			}
			else if(me.input.isKeyPressed('right')){
				this.body.vel.x += this.body.accel.x * me.timer.tick;
				if(!this.renderable.isCurrentAnimation('walkRight')){
					this.renderable.setCurrentAnimation("walkRight");
					this.right1 = true;
					this.left1 = false;
				}
			}
		}		

		//adding movement/changing main character's sprite based on up, down, left, right arrows
		if(me.game.currentLevel.name != "antarlevel1"
		&& me.game.currentLevel.name != "antarlevel2"
		&& me.game.currentLevel.name != "antarlevel3" ){	
			if(me.input.isKeyPressed('left') && game.data.notTalking){
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;
				if(!this.renderable.isCurrentAnimation('walkLeft')){
					this.renderable.setCurrentAnimation("walkLeft");
					this.left1 = true;
					this.right1 = this.up = this.down = false;
				}
			}else if(me.input.isKeyPressed('right') && game.data.notTalking){
				this.body.vel.x += this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;
				if(!this.renderable.isCurrentAnimation('walkRight')){
					this.renderable.setCurrentAnimation("walkRight");
					this.right1 = true;
					this.up = this.down = this.left1 = false;
				}
			}else if(me.input.isKeyPressed('up') && game.data.notTalking){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
				this.body.vel.x = 0;
				if(!this.renderable.isCurrentAnimation('walkUp')){
					this.renderable.setCurrentAnimation("walkUp");
					this.up = true;
					this.right1 = this.left1 = this.down = false;
				}
			}else if(me.input.isKeyPressed('down') && game.data.notTalking){
				this.body.vel.y += this.body.accel.y * me.timer.tick;
				this.body.vel.x = 0;
				if(!this.renderable.isCurrentAnimation('walkDown')){
					this.renderable.setCurrentAnimation("walkDown");
					this.down = true;
					this.up = this.left1 = this.right1 = false;
				}
			}else{
				this.body.vel.x = 0;
				this.body.vel.y = 0;
				//change to the standing animation
				if(this.up){
					this.renderable.setCurrentAnimation("standUp");
				}else if(this.left1){
					 this.renderable.setCurrentAnimation("standLeft");
				}else if(this.right1){ 
					this.renderable.setCurrentAnimation("standRight");
				}else if(this.down){
					this.renderable.setCurrentAnimation("standDown");
				}
			}
		}

		//if player hp drops to 0
		if (game.data.hp <= 0){
			me.state.change(me.state.GAME_END);
		}
        // apply physics to the body (this moves the entity)
        this.body.update(dt);
        
        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0 || this.body.vel.x === 0 || this.body.vel.y === 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
	  	switch (response.b.body.collisionType) {
		    case me.collision.types.WORLD_SHAPE:
		    	if (other.type === "platform") {
		        	if (this.body.falling && !me.input.isKeyPressed('down') && (response.overlapV.y > 0) && (~~this.body.vel.y >= ~~response.overlapV.y)) {
		          		// Disable collision on the x axis
		          		response.overlapV.x = 0;
		          		// Respond to the platform (it is solid)
		          		return true;
		        	}
		        // Do not respond to the platform (pass through)
		        	return false;
		      	}
		      	break;
	 
		    case me.collision.types.ENEMY_OBJECT:
				//flicker in case we touched an enemy
				//if flickering, don't deduct hp until done flickering
	        	if (other.name == "badguy"){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 5;
	        		}
	        	}else if (other.name == "badguy2"){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 5;
	        		}
	        	}else if (other.name == "badrobot"){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 15;
	        		}
	        	}else if (other.name == "badrobot2"){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 15;
	        		}
	        	}else if(other.name == "laser"){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 10;
	        		}
	        	}
		      	return false;
		      	break;

		    default:
		    	// Do not respond to other objects (e.g. coins)
		      	return false;
		  }
	
	 	  // Make the object solid
	  	  return true;
	},
});

game.continueButton = me.GUI_Object.extend({
	init:function (x, y){
		var settings = {};
		settings.image = me.loader.getImage('continue');
		settings.spritewidth = 181;
		settings.spriteheight = 48;
		// super constructor
		this._super(me.GUI_Object, "init", [x, y, settings]);
		// define the object z order
		this.z = Infinity;
		this.updateWhenPaused = true;
		this.color = new me.ColorLayer("black", "#000000", 4999);
		this.pause = new me.ImageLayer("pause", 640, 470, "pauseScreen", 5000);
		this.pause.repeat = "no-repeat";
		this.quit = new game.quitButton(75, 270);

		me.game.world.addChild(this.pause);
		me.game.world.addChild(this.color);
		me.game.world.addChild(this.quit);

	},

	onClick:function (event){
		me.state.pause(false);
		me.state.resume(true);
		me.game.world.removeChild(this);
		me.game.world.removeChild(this.pause);
		me.game.world.removeChild(this.color);
		me.game.world.removeChild(this.quit);

	},
});

game.quitButton = me.GUI_Object.extend({
	init:function (x, y){
		var settings = {};
		settings.image = me.loader.getImage('quit');
		settings.spritewidth = 117;
		settings.spriteheight = 48;
		// super constructor
		this._super(me.GUI_Object, "init", [x, y, settings]);
		// define the object z order
		this.z = Infinity;
		this.updateWhenPaused = true;
	},

	onClick:function (event){
		me.state.pause(false);
		me.state.resume(true);
		me.state.change(me.state.MENU);
	},
});


