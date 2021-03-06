function InGameInputHandler()
{
    this.execute = function(level, inputQueue, inputMap)
    {
        var player = level.getEntity(World.TagNames.PLAYER);
        for(var i = 0; i < inputQueue.length; ++i)
        {
            var e = inputQueue[i];
        }
        
        player.playerInput.up = false;
        player.playerInput.down = false;
        player.playerInput.right = false;
        player.playerInput.left = false;
        
        //check if keys held down
        if(inputMap[Consts.Keys.W])
        {
            player.playerInput.up = true;
        }
        if(inputMap[Consts.Keys.A])
        {
            player.playerInput.left = true;
        }
        if(inputMap[Consts.Keys.S])
        {
            player.playerInput.down = true;
        }
        if(inputMap[Consts.Keys.D])
        {
            player.playerInput.right = true;
        }
    }
}

function MenuInputHandler()
{
    this.execute = function(menu, inputQueue)
    {
        for(var i = 0; i < inputQueue.length; ++i)
        {
            var e = inputQueue[i];
            if(e[0] === Consts.Keys.ENTER)
            {
                menu.continuePressed = true;
            }
        }
    }
}
