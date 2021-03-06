function PlayerCollision()
{
    this.execute = function(level)
    {
        var player, xUpper, xLower, yUpper, yLower,
            bc, bcPos, tSize;
        player = level.getEntity(World.TagNames.PLAYER);
        bc = player.collision.volume;
        bcPos = bc.position.clone().addVector(player.kinematicData.position);
        
        tSize = Consts.Dimensions.TILE_SIZE;
        xUpper = Math.floor(Math.min((bcPos.x + bc.radius) / tSize, 
            level.tiles[0].length));
        xLower = Math.floor(Math.max((bcPos.x - bc.radius) / tSize, 0));
        yUpper = Math.floor(Math.min((bcPos.y + bc.radius) / tSize, 
            level.tiles.length));
        yLower = Math.floor(Math.max((bcPos.y - bc.radius) / tSize, 0));
        
        player.collision.isColliding = false;
        for(var r = yLower; r <= yUpper; ++r)
        {
            for(var c = xLower; c <= xUpper; ++c)
            {
                if(!level.tileData.data[level.tiles[r][c]].passable)
                    player.collision.isColliding = true;
                //console.log(r + " " + c);
            }
        }
    }
}