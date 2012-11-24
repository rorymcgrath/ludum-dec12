function CkinematicData(maxAcc, maxVel)
{
    this.position = new Vector2d(0, 0);
    this.velocity = new Vector2d(0, 0);
    this.orientation = 0.0;
    
    this.maxAcceleration = maxAcc;
    this.maxVelocity = maxVel;
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
    this.stillAnim = stillImage;
    this.walkAnim = walkImage;
    this.imageOffset = 
        new Vector2d(this.stillAnim.width / 2, this.stillAnim.height / 2);
}

function ClevelData()
{
    //map etc.
    this.entityList = [];
    this.characterList = [];
}

