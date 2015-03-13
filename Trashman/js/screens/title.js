game.TitleScreen = me.ScreenObject.extend({
  /**    
   *  action to perform on state change
   */
  
  onResetEvent : function() {       
    // title screen
  	me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title_screen')), 1);
	me.game.world.addChild(new game.startButton(20, 250));
	me.game.world.addChild(new game.credit(100, 250));
	me.game.world.addChild(new game.instrucButton(400, 250));
	me.input.bindKey(me.input.KEY.E, "enter", true);
	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      		if (action === "enter") {
      			me.state.change(me.state.GAMEOVER);
	        }
    	});
/*	 if(me.audio.getCurrentTrack() == "title") return;
 	 me.audio.stopTrack();
 	 me.audio.playTrack("title", true);*/
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
  	//me.audio.fade("title", 1, 0, 1000);
  	me.input.unbindKey(me.input.KEY.E);
  	me.event.unsubscribe(this.handler);
  }
});

game.startButton = me.GUI_Object.extend({
	init:function (x, y){
    	var settings = {};
      	settings.image = me.loader.getImage('beginGame');
      	settings.spritewidth = 75;
      	settings.spriteheight = 20;
      	// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      	// define the object z order
      	this.z = Infinity;
   	},
	
    onClick:function (event){
      	me.state.change(me.state.SETTINGS);
    }
});

game.credit = me.GUI_Object.extend({
	init:function (x, y){
    	var settings = {};
      	settings.image = me.loader.getImage('creditScreen');
      	settings.spritewidth = 75;
      	settings.spriteheight = 20;
      	// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      	// define the object z order
      	this.z = Infinity;
   	},
	
    onClick:function (event){
 		me.state.change(me.state.CREDITS);
    }
});

game.instrucButton = me.GUI_Object.extend({
	init:function (x, y){
    	var settings = {};
      	settings.image = me.loader.getImage('instruc');
      	settings.spritewidth = 75;
      	settings.spriteheight = 15;
      	// super constructor
	    this._super(me.GUI_Object, "init", [x, y, settings]);
      	// define the object z order
      	this.z = Infinity;
   	},
	
    onClick:function (event){
      	me.state.change(me.state.USER);
    }
});