function CkinematicData(maxAcc, maxVel, rotVel)
{
    this.position = new Vector2d(0, 0);
    this.velocity = new Vector2d(0, 0);
    this.orientation = 0.0;
    
    this.maxAcceleration = maxAcc || 20;
    this.maxVelocity = maxVel || 50;
    this.rotationVelocity = rotVel || 5;
}

function CplayerInput()
{
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
}

function CmotionRequest()
{
    this.target = new Vector2d(0, 0);
}

function CcharacterRender(stillImage, walkImage)
{
    this.stillAnim = stillImage || new Image();
    this.walkAnim = walkImage || new Image();
    this.imageOffset = 
        new Vector2d(this.stillAnim.width / 2, this.stillAnim.height / 2);
}

function ClevelData()
{
    //map etc.
    this.entityList = [];
    this.characterList = [];
    this.camera = new Entity();
    this.player = new Entity();
    this.tiles = [];
    this.furniture = [];
    this.tileData = {};
    this.furnitureData = {};
}

function CmenuData()
{
    this.buttonList = [];
    this.textList = [];
    this.continuePressed = false;
}

function Ctext(string, font, color)
{
    this.string = string || "";
    this.font = font || "";
    this.color = color || "white";
}

function CtileData()
{
    this.mapping = { 1:"wall" ,0:"empty",2:" enemyStart",
        5:"playerStart",4:"door",3:"floor"}
}