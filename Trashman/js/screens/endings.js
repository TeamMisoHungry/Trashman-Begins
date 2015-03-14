game.EndingScreen = me.ScreenObject.extend({
	onResetEvent: function(){
		if(game.time.overallTime <= 400 && game.data.score >= 5000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "goodImage", 5000));
			me.game.world.addChild(new game.ending("goodText", 410, 650, "goodText", 5001));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && game.data.score >= 7000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "goodImage", 5000));
			me.game.world.addChild(new game.ending("goodText", 410, 650, "goodText", 5001));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && (game.data.score < 7000 && game.data.score > 5000)){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			me.game.world.addChild(new game.ending("okText", 410, 650, "okText", 5001));
		}else if(game.time.overallTime <= 400  && game.data.score < 5000){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			me.game.world.addChild(new game.ending("okText", 410, 650, "okText", 5001));
		}else if(game.time.overallTime > 600 && game.data.score < 5000){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "badImage", 5000));
			me.game.world.addChild(new game.ending("badText", 410, 650, "badText", 5001));
		}else if(game.time.overallTime > 600){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "badImage", 5000));
			me.game.world.addChild(new game.ending("badText", 410, 650, "badText", 5001));
		}else if(game.time.overallTime > 600 && game.data.score > 10000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "goodImage", 5000));
			me.game.world.addChild(new game.ending("goodText", 410, 650, "goodText", 5001));
		}else{
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			me.game.world.addChild(new game.ending("okText", 410, 650, "okText", 5001));
		}
		
		game.time.overallTime = 0;
		me.input.bindKey(me.input.KEY.W, "up");
 		me.input.bindKey(me.input.KEY.A, "left");
 		me.input.bindKey(me.input.KEY.S, "right");
 		me.input.bindKey(me.input.KEY.D, "down");
		me.input.bindKey(me.input.KEY.L, "enter", true);
    	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      		if (action === "enter") {
				me.state.change(me.state.MENU);
	        }
    	});
	},
	
	onDestroyEvent: function(){
		me.input.unbindKey(me.input.KEY.L);
    	me.event.unsubscribe(this.handler);
	}
	
});

game.ending = me.ImageLayer.extend({
	
	init: function(type, x, y, type, z){
		this._super(me.ImageLayer, 'init', [type, x, y, type, z, (0.0, 0.01)]);
		this.repeat = "no-repeat";
		this.pos.x = 0;
		this.anchorPoint.x = 0.5;
		this.anchorPoint.y = 0.0;
		if(type == "badText"){
			this.len = 740;
		}else if(type == "goodText"){
			this.len = 745;
		}else{
			this.len = 635;
		}
	},
	
	update: function(dt){
		if(this.pos.y > this.len){
			me.game.world.removeChild(this);
			me.state.change(me.state.CREDITS);
		}
		this.pos.y += 0.75;
		return(this._super(me.ImageLayer, 'update', [dt]) || this.pos.y !== 0);
	}
});
