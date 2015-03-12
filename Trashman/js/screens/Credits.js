game.CreditsScreen = me.ScreenObject.extend({
	init: function(){	
	}, 
	
	onResetEvent: function(){
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('credits')), 1);
		me.game.world.addChild(new (me.Renderable.extend ({
	      	// constructor
	      	init : function() {
	        	this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
	        	// font for the scrolling text
	        	this.font = new me.BitmapFont("32x32_font", 16);
		         // a tween to animate the arrow
	        	this.scrollertween = new me.Tween(this).to({scrollerpos: 480}, 7000).start();
		     
		        this.scroller = "\t  ANAN MA \n \n \t KHOA LUONG \n \n \t VI TU \n \n \t VINCENT MOUDY \n \n \n \n A MISOHUNRGY GAME";
	        	this.scrollerpos = 480;
	      	},
	       
	     	update : function (dt) {
	        	return true;
	      	},
	       
	      	draw : function (renderer) {
	        	this.font.draw(renderer, this.scroller, 180, this.scrollerpos);
	      	},
    
	      	onDestroyEvent : function() {
	        	//just in case
	      		this.scrollertween.stop();
	      	}
    	})), 2);
    
    	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
   		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
   		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      		if (action === "enter") {
        		me.state.change(me.state.MENU);
      		}
    	});
	}, 
   /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
  	me.input.unbindKey(me.input.KEY.ENTER);
    me.event.unsubscribe(this.handler);
  }
});