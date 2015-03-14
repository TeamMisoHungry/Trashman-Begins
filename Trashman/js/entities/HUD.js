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
        this.addChild(new game.HUD.Dialog(145, 344));
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
    	if(game.data.talking_to_alice || 
            game.data.talking_to_gumi || 
            game.data.talking_to_sakura || 
            game.data.talking_to_ariel || 
            game.data.talking_to_mimi || 
            game.data.talking_to_reki || 
            game.data.talking_to_miku){
    		this._super(me.Renderable, 'init', [x, y, 310, 450]);
    	}
    	else{
    		this._super(me.Renderable, 'init', [x, y, 310, 450]);
    	}
        this.font = new me.BitmapFont("32x32Size8", 12);
        this.font.set("left");
    },
    
    update : function () {
        var name = me.game.currentLevel.name;
        if (game.data.talking_to_miku) {
            if((name == "antarctica") && (!me.game.data.iceDone)){
                game.data.dialog = "OH NO! PLEASE HELP THE PENGUIN!";
            }
            if(name == "antarlevel1b" || name == "antarlevel2b"){
                game.data.dialog = "THANK YOU! HERE ARE  SOME POINTS\n"+ 
                                    "FOR YOU. THERE ARE MORE PENGUINS \n"+ 
                                    "AHEAD, LET'S HURRY!";
            }
            if(name == "antarlevelBegin" || name == "antarlevel2a" || name == "antarlevel3a"){
                game.data.dialog = "LET'S HURRY! REMEMBER THAT SOME\n"+ 
                                    "PENGUINS ARE IMPOSSIBLE TO SAVE, SO\n"+ 
                                    "JUST TRY TO SAVE AS MUCH AS YOU CAN.\n"+ 
                                    "I'LL GIVE YOU POINTS FOR EVERY PENGUIN\n"+
                                    "YOU SAVE.";
            }
            if(name == "antarlevelEnd"){
                game.data.dialog = "PHEW, WE SAVED MOST OF THEM. THANK YOU\n"+ 
                                    "AGAIN. AH! I ALMOST FORGOT TO INTRODUCE\n"+ 
                                    "MYSELF. I'M MIKU AND...YOU'RE AXEL RIGHT?\n"+ 
                                    "NICE TO MEET YOU. YOU'RE A GOOD GUY, SO\n"+ 
                                    "I'LL GIVE YOU A TURBINE BLADE. IT WILL\n"+ 
                                    "HELP YOU ALONG THE WAY. YOU SHOULD GO\n"+
                                    "BACK AND TALK TO ALICE. BYE!";
            }
            return true;
        }
        if(game.data.talking_to_alice){
            if(name == "headquarter"){
                game.data.dialog = "HELLO AXEL! WELCOME TO TIBBERS TOWN!\n"+
                                    "I'M ALICE AND I'LL BE YOUR TASK MANAGER.\n"+
                                    "AREN'T YOU GLAD TO HAVE SUCH A CUTE\n"+
                                    "MANAGER? HEE HEE. WEL, HERE'S YOUR FIRST\n"+
                                    "TASK: GO HELP MIKU AT ANTARCTICA TOWN\n"+
                                    "AND THEN COME BACK TO ME. YOU CAN FIND\n"+
                                    "ANTARCTICA TOWN IF YOU TRAVEL SOUTH FROM\n"+
                                    "HERE. OH OH! ANOTHER THING! ONCE YOU\n"+
                                    "PASSED A MAP, YOU CANNOT COME BACK TO\n"+
                                    "IT, SO TRY TO COLLECT AS MANY POINTS AS";
                                    
            }
            if(name == "headquartera"){
                game.data.dialog = "GOODJOB AXEL, YOU JUST COMPLETED YOUR\n"+ 
                                    "FIRST TASK! OH! DID SHE GIVE YOU A\n"+ 
                                    "TURBINE BLADE?! NICE, YOU WILL NEED\n"+ 
                                    "THEM LATER. FOR NOW, YOUR NEXT MISSION\n"+
                                    "IS TO HEAD WEST FROM HERE AND GET TO\n"+ 
                                    "AOHARI CITY YOU WILL MEET REKI AND\n"+  
                                    "SHE WILL TELL YOU WHAT TO DO. ALSO,\n"+ 
                                    "COME BACK AND TALK TO ME WHEN YOU'RE\n"+ 
                                    "DONE AND ONCE AGAIN, YOU CANNNOT COME\n"+ 
                                    "BACK HERE UNTIL YOU COMPLETE YOUR TASK.";
                                    
            }
            if(name == "headquarterb"){
                game.data.dialog = "YOU'RE GETTING GOOD  AT THIS! WOW!\n"+ 
                                    "REKI GAVE YOU A TURBINE BLADE. SHE\n"+ 
                                    "MUST HAVE LIKED YOU. I'M SUCH A GOOD\n"+ 
                                    "MANAGER HEE HEE. ANYWAYS, YOUR NEXT AND\n"+ 
                                    "LAST TASK IS TO MEET MIMI AT GOBI TOWN.\n"+ 
                                    "SHE WILL TELL YOU HOW YOU  CAN USE THOSE\n"+ 
                                    "BLADES. ALSO, REMEMBER TO EXPLORE THE\n"+ 
                                    "AREAS AND TALK TO  NEW NPC, YOU MIGHT\n"+ 
                                    "BE ABLE TO FIND MORE TURBINE BLADES.\n"+
                                    "COME BACK HERE AFTER YOU ARE DONE";
            }
        	return true;
        }
        if(game.data.talking_to_alice2){
            if(name == "headquarter"){
                game.data.dialog = "YOU CAN ALSO, YOU CAN ONLY COME BACK TO\n"+
                                    "TIBBERS TOWN ONCE YOU ARE DONE WITH THE\n"+
                                    "GIVEN TASK.";
            }
            if(name == "headquartera"){
                game.data.dialog = "GOODLUCK!";
            }
            if(name == "headquarterb"){
                game.data.dialog = "AND I WILL GRADE YOU BASED ON YOUR\n"+ 
                                    "PERFORMANCE. WELL, GOOD LUCK!";
            }
        }

        if(game.data.talking_to_ariel){

        }
        if (game.data.fixing_turbine) {
            game.data.dialog = "YOU FIXED THE TURBINE!";
        }
        if(game.data.talking_to_gumi){
        	game.data.dialog = "YOU COLLECTED TURBINE BLADES TO HELP OUT? I'LL LET\n\
                                YOU THROUGH";
        }
        if(game.data.talking_to_gumi_noexit){
        	game.data.dialog = "THERE IS ANOTHER TURBINE BLADE LYING AROUND\n\
                                SOMEWHERE HERE...";
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
