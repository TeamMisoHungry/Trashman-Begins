game.BulletEntity = game.PlayerEntity.extend({

    init: function (x, y, settings, direction) {
    	//constructor    
        this._super(me.Entity, 'init', [x, y , settings]);
         //conllision object
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
		
		this.alwaysUpdate = true;
		this.body.gravity = 0;
		this.body.setVelocity(8, 8);
		this.body.setCollisionType = me.collision.types.PROJECTILE_OBJECT;
		this.type = "playerBullet";
        this.pos.y = (this.pos.y)+15; 
        this.pos.x = (this.pos.x)+15;
        this.x = x;
        this.y = y;
        this.up = direction[0];
        this.down = direction[1];
        this.left1 = direction[2];
        this.right1 = direction[3];
        this.time = 0;
    },
  
            
    update: function(dt) {
    	this.time++;
    	if(this.up){
    		this.body.vel.y -= this.body.accel.y * me.timer.tick;
    		this.body.vel.x = 0;
    	}else if(this.down){
    		this.body.vel.y += this.body.accel.y * me.timer.tick;
    		this.body.vel.x = 0;
    	}else if(this.left1){
    		this.body.vel.x -= this.body.accel.x * me.timer.tick;
    		this.body.vel.y = 0;
    	}else if(this.right1){
    		this.body.vel.x += this.body.accel.x * me.timer.tick;
    		this.body.vel.y = 0;
    	}
		
		if(this.time % 50 == 0){
			me.game.world.removeChild(this);
		}
        // update the body movement
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
        if (other.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
        // apply "hit by bullet" effects here...
    	}
        // Do not adjust entity position
        return false;
    }
     
    
});