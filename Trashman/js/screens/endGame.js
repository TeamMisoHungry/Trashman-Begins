game.EndScreen = me.ScreenObject.extend({
	 /**    
   *  action to perform on state change
   */
  init:function(){
  	
  },
  onResetEvent : function() {       
    // title screen
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('endScreen')), 1);

    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 16);
      },
     
      update : function (dt) {
        return true;
      },
       
      draw : function (renderer) {
      	this.font.draw(renderer, "THANKS FOR TESTING IT OUT!!!", 100, 350);
        this.font.draw(renderer, "PRESS ENTER TO RE-PLAY", 150, 400);
        //console.log(game.time.overallTime);
      },
      onDestroyEvent : function() {
        //just in case
      }
    })), 2);
    
    // change to play state on press Enter
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        me.state.change(me.state.MENU);
      }
    });
    game.data.hp = 100;
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.mouse.LEFT);
    me.event.unsubscribe(this.handler);
  }
});
