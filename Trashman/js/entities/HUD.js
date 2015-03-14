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
        this.addChild(new game.HUD.Dialog(20, 344));
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
            var name = me.game.currentLevel.name;
            if((name == "antarctica") && (!me.game.data.iceDone)){
                game.data.dialog = "OH NO! PLEASE HELP THE PENGUIN!";
            }
            if(name == "antarlevel1b" || name == "antarlevel2b"){
                game.data.dialog = "THANK YOU! HERE ARE  SOME POINTS FOR YOU.\n"+
                                   "THERE ARE MORE PENGUINS AHEAD, LET'S HURRY!";
            }
            if(name == "antarlevelBegin" || name == "antarlevel2a" || name == "antarlevel3a"){
                game.data.dialog = "LET'S HURRY! REMEMBER THAT SOME PENGUINS ARE\n"+
                                   "IMPOSSIBLE TO SAVE, SO JUST TRY TO SAVE AS MUCH\n"+
                                   "AS YOU CAN. I'LL GIVE YOU POINTS FOR EVERY PENGUIN\n"+
                                   "YOU SAVE.";
            }
            if(name == "antarlevelEnd"){
                game.data.dialog = "PHEW, WE SAVED MOST OF THEM. THANK YOU AGAIN. AH!\n"+
                                    "I ALMOST FORGOT TO INTRODUCE MYSELF. I'M MIKU AND...\n"+
                                    "YOU'RE AXEL RIGHT? NICE TO MEET YOU. YOU'RE A GOOD\n"+
                                    "GUY, SO I'LL GIVE YOU A TURBINE BLADE. IT WILL HELP\n"+
                                    "YOU ALONG THE WAY. YOU SHOULD GO BACK AND TALK TO\n"+
                                    "ALICE. BYE!";
            }
            return true;
        }
        if(game.data.talking_to_alice){
            /*
        	if(!game.data.iceDone){
        		game.data.dialog = "WELCOME TO THE HEADQUARTERS! HEAD SOUTH FOR YOUR\n\
                                    FIRST MISSION AND REPORT TO ME AFTER YOU FINISH!";
        	}
        	else if(!game.data.desertDone){
        		game.data.dialog = "GOOD WORK SAVING THE PENGUINS! NOW HEAD EAST FOR\n\
                                    YOUR NEXT MISSION!";
        	}
        	else if(!game.data.cityDone){
        		game.data.dialog = "THANK YOU FOR FIXING THE WIND TURBINES! ALL THAT\n\
                                    IS LEFT IS TO DEFEAT THE EVIL CORPORATION.\n\
                                    HEAD WEST FOR YOUR LAST MISSION!";
        	}
        	else {
        		game.data.dialog = "YOU DID IT! YOU SAVED THE WORLD FROM DESTRUCTION!\n\
                                    THE EVIL CORPORATION HAS REFORMED THEIR WAYS AND\n\
                                    ARE WORKING TO UNDO THE HARM THEY HAVE DONE";
        	}
            */
            var name = me.game.currentLevel.name;
            if(name == "headquarter"){
                game.data.dialog = "HELLO AXEL! WELCOME TO TIBBERS TOWN! I'M ALICE\n"+
                                    "AND I'LL BE YOUR TASK MANAGER. AREN'T  YOU GLAD\n"+
                                    "TO HAVE SUCH A CUTE MANAGER? HEE HEE. WEL, HERE'S\n"+
                                    "YOUR FIRST TASK: GO HELP MIKU AT ANTARCTICA TOWN\n"+
                                    "AND THEN COME BACK TO ME. YOU CAN FIND ANTARCTICA\n"+
                                    "TOWN IF YOU TRAVEL SOUTH FROM HERE. OH OH! ANOTHER\n"+
                                    "THING! ONCE YOU PASSED A MAP, YOU CANNOT COME BACK\n"+
                                    "TO IT, SO TRY TO COLLECT AS MANY POINTS AS YOU CAN.\n"+
                                    "ALSO, YOU CAN ONLY COME BACK TO TIBBERS TOWN ONCE\n"+
                                    "YOU ARE DONE WITH THE GIVEN TASK.";
                                    
            }
            if(name == "headquartera"){
                game.data.dialog = "GOODJOB AXEL, YOU JUST COMPLETED YOUR FIRST TASK!\n"+
                                    "OH! DID SHE GIVE YOU A TURBINE BLADE?! NICE, YOU\n"+
                                    "WILL NEED THEM LATER. FOR NOW, YOUR NEXT MISSION\n"+
                                    "IS TO HEAD WEST FROM HERE AND GET TO AOHARI CITY.\n"+
                                    "YOU WILL MEET REKI AND  SHE WILL TELL YOU WHAT TO\n"+
                                    "DO. ALSO, COME BACK AND TALK TO ME WHEN YOU'RE DONE.\n"+
                                    "AND ONCE AGAIN, YOU CANNNOT COME BACK HERE UNTIL YOU\n"+
                                    "COMPLETE YOUR TASK. GOODLUCK!";
            }
            if(name == "headquarterb"){
                game.data.dialog = "YOU'RE GETTING GOOD  AT THIS! WOW! REKI GAVE YOU\n"+
                                    "A TURBINE BLADE. SHE MUST HAVE LIKED YOU. I'M\n"+
                                    "SUCH A GOOD MANAGER HEE HEE. ANYWAYS, YOUR NEXT\n"+
                                    "AND LAST TASK IS TO MEET MIMI AT GOBI TOWN. SHE\n"+
                                    "WILL TELL YOU HOW YOU  CAN USE THOSE BLADES. ALSO,\n"+
                                    "REMEMBER TO EXPLORE THE AREAS AND TALK TO  NEW NPC,\n"+
                                    "YOU MIGHT BE ABLE TO FIND MORE TURBINE BLADES.\n"+
                                    "COME BACK HERE AFTER YOU ARE DONE AND I WILL GRADE\n"+
                                    "YOU BASED ON YOUR PERFORMANCE. WELL, GOOD LUCK!";
            }
        	return true;
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
