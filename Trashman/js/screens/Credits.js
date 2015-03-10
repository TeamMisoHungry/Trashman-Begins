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
	        this.scrollertween = new me.Tween(this).to({scrollerpos: 200}, 5000).start();
	     
	        this.scroller = "A MISOHUNRGY GAME \n \n  ANAN MA \n \n  KHOA LUONG \n \n  VI TU \n \n  VINCENT MOUDY";
	        this.scrollerpos = -16;
	      	},
	       
	     	update : function (dt) {
	        	return true;
	      	},
	       
	      	draw : function (renderer) {
	        	this.font.draw(renderer, this.scroller, 200, this.scrollerpos);
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
  	//me.audio.fade("main", 1, 0, 1000);
   }
});