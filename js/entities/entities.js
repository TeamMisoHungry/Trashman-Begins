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
		this.body.setVelocity(3, 3);
		
		//setting display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//ensure the player is updated even when outside of viewport
		this.alwaysUpdate = true;
		
		//define a basic walking animation(using all frames)
		this.renderable.addAnimation("walkRight", [0]);
		this.renderable.addAnimation("walkLeft", [3]);
		this.renderable.addAnimation("walkUp", [2]);
		this.renderable.addAnimation("walkDown", [1]);
		//define standing(not moving), using the first frame
		this.renderable.addAnimation("stand", [1]);
		//set the standing animation as default 
		this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update : function (dt) {
 		
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
 		console.log(me.state.isPaused());
		//adding movement based on up, down, left, right arrows
		if(me.input.isKeyPressed('left')){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkLeft")){
				this.renderable.setCurrentAnimation("walkLeft");
			}
		}else if(me.input.isKeyPressed('right')){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.body.vel.y = 0;
			if(!this.renderable.isCurrentAnimation("walkRight")){
				this.renderable.setCurrentAnimation("walkRight");
			}
		}else if(me.input.isKeyPressed('up')){
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkUp")){
				this.renderable.setCurrentAnimation("walkUp");
			}
		}else if(me.input.isKeyPressed('down')){
			this.body.vel.y += this.body.accel.y * me.timer.tick;
			this.body.vel.x = 0;
			if(!this.renderable.isCurrentAnimation("walkDown")){
				this.renderable.setCurrentAnimation("walkDown");
			}
		}else{
			this.body.vel.x = 0;
			this.body.vel.y = 0;
			//change to the standing animation
			this.renderable.setCurrentAnimation("stand");
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
        // Make all other objects solid
        return true;
    }
});