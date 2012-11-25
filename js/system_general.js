function InGameInputHandler()
{
    this.execute = function(player, inputQueue, inputMap)
    {
        for(var i = 0; i < inputQueue.length; ++i)
        {
            var e = inputQueue[i];
        }
        
        player.playerInput.up = false;
        player.playerInput.down = false;
        player.playerInput.right = false;
        player.playerInput.left = false;
        
        //check if keys held down
        if(inputMap[Consts.keys.W])
        {
            player.playerInput.up = true;
        }
        if(inputMap[Consts.keys.A])
        {
            player.playerInput.left = true;
        }
        if(inputMap[Consts.keys.S])
        {
            player.playerInput.down = true;
        }
        if(inputMap[Consts.keys.D])
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
            if(e[0] === Consts.keys.SPACE)
            {
                menu.continuePressed = true;
            }
        }
    }
}
