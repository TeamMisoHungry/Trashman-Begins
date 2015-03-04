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

		this.isWeaponCoolDown = false;
        this.weaponCoolDownTime = 500;
		//setting deafauly horizontal & vertical speed
		this.body.setVelocity(3, 3);
		
		//reset time limit
		game.time.limit = 300;
		//setting display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//ensure the player is updated even when outside of viewport
		this.alwaysUpdate = true;
		
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
		//set hitting animations
		this.renderable.addAnimation("hitRight", [2]);
		this.renderable.addAnimation("hitLeft", [0]);
		this.renderable.addAnimation("hitUp", [3]);
		this.renderable.addAnimation("hitDown", [1]);

		//shooting
		this.lastTick = 0;

		this.time = 0;
		this.left1 = false;
 		this.right1 = false;
 		this.up = false;
 		this.down = true;
 		this.hitting = false;
 		this.bladesCollected = 0;

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
		if(this.bladesCollected >= 4){
			me.state.change(me.state.GAME_END);
		}

		//************CHECK FOR KEY INPUT ****************

 		//pause button, hit P to pause, ESC to unpause
 		if(me.input.isKeyPressed('pause') && !me.state.isPaused()){
 			me.state.pause(true);
 			var resume_loop = setInterval(function check_resume(){
 				if(me.input.isKeyPressed('unpause')){
 					clearInterval(resume_loop);
 					me.state.pause(false);
 					me.state.resume(true);
 				}
 			}, 100);
 		}

		//this needs to be declared in the game.js file. 
		/*
 		if(me.input.isKeyPressed('talk')){
 			console.log("talk");
 		}*/

 		if(me.input.isKeyPressed('quit')){
 			me.state.change(me.state.GAME_END);
 		}

		//adding movement/changing main character's sprite based on up, down, left, right arrows
		if(me.input.isKeyPressed('left')){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkLeft")){
				this.renderable.setCurrentAnimation("walkLeft");
				this.left1 = true;
				this.right1 = this.up = this.down = false;
			}
		}else if(me.input.isKeyPressed('right')){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkRight")){
				this.renderable.setCurrentAnimation("walkRight");
				this.right1 = true;
				this.up = this.down = this.left1 = false;
			}
		}else if(me.input.isKeyPressed('up')){
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkUp")){
				this.renderable.setCurrentAnimation("walkUp");
				this.up = true;
				this.right1 = this.left1 = this.down = false;
			}
		}else if(me.input.isKeyPressed('down')){
			this.body.vel.y += this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkDown")){
				this.renderable.setCurrentAnimation("walkDown");
				this.down = true;
				this.up = this.left1 = this.right1 = false;
			}
		}else{
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			//change to the standing animation
			this.setStandingAnimation();
			if(me.input.isKeyPressed('punch')){
				this.setHittingAnimation();			
			}else{
				this.hitting = false;
			}
		}
		
		/*if(me.input.isKeyPressed('read')){
			if(is_facing_hq_sign){
				
			}else if(is_facing_city_sign){
				
			}else if(is_facing_ice_sign){
				
			}else if(is_facing_desert_sign){
				
			}	
		}*/

		//Attack
		if(me.input.isKeyPressed('punch')){
			this.setHittingAnimation();
		}else{
			this.hitting = false;
		}

		//Throwing
		if(me.input.isKeyPressed('throw')){
			var throwTrash = new game.BulletEntity(this.pos.x, this.pos.y, {
				image: 'garbage', 
				spritewidth: 16, 
				spriteheight:14, 
				width:16, 
				height:14
			});
			me.game.world.addChild(throwTrash, this.z);
			me.game.world.sort();
		}
        

        // apply physics to the body (this moves the entity)
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
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
				if(me.input.isKeyPressed('punch')){
					me.game.world.removeChild(other);
					game.data.score += 50;
				}
				else{
		    		this.renderable.flicker(750);
		        	game.data.hp -= 0.1;
		        	if(game.data.hp <= 0){
		        		me.state.change(me.state.GAME_END);
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
	
	setStandingAnimation: function(){
		if(this.up){
			this.renderable.setCurrentAnimation("standUp");
		}else if(this.left1){
			 this.renderable.setCurrentAnimation("standLeft");
		}else if(this.right1){ 
			this.renderable.setCurrentAnimation("standRight");
		}else if(this.down){
			this.renderable.setCurrentAnimation("standDown");
		}
	},
	
	setHittingAnimation: function(){
		if(this.up){
			this.renderable.setCurrentAnimation("hitUp");
		}else if(this.left1){
			 this.renderable.setCurrentAnimation("hitLeft");
		}else if(this.right1){ 
			this.renderable.setCurrentAnimation("hitRight");
		}else if(this.down){
			this.renderable.setCurrentAnimation("hitDown");
		}
		this.hitting = true;
	}

});



