game.CreditsScreen = me.ScreenObject.extend({
	onResetEvent: function(){
		me.game.world.addChild(new me.ImageLayer("credits", 640, 480, "credits", 5000));
		me.game.world.addChild(new game.credits("crew", 410, 1565, "crew", 5001));
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
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

game.credits = me.ImageLayer.extend({
	
	init: function(type, x, y, type, z){
		this._super(me.ImageLayer, 'init', [type, x, y, type, z, (0.0, 0.01)]);
		this.repeat = "no-repeat";
		this.pos.x = 0;
		this.anchorPoint.x = 0.5;
		this.anchorPoint.y = 0.0;
		this.len = 1560;
	},
	
	update: function(dt){
		if(this.pos.y > this.len){
			me.game.world.removeChild(this);
			me.state.change(me.state.MENU);
		}
		this.pos.y += 0.75;
		return(this._super(me.ImageLayer, 'update', [dt]) || this.pos.y !== 0);
	}
});