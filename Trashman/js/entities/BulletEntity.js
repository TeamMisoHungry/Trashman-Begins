game.BulletEntity = me.Entity.extend({

    init: function (x, y, settings) {
    	//constructor    
        this._super(me.Entity, 'init', [x, y , settings]);
         //conllision object
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }

        this.pos.y = (this.pos.y)+15; 
        this.pos.x = (this.pos.x)+15;
    },
  
            
    update: function(dt) {
        this.body.gravity = 0;
        this.body.vel.x = 8;
        // update the body movement
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])); 
        
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