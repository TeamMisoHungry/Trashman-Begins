game.EndingEntities = me.ScreenObject.extend({
	onResetEvent: function(){
		if(game.time.overallTime <= 400 && game.data.score >= 2000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "good", 5000));
			me.game.world.addChild(new game.ending("good"));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && game.data.score >= 3000){
			me.game.world.addChild(new me.ImageLayer("good", 640, 480, "good", 5000));
			me.game.world.addChild(new game.ending("good"));
		}else if((game.time.overallTime > 400 && game.time.overallTime <= 600) && (game.data.score < 3000)){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "ok", 5000));
			me.game.world.addChild(new game.ending("ok"));
		}else if(game.time.overallTime <= 400  && game.data.score < 2000){
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "ok", 5000));
			me.game.world.addChild(new game.ending("ok"));
		}else if(game.time.overallTime > 600 && game.data.score < 2000){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "bad", 5000));
			me.game.world.addChild(new game.ending("bad"));
		}else if(game.time.overallTime > 600){
			me.game.world.addChild(new me.ImageLayer("bad", 640, 480, "bad", 5000));
			me.game.world.addChild(new game.ending("bad"));
		}else{
			me.game.world.addChild(new me.ImageLayer("ok", 640, 480, "ok", 5000));
			me.game.world.addChild(new game.ending("ok"));
		}
	},
	
	onDestroyEvent: function(){
		
	}
	
});

game.ending = me.ImageLayer.extend({
	
	init: function(type){
		
	}
});
