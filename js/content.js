function Content()
{
    var image = [];
    var sound = [];
    
    this.load = function()
    {
        this.image["playerWalk"] = new Image();
        this.image["playerWalk"].src = "img/playerWalk.png";
    }
    
    this.getImage = function(img)
    {
        return image[img];
    }
    
    this.getSound = function(snd)
    {
        return sound[snd];
    }
}
