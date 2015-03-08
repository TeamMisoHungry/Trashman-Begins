/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(630, 460));
        this.addChild(new game.HUD.TimeItem(10, 10));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
		this.font = new me.BitmapFont("32x32Size8", 12);
		this.font.set("right");
        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        this.font.draw(renderer, game.data.score, this.pos.x, this.pos.y);
    }

});

//health, garbage ammo, and time HUD
game.HUD.TimeItem = me.Renderable.extend({
	
	init: function(x, y){
		this._super(me.Renderable, 'init', [x, y, 10, 10]);
		this.font = new me.BitmapFont("32x32Size8", 12);
		this.font.set("left");
		this.limit = -1;
		this.garbage = -1;
		this.hp = -1;
	},
	
	update: function(){
		if(this.limit !== game.time.limit){
			this.limit = game.time.limit;
			return true;
		}
		if(this.hp !== game.data.hp){
			this.hp = game.data.hp;
			return true;
		}
		if(this.garbage !== game.data.garbage){
			this.garbage = game.data.garbage;
			return true;
		}
        if(this.garbage !== game.data.penguin){
            this.penguin = game.data.penguin;
            return true;
        }
		return false;
	},
	
	draw: function(renderer){
		this.font.draw(renderer, game.time.limit, this.pos.x, this.pos.y);
		this.font.draw(renderer, "HP: " + Math.trunc(game.data.hp), this.pos.x, this.pos.y + 15);
		this.font.draw(renderer,"GARBAGE X" + game.data.garbage, this.pos.x, this.pos.y + 30);	
        this.font.draw(renderer,"PENGUIN X" + game.data.penguin, this.pos.x, this.pos.y + 45);	
	}
	
});
