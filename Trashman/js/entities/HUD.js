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
        this.z = 4998;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(630, 10));
        this.addChild(new game.HUD.TimeItem(10, 10));
        this.addChild(new game.HUD.Dialog(20, 350));
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
        this.alwaysUpdate = true;
        this.limit = -1;
        this.garbage = -1;
        this.blade = -1;
        this.hp = -1;
    },
    
    update: function(){
        if(this.hp !== game.data.hp){
            this.hp = game.data.hp;
            return true;
        }
        if(this.garbage !== game.item.garbage){
            this.garbage = game.item.garbage;
            return true;
        }
        if(this.penguin !== game.data.penguin){
            this.penguin = game.data.penguin;
            return true;
        }
        if(this.blade !== game.data.blade){
        	this.blade - game.data.blade;
        	return true;
        }
        return false;
    },
    
    draw: function(renderer){        
        this.font.draw(renderer, "HP: " + Math.trunc(game.data.hp), this.pos.x, this.pos.y);
        this.font.draw(renderer,"GARBAGE: " + game.item.garbage, this.pos.x, this.pos.y + 15);
        this.font.draw(renderer,"BLADES: " + game.data.blade, this.pos.x, this.pos.y + 30);
        
        if (me.game.currentLevel.name == "antarlevelbegin" 
            ||me.game.currentLevel.name == "antarlevel1" 
            ||me.game.currentLevel.name == "antarlevel1b" 
            || me.game.currentLevel.name == "antarlevel2" 
            || me.game.currentLevel.name == "antarlevel2a" 
            || me.game.currentLevel.name == "antarlevel2b"
            || me.game.currentLevel.name == "antarlevel3a" 
            || me.game.currentLevel.name == "antarlevelend"){    
            this.font.draw(renderer,"PENGUIN: " + game.data.penguin, this.pos.x, this.pos.y + 45);
            }   
    }
    
});

game.HUD.Dialog = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 450]);
        this.font = new me.BitmapFont("32x32Size8", 12);
        this.font.set("left");
    },
    
    update : function () {
        //console.log(me.levelDirector.getCurrentLevelId());
        if (game.data.talking_to_miku) {
            if (me.game.iceDone) {
                game.data.dialog = "THANK YOU FOR SAVING THE PENGUINS!";
            }
            
            return true;
        }
        if(game.data.talking_to_jelly){
        	if(!game.data.iceDone){
        		game.data.dialog = "WELCOME TO THE HEADQUARTERS! HEAD SOUTH FOR YOUR \nFIRST MISSION AND REPORT TO ME AFTER YOU FINISH!";
        	}
        	else if(!game.data.desertDone){
        		game.data.dialog = "GOOD WORK SAVING THE PENGUINS! NOW HEAD EAST FOR \nYOUR NEXT MISSION!";
        	}
        	else if(!game.data.cityDone){
        		game.data.dialog = "THANK YOU FOR FIXING THE WIND TURBINES! ALL THAT \nIS LEFT IS TO DEFEAT THE EVIL CORPORATION. \nHEAD WEST FOR YOUR LAST MISSION!";
        	}
        	else {
        		game.data.dialog = "YOU DID IT! YOU SAVED THE WORLD FROM DESTRUCTION!\n THE EVIL CORPORATION HAS REFORMED THEIR WAYS AND ARE WORKING TO UNDO THE HARM THEY HAVE DONE";
        	}
        	return true;
        }
        if (game.data.fixing_turbine) {
            game.data.dialog = "YOU FIXED THE TURBINE!";
        }
        if(game.data.talking_to_gumi){
        	if(!game.data.desertDone){
  	      		game.data.dialog = "THE AREA AHEAD IS UNDER RECONSTRUCTION.\nSOME OF OUR WIND TURBINES BROKE ";
        	}
        	else{
        		game.data.dialog = "THANK YOU FOR HELPING OUT! INVESTIGATORS FOUND OUT\nTHAT THE EVIL CORPORATION IS RESPONSIBLE FOR\nBREAKING OUR WIND TURBINES";
        	}
        }
        if(game.data.talking_to_gumi_enter){
        	game.data.dialog = "YOU COLLECTED TURBINE BLADES TO HELP OUT? I'LL LET\nYOU THROUGH";
        }
        if(game.data.talking_to_gumi_exit){
        	game.data.dialog = "THANK YOU FOR FIXING THE TURBINES!";
        }
        if(game.data.talking_to_gumi_noexit){
        	game.data.dialog = "THERE IS ANOTHER TURBINE BLADE LYING AROUND\nSOMEWHERE HERE...";
        }
        if (game.data.notTalking) {
            game.data.dialog = "";
            return true;
        }
        return false;
    },
    
    draw : function (renderer) {
        this.font.draw(renderer, game.data.dialog, this.pos.x, this.pos.y);
    }

});
