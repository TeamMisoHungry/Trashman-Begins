/* Game namespace */
var game = {
	
    // an object where to store game information
    data : {
        // score
        score : 0,
        hp : 100,
        fps : 30
    },
	
	time : {
		time : 0,
		limit : 300,
		overallTime : 0
	},

    // Run on page load.
    "onload" : function () {

    // Initialize the video.
    if (!me.video.init("screen",  me.video.CANVAS, 640, 480, true)) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    me.sys.fps = this.data.fps;

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }
	
    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
},

    // Run on game resources loaded.
    "loaded" : function () {
    	//set ingame screen object, title screen
        me.state.set(me.state.MENU, new game.TitleScreen());
        
        //set ingame screen object, play level
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        //set ingame screen object, end game
        me.state.set(me.state.GAME_END, new game.EndScreen());
        
        me.state.transition("fade", "#FFFFFF", 250);

        // add our player or other entities in the entity pool

        me.pool.register("BulletEntity", game.BulletEntity);
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);
        me.pool.register("EnemyEntity2", game.EnemyEntity2);
        me.pool.register("GarbageEntity", game.GarbageEntity);
        me.pool.register("TurbineEntity", game.TurbineEntity);
        me.pool.register("TurretEntity", game.TurretEntity);
        me.pool.register("LaserEntity", game.LaserEntity);
        me.pool.register("ThrowBook", game.ThrowEntity);

		
		//enable the keyboard
		me.input.bindKey(me.input.KEY.A, "left");
		me.input.bindKey(me.input.KEY.D, "right");
		me.input.bindKey(me.input.KEY.W, "up");
		me.input.bindKey(me.input.KEY.S, "down");	
		me.input.bindKey(me.input.KEY.P, "pause");
		me.input.bindKey(me.input.KEY.R, "read");	
		me.input.bindKey(me.input.KEY.ESC, "unpause");	
		me.input.bindKey(me.input.KEY.SPACE, "throw", true);
		me.input.bindKey(me.input.KEY.T, "quit");

		//turn gravity off since this is a top-down
		me.sys.gravity = 0;
        // display the menu title
        me.state.change(me.state.MENU);
    },

};
