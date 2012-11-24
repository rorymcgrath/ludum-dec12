function CkinematicData()
{
    this.position = new Vector2d(0, 0);
    this.velocity = new Vector2d(0, 0);
    this.orientation = 0.0;    
}

function CcharacterRender(image)
{
    this.walkAnim = image;
}
