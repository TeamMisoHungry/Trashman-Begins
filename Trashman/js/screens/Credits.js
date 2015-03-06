game.CreditsScreen = me.ScreenObject.extend({
	init: function(){	
	}, 
	
	onResetEvent: function(){
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('credits')), 1);
		me.audio.playTrack("main", true);
		me.game.world.addChild(new (me.Renderable.extend ({
	      	// constructor
	      	init : function() {
	        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
	        // font for the scrolling text
	        this.font = new me.BitmapFont("32x32_font", 16);
	         
	         // a tween to animate the arrow
	        this.scrollertween = new me.Tween(this).to({scrollerpos: 200}, 5000).start();
	     
	        this.scroller = "A MISOHUNRGY GAME";
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
	}, 
	
   /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
  	me.audio.fade("main", 1, 0, 1000);
   }
});