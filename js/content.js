function Content()
{
    var level = [];
    var image = [];
    var sound = [];
    
    this.load = function()
    {
        image["playerWalk"] = new Image();
        image["playerWalk"].src = "img/playerWalk.png";
        
        level["level01"] = new Image();
        level["level01"].src = "data/level01.png";
        
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
