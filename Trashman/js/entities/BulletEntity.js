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
        console.log("shot created");
    },
  
            
    update: function(dt) {
        this.body.vel.x = 8;
        this.body.gravity = 0;
        

    
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
        //if(res && (res.obj.type == me.game.ENEMY_OBJECT)) {
    /*me.game.HUD.updateItemValue("score", 50);*/
          //  me.game.remove(this);
           // me.game.remove(res.obj);
        //}
    
    
        // Do not adjust entity position
        return false;
    }
     
    
});