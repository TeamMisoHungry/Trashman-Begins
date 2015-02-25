game.TitleScreen = me.ScreenObject.extend({
 
  /**    
   *  action to perform on state change
   */
  onResetEvent : function() {
     
     
    var myButton = me.GUI_Object.extend({
    	init : function(x, y){
    		var settings = {};
    		settings.image = "beginGame";
    		settings.width = 100;
    		settings.height = 70;
    		this._super = (me.GUI_Object, 'init', [x, y, settings]);
    		this.z = 4;
    		//console.log("button created");
    	},
    	
    	onClick : function(event){
    		console.log("clicked");
    		return false;
    	}
    });
    
  //me.game.world.addChild(new me.Sprite(50, 50, me.loader.getImage('beginGame')), 2);
    // title screen
    me.game.world.addChild(new me.Sprite (0, 0, me.loader.getImage('title_screen')), 1);
   
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
      	
      	//console.log("creating new button");
    	me.game.world.addChild(new myButton(50, 50), 4);
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 16);
         
         // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -1500 }, 10000).onComplete(this.scrollover.bind(this)).start();
     
        this.scroller = "A SIMPLE PROTOTYPE WITH TITLE SCREEN, MOVEMENT, AND LEVEL TRANSITION";
        this.scrollerpos = 600;
      },
      
      // some callback for the tween objects
      scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -1500 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },
     
      update : function (dt) {
        return true;
      },
       
      draw : function (renderer) {
        this.font.draw(renderer, "PRESS ENTER TO PLAY", 170, 400);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
      },
      onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();
      }
    })), 2);
    
   // console.log("Hello World");
    // change to play state on press Enter
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        me.state.change(me.state.PLAY);
      }
    });
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