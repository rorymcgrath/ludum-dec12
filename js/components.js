function CkinematicData(maxAcc, maxVel)
{
    this.position = new Vector2d(0, 0);
    this.velocity = new Vector2d(0, 0);
    this.orientation = 0.0;
    
    this.maxAcceleration = maxAcc;
    this.maxVelocity = maxVel;
}

function CcharacterRender(stillImage, walkImage)
{
    this.stillAnim = stillImage;
    this.walkAnim = walkImage;
}

function ClevelData()
{
    //map etc.
    this.entityList = [];
}

