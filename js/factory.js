var entityFactory = 
{
    makeNPC : function(maxAcc, maxVel, rotVel, stillImage, walkImage, radius)
    {
        var npc = new Entity();
        npc.kinematicData = new CkinematicData(maxAcc, maxVel, rotVel);
        npc.motionRequest = new CmotionRequest();
        npc.characterRender = new CcharacterRender(stillImage, walkImage);
        npc.collisionCircle = new CcollisionCircle(radius);
        return npc;
    },
    makePC : function(maxAcc, maxVel, rotVel, stillImage, walkImage, radius)
    {
        var pc = new Entity();
        pc.kinematicData = new CkinematicData(maxAcc, maxVel, rotVel);
        pc.motionRequest = new CmotionRequest();
        pc.characterRender = new CcharacterRender(stillImage, walkImage);
        pc.playerInput = new CplayerInput();
        pc.collisionCircle = new CcollisionCircle(radius);
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