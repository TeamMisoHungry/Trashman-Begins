game.EndingScreen = me.ScreenObject.extend({
	onResetEvent: function(){
		if(game.time.overallTime <= 400 && game.data.score >= 2000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "goodImage", 5000));
			//me.game.world.addChild(new game.ending("goodText"));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && game.data.score >= 3000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "goodImage", 5000));
			//me.game.world.addChild(new game.ending("goodText"));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && (game.data.score < 3000)){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			//me.game.world.addChild(new game.ending("okText"));
		}else if(game.time.overallTime <= 400  && game.data.score < 2000){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			me.game.world.addChild(new game.ending("okText", 410, 380, "okText", 5001));
		}else if(game.time.overallTime > 600 && game.data.score < 2000){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "badImage", 5000));
			//me.game.world.addChild(new game.ending("badText"));
		}else if(game.time.overallTime > 600){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "badImage", 5000));
			//me.game.world.addChild(new game.ending("badText"));
		}else{
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "okImage", 5000));
			me.game.world.addChild(new game.ending("okText"));
		}
		
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
			this.len = 765;
		}else{
			this.len = 645;
		}
	},
	
	update: function(dt){
		//console.log(this.pos.x, this.pos.y);
		//console.log(this.height - this.pos.y);
		if(this.pos.y > this.len){
			me.game.world.removeChild(this);
		}
		this.pos.y += 0.75;
		return(this._super(me.ImageLayer, 'update', [dt]) || this.pos.y !== 0);
	}
});
