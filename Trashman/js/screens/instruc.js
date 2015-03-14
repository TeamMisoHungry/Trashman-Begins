game.InstrucScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function(){
    	var array = [];
    	var intro1, intro2, intro3, intro4, final;
    	this.button = me.game.world.addChild(new game.menuButton(10, 10));
    	intro1 = new me.ImageLayer("intro1", 640, 480, "intro1", 5000);
    	intro2 = new me.ImageLayer("intro2", 640, 480, "intro2", 5000);
    	intro3 = new me.ImageLayer("intro3", 640, 480, "intro3", 5000);
    	intro4 = new me.ImageLayer("intro4", 640, 480, "intro4", 5000);
    	final = new me.ImageLayer("final", 640, 480, "final", 5000);
    	array.push(intro1, intro2, intro3, intro4, final);
    	var i = 0;
    	
		 
    	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    	me.game.world.addChild(array[i]);
    	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      		if (action === "enter" && i < 4) {
      			me.game.world.removeChild(array[i++]);
	        	me.game.world.addChild(array[i]);
	        }else if(action === "enter" && i >= 4){
	        	me.state.change(me.state.MENU);
	        }
    	});
    	
    	if(me.audio.getCurrentTrack() == "title") return;
 		me.audio.stopTrack();
 	 	me.audio.playTrack("title", true);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
		me.game.world.removeChild(this.button);
		me.input.unbindKey(me.input.KEY.ENTER);
    	me.event.unsubscribe(this.handler);
    }
});

game.menuButton = me.GUI_Object.extend({
	init:function (x, y){
    	var settings = {};
      	settings.image = me.loader.getImage('menu');
      	settings.spritewidth = 75;
      	settings.spriteheight = 20;
      	// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      	// define the object z order
      	this.z = Infinity;
   	},
	
    onClick:function (event){
      	me.state.change(me.state.MENU);
    }
});