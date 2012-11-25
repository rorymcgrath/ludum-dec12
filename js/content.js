function Content()
{
    var level = [];
    var image = [];
    var sound = [];
    
    this.load = function()
    {
        image["playerWalk"] = new Image();
        image["playerWalk"].src = "img/furniture/furniturePlayer.png";
        
        level["level01"] = new Image();
        level["level01"].src = "data/level01.png";
        
        image["guard"] = new Image();
        image["guard"].src = "img/furniture/furnitureGuard.png";
        
        image["boss"] = new Image();
        image["boss"].src = "img/furniture/furnitureBoss.png";
    
        image["door"] = new Image();
        image["door"].src = "img/furniture/furnitureDoor.png";
        
        image["tileGround"] = new Image();
        image["tileGround"].src = "img/tiles/tileFloor.png";
        
        image["tileWall"] = new Image();
        image["tileWall"].src = "img/tiles/tileWall.png";
    }
    
    this.getLevel = function(lvl)
    {
        return level[lvl];
    }
    
    this.getImage = function(img)
    {
        return image[img];
    }
    
    this.getSound = function(snd)
    {
        return sound[snd];
    }
    
    this.load();
}
