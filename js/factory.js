var entityFactory =
{
    BluePrint : 
    {
        PC : 
        {
            maxAcc : 500, 
            maxVel : 100, 
            rotVel : 3, 
            stillImage : "playerWalk",
            walkImage : "playerWalk",
            radius : 12
        },
        
        GUARD : 
        {
            maxAcc : 400, 
            maxVel : 50, 
            rotVel : 3, 
            stillImage : "guard",
            walkImage : "guard",
            radius : 12
        },
        
        BOSS : 
        {
            maxAcc : 400, 
            maxVel : 50, 
            rotVel : 3, 
            stillImage : "boss",
            walkImage : "boss",
            radius : 12
        }
    },
    
    makeNPC : function(bluePrint)
    {
        var npc = new Entity();
        npc.kinematicData = new CkinematicData(bluePrint.maxAcc, 
            bluePrint.maxVel, bluePrint.rotVel);
        npc.motionRequest = new CmotionRequest();
        npc.characterRender = new CcharacterRender(
            engine.content.getImage(bluePrint.stillImage), 
            engine.content.getImage(bluePrint.walkImage));
        npc.collision = new CcollisionCircle(bluePrint.radius);
        return npc;
    },
    makePC : function(bluePrint)
    {
        var pc = new Entity();
        pc.kinematicData = new CkinematicData(bluePrint.maxAcc, 
            bluePrint.maxVel, bluePrint.rotVel);
        pc.motionRequest = new CmotionRequest();
        pc.characterRender = new CcharacterRender(
            engine.content.getImage(bluePrint.stillImage), 
            engine.content.getImage(bluePrint.walkImage));
        pc.playerInput = new CplayerInput();
        pc.collision = new CcollisionCircle(bluePrint.radius);
        return pc;
    },
    makeMenu : function()
    {
        var menu = new Entity();
        menu.data = new CmenuData();
        return menu;
    },
    makeText : function(string, font, color)
    {
        var text = new Entity();
        text.text = new Ctext(string || "DEFAULT", 
            font || "Arial 20",
            color || "white");
        text.kinematicData = new CkinematicData()
        return text;
    }
    
}