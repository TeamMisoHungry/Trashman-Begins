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
        this.addChild(new game.HUD.Dialog(155, 355));
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
        //this.font = new me.BitmapFont("black", 32);
        
            this.font = new me.BitmapFont("atascii", {x:12});
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
        //this.font = new me.BitmapFont("black",32);
        this.font = new me.BitmapFont("atascii", {x:12});
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
            || me.game.currentLevel.name == "antarlevel3" 
            || me.game.currentLevel.name == "antarlevel3a" 
            || me.game.currentLevel.name == "antarlevelend"){    
            this.font.draw(renderer,"PENGUIN: " + game.data.penguin, this.pos.x, this.pos.y + 45);
            }   
    }
    
});

game.HUD.Dialog = me.Renderable.extend({
    init: function(x, y) {
    	this._super(me.Renderable, 'init', [x, y, 315, 450]);
        this.font = new me.BitmapFont("atascii_small", {x:10});
        //this.font = new me.BitmapFont("white", 12);
        this.font.set("left");
    },
    
    update : function () {
        var name = me.levelDirector.getCurrentLevelId();
        console.log(game.data.bossMap);
        
        if (game.data.bossMap){
            if( name == "citypuzzleend"){
                game.data.dialog = "DESTROY THAT MACHINE ON THE RIGHT\n(PRESS T TO CLOSE BOX";
            }
            if ( name == "headquarterc"){
                game.data.dialog = "CONGRATULATION AXEL, YOU COMPLETED ALL\n"+
                                "THE TASKS\n(PRESS T TO CLOSE BOX";

            }
        }

        if (game.data.talking_to_miku) {
            if((name == "antarctica") && (!game.data.iceDone)){
                game.data.dialog = "OH NO... PLEASE HELP THE PENGUINS.\n(PRESS T TO CLOSE BOX";
            }
            if(name == "antarlevel1b" || name == "antarlevel2b"){
                game.data.dialog = "THANK YOU. HERE ARE  SOME POINTS\n"+ 
                                    "FOR YOU. THERE ARE MORE PENGUINS \n"+ 
                                    "AHEAD, HURRY. \n(PRESS T TO CLOSE BOX)";
            }
            if(name == "antarlevelbegin" || name == "antarlevel2a" || name == "antarlevel3a"){
                game.data.dialog = "LETS HURRY. REMEMBER THAT SOME\n"+ 
                                    "PENGUINS ARE IMPOSSIBLE TO SAVE, SO\n"+ 
                                    "JUST TRY TO SAVE AS MUCH AS YOU CAN.\n"+ 
                                    "I WILL GIVE YOU POINTS FOR EVERY PENGUINS\n"+
                                    "YOU SAVE. ALSO, PLEASE TALK TO ME AFTER\n"+
                                    "YOU COMPLETE A LEVEL. \n(PRESS T TO CLOSE BOX)";
            }
            if(name == "antarlevelend"){
                game.data.dialog = "PHEW, WE SAVED MOST OF THEM. THANK YOU\n"+ 
                                    "AGAIN. AH, IM MIKU AND YOU ARE AXEL\n"+ 
                                    "RIGHT? NICE TO MEET YOU. YOU ARE A GOOD\n"+ 
                                    "GUY, SO I WILL GIVE YOU A TURBINE BLADE.\n"+ 
                                    "IT WILL HELP YOU ALONG THE WAY. BYE. \n(PRESS T TO CLOSE BOX)";
            }
            return true;
        }
        if(game.data.talking_to_alice){
            if(name == "headquarter"){
                game.data.dialog = "HELLO AXEL, WELCOME TO TIBBERS TOWN.\n"+
                                    "IM ALICE AND I WILL BE YOUR TASK MANAGER.\n"+
                                    "ARENT YOU GLAD TO HAVE SUCH A CUTE\n"+
                                    "MANAGER? HEE HEE. YOUR FIRST TASK\n"+
                                    "IS: GO HELP MIKU AT ANTARCTICA TOWN\n"+
                                    "AND THEN COME BACK TO ME. YOU CAN FIND\n"+
                                    "ANTARCTICA TOWN IF YOU TRAVEL SOUTH FROM\n"+
                                    "(CLICK BOX TO KEEP TALKING)";
                                    
            }
            if(name == "headquartera"){
                game.data.dialog = "GOODJOB AXEL, YOU JUST COMPLETED YOUR\n"+ 
                                    "FIRST TASK. OH, DID SHE GIVES YOU A\n"+ 
                                    "TURBINE BLADE? NICE, YOU WILL NEED\n"+ 
                                    "THEM LATER. FOR NOW, YOUR NEXT MISSION\n"+
                                    "IS TO HEAD WEST FROM HERE AND GET TO\n"+ 
                                    "AOHARI CITY YOU WILL MEET REKI AND\n"+
                                    "(CLICK BOX TO KEEP TALKING)";
            }
            if(name == "headquarterb"){
                game.data.dialog = "YOU ARE GETTING GOOD  AT THIS. WOW.\n"+ 
                                    "REKI GAVE YOU A TURBINE BLADE. SHE\n"+ 
                                    "MUST HAVE LIKED YOU. IM SUCH A GOOD\n"+ 
                                    "MANAGER HEE HEE. ANYWAYS, YOUR NEXT AND\n"+ 
                                    "LAST TASK IS TO GO EAST, MEET MIMI AT GOBI TOWN.\n"+ 
                                    "SHE WILL TELL YOU HOW YOU  CAN USE THOSE\n"+
                                    "(CLICK BOX TO KEEP TALKING)";
            }
        	return true;
        }
        if(game.data.talking_to_alice2){
            if(name == "headquarter"){
                game.data.dialog = 
                                    "HERE. OH OH... ANOTHER THING, ONCE YOU\n"+
                                    "PASS A MAP, YOU CANNOT COME BACK TO\n"+
                                    "IT, SO TRY TO COLLECT AS MANY POINTS AS\n"+
                                    "YOU CAN. ALSO, YOU CAN ONLY COME BACK TO\n"+
                                    "TIBBERS TOWN ONCE YOU ARE DONE WITH THE\n"+
                                    "GIVEN TASK.\n(PRESS T TO CLOSE BOX)";
            }
            if(name == "headquartera"){
                game.data.dialog = 
                                    "SHE WILL TELL YOU WHAT TO DO. ALSO,\n"+ 
                                    "COME BACK AND TALK TO ME WHEN YOU'RE\n"+ 
                                    "DONE AND ONCE AGAIN, YOU CANNNOT COME\n"+ 
                                    "BACK HERE UNTIL YOU COMPLETE YOUR TASK.\n"+
                                    "GOOD LUCK\n(PRESS T TO CLOSE BOX)";
            }
            if(name == "headquarterb"){
                game.data.dialog = "BLADES. ALSO, REMEMBER TO EXPLORE THE\n"+ 
                                    "AREAS AND TALK TO NEW NPC, YOU MIGHT\n"+ 
                                    "BE ABLE TO FIND MORE TURBINE BLADES.\n"+
                                    "COME BACK HERE AFTER YOU ARE DONE\n"+
                                    "AND I WILL GRADE YOU BASED ON YOUR\n"+ 
                                    "PERFORMANCE. WELL, GOOD LUCK.\n(PRESS T TO CLOSE BOX)";
            }
        }

        if(game.data.talking_to_ariel){
            game.data.dialog = "OMG WHAT ARE YOU LOOKING AT.\n"+
                                "!SHE THREW SOMETHING AT YOU......!\n"+
                                "!YOU GAINED A TURBINE BLADE! HURRAY. \n(PRESS T TO CLOSE BOX)";
        }



        if(game.data.talking_to_sakura){
            game.data.dialog = "OH! HELLO THERE HANDSOME YOUNG MAN.\n"+
                                "I FOUND THIS TURBINE BLADE THE OTHER\n"+
                                "DAY. I'LL GIVE IT TO YOU! WINKIE FACE. \n(PRESS T TO CLOSE BOX) ";
        }

        if(game.data.talking_to_mimi){
            game.data.dialog = "WELCOME TO GOBI TOWN. I HAVE BEEN WAITING\n"+
                                "FOR YOU. YOUR LAST TASK IS TO FIX THE\n"+
                                "TURBINES WITH ALL THE BLADES YOU'VE OBTAINED.\n"+
                                "REMEMBER TO EXPLORE THE MAP,\n"+
                                "YOU MIGHT BE ABLE TO FIND SOME MORE. \n(PRESS T TO CLOSE BOX)";
        }

        if (game.data.fixing_turbine) {
            game.data.dialog = "YOU FIXED THE TURBINE. \n(PRESS T TO CLOSE BOX)";
        }

        if(game.data.talking_to_gumi){
        	game.data.dialog = "YOU HAVE THE TURBINE BLADES? OKAY, YOU CAN\n"+
                                "JUST SIMPLY TOUCH THE BROKEN ONES TO FIX IT. \n(PRESS T TO CLOSE BOX)";
        }

        if(game.data.talking_to_reki){
            if(name == "city"){
                game.data.dialog = "URG...THE CORPORATION IS PISSING ME OFF,\n"+
                                    "WHAT IS WITH ALL THE POLLUTION AND\n"+
                                    "TRASH. IM SO GOING TO TAKE YOU DOWN..\n"+
                                    "OH HEY, ARE YOU THE ONE THAT ALICE SENT?\n"+
                                    "OKAY, I NEED YOU TO HELP ME TAKE DOWN\n"+
                                    "THE CORPORATION. PLEASE HEAD NORTH FROM\n"+
                                    "HERE, I'LL MEET YOU. (PRESS T TO CLOSE BOX)";
            }
            if(name == "citypuzzlebegin"){
                game.data.dialog = "ARE YOU READY? OKAY, YOU HAVE TO CAREFULLY\n"+
                                    "OBSERVE THE ENEMIES' MOVEMENTS AND\n"+
                                    "THE LASERS' PATTERNS. THEN, TRY TO PASS THEM\n"+
                                    "WITHOUT GETTING HURT. THE MORE HP YOU \n"+
                                    "HAVE AT THE END, THE MORE POINTS IM\n"+
                                    "GOING TO GIVE YOU. LET'S GO. \n(PRESS T TO CLOSE BOX)";
            }
            if(name == "citypuzzleend"){
                game.data.dialog = "THANK YOU FOR HELPING ME. DID I TELL YOU\n"+
                                    "MY NAME? OOPS HAHA, IT IS REKI. NICE TO\n"+
                                    "MEET YOU. I WILL GIVE YOU POINTS BASED ON\n"+
                                    "YOUR HP AND ALSO HERE IS A TURBINE BLADE\n"+
                                    "TAKE GOOD CARE OF IT, BYE. \n(PRESS T TO CLOSE BOX)";
            }
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
