/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({
    /**
     * constructor
     */
    init:function (x, y, settings) {
    	
        // call the constructor
    	this._super(me.Entity, 'init', [x, y , settings]);

		//setting deafauly horizontal & vertical speed
		this.body.setVelocity(5, 5);
		
		//reset time limit
		game.time.limit = 300;
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

		this.time = 0;
		this.left1 = false;
 		this.right1 = false;
 		this.up = false;
 		this.down = true; 	

 		var track = me.audio.getCurrentTrack();
 		var name = me.game.currentLevel.name;
 		if(name == "headquarter"){
 			if(track == "hq") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("hq", true);
 		}
 		else if(name == "tocity1" || name == "tocity2" || name == "tocity3"){
 			if(track == "tocity") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("tocity", true);
 		}
 		else if(name == "city"){
 			if(track == "city") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("city", true);
 		}
 		else if(name == "antarctica" || name == "toantar1" || name == "toantar2"){
 			if(track == "ice") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("ice", true);
 		}
 		else if(name == "todesert1" || name == "todesert2" || name == "todesert3" || name == "desert" || name == "turbinemap"){
 			if(track == "desert") return;
 			me.audio.stopTrack();
 			me.audio.playTrack("desert", true);
 		}
 		//console.log(name);
    },

    /**
     * update the entity
     */
    update : function (dt) {
    	
    	//time limits
    	this.time++;
    
    	if(this.time % 50 === 0){
			game.time.limit--;
			game.time.overallTime++;
		}
		if(game.time.limit == 0){
			me.state.change(me.state.GAME_END);
		}

		//************CHECK FOR KEY INPUT ****************

 		//pause button, hit P to pause, ESC to unpause
 		if(me.input.isKeyPressed('pause') && !me.state.isPaused()){
 			//me.game.world.addChild(new game.HUD.MenuBoxItem(10, 40));
 			me.state.pause(true);
 			var resume_loop = setInterval(function check_resume(){
 				if(me.input.isKeyPressed('unpause')){
 					clearInterval(resume_loop);
 					me.state.pause(false);
 					me.state.resume(true);
 				}
 			}, 100);
 		}

 		if(me.input.isKeyPressed('quit')){
 			me.state.change(me.state.GAME_END);
 		}

		//ice level
		
		if(me.game.currentLevel.name == "antarlevel"){
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

		if(me.game.currentLevel.name != "antarlevel"){	
			if(me.input.isKeyPressed('left')){
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;
				if(!this.renderable.isCurrentAnimation('walkLeft')){
					this.renderable.setCurrentAnimation("walkLeft");
					this.left1 = true;
					this.right1 = this.up = this.down = false;
				}
			}else if(me.input.isKeyPressed('right')){
				this.body.vel.x += this.body.accel.x * me.timer.tick;
				this.body.vel.y = 0;
				if(!this.renderable.isCurrentAnimation('walkRight')){
					this.renderable.setCurrentAnimation("walkRight");
					this.right1 = true;
					this.up = this.down = this.left1 = false;
				}
			}else if(me.input.isKeyPressed('up')){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
				this.body.vel.x = 0;
				if(!this.renderable.isCurrentAnimation('walkUp')){
					this.renderable.setCurrentAnimation("walkUp");
					this.up = true;
					this.right1 = this.left1 = this.down = false;
				}
			}else if(me.input.isKeyPressed('down')){
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
		
		//throwing
		if(me.input.isKeyPressed('throw')){
			if(game.item.garbage >= 1){
				var shot = me.pool.pull("BulletEntity", this.pos.x+5, this.pos.y+5, {
					image: 'garbage', 
					spritewidth: 16, 
					spriteheight:14, 
					width:16, 
					height:14
				}, [this.up, this.down, this.left1, this.right1]);
				me.game.world.addChild(shot, this.z);
				game.item.garbage--;
				game.data.score -= 150;
				me.audio.play("hit");
			}
			//me.game.world.sort();
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
				//if flickering, don't deduct hp until done flickering'
				if(other.name != "laser"){
		    		if(!this.renderable.isFlickering()){
		    			this.renderable.flicker(750);
		        		game.data.hp -= 1;
		        		if(game.data.hp <= 0){
			        		me.state.change(me.state.GAME_END);
		        		}
		        	}
	        	}
	        	if(other.name == "laser"){
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

