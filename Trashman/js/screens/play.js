game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
		//load level
<<<<<<< HEAD
		me.levelDirector.loadLevel("citypuzzleend");
=======
		me.levelDirector.loadLevel("turbinemap");
>>>>>>> d79f494651e28161dd490b2dffe049eb27c2b532

        // reset the score
        game.data.score = 0;
        game.time.time = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
        
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});