game.IntroScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function(){
    	var array = [];
    	var begin1, begin2, begin3;
    	begin1 = new me.ImageLayer("begin1", 640, 480, "begin1", 5000);
    	begin2 = new me.ImageLayer("begin2", 640, 480, "begin2", 5000);
    	begin3 = new me.ImageLayer("begin3", 640, 480, "begin3", 5000);
    	array.push(begin1, begin2, begin3);
    	var i = 0;

    	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    	me.game.world.addChild(array[i]);
    	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      		if (action === "enter" && i < 2) {
      			me.game.world.removeChild(array[i++]);
	        	me.game.world.addChild(array[i]);
	        }else if(action === "enter" && i >= 2){
	        	me.state.change(me.state.PLAY);
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
		me.input.unbindKey(me.input.KEY.ENTER);
    	me.event.unsubscribe(this.handler);
    }
});